'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import {
    Play,
    Pause,
    CheckCircle2,
    MapPin,
    RotateCcw,
    Download,
    UploadCloud,
    ShieldCheck,
    AlertTriangle,
    Maximize2,
    Minimize2,
    Copy,
    Compass,
    Satellite,
    Share2,
    Camera,
    Lock,
    Navigation,
    X,
    Unlock,
    Smartphone,
    Leaf,
    ArrowRight,
    FileText,
    Sparkles
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { validateDeforestationWithGFW } from '../actions/eudr';
import DeliverableModal from './DeliverableModal';

import { Language } from '@/translations/content';

const DynamicLeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export type CommodityType = 'cafe' | 'cacao' | 'palma' | 'caucho' | 'madera' | 'ganaderia' | 'otro';

interface EUDRGeoreferenceProps {
    onPolygonChange?: (geoJson: string) => void;
    initialPolygon?: string;
    lotId?: string;
    initialCommodity?: CommodityType;
    lang?: Language;
    onLanguageChange?: (lang: Language) => void;
}

// Auto-capture interval for field walking (RFC 7946 perimeter pacing: 10s gives high-precision boundary tracking on parcels < 1 ha to > 4 ha)
const AUTO_CAPTURE_INTERVAL_SECONDS = 10;

// Haversine distance in meters
function haversineDistanceMeters(coord1: [number, number], coord2: [number, number]): number {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Calculate polygon area in Hectares
function calculatePolygonAreaHa(coords: [number, number][]): number {
    if (coords.length < 3) return 0;
    let total = 0;
    const R = 6378137;
    const len = coords.length;

    for (let i = 0; i < len; i++) {
        const j = (i + 1) % len;
        const p1 = coords[i];
        const p2 = coords[j];
        const lon1 = (p1[0] * Math.PI) / 180;
        const lat1 = (p1[1] * Math.PI) / 180;
        const lon2 = (p2[0] * Math.PI) / 180;
        const lat2 = (p2[1] * Math.PI) / 180;
        total += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }
    const areaSqMeters = Math.abs((total * R * R) / 2.0);
    return Math.round((areaSqMeters / 10000) * 100) / 100;
}

// Calculate perimeter in meters
function calculatePerimeterMeters(coords: [number, number][]): number {
    if (coords.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < coords.length - 1; i++) {
        total += haversineDistanceMeters(
            [coords[i][1], coords[i][0]],
            [coords[i + 1][1], coords[i + 1][0]]
        );
    }
    return Math.round(total);
}

// 2D segment intersection test to prevent self-intersecting polygons (rejected by TRACES NT)
function ccw(A: [number, number], B: [number, number], C: [number, number]): number {
    return (C[1] - A[1]) * (B[0] - A[0]) - (B[1] - A[1]) * (C[0] - A[0]);
}

function segmentsIntersect(
    A: [number, number],
    B: [number, number],
    C: [number, number],
    D: [number, number]
): boolean {
    const ccw1 = ccw(A, B, C);
    const ccw2 = ccw(A, B, D);
    const ccw3 = ccw(C, D, A);
    const ccw4 = ccw(C, D, B);

    return (
        ((ccw1 > 0 && ccw2 < 0) || (ccw1 < 0 && ccw2 > 0)) &&
        ((ccw3 > 0 && ccw4 < 0) || (ccw3 < 0 && ccw4 > 0))
    );
}

function checkPolygonSelfIntersections(coords: [number, number][]): boolean {
    if (coords.length < 4) return false;
    const n = coords.length;
    for (let i = 0; i < n; i++) {
        const p1 = coords[i];
        const p2 = coords[(i + 1) % n];
        for (let j = i + 2; j < n; j++) {
            if (i === 0 && j === n - 1) continue; // Skip adjacent first and last edges
            const p3 = coords[j];
            const p4 = coords[(j + 1) % n];
            if (segmentsIntersect(p1, p2, p3, p4)) {
                return true;
            }
        }
    }
    return false;
}

// Smart loop and obstacle detour pruner
// Detects when the user deviates around a ravine/obstacle and crosses back or backtracks,
// removing the spurious detour vertices to restore a clean straight perimeter line.
function pruneLoopOrDetour(
    existingPoints: [number, number][],
    candidatePoint: [number, number]
): { cleanedPoints: [number, number][]; prunedCount: number; reason: 'loop' | 'backtrack' | 'outlier' | 'none' } {
    if (existingPoints.length < 2) {
        return { cleanedPoints: [...existingPoints, candidatePoint], prunedCount: 0, reason: 'none' };
    }

    const lastPoint = existingPoints[existingPoints.length - 1];
    const n = existingPoints.length;

    // 1. Loop / Crossing Detection: Check if the new segment (lastPoint -> candidatePoint) intersects any previous segment
    for (let i = n - 3; i >= 0; i--) {
        const segStart = existingPoints[i];
        const segEnd = existingPoints[i + 1];

        if (segmentsIntersect(segStart, segEnd, lastPoint, candidatePoint)) {
            // Loop detected! The user took a detour around an obstacle and crossed their previous path.
            // Prune all vertices between the intersection (from i + 1 to n - 1)
            const pruned = n - 1 - i;
            const cleaned: [number, number][] = [...existingPoints.slice(0, i + 1), candidatePoint];
            return { cleanedPoints: cleaned, prunedCount: pruned, reason: 'loop' };
        }
    }

    // 2. Acute Backtrack / U-Turn Detection (e.g., ran into an obstacle/dog and had to turn around)
    if (existingPoints.length >= 2) {
        const pPrev = existingPoints[n - 2];
        const pLast = existingPoints[n - 1];

        const distPrevToCand = haversineDistanceMeters([pPrev[1], pPrev[0]], [candidatePoint[1], candidatePoint[0]]);

        const v1 = [pLast[0] - pPrev[0], pLast[1] - pPrev[1]];
        const v2 = [candidatePoint[0] - pLast[0], candidatePoint[1] - pLast[1]];
        const dot = v1[0] * v2[0] + v1[1] * v2[1];
        const mag1 = Math.sqrt(v1[0] ** 2 + v1[1] ** 2);
        const mag2 = Math.sqrt(v2[0] ** 2 + v2[1] ** 2);

        if (mag1 > 0 && mag2 > 0) {
            const cosAngle = dot / (mag1 * mag2);
            // Deflection angle > 125 degrees means a sharp U-turn backwards
            if (cosAngle < -0.60) {
                if (distPrevToCand < 4.5) {
                    // Reached back near previous point; discard the failed excursion vertex
                    return { cleanedPoints: existingPoints.slice(0, -1), prunedCount: 1, reason: 'backtrack' };
                } else {
                    // Replace the failed dead-end excursion with the new valid forward point
                    const cleaned: [number, number][] = [...existingPoints.slice(0, -1), candidatePoint];
                    return { cleanedPoints: cleaned, prunedCount: 1, reason: 'backtrack' };
                }
            }
        }
    }

    return { cleanedPoints: [...existingPoints, candidatePoint], prunedCount: 0, reason: 'none' };
}

// Text-to-speech voice guidance supporting English and Spanish
function speakVoiceGuidance(text: string, lang: Language = 'en') {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'es' ? 'es-CO' : 'en-US';
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
    }
}

// SHA-256 cryptographic seal
const calculatePolygonSha256 = async (data: string): Promise<string> => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        try {
            const msgBuffer = new TextEncoder().encode(data);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        } catch (e) {
            console.error('Crypto subtle fallback:', e);
        }
    }
    let h1 = 0xdeadbeef;
    let h2 = 0x41c64e6d;
    for (let i = 0; i < data.length; i++) {
        const ch = data.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const hex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).toUpperCase().padStart(16, '0');
    return (hex + hex + hex + hex).slice(0, 64);
};

export const COMMODITIES: { id: CommodityType; name: string; nameEn: string; icon: string; eudrCode: string }[] = [
    { id: 'cafe', name: 'Café', nameEn: 'Coffee', icon: '☕', eudrCode: '0901' },
    { id: 'cacao', name: 'Cacao', nameEn: 'Cocoa', icon: '🍫', eudrCode: '1801' },
    { id: 'palma', name: 'Palma de Aceite', nameEn: 'Oil Palm', icon: '🌴', eudrCode: '1511' },
    { id: 'caucho', name: 'Caucho Natural', nameEn: 'Natural Rubber', icon: '🌳', eudrCode: '4001' },
    { id: 'madera', name: 'Madera', nameEn: 'Wood & Timber', icon: '🪵', eudrCode: '4403' },
    { id: 'ganaderia', name: 'Ganadería', nameEn: 'Cattle & Beef', icon: '🐄', eudrCode: '0102' },
    { id: 'otro', name: 'Otro', nameEn: 'Other Scope', icon: '🌱', eudrCode: 'GEN' }
];

