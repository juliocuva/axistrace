'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    X,
    FileText,
    Download,
    CheckCircle2,
    ShieldCheck,
    Share2,
    CreditCard,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Copy,
    Check,
    Coffee,
    AlertTriangle
} from 'lucide-react';
import { CommodityType } from './EUDRGeoreference';
import { generateEUDRCertificatePdf, EUDRCertificateData } from '../utils/pdfGenerator';
import { NequiIcon, BancolombiaIcon } from './PaymentModal';
import { Language } from '@/translations/content';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export interface DeliverableInitialData {
    lotId: string;
    commodity: CommodityType;
    areaHa: number;
    perimeterMeters: number;
    altitudeMeters: number | null;
    vertices: [number, number][]; // [lat, lng]
    uid: string; // Identificador Único Verificable (UID)
    capturedScreenshot: string | null;
    gfwStatus?: 'secure' | 'warning' | 'idle' | 'error' | 'unverified';
}

interface DeliverableModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: DeliverableInitialData;
    lang?: Language;
}

const COMMODITY_OPTIONS: { id: CommodityType; name: string; nameEn: string; icon: string; hsCode: string }[] = [
    { id: 'cafe', name: 'Café', nameEn: 'Coffee', icon: '☕', hsCode: '0901' },
    { id: 'cacao', name: 'Cacao', nameEn: 'Cocoa', icon: '🍫', hsCode: '1801' },
    { id: 'palma', name: 'Palma de Aceite', nameEn: 'Oil Palm', icon: '🌴', hsCode: '1511' },
    { id: 'ganaderia', name: 'Ganadería Bovino', nameEn: 'Cattle & Beef', icon: '🥩', hsCode: '0102' },
    { id: 'madera', name: 'Madera / Forestal', nameEn: 'Wood & Timber', icon: '🪵', hsCode: '4403' },
    { id: 'caucho', name: 'Caucho', nameEn: 'Natural Rubber', icon: '⚪', hsCode: '4001' },
    { id: 'otro', name: 'Otro Rubro EUDR', nameEn: 'Other EUDR Scope', icon: '🌿', hsCode: 'GEN' },
];

const VARIETY_PRESETS: Record<CommodityType, { es: string[]; en: string[] }> = {
    cafe: {
        es: ['Castillo', 'Caturra', 'Colombia', 'Geisha', 'Borbón', 'Cenicafé 1', 'Típica', 'Tabi', 'Maragogipe', 'Otra'],
        en: ['Castillo', 'Caturra', 'Colombia', 'Geisha', 'Bourbon', 'Cenicafe 1', 'Typica', 'Tabi', 'Maragogipe', 'Other']
    },
    cacao: {
        es: ['CCN-51', 'Criollo', 'Trinitario', 'Forastero', 'Clonal', 'Otra'],
        en: ['CCN-51', 'Criollo', 'Trinitario', 'Forastero', 'Clonal', 'Other']
    },
    palma: {
        es: ['Palma Africana', 'Híbrido OxG', 'Elaeis Guineensis', 'Otra'],
        en: ['African Palm', 'OxG Hybrid', 'Elaeis Guineensis', 'Other']
    },
    ganaderia: {
        es: ['Ceba / Engorde', 'Cría', 'Doble Propósito', 'Lechería Especializada', 'Brahman', 'Angus', 'Otra'],
        en: ['Fattening', 'Breeding', 'Dual Purpose', 'Specialized Dairy', 'Brahman', 'Angus', 'Other']
    },
    madera: {
        es: ['Teca', 'Eucalipto', 'Pino Pátula', 'Cedro', 'Acacia', 'Bosque Nativo', 'Otra'],
        en: ['Teak', 'Eucalyptus', 'Patula Pine', 'Cedar', 'Acacia', 'Native Forest', 'Other']
    },
    caucho: {
        es: ['Clon IAN-710', 'Clon FX-3864', 'Látex Centrifugado', 'TSR-20', 'Otra'],
        en: ['IAN-710 Clone', 'FX-3864 Clone', 'Centrifuged Latex', 'TSR-20', 'Other']
    },
    otro: {
        es: ['Estándar', 'Certificado', 'Otra'],
        en: ['Standard', 'Certified', 'Other']
    }
};

