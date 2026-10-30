'use client';

import React, { useState } from 'react';
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
    PlusCircle,
    Activity,
    MapPin,
    Eye,
    ChevronRight,
    Play
} from 'lucide-react';

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState<'walk' | 'satellite' | 'export'>('walk');

    return (
        <div className="min-h-screen bg-[#040E17] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60] font-sans overflow-x-hidden">
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-[#00594C] via-[#0C3C60] to-[#082840] border-b border-[#83DF9C]/20 px-4 py-2 text-center text-[11px] font-semibold text-[#FAF2CA] flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#83DF9C] animate-pulse" />
                <span>Cumplimiento obligatorio Reglamento (UE) 2023/1115 (EUDR)</span>
                <span className="hidden sm:inline text-[#83DF9C]">•</span>
                <span className="hidden sm:inline text-[#FAF2CA]/80">Formatos oficiales para el sistema aduanero TRACES NT</span>
            </div>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-[#040E17]/85 backdrop-blur-xl border-b border-[#0C3C60]/50 px-4 py-3.5 transition-all">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="h-9 relative flex items-center group-hover:scale-105 transition-transform">
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

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#FAF2CA]/75">
                        <a href="#solucion" className="hover:text-[#83DF9C] transition-colors">Solución</a>
                        <a href="#tecnologia" className="hover:text-[#83DF9C] transition-colors">Tecnología</a>
                        <a href="#commodities" className="hover:text-[#83DF9C] transition-colors">Cadenas</a>
                        <a href="#planes" className="hover:text-[#83DF9C] transition-colors">Planes & Precios</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/terminal"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#040E17] font-extrabold text-xs shadow-lg shadow-[#83DF9C]/20 hover:scale-[1.03] transition-all flex items-center gap-1.5"
                        >
                            <Compass className="w-4 h-4 text-[#040E17]" />
                            <span>Abrir Terminal</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#040E17]" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION INSPIRADO EN AGROCORE (CINEMATOGRÁFICO CON HUD) */}
            <section className="relative z-10 pt-4 sm:pt-6 pb-12 sm:pb-20 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* The Giant Hero Frame */}
                    <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#0C3C60]/80 shadow-2xl bg-[#082840]/90">
                        {/* Background Photo */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/hero-agritech.jpg"
                                alt="Paisaje Cafetero y Cacaotero AxisTrace"
                                fill
                                priority
                                className="object-cover object-center filter brightness-[0.78] contrast-[1.12]"
                            />
                            {/* Cinematic Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/45 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#040E17]/95 via-[#040E17]/60 to-transparent sm:w-2/3" />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-10 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between min-h-[580px] sm:min-h-[640px]">
                            {/* Top Rating & Badge */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#040E17]/70 backdrop-blur-md border border-[#83DF9C]/40 text-[#83DF9C] text-xs font-semibold shadow-lg">
                                    <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                                    <span>EUDR 2023/1115 & TRACES NT Ready</span>
                                </div>
                                <span className="text-[11px] text-[#FAF2CA]/75 hidden sm:inline-flex items-center gap-1.5 bg-[#040E17]/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <span className="text-[#83DF9C]">★ 4.9/5</span> Estándar de Precisión en Primera Milla
                                </span>
                            </div>

                            {/* Main Title & Lead */}
                            <div className="max-w-2xl">
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
                                    Georreferenciación <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#83DF9C] via-[#FAF2CA] to-[#83DF9C]">
                                        de Primera Milla.
                                    </span> <br />
                                    Resultados Comprobados.
                                </h1>

                                <p className="mt-5 text-sm sm:text-base md:text-lg text-[#FAF2CA]/90 font-medium leading-relaxed drop-shadow">
                                    Elimina el riesgo de confiscación en aduanas europeas. Captura polígonos perimetrales inmutables <strong>100% offline</strong> en finca y emite certificados GeoJSON sellados con SHA-256.
                                </p>

                                {/* Action Buttons */}
                                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
                                    <Link
                                        href="/terminal"
                                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#040E17] font-black text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Compass className="w-5 h-5 text-[#040E17]" />
                                        <span>Iniciar Caminata Gratis</span>
                                        <ArrowRight className="w-4 h-4 text-[#040E17]" />
                                    </Link>
                                    <a
                                        href="#planes"
                                        className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#040E17]/70 hover:bg-[#040E17] backdrop-blur-md border border-[#FAF2CA]/30 text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <FileText className="w-4 h-4 text-[#83DF9C]" />
                                        <span>Estructura de Planes</span>
                                    </a>
                                </div>
                                <div className="mt-3 text-[11px] text-[#FAF2CA]/60 flex items-center gap-2">
                                    <span>✓ Sin descargas de app</span>
                                    <span>•</span>
                                    <span>✓ Funciona con tu propio smartphone</span>
                                </div>
                            </div>

                            {/* Floating Telemetry Card (Estilo AgroCore HUD) */}
                            <div className="absolute top-8 right-8 hidden lg:block w-72 rounded-2xl bg-[#040E17]/85 backdrop-blur-xl border border-[#83DF9C]/30 p-4 shadow-2xl">
                                <div className="flex items-center justify-between pb-3 border-b border-[#0C3C60]">
                                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                                        <Activity className="w-4 h-4 text-[#83DF9C] animate-pulse" />
                                        <span>Telemetría GNSS en Finca</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#83DF9C]/20 text-[#83DF9C]">
                                        En Vivo
                                    </span>
                                </div>
                                <div className="mt-3 space-y-2.5 text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#FAF2CA]/60">Precisión GPS:</span>
                                        <span className="font-bold text-[#83DF9C]">&lt; 1.4 metros</span>
                                    </div>
                                    <div className="w-full bg-[#0C3C60]/60 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-[#83DF9C] h-full w-[94%]" />
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="text-[#FAF2CA]/60">Cruce Deforestación:</span>
                                        <span className="font-semibold text-white">Cero post-2020</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="text-[#FAF2CA]/60">Firma Criptográfica:</span>
                                        <span className="font-mono text-[#83DF9C] text-[10px]">SHA-256 (OK)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Strip Inside Hero */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#FAF2CA]/80">
                                <div className="flex items-center gap-6">
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> 100% Autoservicio en Terreno
                                    </span>
                                    <span className="hidden sm:flex items-center gap-1.5 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> Sentinel-2 Resolution
                                    </span>
                                    <span className="hidden md:flex items-center gap-1.5 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> Validación IETF RFC 7946
                                    </span>
                                </div>
                                <div className="text-[11px] text-[#FAF2CA]/50 font-mono">
                                    CRS: OGC:1.3:CRS84 (WGS84)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BAR (MARCAS DE CONFIANZA Y ALIANZAS ADUANERAS) */}
            <section className="relative z-10 py-6 px-4 border-b border-[#0C3C60]/40">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FAF2CA]/50">
                        Compatible y Validado con Sistemas de Comercio Exterior:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#FAF2CA]/70">
                        <span className="px-3 py-1 rounded-lg bg-[#082840]/60 border border-[#0C3C60]">TRACES NT (Comisión Europea)</span>
                        <span className="px-3 py-1 rounded-lg bg-[#082840]/60 border border-[#0C3C60]">Sentinel-2 (Copernicus)</span>
                        <span className="px-3 py-1 rounded-lg bg-[#082840]/60 border border-[#0C3C60]">IETF RFC 7946 GeoJSON</span>
                        <span className="px-3 py-1 rounded-lg bg-[#082840]/60 border border-[#0C3C60]">WGS84 Decimal</span>
                    </div>
                </div>
            </section>

            {/* SECCIÓN INTERACTIVA FOTOGRÁFICA "SOLUCIONES A MEDIDA" (ESTILO AGROCORE) */}
            <section id="solucion" className="relative z-10 py-16 sm:py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/25">
                                Soluciones de Precisión
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                                Trazabilidad Digital para <br className="hidden sm:inline" />
                                Crecimiento Sostenible y Exportación
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-[#FAF2CA]/70 max-w-md">
                            Conectamos la realidad física de la parcela campesina con las exigencias digitales de las aduanas en Europa.
                        </p>
                    </div>

                    {/* 3 Interactive Photo Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Caminata en Campo */}
                        <div className="group rounded-3xl overflow-hidden bg-[#082840]/60 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src="/images/field-technician.jpg"
                                    alt="Técnico de campo realizando levantamiento EUDR"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#082840] via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#040E17]/80 backdrop-blur-md text-[10px] font-bold text-[#83DF9C] border border-[#83DF9C]/30 flex items-center gap-1.5">
                                    <Smartphone className="w-3 h-3" /> Modo Bolsillo Offline
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Caminata Digital de Campo</h3>
                                    <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                        El operario recorre el perímetro de la parcela. AxisTrace captura coordenadas automáticamente sin requerir señal de telefonía ni internet.
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#0C3C60]/60 flex items-center justify-between text-xs font-bold text-[#83DF9C]">
                                    <span>Ver terminal en acción</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Auditoría Satelital */}
                        <div className="group rounded-3xl overflow-hidden bg-[#082840]/60 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src="/images/satellite-survey.jpg"
                                    alt="Mosaico satelital y análisis de deforestación"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#082840] via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#040E17]/80 backdrop-blur-md text-[10px] font-bold text-[#83DF9C] border border-[#83DF9C]/30 flex items-center gap-1.5">
                                    <Satellite className="w-3 h-3" /> Sentinel-2 Copernicus
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Auditoría Satelital de Deforestación</h3>
                                    <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                        Cruce de geometrías con series históricas satelitales. Verificación estricta de deforestación cero con fecha de corte oficial del 31 de diciembre de 2020.
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#0C3C60]/60 flex items-center justify-between text-xs font-bold text-[#83DF9C]">
                                    <span>Conocer validación técnica</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Exportación y Blindaje Aduanero */}
                        <div className="group rounded-3xl overflow-hidden bg-[#082840]/60 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src="/images/export-compliance.jpg"
                                    alt="Sacos de café listos para exportación aduanera"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#082840] via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#040E17]/80 backdrop-blur-md text-[10px] font-bold text-[#83DF9C] border border-[#83DF9C]/30 flex items-center gap-1.5">
                                    <Lock className="w-3 h-3" /> Sello Inmutable SHA-256
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Expediente de Debida Diligencia (DDS)</h3>
                                    <p className="text-xs text-[#FAF2CA]/70 leading-relaxed">
                                        Emisión instantánea de Fichas Cartográficas Oficio a 300 DPI con QR y archivos GeoJSON estandarizados listos para su carga directa en TRACES NT.
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#0C3C60]/60 flex items-center justify-between text-xs font-bold text-[#83DF9C]">
                                    <span>Ver formato de entregables</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN "BRIDGING NATURE & DATA" (MÉTRICAS GRANDES) */}
            <section id="tecnologia" className="relative z-10 py-16 sm:py-24 px-4 bg-[#082840]/30 border-y border-[#0C3C60]/50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-6 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider border border-[#83DF9C]/25">
                                La Frontera entre la Naturaleza y los Datos
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                                La Tradición Agrícola Impulsada por Precisión Satelital
                            </h2>
                            <p className="text-sm sm:text-base text-[#FAF2CA]/80 leading-relaxed">
                                La agricultura campesina tradicional ha dependido de estimados aproximados. En AxisTrace transformamos cada paso perimetral en un activo documental con validez jurídica internacional ante la Unión Europea.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="p-4 rounded-2xl bg-[#082840]/80 border border-[#0C3C60]">
                                    <div className="text-3xl sm:text-4xl font-black text-[#83DF9C]">100%</div>
                                    <div className="text-xs font-bold text-white mt-1">Autoservicio Digital</div>
                                    <div className="text-[11px] text-[#FAF2CA]/60 mt-0.5">Sin necesidad de peritos costosos en finca</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#082840]/80 border border-[#0C3C60]">
                                    <div className="text-3xl sm:text-4xl font-black text-white">0%</div>
                                    <div className="text-xs font-bold text-white mt-1">Dependencia de Red</div>
                                    <div className="text-[11px] text-[#FAF2CA]/60 mt-0.5">Opera en zonas montañosas remotas</div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Feature Block */}
                        <div className="lg:col-span-6">
                            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0C3C60]/60 to-[#082840]/90 border border-[#83DF9C]/30 shadow-2xl relative overflow-hidden">
                                <div className="flex items-center justify-between pb-4 border-b border-[#0C3C60]">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#83DF9C]">Certificación de Lote</span>
                                    <span className="px-2 py-0.5 rounded bg-[#83DF9C]/20 text-[#83DF9C] text-[10px] font-black">TRACES NT READY</span>
                                </div>

                                <div className="mt-5 space-y-4">
                                    <div className="p-3.5 rounded-xl bg-[#040E17]/60 border border-[#0C3C60] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C]">
                                                <Compass className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">Algoritmo Deadband & Paso Humano</div>
                                                <div className="text-[11px] text-[#FAF2CA]/60">Descarta rebotes satelitales &gt;35m</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" />
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-[#040E17]/60 border border-[#0C3C60] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C]">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">Huella Criptográfica SHA-256</div>
                                                <div className="text-[11px] text-[#FAF2CA]/60">Firma digital inalterable con hora UTC</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" />
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-[#040E17]/60 border border-[#0C3C60] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C]">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">Ficha Cartográfica Oficio 300 DPI</div>
                                                <div className="text-[11px] text-[#FAF2CA]/60">Lista para imprimir con QR auditable</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN PLANES & PRECIOS (AUTOSERVICIO SAAS) */}
            <section id="planes" className="relative z-10 py-16 sm:py-24 px-4">
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
                        <div className="p-6 sm:p-7 rounded-3xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 transition-all flex flex-col justify-between">
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
                                className="mt-8 w-full py-3 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] hover:text-white text-center transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>Auditar Coordenadas</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Plan 2: Pase Caminata Digital (Destacado) */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0C3C60]/70 via-[#082840]/90 to-[#082840] border-2 border-[#83DF9C] shadow-2xl shadow-[#83DF9C]/15 flex flex-col justify-between relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#83DF9C] text-[#040E17] text-[10px] font-black uppercase tracking-wider shadow">
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
                                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#040E17] font-black text-xs text-center shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                            >
                                <Compass className="w-4 h-4 text-[#040E17]" />
                                <span>Iniciar Caminata</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#040E17]" />
                            </Link>
                        </div>

                        {/* Plan 3: Bolsa Corporativa */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 transition-all flex flex-col justify-between">
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
                                className="mt-8 w-full py-3 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] hover:text-white text-center transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>Solicitar Bolsa</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Strip Adicional: Hectárea Extra & Entregables */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#082840]/60 border border-[#0C3C60] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] shrink-0">
                                    <PlusCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Hectárea Adicional (Predios Extensos)</h4>
                                    <p className="text-[11px] text-[#FAF2CA]/60">A partir de la 6ta hectárea en palma, ganadería o cacao extenso.</p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-base font-black text-[#83DF9C]">+$3 USD</div>
                                <div className="text-[10px] text-[#FAF2CA]/50">~ $12.000 COP / ha</div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl bg-[#082840]/60 border border-[#0C3C60] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] shrink-0">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Entregables Oficiales Incluidos</h4>
                                    <p className="text-[11px] text-[#FAF2CA]/60">Ficha Técnica Oficio 300 DPI + GeoJSON RFC 7946 con hash SHA-256 inmutable.</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30 shrink-0">
                                Incluido
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMODITIES VISUALES */}
            <section id="commodities" className="relative z-10 py-12 px-4 bg-[#082840]/20 border-t border-[#0C3C60]/50">
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

            {/* CTA FINAL */}
            <section className="relative z-10 py-16 sm:py-20 px-4 text-center">
                <div className="max-w-2xl mx-auto flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#082840] to-[#040E17] border border-[#83DF9C]/30 shadow-2xl">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">
                        Comienza a Georreferenciar Hoy Mismo
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-[#FAF2CA]/75 max-w-lg">
                        100% Autoservicio en campo con tu propio smartphone. Sin suscripciones fijas ni cobros mensuales.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link
                            href="/terminal"
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#040E17] font-black text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <Compass className="w-5 h-5 text-[#040E17]" />
                            <span>Abrir Terminal de Campo</span>
                            <ArrowRight className="w-4 h-4 text-[#040E17]" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-[#0C3C60]/50 bg-[#02070D] py-10 px-4 text-xs text-[#FAF2CA]/50">
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
                        <span>Reglamento (UE) 2023/1115 (EUDR)</span>
                    </div>
                    <div className="text-[11px] text-[#FAF2CA]/40">
                        © {new Date().getFullYear()} AxisTrace. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
