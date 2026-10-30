'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Compass, 
    ShieldCheck, 
    Satellite, 
    ArrowRight, 
    CheckCircle2, 
    Lock, 
    Coffee, 
    TreePine, 
    Sparkles, 
    Layers, 
    Globe, 
    Zap,
    Download,
    XCircle,
    FileText,
    Users,
    Smartphone,
    PlusCircle
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#061826] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60] font-sans overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#00594C]/25 rounded-full blur-[130px]" />
                <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#0C3C60]/35 rounded-full blur-[150px]" />
                <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#83DF9C]/10 rounded-full blur-[130px]" />
            </div>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-[#061826]/80 backdrop-blur-xl border-b border-[#0C3C60]/50 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-9 relative flex items-center">
                            <Image
                                src="/logo-axistrace-light.svg"
                                alt="AxisTrace Logo"
                                width={150}
                                height={48}
                                className="h-9 w-auto object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <a href="#planes" className="hidden sm:inline text-xs font-semibold text-[#FAF2CA]/80 hover:text-[#83DF9C] transition-colors">
                            Planes & Precios
                        </a>
                        <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] border border-[#83DF9C]/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#83DF9C] animate-pulse" />
                            Reglamento (UE) 2023/1115
                        </span>
                        <Link
                            href="/terminal"
                            className="px-4 py-2 rounded-xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#061826] font-bold text-xs shadow-md shadow-[#83DF9C]/20 hover:scale-[1.02] transition-all flex items-center gap-1.5"
                        >
                            <Compass className="w-4 h-4" />
                            <span>Abrir Terminal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-16 sm:pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C3C60]/60 border border-[#83DF9C]/30 text-[#83DF9C] text-xs font-semibold mb-6">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Validación Oficial para TRACES NT</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                        Georreferenciación EUDR. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#83DF9C] via-[#FAF2CA] to-[#83DF9C]">
                            De la Finca al Puerto Europeo.
                        </span>
                    </h1>

                    {/* Short Subtitle */}
                    <p className="mt-5 text-sm sm:text-base md:text-lg text-[#FAF2CA]/75 max-w-2xl leading-relaxed">
                        Captura polígonos perimetrales inmutables en campo <strong>100% offline</strong> y genera expedientes GeoJSON sellados con SHA-256 para tus cosechas.
                    </p>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                        <Link
                            href="/terminal"
                            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#061826] font-black text-sm shadow-xl shadow-[#83DF9C]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            <Compass className="w-4 h-4 text-[#061826]" />
                            <span>Iniciar Terminal de Campo</span>
                            <ArrowRight className="w-4 h-4 text-[#061826]" />
                        </Link>
                        <a
                            href="#planes"
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0C3C60]/40 hover:bg-[#0C3C60]/70 border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] transition-all flex items-center justify-center"
                        >
                            Ver Planes & Precios
                        </a>
                    </div>

                    {/* Quick Stat Pills */}
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-3 text-xs text-[#FAF2CA]/70">
                        <span className="px-3 py-1.5 rounded-lg bg-[#082840]/60 border border-[#0C3C60]/60 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-[#83DF9C]" /> 100% Offline
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-[#082840]/60 border border-[#0C3C60]/60 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-[#83DF9C]" /> Sello SHA-256
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-[#082840]/60 border border-[#0C3C60]/60 flex items-center gap-1.5">
                            <Satellite className="w-3.5 h-3.5 text-[#83DF9C]" /> Sentinel-2 Ready
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-[#082840]/60 border border-[#0C3C60]/60 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" /> IETF RFC 7946
                        </span>
                    </div>
                </div>
            </section>

            {/* 3 PILARES VISUALES */}
            <section id="caracteristicas" className="relative z-10 py-12 px-4 border-t border-[#0C3C60]/50 bg-[#082840]/30">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* 1 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] font-black mb-4">
                                01
                            </div>
                            <h3 className="text-base font-bold text-white mb-1.5">Caminata Digital Offline</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                Recorre la parcela con el celular en el bolsillo. Captura de coordenadas automática sin señal móvil ni gasto de datos.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] font-black mb-4">
                                02
                            </div>
                            <h3 className="text-base font-bold text-white mb-1.5">Filtro Antifraude GNSS</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                Algoritmo de inercia humana que descarta rebotes satelitales y previene polígonos dibujados a mano en escritorio.
                            </p>
                        </div>

                        {/* 3 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] font-black mb-4">
                                03
                            </div>
                            <h3 className="text-base font-bold text-white mb-1.5">Sellado Criptográfico</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                Hash inalterable con fecha UTC, productor y vértices para auditorías directas en el portal TRACES NT de la UE.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN PLANES & PRECIOS (AUTOSERVICIO SAAS) */}
            <section id="planes" className="relative z-10 py-16 sm:py-24 px-4 bg-gradient-to-b from-[#061826] via-[#082840]/50 to-[#061826] border-t border-[#0C3C60]/50">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/25">
                            Modelo 100% Autoservicio (SaaS)
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">
                            Planes Transparentes por Predio
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-[#FAF2CA]/75">
                            Tú o tus operarios caminan la finca con su propio teléfono. Paga únicamente por predio procesado, sin suscripciones forzosas.
                        </p>
                    </div>

                    {/* Pricing Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        
                        {/* Plan 1: Auditoría Satelital */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0C3C60]/50 border border-[#0C3C60] flex items-center justify-center text-[#83DF9C]">
                                        <Satellite className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0C3C60]/60 text-[#FAF2CA]/70 border border-[#0C3C60]">
                                        Sin caminata
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Auditoría Satelital</h3>
                                <p className="text-xs text-[#FAF2CA]/65 mb-6">
                                    Para predios con coordenadas o cartografía previa.
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#0C3C60]/60">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-white">$10</span>
                                        <span className="text-xs text-[#FAF2CA]/60 font-semibold">USD / predio</span>
                                    </div>
                                    <div className="text-[11px] text-[#83DF9C] font-medium mt-0.5">
                                        ~ $40.000 COP
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#FAF2CA]/80">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Reparación topológica del polígono</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Cruce satelital línea base bosque post-2020</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>GeoJSON válido TRACES NT + PDF oficial</span>
                                    </li>
                                </ul>
                            </div>

                            <Link
                                href="/terminal"
                                className="mt-8 w-full py-2.5 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] hover:text-white text-center transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>Auditar Coordenadas</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Plan 2: Pase Caminata Digital (Destacado) */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0C3C60]/70 via-[#082840]/90 to-[#082840] border-2 border-[#83DF9C] shadow-xl shadow-[#83DF9C]/10 flex flex-col justify-between relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#83DF9C] text-[#061826] text-[10px] font-black uppercase tracking-wider shadow">
                                Más Popular en Finca
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 border border-[#83DF9C]/30 flex items-center justify-center text-[#83DF9C]">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30">
                                        1 a 5 Hectáreas
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Pase Caminata Digital</h3>
                                <p className="text-xs text-[#FAF2CA]/65 mb-6">
                                    Autoservicio en terreno con el celular del operario.
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#0C3C60]/60">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-[#83DF9C]">$25</span>
                                        <span className="text-xs text-[#FAF2CA]/60 font-semibold">USD / lote base</span>
                                    </div>
                                    <div className="text-[11px] text-[#FAF2CA]/75 font-medium mt-0.5">
                                        ~ $100.000 COP
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#FAF2CA]/90">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Modo bolsillo con firma inercial antifraude</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Cruce satelital Sentinel-2 post-2020</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Ficha cartográfica Oficio 300 DPI con QR</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>GeoJSON RFC 7946 sellado SHA-256</span>
                                    </li>
                                </ul>
                            </div>

                            <Link
                                href="/terminal"
                                className="mt-8 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#061826] font-black text-xs text-center shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                            >
                                <Compass className="w-4 h-4 text-[#061826]" />
                                <span>Iniciar Caminata</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#061826]" />
                            </Link>
                        </div>

                        {/* Plan 3: Bolsa Corporativa */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0C3C60]/50 border border-[#0C3C60] flex items-center justify-center text-[#83DF9C]">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#83DF9C]/10 text-[#83DF9C] border border-[#83DF9C]/20">
                                        Hasta 100 Predios
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Bolsa Corporativa</h3>
                                <p className="text-xs text-[#FAF2CA]/65 mb-6">
                                    Para asociaciones, cooperativas y exportadores.
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#0C3C60]/60">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-white">$650</span>
                                        <span className="text-xs text-[#FAF2CA]/60 font-semibold">USD / bolsa</span>
                                    </div>
                                    <div className="text-[11px] text-[#83DF9C] font-semibold mt-0.5">
                                        $6,50 USD / predio (~ $2.600.000 COP total)
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#FAF2CA]/80">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>100 pases para técnicos propios</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Panel centralizado de lotes asociados</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                        <span>Exportación masiva para aduanas UE</span>
                                    </li>
                                </ul>
                            </div>

                            <a
                                href="mailto:soporte@axistrace.app?subject=Consulta%20Bolsa%20Corporativa%20AxisTrace"
                                className="mt-8 w-full py-2.5 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] hover:text-white text-center transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>Solicitar Bolsa</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Strip Adicional: Hectárea Extra & Entregables */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Hectárea Adicional */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#082840]/60 border border-[#0C3C60] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] shrink-0">
                                    <PlusCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Hectárea Adicional (Predios Extensos)</h4>
                                    <p className="text-[11px] text-[#FAF2CA]/60">Aplica a partir de la 6ta hectárea en palma, ganadería o cacao extenso.</p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-base font-black text-[#83DF9C]">+$3 USD</div>
                                <div className="text-[10px] text-[#FAF2CA]/50">~ $12.000 COP / ha</div>
                            </div>
                        </div>

                        {/* Entregables Oficiales Incluidos */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#082840]/60 border border-[#0C3C60] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] shrink-0">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Entregables Oficiales Incluidos</h4>
                                    <p className="text-[11px] text-[#FAF2CA]/60">Ficha Técnica Oficio 300 DPI + GeoJSON RFC 7946 con hash SHA-256 inmutable.</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30 shrink-0">
                                Incluido
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMODITIES VISUALES COMPACTOS */}
            <section className="relative z-10 py-12 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                        Las 7 Cadenas Reguladas por el EUDR
                    </h2>
                    <p className="text-xs text-[#FAF2CA]/60 mb-6">
                        Formatos y metadatos adaptados a los estándares de importación europea.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <Coffee className="w-4 h-4 text-[#83DF9C]" /> Café
                        </span>
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <TreePine className="w-4 h-4 text-[#83DF9C]" /> Cacao
                        </span>
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <Sparkles className="w-4 h-4 text-[#83DF9C]" /> Palma Aceitera
                        </span>
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <Layers className="w-4 h-4 text-[#83DF9C]" /> Caucho
                        </span>
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <TreePine className="w-4 h-4 text-[#83DF9C]" /> Madera
                        </span>
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <Globe className="w-4 h-4 text-[#83DF9C]" /> Soja
                        </span>
                        <span className="px-3.5 py-2 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                            <ShieldCheck className="w-4 h-4 text-[#83DF9C]" /> Ganado Bovino
                        </span>
                    </div>
                </div>
            </section>

            {/* COMPARATIVA CONCRETA: CON O SIN AXISTRACE */}
            <section className="relative z-10 py-12 px-4 bg-[#082840]/40 border-y border-[#0C3C60]/50">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Sin AxisTrace */}
                        <div className="p-5 rounded-2xl bg-[#082840]/60 border border-[#FF7E7E]/30">
                            <div className="flex items-center gap-2 text-[#FF7E7E] text-xs font-bold uppercase tracking-wider mb-3">
                                <XCircle className="w-4 h-4" /> Sin Georreferenciación Válida
                            </div>
                            <ul className="space-y-2 text-xs text-[#FAF2CA]/70">
                                <li>• Bloqueo y confiscación de cargamentos en aduana europea.</li>
                                <li>• Polígonos rechazados por orden incorrecto de coordenadas.</li>
                                <li>• Pérdida de compradores internacionales por falta de DDS.</li>
                            </ul>
                        </div>

                        {/* Con AxisTrace */}
                        <div className="p-5 rounded-2xl bg-[#082840]/60 border border-[#83DF9C]/40 shadow-lg shadow-[#83DF9C]/5">
                            <div className="flex items-center gap-2 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3">
                                <CheckCircle2 className="w-4 h-4" /> Con AxisTrace
                            </div>
                            <ul className="space-y-2 text-xs text-[#FAF2CA]/90">
                                <li>• Cumplimiento garantizado para TRACES NT y Reglamento 2023/1115.</li>
                                <li>• Polígonos GeoJSON certificados con 6 decimales de precisión.</li>
                                <li>• Sello criptográfico SHA-256 inmutable anti-adulteración.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL MINIMALISTA */}
            <section className="relative z-10 py-16 px-4 text-center">
                <div className="max-w-xl mx-auto flex flex-col items-center">
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                        Comienza a Georreferenciar Hoy
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-[#FAF2CA]/70">
                        100% Autoservicio en campo con tu propio smartphone. Sin suscripciones fijas.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/terminal"
                            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#061826] font-black text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Compass className="w-4 h-4 text-[#061826]" />
                            <span>Abrir Terminal de Georreferenciación</span>
                            <ArrowRight className="w-4 h-4 text-[#061826]" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER MINIMALISTA */}
            <footer className="relative z-10 border-t border-[#0C3C60]/50 bg-[#041019] py-8 px-4 text-xs text-[#FAF2CA]/50">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo-axistrace-light.svg"
                            alt="AxisTrace"
                            width={120}
                            height={38}
                            className="h-7 w-auto object-contain"
                        />
                        <span>•</span>
                        <span>Reglamento (UE) 2023/1115</span>
                    </div>
                    <div className="text-[11px] text-[#FAF2CA]/40">
                        © {new Date().getFullYear()} AxisTrace. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
