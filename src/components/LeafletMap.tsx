"use client";

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Marker, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet with webpack/nextjs
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

const getVertexIcon = (num: number, isLast: boolean, isStartOnly?: boolean) => {
    if (typeof window === 'undefined') return undefined;
    return L.divIcon({
        className: 'custom-vertex-marker',
        html: `<div style="
            background: ${isStartOnly ? '#83DF9C' : isLast ? '#FAF2CA' : '#83DF9C'};
            color: #0C3C60;
            width: ${isStartOnly ? '26px' : '22px'};
            height: ${isStartOnly ? '26px' : '22px'};
            border-radius: 50%;
            border: 2px solid #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isStartOnly ? '12px' : '10px'};
            font-weight: 900;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 3px 12px rgba(0,0,0,0.7);
        ">${num}</div>`,
        iconSize: isStartOnly ? [26, 26] : [22, 22],
        iconAnchor: isStartOnly ? [13, 13] : [11, 11]
    });
};

interface LeafletMapProps {
    center: [number, number];
    polygonCoords?: [number, number][]; // [lat, lng][]
    markers?: [number, number][]; // [lat, lng][]
    currentLocation?: [number, number] | null;
    recenterKey?: number;
    isCompleted?: boolean;
}

function MapUpdater({ center, polygonCoords, markers, currentLocation, recenterKey }: LeafletMapProps) {
    const map = useMap();
    const hasCenteredInitial = React.useRef(false);
    const lastRecenterKey = React.useRef(recenterKey);

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 200);

        const handleResize = () => {
            map.invalidateSize();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [map]);

    // Handle manual re-center triggered by user pressing "Mi Ubicación"
    useEffect(() => {
        if (recenterKey !== undefined && recenterKey !== lastRecenterKey.current) {
            lastRecenterKey.current = recenterKey;
            const target = currentLocation || center;
            if (target) {
                map.setView(target, 18, { animate: true });
            }
        }
    }, [recenterKey, currentLocation, center, map]);

    // Handle bounds and initial one-time centering
    useEffect(() => {
        if (polygonCoords && polygonCoords.length > 0) {
            const bounds = L.latLngBounds(polygonCoords);
            map.fitBounds(bounds, { padding: [40, 40], animate: false });
        } else if (markers && markers.length > 1) {
            const bounds = L.latLngBounds(markers);
            map.fitBounds(bounds, { padding: [40, 40], maxZoom: 18, animate: false });
        } else if (!hasCenteredInitial.current && (currentLocation || center)) {
            hasCenteredInitial.current = true;
            map.setView(currentLocation || center, 18);
        }
    }, [polygonCoords, markers, currentLocation, center, map]);

    return null;
}

export default function LeafletMap({ center, polygonCoords, markers, currentLocation, recenterKey, isCompleted }: LeafletMapProps) {
    const markerElements = useMemo(() => {
        if (!markers || markers.length === 0) return null;

        // When mapping is completed: show ALL vertices with Point 1 highlighted so the full polygon perimeter is visible
        if (isCompleted) {
            return markers.map((m, i) => {
                const isStart = i === 0;
                const icon = getVertexIcon(i + 1, false, isStart);
                if (!icon) return null;
                return (
                    <Marker key={`vertex-done-${i}-${m[0]}-${m[1]}`} position={m} icon={icon} />
                );
            });
        }

        // While actively walking: show numbered vertices to guide the walk
        return markers.map((m, i) => {
            const isLast = i === markers.length - 1;
            const icon = getVertexIcon(i + 1, isLast);
            if (!icon) return null;
            return (
                <Marker key={`vertex-${i}-${m[0]}-${m[1]}`} position={m} icon={icon} />
            );
        });
    }, [markers, isCompleted]);

    return (
        <MapContainer
            center={center}
            zoom={18}
            preferCanvas={true}
            style={{ width: '100%', height: '100%', background: '#082840' }}
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
                crossOrigin="anonymous"
            />

            {polygonCoords && polygonCoords.length > 0 ? (
                <Polygon
                    positions={polygonCoords}
                    pathOptions={{ 
                        color: '#00E676', 
                        fillColor: '#83DF9C', 
                        fillOpacity: 0.35, 
                        weight: 3.5,
                        dashArray: isCompleted ? undefined : '4, 4',
                        lineJoin: 'round'
                    }}
                />
            ) : markers && markers.length >= 2 ? (
                <Polyline
                    positions={markers}
                    pathOptions={{
                        color: '#00E676',
                        weight: 3,
                        dashArray: '4, 4',
                        lineJoin: 'round'
                    }}
                />
            ) : null}

            {markerElements}

            {currentLocation && (
                <>
                    <CircleMarker 
                        center={currentLocation} 
                        radius={16} 
                        pathOptions={{ color: '#83DF9C', fillColor: '#83DF9C', fillOpacity: 0.35, weight: 2 }} 
                    />
                    <CircleMarker 
                        center={currentLocation} 
                        radius={6} 
                        pathOptions={{ color: '#ffffff', fillColor: '#0C3C60', fillOpacity: 1, weight: 2.5 }} 
                    />
                </>
            )}

            <MapUpdater center={center} polygonCoords={polygonCoords} markers={markers} currentLocation={currentLocation} recenterKey={recenterKey} />
        </MapContainer>
    );
}
