'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EUDRGeoreference, { CommodityType } from '@/components/EUDRGeoreference';
import { ShieldCheck, Compass, Satellite, Sparkles, HelpCircle, ArrowLeft, ExternalLink } from 'lucide-react';

function AxisTraceApp() {
    const searchParams = useSearchParams();
    const lotId = searchParams.get('lotId') || searchParams.get('lote') || undefined;
    const cropParam = (searchParams.get('crop') || searchParams.get('commodity') || 'cafe').toLowerCase();
    const returnUrl = searchParams.get('returnUrl') || searchParams.get('callback');
    const farmer = searchParams.get('farmer') || searchParams.get('productor');

    const validCommodities: CommodityType[] = ['cafe', 'cacao', 'palma', 'caucho', 'madera', 'ganaderia', 'otro'];
    const initialCommodity: CommodityType = validCommodities.includes(cropParam as CommodityType)
        ? (cropParam as CommodityType)
        : 'cafe';

    return (
        <div className="min-h-screen bg-[#082840] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60]">
            {/* Top Brand Header */}
            <header className="sticky top-0 z-40 bg-[#082840]/90 backdrop-blur-md border-b border-[#0C3C60]/60 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {returnUrl && (
                            <a
                                href={returnUrl}
                                className="p-2 -ml-2 rounded-xl bg-[#0C3C60]/50 hover:bg-[#0C3C60] text-[#FAF2CA] transition-colors flex items-center gap-1.5 text-xs font-bold"
                                title="Volver al sistema de origen"
                            >
                                <ArrowLeft className="w-4 h-4 text-[#83DF9C]" />
                                <span className="hidden sm:inline">Volver</span>
                            </a>
                        )}
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#83DF9C] to-[#0C3C60] flex items-center justify-center p-0.5 shadow-lg shadow-[#83DF9C]/10">
                                <div className="w-full h-full bg-[#082840] rounded-[10px] flex items-center justify-center">
                                    <Compass className="w-5 h-5 text-[#83DF9C]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-black tracking-tight text-white">
                                        Axis<span className="text-[#83DF9C]">Trace</span>
                                    </span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30">
                                        EUDR 2023/1115
                                    </span>
                                </div>
                                <p className="text-[11px] text-[#FAF2CA]/60 font-medium hidden sm:block">
                                    Infraestructura de Caminata Digital & Trazabilidad de Primera Milla
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side info / tags */}
                    <div className="flex items-center gap-2">
                        {lotId && (
                            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C3C60]/80 border border-[#83DF9C]/20 text-[11px]">
                                <span className="text-[#FAF2CA]/60">Lote:</span>
                                <span className="font-bold text-[#83DF9C]">{lotId}</span>
                                {farmer && <span className="text-[#FAF2CA]/40">({farmer})</span>}
                            </div>
                        )}
                        <a
                            href="#compliance-info"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-semibold text-[#FAF2CA] transition-colors"
                        >
                            <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                            <span className="hidden sm:inline">Estándar EUDR</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Operational Container */}
            <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col">
                <EUDRGeoreference
                    lotId={lotId}
                    initialCommodity={initialCommodity}
                />

                {/* Compliance & Technical Foundation Section */}
                <section id="compliance-info" className="mt-10 mb-8 pt-8 border-t border-[#0C3C60]/60">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-[#83DF9C]" />
                                Validez Legal & Especificaciones Técnicas EUDR
                            </h2>
                            <p className="text-xs text-[#FAF2CA]/70 mt-1">
                                Alineado 100% con los estándares de TRACES NT y los requisitos de la Comisión Europea
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 flex flex-col">
                            <div className="w-8 h-8 rounded-lg bg-[#83DF9C]/10 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Satellite className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-white mb-1.5">Estándar IETF RFC 7946</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                Generación nativa de polígonos GeoJSON con orden estricto de coordenadas <code className="text-[#83DF9C] bg-[#082840] px-1 py-0.5 rounded">[longitud, latitud]</code>, anillo lineal cerrado (<code className="text-[#83DF9C]">primer vértice === último vértice</code>) y proyección WGS84 CRS84.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 flex flex-col">
                            <div className="w-8 h-8 rounded-lg bg-[#83DF9C]/10 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-white mb-1.5">Sello Criptográfico SHA-256</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                Cada lote sellado produce un hash criptográfico inmutable basado en la secuencia exacta de vértices, marcas temporales (ISO 8601 UTC) y metadatos de recolección en campo, impidiendo alteraciones posteriores.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 flex flex-col">
                            <div className="w-8 h-8 rounded-lg bg-[#83DF9C]/10 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Compass className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-white mb-1.5">Filtro de Inercia & Paso Humano</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                Detección de velocidad y aceleración por deadband filtering (&lt;1.2m) y rechazo de rebotes GNSS (&gt;35m), asegurando que el polígono represente una caminata perimetral verídica y no un trazado sintético.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-[#0C3C60]/20 border border-[#0C3C60]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="text-[#FAF2CA]/80">
                            <span className="font-bold text-[#83DF9C]">Tolerancia Métrica Oficial:</span> La Comisión Europea y TRACES NT operan con resolución satelital Sentinel-2 (10x10 metros por píxel). AxisTrace entrega precisión submétrica a decamétrica de alta fidelidad para debida diligencia.
                        </div>
                        <div className="text-right whitespace-nowrap">
                            <span className="text-[11px] text-[#FAF2CA]/50">RFC 7946 | OGC:1.3:CRS84</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#0C3C60]/60 bg-[#082840] py-6 px-4 text-center text-xs text-[#FAF2CA]/50">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-white">AxisTrace</span>
                        <span>•</span>
                        <span>axistrace.app</span>
                        <span>•</span>
                        <span>Todos los derechos reservados</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#83DF9C] font-semibold">Diseñado para la Primera Milla Agrícola</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#082840] flex items-center justify-center text-[#FAF2CA]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#83DF9C] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-semibold text-[#83DF9C] uppercase tracking-wider">Cargando AxisTrace...</p>
                </div>
            </div>
        }>
            <AxisTraceApp />
        </Suspense>
    );
}