export default function DeliverableModal({ isOpen, onClose, data, lang = 'en' }: DeliverableModalProps) {
    const isEn = lang === 'en';
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<'form' | 'checkout'>('form');

    // Form fields
    const [farmerName, setFarmerName] = useState('');
    const [farmerId, setFarmerId] = useState('');
    const [farmerPhone, setFarmerPhone] = useState('');
    const [farmName, setFarmName] = useState('');
    const [lotName, setLotName] = useState(data.lotId || 'LOTE-01');
    const [municipality, setMunicipality] = useState('');
    const [department, setDepartment] = useState('');
    const [country, setCountry] = useState('Colombia');
    const [selectedCommodity, setSelectedCommodity] = useState<CommodityType>(data.commodity || 'cafe');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [customVariety, setCustomVariety] = useState('');

    // Payment tab state
    const [paymentTab, setPaymentTab] = useState<'nequi' | 'bancolombia'>('nequi');
    const [copiedNequi, setCopiedNequi] = useState(false);
    const [copiedBank, setCopiedBank] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    // Data Treatment, Habeas Data & Truthfulness Checklist
    const [consentPersonalData, setConsentPersonalData] = useState(false);
    const [consentGeoCoordinates, setConsentGeoCoordinates] = useState(false);
    const [declarationTruthfulness, setDeclarationTruthfulness] = useState(false);
    const [consentError, setConsentError] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    const allConsentsGranted = consentPersonalData && consentGeoCoordinates && declarationTruthfulness;

    const handleToggleAllConsents = () => {
        const nextVal = !allConsentsGranted;
        setConsentPersonalData(nextVal);
        setConsentGeoCoordinates(nextVal);
        setDeclarationTruthfulness(nextVal);
        if (nextVal) setConsentError(false);
    };

    const handleProceedToStep2 = () => {
        if (!farmerName.trim()) {
            alert(isEn ? 'Please enter the producer name.' : 'Por favor ingresa el nombre del productor.');
            return;
        }
        if (!allConsentsGranted) {
            setConsentError(true);
            return;
        }
        setConsentError(false);
        setStep('checkout');
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (data.commodity) {
            setSelectedCommodity(data.commodity);
        }
        if (data.lotId) {
            setLotName(data.lotId);
        }
    }, [data]);

    if (!isOpen || !isMounted) return null;

    const currentComm = COMMODITY_OPTIONS.find(c => c.id === selectedCommodity) || COMMODITY_OPTIONS[0];
    const finalVariety = selectedVariety === 'Otra' ? (customVariety.trim() || 'Estándar') : (selectedVariety || 'Estándar');

    const handleCopyNequi = () => {
        navigator.clipboard.writeText('3013970002');
        setCopiedNequi(true);
        setTimeout(() => setCopiedNequi(false), 2500);
    };

    const handleCopyBank = () => {
        navigator.clipboard.writeText('70890888702');
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 2500);
    };

    const handleDownloadPdf = async () => {
        setIsGeneratingPdf(true);
        try {
            const now = new Date();
            const dateDisplay = now.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const certData: EUDRCertificateData = {
                farmerName: farmerName.trim(),
                farmerId: farmerId.trim(),
                farmerPhone: farmerPhone.trim(),
                farmName: farmName.trim(),
                lotName: lotName.trim() || 'LOTE-01',
                municipality: municipality.trim(),
                department: department.trim(),
                country: country.trim() || 'Colombia',
                commodityName: currentComm.name,
                commodityCode: currentComm.hsCode,
                variety: finalVariety,
                areaHa: data.areaHa,
                perimeterMeters: data.perimeterMeters,
                altitudeMeters: data.altitudeMeters,
                vertices: data.vertices,
                uid: data.uid,
                timestamp: dateDisplay,
                mapScreenshotUrl: data.capturedScreenshot,
                gfwStatus: data.gfwStatus,
                lang: lang || 'en'
            };

            await generateEUDRCertificatePdf(certData);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Ocurrió un error generando el PDF. Intenta de nuevo.');
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const handleDownloadGeoJson = () => {
        const polyCoords = [...data.vertices, data.vertices[0]].map(c => [c[1], c[0]]); // [lng, lat]
        const geoJsonObj = {
            type: 'FeatureCollection',
            name: `AXISTRACE_${lotName.replace(/\s+/g, '_')}_${currentComm.name.toUpperCase()}`,
            features: [
                {
                    type: 'Feature',
                    properties: {
                        LotIdentifier: lotName || 'LOTE-01',
                        Producer: farmerName || 'Sin Registrar',
                        ProducerDocumentId: farmerId || 'N/A',
                        Farm: farmName || 'Finca Principal',
                        Municipality: municipality || 'N/A',
                        Department: department || 'N/A',
                        Country: country || 'Colombia',
                        Commodity: currentComm.name,
                        CommodityHsCode: currentComm.hsCode,
                        Variety: finalVariety,
                        AreaHectares: data.areaHa,
                        PerimeterMeters: data.perimeterMeters,
                        AltitudeMsnm: data.altitudeMeters,
                        IdentificadorUnicoVerificable_UID: data.uid,
                        EUDRCompliance: 'Regulation EU 2023/1115 TRACES NT Compliant',
                        DeforestationStatus: '0.00 ha post-2020 (Verified)',
                        HabeasDataConsent: consentPersonalData ? 'Authorized (Ley Estatutaria 1581/2012)' : 'Pending',
                        CoordinatesTransferConsent: consentGeoCoordinates ? 'Authorized for EUDR TRACES NT' : 'Pending',
                        ProducerTruthfulnessDeclaration: declarationTruthfulness ? 'Confirmed under oath' : 'Pending',
                        IssuedBy: 'AxisTrace - mouselab.dev'
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: [polyCoords]
                    }
                }
            ]
        };

        const blob = new Blob([JSON.stringify(geoJsonObj, null, 2)], { type: 'application/geo+json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AXISTRACE_EUDR_${lotName.replace(/\s+/g, '_')}.geojson`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleShareWhatsApp = () => {
        const message = isEn
            ? `🌲 *FIRST-MILE EUDR GEOREFERENCING REPORT (AXISTRACE)* 🌲%0A` +
              `-------------------------------------------%0A` +
              `👤 *Producer:* ${farmerName || 'Unregistered'} (ID: ${farmerId || 'N/A'})%0A` +
              `🏡 *Farm/Lot:* ${farmName || 'Holding'} • ${lotName}%0A` +
              `📍 *Location:* ${municipality || 'Municipality'}, ${department || 'Region'} - ${country}%0A` +
              `🌱 *Crop:* ${currentComm.icon} ${isEn && currentComm.nameEn ? currentComm.nameEn : currentComm.name} (HS: ${currentComm.hsCode})%0A` +
              `🌿 *Variety:* ${finalVariety}%0A` +
              `📐 *Area:* ${data.areaHa} ha (≈ ${Math.round(data.areaHa * 10000).toLocaleString('en-US')} m²)%0A` +
              `📏 *Perimeter:* ${data.perimeterMeters} m%0A` +
              `🏔️ *Altitude:* ${data.altitudeMeters ? `${data.altitudeMeters.toLocaleString('en-US')} masl` : 'GNSS Logged'}%0A` +
              `🛡️ *2020 Satellite Check:* ${data.gfwStatus === 'secure' ? 'No forest loss detected (post-2020)' : data.gfwStatus === 'warning' ? 'Alert: Loss detected' : 'Unverified (pending)'}%0A` +
              `🔑 *Integrity Identifier (UID):*%0A${data.uid}%0A` +
              `-------------------------------------------%0A` +
              `✅ *TRACES NT Compatible Format (European Union)*%0A` +
              `⚠️ *Notice:* Technical first-mile pre-validation. Does not replace official SICA registry nor operator due diligence.%0A` +
              `Designed by mouselab.dev for AxisTrace`
            : `🌲 *INFORME DE GEORREFERENCIACIÓN PREVIA EUDR (AXISTRACE)* 🌲%0A` +
              `-------------------------------------------%0A` +
              `👤 *Productor:* ${farmerName || 'Sin Registrar'} (ID: ${farmerId || 'N/A'})%0A` +
              `🏡 *Finca/Lote:* ${farmName || 'Predio'} • ${lotName}%0A` +
              `📍 *Ubicación:* ${municipality || 'Municipio'}, ${department || 'Depto'} - ${country}%0A` +
              `🌱 *Cultivo:* ${currentComm.icon} ${currentComm.name} (HS: ${currentComm.hsCode})%0A` +
              `🌿 *Variedad:* ${finalVariety}%0A` +
              `📐 *Área:* ${data.areaHa} ha (≈ ${Math.round(data.areaHa * 10000).toLocaleString('es-CO')} m²)%0A` +
              `📏 *Perímetro:* ${data.perimeterMeters} m%0A` +
              `🏔️ *Altitud:* ${data.altitudeMeters ? `${data.altitudeMeters.toLocaleString('es-CO')} msnm` : 'Registrada por GPS'}%0A` +
              `🛡️ *Consulta Satelital 2020:* ${data.gfwStatus === 'secure' ? 'Sin pérdida detectada post-2020' : data.gfwStatus === 'warning' ? 'ALERTA: Pérdida detectada' : 'No verificado (pendiente)'}%0A` +
              `🔑 *Identificador de Integridad (UID):*%0A${data.uid}%0A` +
              `-------------------------------------------%0A` +
              `✅ *Formato compatible con TRACES NT (Unión Europea)*%0A` +
              `⚠️ *Aviso:* Apoyo técnico de primera milla. No reemplaza el registro del SICA ni la debida diligencia del operador (Reglamento UE 2023/1115).%0A` +
              `Diseñado por mouselab.dev para AxisTrace`;

        window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    };

    return createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in overflow-y-auto">
            <div className="bg-[#082840] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#83DF9C]/30 shadow-2xl flex flex-col text-white animate-in zoom-in-95">
                {/* Modal Header */}
                <div className="p-4 sm:p-5 bg-[#0C3C60] rounded-t-3xl border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#83DF9C]/20 border border-[#83DF9C]/40 flex items-center justify-center text-[#83DF9C] shrink-0">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#83DF9C] block">
                                {isEn ? 'First-Mile EUDR 2023/1115 Dossier' : 'Expediente de Primera Milla EUDR 2023/1115'}
                            </span>
                            <h3 className="text-sm sm:text-base font-black text-white">
                                {step === 'form'
                                    ? (isEn ? '1. Producer & Holding Details' : '1. Datos del Productor & Predio')
                                    : (isEn ? '2. Report Downloads & GeoJSON' : '2. Descarga del Informe & GeoJSON')}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                        title={isEn ? 'Close modal' : 'Cerrar ventana'}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 space-y-5">
                    {step === 'form' ? (
                        /* STEP 1: FORMULARIO DEL PRODUCTOR Y PREDIO */
                        <div className="space-y-4">
                            {/* Commodity Multi-crop Selector */}
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-wider text-[#FAF2CA] mb-1.5">
                                    {isEn ? 'Commodity / Crop to Certify:' : 'Rubro o Cultivo a Certificar:'}
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                    {COMMODITY_OPTIONS.map(c => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCommodity(c.id);
                                                setSelectedVariety('');
                                            }}
                                            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                                                selectedCommodity === c.id
                                                    ? 'bg-[#83DF9C] text-[#0C3C60] border-[#83DF9C] shadow-md font-black'
                                                    : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
                                            }`}
                                        >
                                            <span className="text-sm">{c.icon}</span>
                                            <span className="truncate">{isEn ? c.nameEn : c.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variety Selector */}
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-wider text-[#FAF2CA] mb-1.5">
                                    {isEn
                                        ? `Variety / Cultivar Spec (${currentComm.nameEn}):`
                                        : `Variedad / Varietal / Tipo (${currentComm.name}):`}
                                </label>
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {VARIETY_PRESETS[selectedCommodity][isEn ? 'en' : 'es'].map(v => (
                                        <button
                                            key={v}
                                            type="button"
                                            onClick={() => setSelectedVariety(v)}
                                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                                                selectedVariety === v
                                                    ? 'bg-[#83DF9C] text-[#0C3C60] border-[#83DF9C] font-black'
                                                    : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
                                            }`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                                {(selectedVariety === 'Otra' || selectedVariety === 'Other') && (
                                    <input
                                        type="text"
                                        value={customVariety}
                                        onChange={e => setCustomVariety(e.target.value)}
                                        placeholder={isEn ? 'Type custom variety or species...' : 'Escribe la variedad o especie...'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                )}
                            </div>

                            {/* Farmer & Lot Info Form Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'Producer / Farmer Full Name:' : 'Nombre del Productor / Caficultor:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={farmerName}
                                        onChange={e => setFarmerName(e.target.value)}
                                        placeholder={isEn ? 'e.g., Julio Moiso' : 'Ej: Julio Moiso'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'National ID / Tax Number / Passport:' : 'Cédula / Documento de Identidad:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={farmerId}
                                        onChange={e => setFarmerId(e.target.value)}
                                        placeholder={isEn ? 'e.g., ID 10.987.654' : 'Ej: CC 10.987.654'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'Farm / Holding Name:' : 'Nombre de la Finca / Predio:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={farmName}
                                        onChange={e => setFarmName(e.target.value)}
                                        placeholder={isEn ? 'e.g., Finca Don Moiso' : 'Ej: Finca Don Moiso'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'Lot / Parcel Identifier:' : 'Nombre del Lote / Parcela:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={lotName}
                                        onChange={e => setLotName(e.target.value)}
                                        placeholder={isEn ? 'e.g., LOT-MOISO-01' : 'Ej: LOT-MOISO-01'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'Municipality / County:' : 'Municipio:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={municipality}
                                        onChange={e => setMunicipality(e.target.value)}
                                        placeholder={isEn ? 'e.g., Pereira / Chinchina' : 'Ej: Pereira / Chinchiná'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'Department / State / Region:' : 'Departamento / Región:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={department}
                                        onChange={e => setDepartment(e.target.value)}
                                        placeholder={isEn ? 'e.g., Risaralda / Caldas' : 'Ej: Risaralda / Caldas'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                                        {isEn ? 'Contact Phone / WhatsApp:' : 'Teléfono / WhatsApp de Contacto:'}
                                    </label>
                                    <input
                                        type="text"
                                        value={farmerPhone}
                                        onChange={e => setFarmerPhone(e.target.value)}
                                        placeholder={isEn ? 'e.g., +57 310 123 4567' : 'Ej: +57 310 123 4567'}
                                        className="w-full bg-[#0C3C60] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#83DF9C]"
                                    />
                                </div>
                            </div>

                            {/* CHECKLIST DE TRATAMIENTO DE DATOS & HABEAS DATA */}
                            <div className={`p-4 rounded-2xl border transition-all ${consentError ? 'bg-amber-500/10 border-amber-500/60 ring-2 ring-amber-500/30' : 'bg-[#0C3C60]/70 border-white/15'}`}>
                                <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                                        <h4 className="text-xs font-black uppercase tracking-wider text-[#83DF9C]">
                                            {isEn ? 'Data Treatment & EUDR Consent Checklist' : 'Checklist de Tratamiento de Datos y Autorizaciones EUDR'}
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleToggleAllConsents}
                                        className="text-[10px] font-bold text-[#FAF2CA] hover:text-white underline cursor-pointer"
                                    >
                                        {allConsentsGranted
                                            ? (isEn ? 'Deselect all' : 'Desmarcar todo')
                                            : (isEn ? 'Accept all (Quick)' : 'Aceptar todo (Rápido)')}
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {/* Item 1: Personal Data / Habeas Data */}
                                    <label className="flex items-start gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={consentPersonalData}
                                            onChange={e => {
                                                setConsentPersonalData(e.target.checked);
                                                if (e.target.checked && consentGeoCoordinates && declarationTruthfulness) setConsentError(false);
                                            }}
                                            className="mt-0.5 w-4 h-4 rounded border-white/30 text-[#83DF9C] focus:ring-[#83DF9C] bg-[#082840] cursor-pointer shrink-0"
                                        />
                                        <div className="text-[11px] leading-tight text-white/90">
                                            <span className="font-bold text-white block">
                                                {isEn ? '1. Personal Data Treatment (Habeas Data):' : '1. Tratamiento de Datos Personales (Habeas Data - Ley 1581/2012):'}
                                            </span>
                                            <span className="text-white/70 text-[10px]">
                                                {isEn
                                                    ? 'I authorize the collection and processing of identification and contact data for technical dossier issuance and traceability.'
                                                    : 'Autorizo de manera previa, expresa e informada a AxisTrace el tratamiento de mis datos de identificación y contacto para la expedición del informe y trazabilidad técnica.'}
                                            </span>
                                        </div>
                                    </label>

                                    {/* Item 2: Geolocation & EUDR Coordinates */}
                                    <label className="flex items-start gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={consentGeoCoordinates}
                                            onChange={e => {
                                                setConsentGeoCoordinates(e.target.checked);
                                                if (consentPersonalData && e.target.checked && declarationTruthfulness) setConsentError(false);
                                            }}
                                            className="mt-0.5 w-4 h-4 rounded border-white/30 text-[#83DF9C] focus:ring-[#83DF9C] bg-[#082840] cursor-pointer shrink-0"
                                        />
                                        <div className="text-[11px] leading-tight text-white/90">
                                            <span className="font-bold text-white block">
                                                {isEn ? '2. Geolocation Coordinates Transfer (EUDR 2023/1115):' : '2. Tratamiento y Transferencia de Coordenadas EUDR:'}
                                            </span>
                                            <span className="text-white/70 text-[10px]">
                                                {isEn
                                                    ? 'I authorize capturing plot coordinates for satellite baseline screening and submission to operators, buyers, and EU TRACES NT.'
                                                    : 'Autorizo la captura de coordenadas de mi predio para análisis satelital y transferencia a cooperativas, exportadores, compradores y la plataforma TRACES NT de la Unión Europea.'}
                                            </span>
                                        </div>
                                    </label>

                                    {/* Item 3: Truthfulness & Legitimate Tenure Declaration */}
                                    <label className="flex items-start gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={declarationTruthfulness}
                                            onChange={e => {
                                                setDeclarationTruthfulness(e.target.checked);
                                                if (consentPersonalData && consentGeoCoordinates && e.target.checked) setConsentError(false);
                                            }}
                                            className="mt-0.5 w-4 h-4 rounded border-white/30 text-[#83DF9C] focus:ring-[#83DF9C] bg-[#082840] cursor-pointer shrink-0"
                                        />
                                        <div className="text-[11px] leading-tight text-white/90">
                                            <span className="font-bold text-white block">
                                                {isEn ? '3. Truthfulness & Legitimate Tenure Declaration:' : '3. Declaración de Tenencia Legítima y Veracidad:'}
                                            </span>
                                            <span className="text-white/70 text-[10px]">
                                                {isEn
                                                    ? 'I declare under oath that the recorded perimeter corresponds to the actual physical boundary of the legitimately held productive parcel.'
                                                    : 'Declaro bajo gravedad de juramento que la información suministrada es veraz y que el polígono perimetral corresponde a los linderos reales de la parcela productiva legítimamente ocupada.'}
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                {/* Warning message if unconfirmed */}
                                {consentError && (
                                    <div className="mt-3 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-2 animate-in fade-in">
                                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                        <span>
                                            {isEn
                                                ? 'Legal requirement: You must confirm all three authorizations (Personal Data, Coordinates Transfer, and Truthfulness Declaration) to generate the dossier.'
                                                : 'Requisito legal: Debes aceptar las tres autorizaciones (Habeas Data, Transferencia de Coordenadas y Veracidad) para generar el expediente técnico.'}
                                        </span>
                                    </div>
                                )}

                                {/* Link to full legal policy */}
                                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                                    <span className="text-white/60">
                                        {isEn ? 'Law 1581/2012 & Regulation (EU) 2023/1115' : 'Ley 1581 de 2012 & Reglamento (UE) 2023/1115'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setPrivacyModalOpen(true)}
                                        className="text-[#83DF9C] hover:text-[#9cf0b3] underline font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                        <FileText className="w-3 h-3" />
                                        <span>{isEn ? 'Read Full Privacy Policy' : 'Ver Política Completa de Datos'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="button"
                                onClick={handleProceedToStep2}
                                className="w-full bg-[#83DF9C] hover:bg-[#6fd48b] active:scale-98 text-[#0C3C60] py-3.5 px-4 rounded-xl font-black uppercase text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                            >
                                <span>{isEn ? 'Continue to Activation & Download' : 'Continuar a Generación & Pago'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        /* STEP 2: RESUMEN, ACTIVACIÓN Y DESCARGAS */
                        <div className="space-y-4">
                            {/* Summary Card */}
                            <div className="bg-[#0C3C60]/70 p-3.5 rounded-2xl border border-white/15 space-y-2 text-xs">
                                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                    <div>
                                        <span className="font-black text-[#83DF9C] uppercase text-sm block">
                                            {currentComm.icon} {isEn ? currentComm.nameEn : currentComm.name} • {finalVariety}
                                        </span>
                                        <span className="text-[11px] text-white/70 font-bold">
                                            {farmName || (isEn ? 'Farm' : 'Finca')} • {lotName || 'Lote 01'} ({municipality || (isEn ? 'Municipality' : 'Municipio')})
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setStep('form')}
                                        className="text-[10px] text-[#FAF2CA] underline font-bold cursor-pointer hover:text-white"
                                    >
                                        {isEn ? 'Edit Details' : 'Editar Datos'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                                    <div>
                                        <span className="text-white/50 block text-[9px] uppercase font-bold">{isEn ? 'Area:' : 'Área:'}</span>
                                        <span className="font-mono font-black text-[#83DF9C]">{data.areaHa} ha ({Math.round(data.areaHa * 10000).toLocaleString(isEn ? 'en-US' : 'es-CO')} m²)</span>
                                    </div>
                                    <div>
                                        <span className="text-white/50 block text-[9px] uppercase font-bold">{isEn ? 'Perimeter:' : 'Perímetro:'}</span>
                                        <span className="font-mono font-bold text-white">{data.perimeterMeters} m</span>
                                    </div>
                                    <div>
                                        <span className="text-white/50 block text-[9px] uppercase font-bold">{isEn ? 'Vertices:' : 'Vértices:'}</span>
                                        <span className="font-mono font-bold text-white">{data.vertices.length} {isEn ? 'points' : 'puntos'}</span>
                                    </div>
                                    <div>
                                        <span className="text-white/50 block text-[9px] uppercase font-bold">{isEn ? 'Producer:' : 'Productor:'}</span>
                                        <span className="font-bold text-white truncate block">{farmerName || (isEn ? 'Unregistered' : 'Sin Registrar')}</span>
                                    </div>
                                </div>

                                {/* Identificador Único Verificable (UID) */}
                                <div className="bg-black/30 p-2 rounded-xl border border-white/10 mt-2">
                                    <span className="text-[9px] uppercase font-bold text-[#83DF9C] block">
                                        {isEn ? 'Unique Identifier (UID):' : 'Identificador Único Verificable (UID):'}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/80 break-all select-all">
                                        {data.uid}
                                    </span>
                                </div>
                            </div>

                            {/* DOWNLOAD ACTION BUTTONS */}
                            <div className="space-y-2">
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGeneratingPdf}
                                    className="w-full bg-[#83DF9C] hover:bg-[#6fd48b] active:scale-98 text-[#0C3C60] py-4 px-4 rounded-2xl font-black uppercase text-xs sm:text-sm tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>{isGeneratingPdf ? (isEn ? 'Generating Report...' : 'Generando Informe...') : (isEn ? 'Download Georeferencing PDF Report' : 'Descargar Informe PDF de Georreferenciación')}</span>
                                </button>

                                {/* Institutional Notice Disclaimer */}
                                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-200/90 leading-relaxed">
                                    <span className="font-bold text-amber-300">
                                        {isEn ? 'Institutional Notice: ' : 'Aviso Institucional: '}
                                    </span>
                                    {isEn 
                                        ? 'First-mile pre-validation tool. Does not replace official institutional registries (such as SICA for coffee in Colombia) or operator due diligence under EUDR.'
                                        : 'Herramienta de primera milla y validación previa. No reemplaza el reporte oficial del SICA (FNC) ni la debida diligencia del operador (Reglamento UE 2023/1115).'}
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={handleDownloadGeoJson}
                                        className="w-full bg-[#0C3C60] hover:bg-[#164e78] active:scale-98 text-white py-3 px-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] tracking-wider transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <FileText className="w-4 h-4 text-[#83DF9C]" />
                                        <span>TRACES NT GeoJSON</span>
                                    </button>

                                    <button
                                        onClick={handleShareWhatsApp}
                                        className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-98 text-white py-3 px-3 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        <span>{isEn ? 'Share on WhatsApp' : 'Compartir WhatsApp'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* PAYMENT / ACTIVATION BOX */}
                            <div className="bg-gradient-to-b from-[#0C3C60] to-[#082840] p-4 rounded-2xl border border-[#83DF9C]/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                                        <span className="text-xs font-black uppercase text-[#FAF2CA] tracking-wider">
                                            {isEn ? 'Lot Dossier Activation' : 'Activación del Expediente de Lote'}
                                        </span>
                                    </div>
                                    <span className="text-xs font-black text-[#83DF9C] font-mono">
                                        $25 USD (~ 100.000 COP)
                                    </span>
                                </div>

                                <div className="flex rounded-xl bg-black/40 p-1 gap-1 border border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentTab('nequi')}
                                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                            paymentTab === 'nequi' ? 'bg-[#83DF9C] text-[#0C3C60] font-black' : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        <NequiIcon className="w-4 h-4" />
                                        <span>Nequi</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentTab('bancolombia')}
                                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                            paymentTab === 'bancolombia' ? 'bg-[#83DF9C] text-[#0C3C60] font-black' : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        <BancolombiaIcon className="w-4 h-4" />
                                        <span>Bancolombia</span>
                                    </button>
                                </div>

                                {paymentTab === 'nequi' ? (
                                    <div className="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/10 text-xs">
                                        <div>
                                            <span className="text-[10px] text-white/50 block">{isEn ? 'Nequi Number:' : 'Número Nequi:'}</span>
                                            <span className="font-mono font-black text-white text-sm">301 397 0002</span>
                                        </div>
                                        <button
                                            onClick={handleCopyNequi}
                                            className="px-2.5 py-1.5 rounded-lg bg-[#83DF9C] text-[#0C3C60] font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer"
                                        >
                                            {copiedNequi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            <span>{copiedNequi ? (isEn ? 'Copied' : 'Copiado') : (isEn ? 'Copy' : 'Copiar')}</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/10 text-xs">
                                        <div>
                                            <span className="text-[10px] text-white/50 block">{isEn ? 'Bancolombia Savings Account:' : 'Cta. Ahorros Bancolombia:'}</span>
                                            <span className="font-mono font-black text-white text-sm">7089 0888702</span>
                                        </div>
                                        <button
                                            onClick={handleCopyBank}
                                            className="px-2.5 py-1.5 rounded-lg bg-[#83DF9C] text-[#0C3C60] font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer"
                                        >
                                            {copiedBank ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            <span>{copiedBank ? (isEn ? 'Copied' : 'Copiado') : (isEn ? 'Copy' : 'Copiar')}</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep('form')}
                                className="w-full py-2 text-center text-xs font-bold text-white/60 hover:text-white uppercase flex items-center justify-center gap-1 cursor-pointer"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>{isEn ? 'Back to Edit Holding Details' : 'Volver a Editar Datos del Predio'}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Privacy Policy & Data Treatment Modal */}
            <PrivacyPolicyModal
                isOpen={privacyModalOpen}
                onClose={() => setPrivacyModalOpen(false)}
                lang={lang}
            />
        </div>,
        document.body
    );
}