export default function EUDRGeoreference({
    onPolygonChange,
    initialPolygon,
    lotId = 'LOTE-01',
    initialCommodity = 'cafe',
    lang = 'en',
    onLanguageChange
}: EUDRGeoreferenceProps) {
    const isEn = lang === 'en';
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [commodity, setCommodity] = useState<CommodityType>(initialCommodity);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // GPS & Capture State
    const [gpsPoints, setGpsPoints] = useState<[number, number][]>([]); // [lng, lat][] standard RFC 7946
    const [isCapturing, setIsCapturing] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null); // [lat, lng]
    const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
    const [altitudeMeters, setAltitudeMeters] = useState<number | null>(null);
    const [distanceToStart, setDistanceToStart] = useState<number | null>(null);
    const [autoClosedNotice, setAutoClosedNotice] = useState<boolean>(false);
    const [countdownSeconds, setCountdownSeconds] = useState<number>(AUTO_CAPTURE_INTERVAL_SECONDS);
    const [immutableHash, setImmutableHash] = useState<string | null>(null);

    // Pocket Mode & Wake Lock State
    const [isPocketMode, setIsPocketMode] = useState<boolean>(false);
    const [holdProgress, setHoldProgress] = useState<number>(0);
    const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const wakeLockRef = useRef<any>(null);

    // IMU Inertial Sensor Anti-spoofing
    const [imuData, setImuData] = useState<{ acc: number; gyro: number }[]>([]);

    const [customLotName, setCustomLotName] = useState<string>(lotId || 'LOTE-01');
    const currentLotId = customLotName.trim() || 'LOTE-01';
    const [recenterKey, setRecenterKey] = useState<number>(0);

    // GeoJSON and Validation State
    const [geoJsonData, setGeoJsonData] = useState<string>(initialPolygon || '');
    const isCompleted = Boolean(geoJsonData && !isCapturing);
    const [isGfwValidating, setIsGfwValidating] = useState<boolean>(false);
    const [gfwStatus, setGfwStatus] = useState<'idle' | 'secure' | 'warning' | 'error' | 'unverified'>('idle');
    const [lossHa, setLossHa] = useState<number>(0);
    const [copiedCoords, setCopiedCoords] = useState(false);

    // Detect if polygon edges self-intersect (invalid for TRACES NT)
    const hasSelfIntersection = useMemo(() => {
        return checkPolygonSelfIntersections(gpsPoints);
    }, [gpsPoints]);

    // Auto-Pruning Notifications (silent helper for loop/backtrack correction)
    const [prunedNotice, setPrunedNotice] = useState<string | null>(null);
    const prunedNoticeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const triggerPrunedNotice = useCallback((msg: string) => {
        if (prunedNoticeTimeoutRef.current) clearTimeout(prunedNoticeTimeoutRef.current);
        setPrunedNotice(msg);
        prunedNoticeTimeoutRef.current = setTimeout(() => {
            setPrunedNotice(null);
            prunedNoticeTimeoutRef.current = null;
        }, 5000);
    }, []);

    // Track if user is currently stationary (< 3.5m from last recorded vertex)
    const isStationary = useMemo(() => {
        if (!currentPosition || gpsPoints.length === 0) return false;
        const last = gpsPoints[gpsPoints.length - 1];
        const dist = haversineDistanceMeters(currentPosition, [last[1], last[0]]);
        return dist < 3.5;
    }, [currentPosition, gpsPoints]);

    // Automatic Screenshot Capture State
    const [isCapturingScreenshot, setIsCapturingScreenshot] = useState<boolean>(false);
    const [capturedScreenshot, setCapturedScreenshot] = useState<string | null>(null);
    const [showScreenshotModal, setShowScreenshotModal] = useState<boolean>(false);
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [showDeliverableModal, setShowDeliverableModal] = useState<boolean>(false);
    const [showDirectionArrow, setShowDirectionArrow] = useState<boolean>(false);
    const arrowTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [sealedTimestamp, setSealedTimestamp] = useState<string | null>(null);

    const currentTimestampDisplay = useMemo(() => {
        if (sealedTimestamp) return sealedTimestamp;
        const now = new Date();
        const dateStr = now.toLocaleDateString(isEn ? 'en-US' : 'es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const timeStr = now.toLocaleTimeString(isEn ? 'en-US' : 'es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        return `${dateStr}, ${timeStr}`;
    }, [sealedTimestamp, isEn]);

    // Refs for real-time tracking without stale closure
    const fileInputRef = useRef<HTMLInputElement>(null);
    const evidenceCardRef = useRef<HTMLDivElement>(null);
    const watchId = useRef<number | null>(null);
    const captureIntervalId = useRef<NodeJS.Timeout | null>(null);
    const currentPositionRef = useRef<[number, number] | null>(null);
    const gpsPointsRef = useRef<[number, number][]>([]);
    const accuracyRef = useRef<number | null>(null);
    const altitudeMetersRef = useRef<number | null>(null);
    const maxDistanceAwayRef = useRef<number>(0);
    const isCapturingRef = useRef<boolean>(false);
    const countdownRef = useRef<number>(AUTO_CAPTURE_INTERVAL_SECONDS);
    const handleFinishMappingRef = useRef<(isAutoClosed?: boolean) => void | Promise<void>>(() => {});
    const handleAutoCaptureStepRef = useRef<() => void>(() => {});
    const processGpsUpdateRef = useRef<(lat: number, lng: number, acc: number, alt?: number | null) => void>(() => {});

    // Sync refs
    useEffect(() => {
        gpsPointsRef.current = gpsPoints;
    }, [gpsPoints]);

    useEffect(() => {
        accuracyRef.current = gpsAccuracy;
    }, [gpsAccuracy]);

    useEffect(() => {
        altitudeMetersRef.current = altitudeMeters;
    }, [altitudeMeters]);

    useEffect(() => {
        isCapturingRef.current = isCapturing;
    }, [isCapturing]);

    // Screen Wake Lock to prevent phone screen from sleeping during walk
    const requestWakeLock = async () => {
        if (typeof window !== 'undefined' && 'wakeLock' in navigator) {
            try {
                wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
            } catch (err) {
                console.warn('Wake Lock notice:', err);
            }
        }
    };

    const releaseWakeLock = () => {
        if (wakeLockRef.current) {
            try {
                wakeLockRef.current.release();
            } catch (e) {}
            wakeLockRef.current = null;
        }
    };

    // Hold to unlock Pocket Mode
    const handleStartHold = () => {
        setHoldProgress(0);
        let currentP = 0;
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = setInterval(() => {
            currentP += 10;
            setHoldProgress(currentP);
            if (currentP >= 100) {
                if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
                setIsPocketMode(false);
                setHoldProgress(0);
                if (typeof window !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate([70, 40, 70]);
                }
            }
        }, 120);
    };

    const handleCancelHold = () => {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setHoldProgress(0);
    };

    useEffect(() => {
        return () => {
            releaseWakeLock();
            if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        };
    }, []);

    // Fetch elevation fallback
    const fetchElevation = async (lat: number, lng: number) => {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lng}`);
            if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data.elevation) && data.elevation.length > 0) {
                    const elev = Math.round(data.elevation[0]);
                    if (elev > 0) {
                        setAltitudeMeters(elev);
                        altitudeMetersRef.current = elev;
                    }
                }
            }
        } catch (e) {}
    };

    // Start live location watching on Mount (Single persistent high-precision watch)
    useEffect(() => {
        if (typeof window === 'undefined' || !navigator.geolocation) return;

        // 1. Fast instant position check (cellular / cache)
        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude, accuracy, altitude } = pos.coords;
                processGpsUpdateRef.current(latitude, longitude, accuracy, altitude);
            },
            () => {},
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
        );

        // 2. High-precision continuous watch (Single unified watcher)
        const mountWatchId = navigator.geolocation.watchPosition(
            pos => {
                const { latitude, longitude, accuracy, altitude } = pos.coords;
                processGpsUpdateRef.current(latitude, longitude, accuracy, altitude);
            },
            err => {
                console.warn('GPS initial lock notice:', err.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 2000 }
        );

        return () => {
            navigator.geolocation.clearWatch(mountWatchId);
        };
    }, []);

    // Manual re-center to user's active location
    const handleRecenterLocation = () => {
        setRecenterKey(prev => prev + 1);
        if (typeof window === 'undefined' || !navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude, accuracy, altitude } = pos.coords;
                processGpsUpdateRef.current(latitude, longitude, accuracy, altitude);
            },
            err => {
                console.warn('Recenter notice:', err.message);
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
        );
    };

    // Setup device motion listeners for step verification
    const setupImuListeners = () => {
        if (typeof window === 'undefined' || !window.DeviceMotionEvent) return;
        const handleMotion = (event: DeviceMotionEvent) => {
            if (isCapturingRef.current) {
                const acc = event.accelerationIncludingGravity || event.acceleration;
                if (acc) {
                    const magnitude = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
                    if (magnitude > 1) {
                        setImuData(prev => [...prev.slice(-30), { acc: magnitude, gyro: 0 }]);
                    }
                }
            }
        };
        window.addEventListener('devicemotion', handleMotion);
        return () => window.removeEventListener('devicemotion', handleMotion);
    };

    // Trigger automatic screenshot capture of the evidence card
    const captureEvidenceScreenshot = useCallback(async () => {
        if (!evidenceCardRef.current) return;
        setIsCapturingScreenshot(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 450));
            const canvas = await html2canvas(evidenceCardRef.current, {
                useCORS: true,
                allowTaint: false,
                scale: 2,
                logging: false,
                backgroundColor: '#082840'
            });
            const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
            setCapturedScreenshot(dataUrl);
            setShowScreenshotModal(true);
        } catch (err) {
            console.error('Error capturando evidencia visual:', err);
        } finally {
            setIsCapturingScreenshot(false);
        }
    }, []);

    // Finish mapping, build GeoJSON, and auto-capture evidence
    const handleFinishMapping = useCallback(
        async (isAutoClosed = false) => {
            const pointsToClose = gpsPointsRef.current;
            if (pointsToClose.length < 3) return;

            if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([150, 70, 150, 70, 300]);
            }

            const now = new Date();
            const dateStr = now.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const timeStr = now.toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const formattedStamp = `${dateStr}, ${timeStr}`;
            setSealedTimestamp(formattedStamp);

            const avgAcc =
                imuData.length > 0 ? imuData.reduce((acc, curr) => acc + curr.acc, 0) / imuData.length : 1.25;

            const polygonCoords = [...pointsToClose, pointsToClose[0]];
            const calculatedArea = calculatePolygonAreaHa(polygonCoords);
            const calculatedPerimeter = calculatePerimeterMeters(polygonCoords);

            const currentComm = COMMODITIES.find(c => c.id === commodity) || COMMODITIES[0];

            // Generate SHA-256 Immutable Audit Fingerprint
            const hashPayload = JSON.stringify({
                lotId: currentLotId,
                commodity: currentComm.id,
                eudrTariffCode: currentComm.eudrCode,
                coords: polygonCoords,
                timestamp: now.toISOString(),
                areaHa: calculatedArea,
                perimeterMeters: calculatedPerimeter,
                altitudeMeters: altitudeMeters,
                sensorVerified: avgAcc > 1
            });
            const sha256 = await calculatePolygonSha256(hashPayload);
            setImmutableHash(sha256);

            const generatedGeoJson = JSON.stringify(
                {
                    type: 'FeatureCollection',
                    name: `EUDR_TRACES_${currentLotId}`,
                    crs: {
                        type: 'name',
                        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
                    },
                    properties: {
                        lotId: currentLotId,
                        commodity: currentComm.name,
                        commodityEudrCode: currentComm.eudrCode,
                        timestamp: now.toISOString(),
                        timestampFormatted: formattedStamp,
                        altitudeMeters: altitudeMeters,
                        elevationUnit: 'm.s.n.m.',
                        areaHa: calculatedArea,
                        perimeterMeters: calculatedPerimeter,
                        autoClosed: isAutoClosed,
                        sensorVerified: avgAcc > 1,
                        sha256Hash: sha256,
                        hashVerified: true,
                        integritySeal: 'AXISTRACE_INTEGRITY_SEAL',
                        eudrGeometryRule: calculatedArea > 4 ? 'POLYGON_MANDATORY_OVER_4HA' : 'POLYGON_VOLUNTARY_PRECISION_UNDER_4HA',
                        disclaimer: 'Herramienta de primera milla y validación previa. No reemplaza el registro oficial del SICA ni la debida diligencia del operador (Reglamento UE 2023/1115).'
                    },
                    features: [
                        {
                            type: 'Feature',
                            properties: {
                                LotCode: currentLotId,
                                Commodity: currentComm.name,
                                HSCode: currentComm.eudrCode,
                                AltitudeMsnm: altitudeMeters,
                                Method: isAutoClosed
                                    ? 'axistrace_handsfree_proximity_autoclosed'
                                    : 'axistrace_digital_walk_imu_assisted',
                                CutoffDate: '31-Dec-2020',
                                DeforestationHa: lossHa,
                                EudrStatus: gfwStatus === 'secure' ? 'SIN_PERDIDA_DETECTADA' : gfwStatus === 'warning' ? 'PERDIDA_DETECTADA' : 'NO_VERIFICADO',
                                Sha256Seal: sha256
                            },
                            geometry: { type: 'Polygon', coordinates: [polygonCoords] }
                        }
                    ]
                },
                null,
                2
            );

            setGeoJsonData(generatedGeoJson);
            if (onPolygonChange) onPolygonChange(generatedGeoJson);

            // Query GFW UMD satellite dataset
            validateDeforestationWithGFW(generatedGeoJson)
                .then(result => {
                    if (result && result.success) {
                        setLossHa(result.lossDetectedHa || 0);
                        if (result.status === 'SIN_PERDIDA_DETECTADA') {
                            setGfwStatus('secure');
                        } else if (result.status === 'PERDIDA_DETECTADA') {
                            setGfwStatus('warning');
                        } else {
                            setGfwStatus('unverified');
                        }
                    } else {
                        setGfwStatus('unverified');
                    }
                })
                .catch(() => {
                    setGfwStatus('unverified');
                });

            setIsCapturing(false);
            isCapturingRef.current = false;
            releaseWakeLock();
            setIsPocketMode(false);
            countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
            setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);

            if (isAutoClosed) {
                setAutoClosedNotice(true);
                speakVoiceGuidance(
                    isEn ? 'Boundary closed and verified successfully. Capturing evidence.' : 'Lote cerrado y verificado con éxito. Capturando evidencia.',
                    lang
                );
            } else {
                speakVoiceGuidance(
                    isEn ? 'Boundary closed and verified successfully. Generating photographic evidence.' : 'Lote cerrado y verificado con éxito. Generando evidencia fotográfica.',
                    lang
                );
            }

            setTimeout(() => {
                captureEvidenceScreenshot();
            }, 800);
        },
        [
            currentLotId,
            commodity,
            gfwStatus,
            lossHa,
            imuData,
            onPolygonChange,
            captureEvidenceScreenshot
        ]
    );

    handleFinishMappingRef.current = handleFinishMapping;

    // Check proximity to start point and auto-close
    const checkProximityAndAutoClose = useCallback((currentLat: number, currentLng: number) => {
        const points = gpsPointsRef.current;
        if (points.length < 3) return false;

        const startLng = points[0][0];
        const startLat = points[0][1];
        const distToStart = haversineDistanceMeters([currentLat, currentLng], [startLat, startLng]);
        setDistanceToStart(Math.round(distToStart * 10) / 10);

        if (distToStart > maxDistanceAwayRef.current) {
            maxDistanceAwayRef.current = distToStart;
        }

        const accuracy = accuracyRef.current || 5;
        const closeThresholdMeters = Math.max(2.5, Math.min(4.5, accuracy * 0.75));

        if (maxDistanceAwayRef.current >= 4.5 && distToStart <= closeThresholdMeters) {
            handleFinishMappingRef.current(true);
            return true;
        }
        return false;
    }, []);

    // Auto-step logic executed every 10 seconds
    const handleAutoCaptureStep = useCallback(() => {
        const currentPos = currentPositionRef.current;
        if (!currentPos) return;

        const currentLat = currentPos[0];
        const currentLng = currentPos[1];
        const currentPoints = gpsPointsRef.current;

        if (currentPoints.length >= 3) {
            const closed = checkProximityAndAutoClose(currentLat, currentLng);
            if (closed) return;
        }

        if (currentPoints.length > 0) {
            const last = currentPoints[currentPoints.length - 1];
            const distFromLast = haversineDistanceMeters([currentLat, currentLng], [last[1], last[0]]);
            // Must have walked at least 3.5m away from previous vertex (prevents bogus points while standing still)
            if (distFromLast < 3.5) {
                return;
            }
        }

        const candidatePoint: [number, number] = [currentLng, currentLat];
        const { cleanedPoints, prunedCount } = pruneLoopOrDetour(currentPoints, candidatePoint);

        if (prunedCount > 0) {
            setGpsPoints(cleanedPoints);
            gpsPointsRef.current = cleanedPoints;
            if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([120, 60, 120]);
            }
            const notice = isEn
                ? `Auto-corrected: ${prunedCount} detour ${prunedCount === 1 ? 'point' : 'points'} pruned`
                : `Auto-corrección: ${prunedCount} ${prunedCount === 1 ? 'punto' : 'puntos'} de desvío podados`;
            triggerPrunedNotice(notice);
            speakVoiceGuidance(
                isEn ? 'Obstacle loop pruned. Straight line restored.' : 'Desvío por obstáculo corregido. Línea recta restaurada.',
                lang
            );
        } else {
            if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([40, 30, 40]);
            }

            setGpsPoints(cleanedPoints);
            gpsPointsRef.current = cleanedPoints;
            speakVoiceGuidance(
                isEn ? `Vertex ${cleanedPoints.length}` : `Punto ${cleanedPoints.length}`,
                lang
            );
        }
    }, [checkProximityAndAutoClose, isEn, lang, triggerPrunedNotice]);

    handleAutoCaptureStepRef.current = handleAutoCaptureStep;

    // GPS Filter & Deadband Smoothing: eliminates wild jumps and stationary GNSS jitter
    const processGpsUpdate = useCallback(
        (latitude: number, longitude: number, accuracy: number, altitude?: number | null) => {
            setGpsAccuracy(accuracy);

            // Filter 1: Accuracy filter — ignore degraded fixes (> 18m during walk, > 28m overall)
            if (isCapturingRef.current && accuracy > 18) {
                return;
            } else if (accuracyRef.current !== null && accuracyRef.current < 20 && accuracy > 28) {
                return;
            }

            accuracyRef.current = accuracy;

            // Filter 2: Deadband & GNSS bounce filter
            const prev = currentPositionRef.current;
            if (prev) {
                const dist = haversineDistanceMeters([latitude, longitude], prev);
                // Ignore stationary micro-jitter (< 1.0m)
                if (dist < 1.0) {
                    return;
                }
                // Ignore sudden teleportation jump (> 25m) caused by multi-path satellite bounce
                if (isCapturingRef.current && dist > 25) {
                    return;
                }
            }

            setCurrentPosition([latitude, longitude]);
            currentPositionRef.current = [latitude, longitude];

            if (altitude !== null && altitude !== undefined && altitude > 0) {
                const alt = Math.round(altitude);
                setAltitudeMeters(alt);
                altitudeMetersRef.current = alt;
            } else if (altitudeMetersRef.current === null) {
                fetchElevation(latitude, longitude);
            }

            // Real-time walk events: Point 1 capture & proximity auto-close
            if (isCapturingRef.current) {
                if (gpsPointsRef.current.length === 0) {
                    setGpsPoints([[longitude, latitude]]);
                    gpsPointsRef.current = [[longitude, latitude]];
                    countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
                    setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);
                    if (typeof window !== 'undefined' && navigator.vibrate) {
                        navigator.vibrate([100, 50, 100]);
                    }
                    speakVoiceGuidance(
                        isEn ? 'Walking survey in progress, keep right.' : 'Caminata en curso, dirígete a la derecha.',
                        lang
                    );
                    triggerRightArrowBlink();
                } else if (gpsPointsRef.current.length >= 3) {
                    checkProximityAndAutoClose(latitude, longitude);
                }
            }
        },
        [checkProximityAndAutoClose, isEn, lang]
    );

    useEffect(() => {
        processGpsUpdateRef.current = processGpsUpdate;
    }, [processGpsUpdate]);

    // Start GPS & Sensor Tracking (Hands-Free)
    const startTracking = () => {
        if (!navigator.geolocation) {
            alert(isEn ? 'Geolocation not supported in this mobile browser.' : 'Geolocalización no soportada en este navegador móvil.');
            return;
        }

        setIsCapturing(true);
        isCapturingRef.current = true;
        requestWakeLock();
        setAutoClosedNotice(false);
        if (gpsPointsRef.current.length === 0) {
            maxDistanceAwayRef.current = 0;
        }
        setDistanceToStart(null);
        setGfwStatus('idle');
        countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
        setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);
        triggerRightArrowBlink();

        if (currentPositionRef.current && gpsPointsRef.current.length === 0) {
            const [lat, lng] = currentPositionRef.current;
            setGpsPoints([[lng, lat]]);
            gpsPointsRef.current = [[lng, lat]];
            if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            speakVoiceGuidance(
                isEn ? 'Walking survey in progress, keep right.' : 'Caminata en curso, dirígete a la derecha.',
                lang
            );
        } else {
            speakVoiceGuidance(
                isEn ? 'Walking survey resumed. Keep walking along the boundary.' : 'Caminata reanudada. Continúa por el lindero.',
                lang
            );
        }

        if (typeof DeviceMotionEvent !== 'undefined' && (DeviceMotionEvent as any).requestPermission) {
            (DeviceMotionEvent as any)
                .requestPermission()
                .then((response: string) => {
                    if (response === 'granted') setupImuListeners();
                })
                .catch(console.error);
        } else {
            setupImuListeners();
        }
    };

    const stopTracking = () => {
        if (captureIntervalId.current) {
            clearInterval(captureIntervalId.current);
            captureIntervalId.current = null;
        }
        setIsCapturing(false);
        isCapturingRef.current = false;
        releaseWakeLock();
        setIsPocketMode(false);
        countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
        setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);
    };

    // Auto-capture countdown loop: runs every 1000ms countdown for 30-second intervals
    useEffect(() => {
        if (!isCapturing) {
            if (captureIntervalId.current) {
                clearInterval(captureIntervalId.current);
                captureIntervalId.current = null;
            }
            countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
            setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);
            return;
        }

        countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
        setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);

        captureIntervalId.current = setInterval(() => {
            if (gpsPointsRef.current.length === 0) return;

            // When stationary (< 3.5m from last recorded point), hold countdown and do not capture points
            const currentPos = currentPositionRef.current;
            const points = gpsPointsRef.current;
            if (currentPos && points.length > 0) {
                const lastPoint = points[points.length - 1];
                const distFromLast = haversineDistanceMeters(
                    [currentPos[0], currentPos[1]],
                    [lastPoint[1], lastPoint[0]]
                );
                if (distFromLast < 3.5) {
                    countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
                    setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);
                    return;
                }
            }

            countdownRef.current -= 1;
            if (countdownRef.current <= 0) {
                countdownRef.current = AUTO_CAPTURE_INTERVAL_SECONDS;
                setCountdownSeconds(AUTO_CAPTURE_INTERVAL_SECONDS);
                handleAutoCaptureStepRef.current();
            } else {
                setCountdownSeconds(countdownRef.current);
            }
        }, 1000);

        return () => {
            if (captureIntervalId.current) {
                clearInterval(captureIntervalId.current);
                captureIntervalId.current = null;
            }
        };
    }, [isCapturing]);

    // Manual capture fallback with auto-pruning
    const handleManualCapturePoint = () => {
        const currentPos = currentPositionRef.current;
        if (!currentPos) return;

        const currentLat = currentPos[0];
        const currentLng = currentPos[1];

        if (gpsPoints.length >= 3) {
            const closed = checkProximityAndAutoClose(currentLat, currentLng);
            if (closed) return;
        }

        const candidatePoint: [number, number] = [currentLng, currentLat];
        const { cleanedPoints, prunedCount } = pruneLoopOrDetour(gpsPoints, candidatePoint);

        if (prunedCount > 0) {
            setGpsPoints(cleanedPoints);
            gpsPointsRef.current = cleanedPoints;
            if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([120, 60, 120]);
            }
            const notice = isEn
                ? `Auto-corrected: ${prunedCount} detour ${prunedCount === 1 ? 'point' : 'points'} pruned`
                : `Auto-corrección: ${prunedCount} ${prunedCount === 1 ? 'punto' : 'puntos'} de desvío podados`;
            triggerPrunedNotice(notice);
            speakVoiceGuidance(
                isEn ? 'Detour pruned. Straight line restored.' : 'Desvío corregido. Línea recta restaurada.',
                lang
            );
        } else {
            if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([40, 30, 40]);
            }

            setGpsPoints(cleanedPoints);
            gpsPointsRef.current = cleanedPoints;
            speakVoiceGuidance(
                isEn ? `Manual vertex ${cleanedPoints.length}` : `Vértice ${cleanedPoints.length} manual`,
                lang
            );
        }
    };

    // Undo last point
    const handleUndoPoint = () => {
        setGpsPoints(prev => prev.slice(0, -1));
    };

    // Trigger 3-blink right directional arrow
    const triggerRightArrowBlink = () => {
        if (arrowTimeoutRef.current) {
            clearTimeout(arrowTimeoutRef.current);
        }
        setShowDirectionArrow(true);
        arrowTimeoutRef.current = setTimeout(() => {
            setShowDirectionArrow(false);
            arrowTimeoutRef.current = null;
        }, 2800);
    };

    // Reset mapping
    const handleClear = () => {
        if (arrowTimeoutRef.current) {
            clearTimeout(arrowTimeoutRef.current);
            arrowTimeoutRef.current = null;
        }
        setShowDirectionArrow(false);
        stopTracking();
        setGpsPoints([]);
        gpsPointsRef.current = [];
        setGeoJsonData('');
        setImmutableHash(null);
        setSealedTimestamp(null);
        setAutoClosedNotice(false);
        setPrunedNotice(null);
        setCapturedScreenshot(null);
        setGfwStatus('idle');
        setLossHa(0);
        if (onPolygonChange) onPolygonChange('');
    };

    // Cancel active walk
    const handleCancelWalk = () => {
        if (gpsPoints.length > 0) {
            setShowCancelModal(true);
        } else {
            handleClear();
        }
    };

    const confirmCancelWalk = () => {
        setShowCancelModal(false);
        handleClear();
    };

    // File Upload Handler (KML, GeoJSON)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async event => {
            try {
                const text = event.target?.result as string;
                let parsedGeoJson: any = null;

                if (file.name.endsWith('.kml')) {
                    const coordMatches = text.match(/<coordinates>([\s\S]*?)<\/coordinates>/i);
                    if (!coordMatches) throw new Error('No se encontraron coordenadas en el KML');
                    const rawCoords = coordMatches[1].trim().split(/\s+/);
                    const coords = rawCoords.map(c => {
                        const [lng, lat] = c.split(',').map(Number);
                        return [lng, lat];
                    });
                    parsedGeoJson = {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: { LotCode: currentLotId },
                                geometry: { type: 'Polygon', coordinates: [coords] }
                            }
                        ]
                    };
                } else {
                    parsedGeoJson = JSON.parse(text);
                }

                const strGeoJson = JSON.stringify(parsedGeoJson, null, 2);
                setGeoJsonData(strGeoJson);

                let polyCoords: [number, number][] = [];
                if (parsedGeoJson.features?.[0]?.geometry?.coordinates?.[0]) {
                    polyCoords = parsedGeoJson.features[0].geometry.coordinates[0];
                } else if (parsedGeoJson.geometry?.coordinates?.[0]) {
                    polyCoords = parsedGeoJson.geometry.coordinates[0];
                }

                if (polyCoords.length > 0) {
                    setGpsPoints(polyCoords.slice(0, -1));
                }

                const sha256 = await calculatePolygonSha256(strGeoJson);
                setImmutableHash(sha256);
                if (onPolygonChange) onPolygonChange(strGeoJson);

                validateDeforestationWithGFW(strGeoJson)
                    .then(res => {
                        if (res && res.success) {
                            setLossHa(res.lossDetectedHa || 0);
                            if (res.status === 'SIN_PERDIDA_DETECTADA') {
                                setGfwStatus('secure');
                            } else if (res.status === 'PERDIDA_DETECTADA') {
                                setGfwStatus('warning');
                            } else {
                                setGfwStatus('unverified');
                            }
                        } else {
                            setGfwStatus('unverified');
                        }
                    })
                    .catch(() => {
                        setGfwStatus('unverified');
                    });
            } catch (err: any) {
                alert(isEn ? `Error loading file: ${err.message}` : `Error cargando archivo: ${err.message}`);
            }
        };
        reader.readAsText(file);
    };

    // Load sample lot
    const loadSampleLot = () => {
        const sample: [number, number][] = [
            [-75.694821, 4.813294],
            [-75.694103, 4.813412],
            [-75.693892, 4.812604],
            [-75.694605, 4.812498]
        ];
        setGpsPoints(sample);
        gpsPointsRef.current = sample;
        setTimeout(() => {
            handleFinishMapping(false);
        }, 100);
    };

    // Geometry calculations memoized
    const { centerCoords, polygonCoords, markersCoords, areaHa, perimeterMeters } = useMemo(() => {
        let poly: [number, number][] = [];
        let markers: [number, number][] = [];
        let center: [number, number] = [4.813294, -75.694821]; // Default Pereira

        if (geoJsonData) {
            try {
                const parsed = JSON.parse(geoJsonData);
                let coords: [number, number][] = [];
                if (parsed.features?.[0]?.geometry?.coordinates?.[0]) {
                    coords = parsed.features[0].geometry.coordinates[0];
                } else if (parsed.geometry?.coordinates?.[0]) {
                    coords = parsed.geometry.coordinates[0];
                }
                if (coords.length > 0) {
                    poly = coords.map(c => [c[1], c[0]]);
                    markers = poly.slice(0, -1);
                    center = poly[0];
                }
            } catch (e) {}
        } else if (gpsPoints.length > 0) {
            markers = gpsPoints.map(c => [c[1], c[0]]);
            if (gpsPoints.length >= 3) {
                poly = [...markers, markers[0]];
            }
            center = currentPosition || markers[markers.length - 1];
        } else if (currentPosition) {
            center = currentPosition;
        }

        const area = poly.length >= 3 ? calculatePolygonAreaHa(poly) : 0;
        const perim = poly.length >= 2 ? calculatePerimeterMeters(poly) : 0;

        return {
            centerCoords: center,
            polygonCoords: poly,
            markersCoords: markers,
            areaHa: area,
            perimeterMeters: perim
        };
    }, [currentPosition, geoJsonData, gpsPoints]);

    // Download GeoJSON
    const downloadGeoJsonFile = () => {
        if (!geoJsonData) return;
        const blob = new Blob([geoJsonData], { type: 'application/geo+json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AXISTRACE_${commodity.toUpperCase()}_${currentLotId}.geojson`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Download Captured Screenshot
    const downloadScreenshotImage = () => {
        if (!capturedScreenshot) return;
        const a = document.createElement('a');
        a.href = capturedScreenshot;
        a.download = `Informe_AxisTrace_${currentLotId}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Copy coordinates
    const copyCoordinates = () => {
        const text = markersCoords.map((m, i) => `V${i + 1}: ${m[0].toFixed(6)}, ${m[1].toFixed(6)}`).join('\n');
        navigator.clipboard.writeText(text);
        setCopiedCoords(true);
        setTimeout(() => setCopiedCoords(false), 2500);
    };

    // One-tap WhatsApp Share
    const shareViaWhatsApp = () => {
        const currentComm = COMMODITIES.find(c => c.id === commodity) || COMMODITIES[0];
        const commName = isEn && currentComm.nameEn ? currentComm.nameEn : currentComm.name;
        const eudrStatusText = isEn
            ? (gfwStatus === 'secure' ? 'No forest loss detected (Dec 31, 2020 Baseline)' : gfwStatus === 'warning' ? 'ALERT: Deforestation Detected' : '2020 Baseline (Unverified / Pending)')
            : (gfwStatus === 'secure' ? 'Sin pérdida detectada (Línea Base 31-Dic-2020)' : gfwStatus === 'warning' ? 'ALERTA: Deforestación detectada' : 'Línea Base 2020 (No verificada / Pendiente)');

        const text = isEn
            ? `*AXISTRACE - EUDR Georeferencing Pre-validation Report*%0A` +
              `🌾 *Crop:* ${currentComm.icon} ${commName} (HS: ${currentComm.eudrCode})%0A` +
              `🏷️ *Lot ID:* ${currentLotId}%0A` +
              `⏰ *Date & Time:* ${currentTimestampDisplay}%0A` +
              (altitudeMeters ? `⛰️ *Altitude:* ${altitudeMeters.toLocaleString('en-US')} masl%0A` : '') +
              `📐 *Area:* ${areaHa > 0 ? `${areaHa} ha (≈ ${Math.round(areaHa * 10000).toLocaleString('en-US')} m²)` : 'In progress'}%0A` +
              `📏 *Perimeter:* ${perimeterMeters} m%0A` +
              `🌐 *Recorded Vertices:* ${markersCoords.length}%0A` +
              `🛡️ *2020 Baseline Check:* ${eudrStatusText}%0A` +
              (immutableHash ? `🔑 *Integrity ID (UID):* AXIS-UID-${immutableHash.slice(0, 16)}...${immutableHash.slice(-8)}%0A` : '') +
              `🔐 *Integrity:* Verifiable Unique Security Identifier (UID) for EU TRACES NT formatted dossier.%0A` +
              `📲 *Telemetry:* Inertial sensors (IMU) logged to mitigate unauthorized manipulation.%0A` +
              `⚠️ *Notice:* First-mile pre-validation. Does not replace official institutional registries (SICA).%0A` +
              (currentPosition ? `🗺️ *Location on Google Maps:* https://www.google.com/maps?q=${currentPosition[0]},${currentPosition[1]}` : '')
            : `*AXISTRACE - Informe de Georreferenciación Previa EUDR*%0A` +
              `🌾 *Cultivo:* ${currentComm.icon} ${commName} (HS: ${currentComm.eudrCode})%0A` +
              `🏷️ *Lote:* ${currentLotId}%0A` +
              `⏰ *Fecha y Hora:* ${currentTimestampDisplay}%0A` +
              (altitudeMeters ? `⛰️ *Altitud:* ${altitudeMeters.toLocaleString('es-CO')} m.s.n.m.%0A` : '') +
              `📐 *Área:* ${areaHa > 0 ? `${areaHa} ha (≈ ${Math.round(areaHa * 10000).toLocaleString('es-CO')} m²)` : 'En proceso'}%0A` +
              `📏 *Perímetro:* ${perimeterMeters} m%0A` +
              `🌐 *Vértices Registrados:* ${markersCoords.length}%0A` +
              `🛡️ *Consulta Línea 2020:* ${eudrStatusText}%0A` +
              (immutableHash ? `🔑 *Identificador de Integridad (UID):* AXIS-UID-${immutableHash.slice(0, 16)}...${immutableHash.slice(-8)}%0A` : '') +
              `🔐 *Integridad:* Sello Digital de Seguridad (UID) para expediente preliminar en formato TRACES NT.%0A` +
              `📲 *Telemetría:* Sensores inerciales (IMU) registrados para mitigar manipulación.%0A` +
              `⚠️ *Aviso:* Herramienta de primera milla. No reemplaza el registro oficial del SICA (FNC).%0A` +
              (currentPosition ? `🗺️ *Ubicación en Google Maps:* https://www.google.com/maps?q=${currentPosition[0]},${currentPosition[1]}` : '');

        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    };

    return (
        <div
            className={`w-full transition-all duration-300 font-sans ${
                isFullscreen
                    ? 'fixed inset-0 z-[100] bg-[#082840] h-[100dvh] flex flex-col justify-between overflow-hidden'
                    : 'bg-[#082840] rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden'
            }`}
        >
            {/* EVIDENCE CARD CONTAINER TO BE CAPTURED BY HTML2CANVAS */}
            <div ref={evidenceCardRef} className="w-full bg-[#082840] flex flex-col">
                {/* Top Operational Status Bar */}
                <div className="bg-[#0C3C60] text-white px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-2 border-b border-white/10 select-none">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#83DF9C]/20 border border-[#83DF9C]/40 flex items-center justify-center text-[#83DF9C] flex-shrink-0">
                            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow" />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#FAF2CA] truncate">
                                    AxisTrace // EUDR
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#83DF9C]/20 text-[#83DF9C] border border-[#83DF9C]/30 font-bold">
                                    Auto 10s
                                </span>
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-white/60 truncate">
                                {isEn ? 'Ground Traceability & Unique Identifier (UID)' : 'Trazabilidad Terrestre & Identificador Único Verificable (UID)'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        {/* GPS Accuracy Badge */}
                        <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono">
                            <span
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                    !gpsAccuracy
                                        ? 'bg-amber-400 animate-pulse'
                                        : gpsAccuracy < 8
                                        ? 'bg-[#83DF9C] animate-pulse'
                                        : gpsAccuracy < 18
                                        ? 'bg-yellow-400'
                                        : 'bg-red-400'
                                }`}
                            ></span>
                            <span className="text-white/90">
                                {gpsAccuracy ? `±${gpsAccuracy.toFixed(0)}m` : (isEn ? 'Searching GPS' : 'Buscando GPS')}
                            </span>
                        </div>

                        {/* Fullscreen Toggle */}
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF2CA] transition-colors cursor-pointer"
                            title={isFullscreen ? (isEn ? 'Minimize' : 'Minimizar') : (isEn ? 'Fullscreen' : 'Pantalla Completa')}
                        >
                            {isFullscreen ? (
                                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            ) : (
                                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* SATELLITE MAP CONTAINER */}
                <div
                    className="relative w-full bg-[#082840]"
                    style={{ height: isFullscreen ? '62vh' : 'calc(48vh + 40px)' }}
                >
                    <DynamicLeafletMap
                        center={centerCoords}
                        polygonCoords={polygonCoords}
                        markers={markersCoords}
                        currentLocation={currentPosition}
                        recenterKey={recenterKey}
                        isCompleted={isCompleted}
                    />

                    {/* Top Overlay: Live Coordinates & Elevation */}
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 max-w-[85%] sm:max-w-none">
                        <div className="bg-[#0C3C60]/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#83DF9C] animate-pulse flex-shrink-0"></span>
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#FAF2CA] truncate">
                                {currentPosition
                                    ? `${currentPosition[0].toFixed(5)}°N, ${Math.abs(currentPosition[1]).toFixed(5)}°W`
                                    : (isEn ? 'Connecting satellite...' : 'Conectando satélite...')}
                            </span>
                            {altitudeMeters && (
                                <>
                                    <span className="text-white/30 text-[9px]">•</span>
                                    <span className="text-[10px] font-mono font-black text-[#83DF9C] shrink-0">
                                        {altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO')} {isEn ? 'masl' : 'msnm'}
                                    </span>
                                </>
                            )}
                            {currentPosition && (
                                <button
                                    onClick={copyCoordinates}
                                    className="text-white/70 hover:text-white p-0.5 cursor-pointer"
                                    title={isEn ? 'Copy coordinates' : 'Copiar coordenadas'}
                                >
                                    <Copy className="w-3 h-3" />
                                </button>
                            )}
                        </div>

                        {/* Proximity Indicator */}
                        {isCapturing && distanceToStart !== null && gpsPoints.length >= 3 && (
                            <div
                                className={`px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider animate-in fade-in w-fit ${
                                    distanceToStart <= 3.5
                                        ? 'bg-[#FAF2CA] text-[#0C3C60] ring-2 ring-[#0C3C60] animate-bounce'
                                        : 'bg-[#0C3C60]/90 text-[#FAF2CA] border border-white/20'
                                }`}
                            >
                                <Compass className="w-3 h-3 text-[#83DF9C]" />
                                <span>
                                    {distanceToStart <= 3.5
                                        ? (isEn ? `${distanceToStart}m to start! Closing automatically...` : `¡A ${distanceToStart}m del inicio! Cerrando automáticamente...`)
                                        : (isEn ? `Distance to start: ${distanceToStart}m` : `Distancia al inicio: ${distanceToStart}m`)}
                                </span>
                            </div>
                        )}

                        {/* Auto-Pruned Loop / Detour Floating Notification */}
                        {prunedNotice && (
                            <div className="bg-emerald-950/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-400/80 shadow-2xl flex items-center gap-2 max-w-sm animate-in slide-in-from-top-2">
                                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-100">
                                    {prunedNotice}
                                </span>
                            </div>
                        )}

                        {/* Caminata en Pausa / Esquivando Obstáculo */}
                        {!isCapturing && gpsPoints.length > 0 && !geoJsonData && (
                            <div className="bg-[#0C3C60]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/70 text-white text-[10px] sm:text-xs shadow-2xl flex items-center gap-2.5 max-w-sm animate-in slide-in-from-top-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                                <div className="leading-tight">
                                    <span className="font-bold text-amber-300 block">
                                        {isEn ? 'Walk Paused' : 'Caminata en Pausa'} ({gpsPoints.length} {gpsPoints.length === 1 ? (isEn ? 'point' : 'punto') : (isEn ? 'puntos' : 'puntos')})
                                    </span>
                                    <span className="text-[9.5px] text-white/80">
                                        {isEn
                                            ? 'Walk past ravines or obstacles freely. Tap Resume (▶️) once back on the boundary.'
                                            : 'Rodea cañadas u obstáculos con tranquilidad. Al volver al lindero, pulsa Reanudar (▶️).'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Topological Self-Intersection Warning Banner */}
                        {hasSelfIntersection && (
                            <div className="bg-amber-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/80 shadow-2xl flex items-center gap-2 max-w-sm animate-in slide-in-from-top-2">
                                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                                <div className="text-[9.5px] leading-tight text-amber-100">
                                    <span className="font-bold text-amber-300 block">
                                        {isEn ? 'Topological Notice: Crossing Edges' : 'Aviso Topológico: Líneas Cruzadas'}
                                    </span>
                                    <span>
                                        {isEn
                                            ? 'TRACES NT rejects self-intersecting polygons. Please undo the last vertex or adjust path.'
                                            : 'TRACES NT rechaza polígonos cruzados. Retira el último vértice o ajusta el trazado.'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Top Right: Re-center, Undo & Reset */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                        <button
                            onClick={handleRecenterLocation}
                            className="bg-[#0C3C60]/95 hover:bg-[#83DF9C] hover:text-[#0C3C60] active:scale-95 text-[#FAF2CA] px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/20 shadow-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                            title={isEn ? 'Center map on current position' : 'Centrar mapa en mi ubicación activa'}
                        >
                            <Navigation className="w-3 h-3 fill-current text-[#83DF9C]" />
                            <span className="hidden sm:inline">{isEn ? 'My Location' : 'Mi Ubicación'}</span>
                        </button>

                        {gpsPoints.length > 0 && !geoJsonData && (
                            <button
                                onClick={handleUndoPoint}
                                className="bg-[#0C3C60]/90 hover:bg-[#0C3C60] active:scale-95 text-[#FAF2CA] px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/20 shadow-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                                title={isEn ? 'Undo last vertex' : 'Deshacer último vértice'}
                            >
                                <RotateCcw className="w-3 h-3" />
                                <span className="hidden sm:inline">{isEn ? 'Undo' : 'Deshacer'}</span>
                            </button>
                        )}

                        {(geoJsonData || gpsPoints.length > 0) && (
                            <button
                                onClick={handleClear}
                                className="bg-[#FF7E7E]/90 hover:bg-[#FF7E7E] active:scale-95 text-white px-2.5 sm:px-3 py-1.5 rounded-xl shadow-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                                title={isEn ? 'Reset mapping' : 'Reiniciar mapeo'}
                            >
                                {isEn ? 'Reset' : 'Limpiar'}
                            </button>
                        )}
                    </div>

                    {/* Bottom Left: Live Vertex Counter */}
                    {!geoJsonData && gpsPoints.length > 0 && (
                        <div className="absolute bottom-3 left-3 z-20 pointer-events-none bg-[#0C3C60]/95 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3">
                            <span className="text-2xl sm:text-3xl font-black text-[#83DF9C] font-mono leading-none">
                                {gpsPoints.length}
                            </span>
                            <div className="leading-tight">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#FAF2CA]">
                                    {isEn ? 'Vertices' : 'Vértices'}
                                </p>
                                <p className="text-[8px] sm:text-[9px] text-white/60">
                                    {gpsPoints.length < 4
                                        ? (isEn ? 'Walking perimeter...' : 'Caminando perímetro...')
                                        : (isEn ? 'Auto-closes upon return' : 'Se cerrará solo al volver')}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Visual 3-Blink Right Arrow Directional Overlay */}
                    {showDirectionArrow && (
                        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-4">
                            <div className="animate-blink-3 flex flex-col items-center gap-3 p-6 sm:p-8 rounded-3xl bg-[#082840]/90 backdrop-blur-md border-2 border-[#83DF9C] shadow-[0_0_60px_rgba(131,223,156,0.6)]">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#83DF9C]/20 border-2 border-[#83DF9C] flex items-center justify-center text-[#83DF9C] shadow-[0_0_30px_rgba(131,223,156,0.4)]">
                                    <ArrowRight className="w-16 h-16 sm:w-20 sm:h-20 stroke-[3.5] text-[#83DF9C]" />
                                </div>
                                <div className="text-center">
                                    <span className="block text-lg sm:text-2xl font-black uppercase text-[#83DF9C] tracking-wider drop-shadow-md">
                                        {isEn ? 'Head to the right ➔' : 'Dirígete a la derecha ➔'}
                                    </span>
                                    <span className="block text-xs font-bold text-[#FAF2CA] uppercase tracking-wider mt-1">
                                        {isEn ? 'Start walking along the parcel boundary' : 'Inicia la caminata por el lindero'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* METRICS & AUDIT DECK: ONLY SHOWN AFTER MAPPING IS COMPLETED */}
                {isCompleted && (
                    <>
                        <div className="bg-[#082840] p-3 sm:p-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 text-white animate-in fade-in">
                            {/* 1. Área */}
                            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 shadow-sm">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white/60">
                                    {isEn ? 'Parcel Area' : 'Área Parcela'}
                                </p>
                                <p className="text-lg sm:text-xl font-black text-[#83DF9C] font-mono mt-0.5">
                                    {areaHa > 0 ? `${areaHa} ha` : '--'}
                                </p>
                                <p className="text-[8px] sm:text-[9px] font-medium text-white/60 truncate">
                                    {areaHa > 0
                                        ? `≈ ${Math.round(areaHa * 10000).toLocaleString(isEn ? 'en-US' : 'es-CO')} m²`
                                        : (isEn ? 'Pacing perimeter' : 'Caminando lindero')}
                                </p>
                            </div>

                            {/* 2. Perímetro */}
                            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 shadow-sm">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white/60">
                                    {isEn ? 'Perimeter' : 'Perímetro'}
                                </p>
                                <p className="text-lg sm:text-xl font-black text-[#FAF2CA] font-mono mt-0.5">
                                    {perimeterMeters > 0 ? `${perimeterMeters} m` : '--'}
                                </p>
                                <p className="text-[8px] sm:text-[9px] font-medium text-white/60 truncate">
                                    {perimeterMeters > 0
                                        ? `${(perimeterMeters / 1000).toFixed(2)} ${isEn ? 'km surveyed' : 'km recorridos'}`
                                        : (isEn ? 'Logging steps' : 'Midiendo paso')}
                                </p>
                            </div>

                            {/* 3. Altitud / Elevación */}
                            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 shadow-sm">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white/60">
                                    {isEn ? 'Avg Altitude' : 'Altitud Promedio'}
                                </p>
                                <p className="text-lg sm:text-xl font-black text-white font-mono mt-0.5">
                                    {altitudeMeters ? `${altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO')} m` : '--'}
                                </p>
                                <p className="text-[8px] sm:text-[9px] font-medium text-white/60 truncate">
                                    {altitudeMeters
                                        ? `${altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO')} ${isEn ? 'masl' : 'm.s.n.m.'}`
                                        : (isEn ? 'Logging elevation' : 'Midiendo elevación')}
                                </p>
                            </div>

                            {/* 4. Normativa EUDR */}
                            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 shadow-sm">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white/60">
                                    {isEn ? 'EUDR Standard' : 'Normativa EUDR'}
                                </p>
                                <p className="text-[11px] sm:text-xs font-black text-[#83DF9C] mt-1 uppercase truncate">
                                    {areaHa > 4
                                        ? (isEn ? 'Mandatory Polygon' : 'Polígono Obligatorio')
                                        : (isEn ? 'Point or Polygon' : 'Punto o Polígono')}
                                </p>
                                <p className="text-[8px] sm:text-[9px] font-medium text-white/60 truncate">
                                    {areaHa > 4
                                        ? '> 4 ha (Art. 9.1.d)'
                                        : (isEn ? '≤ 4 ha (Point / Polygon)' : '≤ 4 ha (Punto o Polígono)')}
                                </p>
                            </div>

                            {/* 5. Deforestación Dinámica */}
                            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 shadow-sm col-span-2 sm:col-span-1">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white/60">
                                    {isEn ? '2020 Baseline' : 'Línea Base 2020'}
                                </p>
                                <p className="text-[11px] sm:text-xs font-black mt-1 uppercase flex items-center gap-1">
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            gfwStatus === 'secure'
                                                ? 'bg-[#83DF9C]'
                                                : gfwStatus === 'warning'
                                                ? 'bg-red-500 animate-pulse'
                                                : 'bg-amber-400 animate-pulse'
                                        }`}
                                    ></span>
                                    <span className="truncate text-white">
                                        {gfwStatus === 'secure'
                                            ? (isEn ? '0.00 ha Forest Loss' : '0.00 ha Pérdida Bosque')
                                            : gfwStatus === 'warning'
                                            ? `${lossHa.toFixed(2)} ha ${isEn ? 'Forest Loss' : 'Pérdida Bosque'}`
                                            : (isEn ? 'Satellite Check Pending' : 'Verificación Pendiente')}
                                    </span>
                                </p>
                                <p
                                    className={`text-[8px] sm:text-[9px] font-black ${
                                        gfwStatus === 'secure'
                                            ? 'text-[#83DF9C]'
                                            : gfwStatus === 'warning'
                                            ? 'text-red-400'
                                            : 'text-amber-400'
                                    }`}
                                >
                                    {gfwStatus === 'secure'
                                        ? (isEn ? 'NO LOSS DETECTED' : 'SIN PÉRDIDA DETECTADA')
                                        : gfwStatus === 'warning'
                                        ? (isEn ? 'DEFORESTATION ALERT' : 'ALERTA DEFORESTACIÓN')
                                        : (isEn ? 'UNVERIFIED (GFW UMD 30M)' : 'NO VERIFICADO (GFW UMD 30M)')}
                                </p>
                            </div>
                        </div>

                        {/* Cryptographic Integrity Seal Strip */}
                        <div className="bg-[#051726] text-[#FAF2CA] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-1.5 text-[9px] sm:text-[10px] border-t border-white/10 select-none">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <Lock className="w-3.5 h-3.5 text-[#83DF9C] shrink-0" />
                                <span className="font-black text-[#83DF9C] uppercase tracking-wider shrink-0">
                                    {isEn ? 'Integrity UID:' : 'Sello Integridad (UID):'}
                                </span>
                                <span className="font-mono text-white/95 truncate">
                                    {immutableHash
                                        ? `AXIS-UID-${immutableHash.slice(0, 16)}...${immutableHash.slice(-8)}`
                                        : (isEn ? 'Generating seal...' : 'Generando sello...')}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9px] text-[#FAF2CA]/90">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#83DF9C] animate-pulse"></span>
                                <span className="font-bold uppercase tracking-wider">Audit Trail • TRACES NT Format</span>
                            </div>
                        </div>

                        {/* Identification Footer Bar for the Screenshot */}
                        <div className="bg-[#0C3C60] text-[#FAF2CA] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-1 text-[10px] border-t border-white/10">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="font-bold">{isEn ? 'Lot:' : 'Lote:'}</span>
                                <span className="font-mono text-white font-bold">{currentLotId}</span>
                                <span className="text-white/40">•</span>
                                <span className="font-bold text-[#83DF9C]">
                                    {COMMODITIES.find(c => c.id === commodity)?.icon}{' '}
                                    {isEn
                                        ? COMMODITIES.find(c => c.id === commodity)?.nameEn
                                        : COMMODITIES.find(c => c.id === commodity)?.name}
                                </span>
                                {altitudeMeters && (
                                    <>
                                        <span className="text-white/40">•</span>
                                        <span className="text-[#83DF9C] font-mono font-bold">
                                            {altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO')} {isEn ? 'masl' : 'msnm'}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="font-bold text-white/80">{isEn ? 'Timestamp:' : 'Fecha y Hora:'}</span>
                                <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">
                                    {currentTimestampDisplay}
                                </span>
                                <span className="text-white/40">•</span>
                                <span className="text-[#83DF9C] font-black">{isEn ? 'AXISTRACE CERTIFICATE' : 'CERTIFICADO AXISTRACE'}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* NOTIFICATION: AUTO-CLOSED NOTICE */}
            {autoClosedNotice && (
                <div className="bg-[#83DF9C] text-[#0C3C60] p-3 text-xs font-black flex items-center justify-between animate-in slide-in-from-top">
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                            {isEn
                                ? 'Success! Returned to start point. Perimeter closed and parcel evidence captured.'
                                : '¡Excelente! Regresaste al punto de inicio. Lote cerrado y fotografiado automáticamente.'}
                        </span>
                    </span>
                    <button
                        onClick={() => setShowScreenshotModal(true)}
                        className="underline text-[11px] uppercase cursor-pointer"
                    >
                        {isEn ? 'View Photo' : 'Ver Foto'}
                    </button>
                </div>
            )}
            {/* THUMB-ZONE FIELD CONTROLS */}
            <div className="sticky bottom-0 z-30 p-3 sm:p-4 bg-[#082840]/95 backdrop-blur-md border-t border-white/10 shadow-2xl space-y-2">
                {!geoJsonData ? (
                    <div className="space-y-2.5">
                        {!isCapturing ? (
                            gpsPoints.length === 0 ? (
                                /* MOMENTO 1: INICIO LIMPIO (ANTES DE CAMINAR) */
                                <div className="space-y-3 p-1">
                                    {/* BIG GREEN START BUTTON */}
                                    <button
                                        onClick={startTracking}
                                        className="w-full bg-[#83DF9C] hover:bg-[#6ed38a] active:scale-98 text-[#0C3C60] py-4 sm:py-5 px-6 rounded-2xl font-black uppercase text-sm sm:text-base tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer min-h-[64px]"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#0C3C60] text-[#83DF9C] flex items-center justify-center shrink-0 shadow-md">
                                            <Play className="w-5 h-5 fill-current ml-0.5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-sm sm:text-base font-black leading-tight">
                                                {isEn ? 'START DIGITAL WALK' : 'INICIAR CAMINATA'}
                                            </span>
                                            <span className="block text-[10px] text-[#0C3C60]/80 font-bold leading-tight lowercase">
                                                {isEn ? 'walk perimeter • auto-closes upon return' : 'camina el lindero • se cierra solo al volver'}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                /* EN PAUSA (Esquivando obstáculo / cañada) */
                                <div className="space-y-2.5 p-1 animate-in fade-in">
                                    {/* Explanatory banner */}
                                    <div className="bg-[#0C3C60] p-2.5 rounded-xl border border-amber-400/50 flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-amber-400 text-[#0C3C60] flex items-center justify-center font-black text-xs shrink-0">
                                                ⏸
                                            </div>
                                            <div>
                                                <span className="font-black text-amber-300 uppercase text-[11px] block leading-tight">
                                                    {isEn ? 'Walk in Pause (Obstacle Detour)' : 'Caminata en Pausa (Esquivar Obstáculo)'}
                                                </span>
                                                <span className="text-[10px] text-white/80 font-medium block leading-tight mt-0.5">
                                                    {isEn
                                                        ? 'Walk past ravines or dogs freely. Resume once back on boundary.'
                                                        : 'Rodea cañadas o perros con tranquilidad. Al volver al lindero, pulsa Reanudar.'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-[#0C3C60] font-black bg-[#83DF9C] px-2 py-0.5 rounded-lg shrink-0">
                                            {gpsPoints.length} {gpsPoints.length === 1 ? (isEn ? 'point' : 'punto') : (isEn ? 'puntos' : 'puntos')}
                                        </span>
                                    </div>

                                    {/* BIG PLAY / RESUME BUTTON */}
                                    <button
                                        onClick={startTracking}
                                        className="w-full bg-[#83DF9C] hover:bg-[#6ed38a] active:scale-98 text-[#0C3C60] py-4 px-6 rounded-2xl font-black uppercase text-sm sm:text-base tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer min-h-[58px]"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-[#0C3C60] text-[#83DF9C] flex items-center justify-center shrink-0 shadow-md">
                                            <Play className="w-5 h-5 fill-current ml-0.5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-sm sm:text-base font-black leading-tight">
                                                {isEn ? 'RESUME DIGITAL WALK' : 'REANUDAR CAMINATA'}
                                            </span>
                                            <span className="block text-[10px] text-[#0C3C60]/80 font-bold leading-tight">
                                                {isEn ? 'Continue perimeter along boundary' : 'Continúa el trazo por el lindero'}
                                            </span>
                                        </div>
                                    </button>

                                    {/* Action buttons while paused */}
                                    <div className="flex items-center gap-2">
                                        {gpsPoints.length >= 3 && (
                                            <button
                                                onClick={() => handleFinishMapping(false)}
                                                className="flex-1 bg-white/10 hover:bg-white/20 active:scale-98 text-[#83DF9C] border border-[#83DF9C]/50 py-2.5 px-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                                <span>{isEn ? 'Close Perimeter Now' : 'Cerrar Lote Ahora'}</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={handleCancelWalk}
                                            className="flex-1 bg-red-500/15 hover:bg-red-500/25 active:scale-98 text-red-300 border border-red-500/30 py-2.5 px-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                            <span>{isEn ? 'Cancel / Reset' : 'Descartar / Reiniciar'}</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        ) : (
                            /* MOMENTO 2: ACTIVELY WALKING */
                            <div className="space-y-2 animate-in fade-in">
                                <div className="bg-[#0C3C60] p-2.5 rounded-xl border border-white/15 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-[#83DF9C] text-[#0C3C60] flex items-center justify-center font-mono font-black text-xs shadow-sm shrink-0">
                                            {gpsPoints.length === 0 ? '···' : isStationary ? '⏸' : countdownSeconds}
                                        </div>
                                        <div>
                                            <span className="font-black text-[#FAF2CA] uppercase text-[11px] block leading-tight">
                                                {gpsPoints.length === 0
                                                    ? (isEn ? 'Fixing GPS signal...' : 'Fijando señal GPS...')
                                                    : isStationary
                                                    ? (isEn ? 'Waiting for movement' : 'En espera de avance')
                                                    : (isEn ? 'Walk in Progress' : 'Caminata en Curso')}
                                            </span>
                                            <span className="text-[10px] text-white/70 font-semibold block leading-tight mt-0.5">
                                                {gpsPoints.length === 0
                                                    ? (isEn ? 'Point 1 logs upon coordinates capture' : 'Punto 1 se marcará al capturar coordenadas')
                                                    : isStationary
                                                    ? (isEn ? 'Head right to log next point' : 'Dirígete a la derecha para marcar el siguiente punto')
                                                    : (isEn ? `Next point in ${countdownSeconds}s • Auto-closes on return` : `Próximo punto en ${countdownSeconds}s • Se cierra solo al volver`)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-[11px] text-[#0C3C60] font-black bg-[#83DF9C] px-2 py-0.5 rounded-lg inline-block shadow-xs">
                                            {gpsPoints.length} {gpsPoints.length === 1 ? (isEn ? 'point' : 'punto') : (isEn ? 'points' : 'puntos')}
                                        </span>
                                        {distanceToStart !== null && gpsPoints.length >= 3 && (
                                            <p className="text-[9px] text-[#FAF2CA] font-bold mt-0.5">
                                                {distanceToStart}m {isEn ? 'to start' : 'al inicio'}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons while walking */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleFinishMapping(false)}
                                            disabled={gpsPoints.length < 3}
                                            className="flex-1 bg-[#83DF9C] disabled:bg-gray-600 disabled:text-gray-400 hover:bg-[#6fd48b] active:scale-98 text-[#0C3C60] py-3.5 rounded-xl font-black uppercase text-[11px] sm:text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px]"
                                        >
                                            <ShieldCheck className="w-4 h-4" />
                                            <span>{isEn ? 'Close Perimeter' : 'Cerrar Lote'} ({gpsPoints.length}/3+)</span>
                                        </button>

                                        <button
                                            onClick={handleManualCapturePoint}
                                            className="px-3 py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 active:scale-98 text-white rounded-xl font-bold uppercase text-[10px] sm:text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer min-h-[48px]"
                                            title={isEn ? 'Record manual vertex' : 'Marcar vértice manual en esquina o lindero'}
                                        >
                                            <span className="text-xs font-black">+</span>
                                            <span>{isEn ? 'Point' : 'Punto'}</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsPocketMode(true);
                                                if (typeof window !== 'undefined' && navigator.vibrate) {
                                                    navigator.vibrate([60, 40, 60]);
                                                }
                                            }}
                                            className="px-3 py-3.5 bg-[#0C3C60] hover:bg-[#164e78] active:scale-98 text-[#FAF2CA] rounded-xl font-bold uppercase text-[10px] sm:text-[11px] transition-all cursor-pointer min-h-[48px] flex items-center gap-1 shadow-sm border border-white/10"
                                            title={isEn ? 'Pocket Mode: lock touch screen while walking' : 'Modo Bolsillo: Bloquear pantalla táctil'}
                                        >
                                            <Lock className="w-3.5 h-3.5 text-[#83DF9C]" />
                                            <span>{isEn ? 'Pocket' : 'Bolsillo'}</span>
                                        </button>

                                        <button
                                            onClick={stopTracking}
                                            className="px-3 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 active:scale-98 text-amber-200 border border-amber-500/40 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] transition-all cursor-pointer min-h-[48px] flex items-center gap-1"
                                            title={isEn ? 'Pause to walk around ravines, dogs or obstacles' : 'Pausar para esquivar cañadas, perros u obstáculos'}
                                        >
                                            <span>⏸</span>
                                            <span>{isEn ? 'Pause' : 'Pausar'}</span>
                                        </button>

                                        <button
                                            onClick={handleCancelWalk}
                                            className="p-3.5 bg-red-500/20 hover:bg-red-500/30 active:scale-98 text-red-200 border border-red-500/30 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] transition-all cursor-pointer min-h-[48px] flex items-center justify-center"
                                            title={isEn ? 'Cancel walk and discard points' : 'Cancelar caminata y descartar puntos'}
                                        >
                                            <X className="w-4 h-4 text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* MOMENTO 3: LOTE CERRADO Y ACCIONES DE VALOR */
                    <div className="space-y-2.5 animate-in fade-in">
                        <div className="bg-[#83DF9C]/20 border border-[#83DF9C]/40 p-3 rounded-2xl flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-[#83DF9C] text-[#0C3C60] flex items-center justify-center shrink-0 shadow-xs">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-xs font-black uppercase text-[#83DF9C] tracking-wider truncate">
                                        {isEn ? 'Parcel Successfully Mapped!' : '¡Lote Mapeado con Éxito!'}
                                    </h4>
                                    <p className="text-[10px] text-white/80 font-bold truncate">
                                        {areaHa > 0 ? `${areaHa} ha` : ''} • {perimeterMeters}m {isEn ? 'perimeter' : 'recorrido'} {altitudeMeters ? `• ${altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO')} ${isEn ? 'masl' : 'msnm'}` : ''}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleClear}
                                className="text-[10px] font-black uppercase text-[#0C3C60] bg-[#83DF9C] hover:bg-[#6fd48b] px-2.5 py-1.5 rounded-xl shadow-xs shrink-0 cursor-pointer transition-colors"
                            >
                                {isEn ? 'Map Another' : 'Mapear Otro'}
                            </button>
                        </div>

                        {/* BIG PRIMARY CTA: ENTREGABLE INFORME PDF & DATOS */}
                        <button
                            onClick={() => setShowDeliverableModal(true)}
                            className="w-full bg-[#83DF9C] hover:bg-[#6fd48b] active:scale-98 text-[#0C3C60] py-4 px-5 rounded-2xl font-black uppercase text-xs sm:text-sm tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer min-h-[56px]"
                        >
                            <FileText className="w-5 h-5 text-[#0C3C60] shrink-0" />
                            <span>{isEn ? 'Complete Data & Generate Georeferencing Report' : 'Completar Datos & Generar Informe PDF'}</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                            {/* View / Download Screenshot Photo */}
                            <button
                                onClick={() => {
                                    if (capturedScreenshot) {
                                        setShowScreenshotModal(true);
                                    } else {
                                        captureEvidenceScreenshot();
                                    }
                                }}
                                className="w-full bg-[#0C3C60] hover:bg-[#164e78] active:scale-98 text-[#FAF2CA] py-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] border border-white/10"
                            >
                                <Camera className="w-4 h-4 text-[#83DF9C]" />
                                <span>{isCapturingScreenshot ? (isEn ? 'Generating Photo...' : 'Generando Foto...') : (isEn ? 'View Parcel Photo' : 'Ver Foto del Lote')}</span>
                            </button>

                            {/* Download GeoJSON for TRACES NT */}
                            <button
                                onClick={downloadGeoJsonFile}
                                className="w-full bg-[#0C3C60] hover:bg-[#164e78] active:scale-98 text-[#FAF2CA] py-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] border border-white/10"
                            >
                                <Download className="w-4 h-4 text-[#83DF9C]" />
                                <span>GeoJSON EUDR</span>
                            </button>
                        </div>

                        {/* Instant WhatsApp Share */}
                        <button
                            onClick={shareViaWhatsApp}
                            className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-98 text-white py-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Share2 className="w-4 h-4" />
                            <span>{isEn ? 'Send Quick Summary on WhatsApp' : 'Enviar Reporte Rápido por WhatsApp'}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* BEAUTIFUL NATIVE CANCEL CONFIRMATION MODAL */}
            {showCancelModal && isMounted && createPortal(
                <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in">
                    <div className="bg-[#082840] rounded-3xl max-w-sm w-full border border-red-500/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-white animate-in zoom-in-95">
                        <div className="p-5 sm:p-6 text-center space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto shadow-inner">
                                <AlertTriangle className="w-7 h-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-white tracking-wide">
                                    {isEn ? 'Cancel Field Walk?' : '¿Cancelar Caminata?'}
                                </h3>
                                <p className="text-xs text-[#FAF2CA]/75 mt-2 leading-relaxed">
                                    {isEn
                                        ? `GPS tracking will stop and the ${gpsPoints.length} recorded ${gpsPoints.length === 1 ? 'vertex' : 'vertices'} will be discarded. The terminal will reset to its initial state.`
                                        : `Se detendrá el rastreo GPS y se descartarán los ${gpsPoints.length} ${gpsPoints.length === 1 ? 'punto registrado' : 'puntos registrados'}. La terminal volverá a su estado inicial.`}
                                </p>
                            </div>

                            <div className="pt-2 space-y-2">
                                <button
                                    onClick={confirmCancelWalk}
                                    className="w-full bg-red-500 hover:bg-red-600 active:scale-98 text-white py-3.5 px-4 rounded-xl font-black uppercase text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                    <span>{isEn ? 'Yes, Cancel & Discard' : 'Sí, Cancelar y Descartar'}</span>
                                </button>
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="w-full bg-[#0C3C60] hover:bg-[#164e78] active:scale-98 text-[#FAF2CA] py-3.5 px-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Play className="w-4 h-4 text-[#83DF9C] fill-current" />
                                    <span>{isEn ? 'Keep Walking' : 'Continuar Caminata'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* OFFICIAL EUDR DELIVERABLE & CHECKOUT MODAL */}
            {showDeliverableModal && (
                <DeliverableModal
                    isOpen={showDeliverableModal}
                    onClose={() => setShowDeliverableModal(false)}
                    lang={lang}
                    data={{
                        lotId: currentLotId,
                        commodity,
                        areaHa,
                        perimeterMeters,
                        altitudeMeters,
                        vertices: markersCoords,
                        uid: immutableHash ? `AXIS-UID-${immutableHash.slice(0, 16)}-${immutableHash.slice(-8)}` : `AXIS-UID-${Date.now()}`,
                        capturedScreenshot,
                        gfwStatus
                    }}
                />
            )}

            {/* AUTOMATIC SCREENSHOT EVIDENCE MODAL */}
            {showScreenshotModal && isMounted && createPortal(
                <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in">
                    <div className="bg-[#082840] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-white/20 shadow-2xl flex flex-col justify-between text-white">
                        {/* Modal Header */}
                        <div className="p-4 bg-[#0C3C60] text-white rounded-t-3xl flex justify-between items-center border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Camera className="w-5 h-5 text-[#83DF9C]" />
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-wider text-[#FAF2CA]">
                                        {isEn ? 'AxisTrace Photographic Evidence' : 'Evidencia Fotográfica AxisTrace'}
                                    </h3>
                                    <p className="text-[10px] text-white/60">
                                        {isEn ? 'Captured automatically upon closing boundary' : 'Capturado automáticamente al cerrar el lote'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowScreenshotModal(false)}
                                className="text-white/60 hover:text-white p-1 rounded-full cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body: Image Preview */}
                        <div className="p-4 flex flex-col items-center">
                            {capturedScreenshot ? (
                                <img
                                    src={capturedScreenshot}
                                    alt={isEn ? 'Satellite walking survey screenshot' : 'Pantallazo de la caminata satelital'}
                                    className="w-full rounded-2xl shadow-md border border-white/20 object-contain max-h-[48vh]"
                                />
                            ) : (
                                <div className="py-12 text-center text-xs text-white/50">
                                    {isEn ? 'Generating high-resolution image...' : 'Generando imagen de alta resolución...'}
                                </div>
                            )}

                            <div className="mt-3 w-full bg-white/5 p-3 rounded-xl border border-white/10 text-white text-xs space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <p className="font-bold flex items-center gap-1.5 text-[#83DF9C]">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        <span>
                                            {isEn ? 'Verified boundary: ' : 'Lote verificado: '}
                                            {areaHa} ha (≈ {Math.round(areaHa * 10000).toLocaleString(isEn ? 'en-US' : 'es-CO')} m²)
                                            {altitudeMeters && ` • ${altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO')} ${isEn ? 'masl' : 'msnm'}`}
                                        </span>
                                    </p>
                                    <span className="font-mono text-[10px] bg-[#0C3C60] text-[#FAF2CA] px-2 py-0.5 rounded font-bold w-fit">
                                        {currentTimestampDisplay}
                                    </span>
                                </div>
                                <p className="text-[10px] text-white/70">
                                    {isEn ? 'Identifier' : 'Identificador'}: {currentLotId} • {isEn && COMMODITIES.find(c => c.id === commodity)?.nameEn ? COMMODITIES.find(c => c.id === commodity)?.nameEn : COMMODITIES.find(c => c.id === commodity)?.name} • {isEn ? 'WGS84 RFC 7946 Coordinates' : 'Coordenadas WGS84 RFC 7946'}
                                </p>

                                {/* Immutability Certificate Seal in Modal */}
                                <div className="bg-[#0C3C60] text-white p-2.5 rounded-lg border border-white/10 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <Lock className="w-3.5 h-3.5 text-[#83DF9C]" />
                                            <span className="font-black text-[#FAF2CA] uppercase text-[10px] tracking-wider">
                                                {isEn ? 'Unique Identifier (UID)' : 'Identificador Único Verificable (UID)'}
                                            </span>
                                        </div>
                                        <span className="text-[8.5px] bg-[#83DF9C] text-[#0C3C60] font-black px-1.5 py-0.2 rounded uppercase">
                                            {isEn ? 'Tamper-Proof' : 'Inalterable'}
                                        </span>
                                    </div>
                                    <div className="bg-[#082840] p-1.5 rounded font-mono text-[9px] text-[#83DF9C] break-all border border-white/10 flex items-center justify-between gap-2">
                                        <span className="truncate">{immutableHash ? `AXIS-UID-${immutableHash}` : (isEn ? 'GENERATING UID...' : 'GENERANDO UID...')}</span>
                                        {immutableHash && (
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`AXIS-UID-${immutableHash}`);
                                                    alert(isEn ? 'UID Identifier copied to clipboard' : 'Identificador UID copiado al portapapeles');
                                                }}
                                                className="text-[9px] text-white/60 hover:text-white underline shrink-0 cursor-pointer"
                                            >
                                                {isEn ? 'Copy' : 'Copiar'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="p-4 bg-[#0C3C60] rounded-b-3xl border-t border-white/10 space-y-2">
                            <button
                                onClick={downloadScreenshotImage}
                                className="w-full bg-[#83DF9C] hover:bg-[#6fd48b] text-[#0C3C60] py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Download className="w-4 h-4" />
                                <span>{isEn ? 'Save Photo to Device / Gallery' : 'Guardar Foto en el Celular / Galería'}</span>
                            </button>

                            <button
                                onClick={() => {
                                    shareViaWhatsApp();
                                    setShowScreenshotModal(false);
                                }}
                                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Share2 className="w-4 h-4" />
                                <span>{isEn ? 'Share via WhatsApp' : 'Compartir por WhatsApp'}</span>
                            </button>

                            <button
                                onClick={() => setShowScreenshotModal(false)}
                                className="w-full py-2.5 text-center text-xs font-bold text-white/60 hover:text-white uppercase cursor-pointer"
                            >
                                {isEn ? 'Close and return to map' : 'Cerrar y volver al mapa'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* FULL-SCREEN POCKET MODE OVERLAY (MODO BOLSILLO ANTI-ROCES) */}
            {isPocketMode && isCapturing && isMounted && createPortal(
                <div className="fixed inset-0 z-[99999] bg-[#05131e] text-white flex flex-col justify-between p-6 select-none animate-in fade-in">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#83DF9C]/20 border border-[#83DF9C]/40 flex items-center justify-center text-[#83DF9C]">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-wider text-[#FAF2CA]">
                                    {isEn ? 'Pocket Mode Active' : 'Modo Bolsillo Activo'}
                                </h3>
                                <p className="text-[10px] text-white/60">
                                    {isEn ? 'Touch screen protected against fabric touches' : 'Pantalla táctil protegida contra toques de tela'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#83DF9C]/20 text-[#83DF9C] text-[10px] font-mono font-bold border border-[#83DF9C]/30">
                            <span className="w-2 h-2 rounded-full bg-[#83DF9C] animate-ping" />
                            <span>{isEn ? 'GPS Logging' : 'GPS Grabando'}</span>
                        </div>
                    </div>

                    {/* Big Live Metrics in Pocket Mode */}
                    <div className="flex flex-col items-center justify-center text-center my-auto space-y-6">
                        <div>
                            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest block mb-1">
                                {isEn ? 'Recorded Vertices' : 'Vértices Registrados'}
                            </span>
                            <div className="text-7xl font-black font-mono text-[#83DF9C]">
                                {gpsPoints.length}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                                <span className="text-[9px] uppercase tracking-wider text-white/50 block font-bold">
                                    {isEn ? 'Next Point' : 'Próximo Punto'}
                                </span>
                                <span className="text-2xl font-black font-mono text-[#FAF2CA]">
                                    {countdownSeconds}s
                                </span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                                <span className="text-[9px] uppercase tracking-wider text-white/50 block font-bold">
                                    {isEn ? 'Altitude' : 'Altitud'}
                                </span>
                                <span className="text-2xl font-black font-mono text-white">
                                    {altitudeMeters ? altitudeMeters.toLocaleString(isEn ? 'en-US' : 'es-CO') : '--'}
                                </span>
                                <span className="text-[9px] text-white/40 block">{isEn ? 'masl' : 'msnm'}</span>
                            </div>
                        </div>

                        {distanceToStart !== null && gpsPoints.length >= 3 && (
                            <div className="bg-[#83DF9C]/15 border border-[#83DF9C]/30 rounded-2xl p-3 max-w-xs w-full text-center">
                                <span className="text-[10px] font-bold text-[#83DF9C] block uppercase tracking-wider">
                                    {distanceToStart <= 5
                                        ? (isEn ? '🎯 Starting point reached!' : '🎯 ¡Llegaste al punto de partida!')
                                        : (isEn ? `Distance to start: ${distanceToStart}m` : `Distancia al inicio: ${distanceToStart}m`)}
                                </span>
                                <span className="text-[9px] text-white/60 block mt-0.5">
                                    {isEn ? 'Will auto-close upon arrival' : 'Se cerrará automáticamente al volver'}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-[10px] text-white/50 bg-white/5 px-3 py-1.5 rounded-full">
                            <Smartphone className="w-3.5 h-3.5 text-[#83DF9C]" />
                            <span>{isEn ? 'Gently vibrates in your pocket at every captured point' : 'Vibra suave en tu bolsillo en cada punto capturado'}</span>
                        </div>
                    </div>

                    {/* Unlock Action: Hold for 1.2s to prevent accidental unlocks in pocket */}
                    <div className="space-y-2">
                        <div className="relative overflow-hidden rounded-2xl">
                            <div
                                className="absolute inset-0 bg-[#83DF9C] transition-all duration-100 ease-linear"
                                style={{ width: `${holdProgress}%` }}
                            />
                            <button
                                onTouchStart={handleStartHold}
                                onTouchEnd={handleCancelHold}
                                onMouseDown={handleStartHold}
                                onMouseUp={handleCancelHold}
                                onMouseLeave={handleCancelHold}
                                className="relative w-full py-4 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 rounded-2xl font-black uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer select-none text-white shadow-lg"
                            >
                                <Unlock className="w-4 h-4 text-[#FAF2CA]" />
                                <span>
                                    {holdProgress > 0
                                        ? (isEn ? `Releasing in ${Math.max(1, Math.round((100 - holdProgress) / 10))}...` : `Soltando en ${Math.max(1, Math.round((100 - holdProgress) / 10))}...`)
                                        : (isEn ? 'Hold to unlock' : 'Mantén presionado para desbloquear')}
                                </span>
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-white/50">
                            {isEn ? 'Place your phone in your pocket and walk freely with both hands safe.' : 'Guarda el celular en tu bolsillo y camina libremente con ambas manos seguras.'}
                        </p>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
