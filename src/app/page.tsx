'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Compass, 
    ShieldCheck, 
    Satellite, 
    Sparkles, 
    ArrowRight, 
    CheckCircle2, 
    Globe, 
    Cpu, 
    Layers, 
    FileCheck, 
    MapPin, 
    Lock, 
    TreePine, 
    Coffee, 
    Zap,
    Download
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#061826] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60] font-sans">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00594C]/25 rounded-full blur-[140px]" />
                <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-[#0C3C60]/30 rounded-full blur-[160px]" />
                <div className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] bg-[#83DF9C]/10 rounded-full blur-[150px]" />
            </div>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-[#061826]/85 backdrop-blur-xl border-b border-[#0C3C60]/60 px-4 py-3.5 transition-all">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="h-10 relative group-hover:scale-[1.02] transition-transform flex items-center">
                            <Image
                                src="/logo-axistrace-light.svg"
                                alt="AxisTrace - EUDR Traceability Platform"
                                width={180}
                                height={60}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </div>
                        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#83DF9C] animate-pulse" />
                            EUDR 2023/1115 Ready
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-[#FAF2CA]/80">
                        <a href="#solucion" className="hover:text-[#83DF9C] transition-colors">Plataforma</a>
                        <a href="#normativa" className="hover:text-[#83DF9C] transition-colors">Reglamento EUDR</a>
                        <a href="#proceso" className="hover:text-[#83DF9C] transition-colors">Cómo Funciona</a>
                        <a href="#commodities" className="hover:text-[#83DF9C] transition-colors">Cadenas Reguladas</a>
                        <a href="#especificaciones" className="hover:text-[#83DF9C] transition-colors">Estándar Técnico</a>
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/terminal"
                            className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00594C] to-[#83DF9C] text-[#061826] font-bold text-xs shadow-lg shadow-[#83DF9C]/20 hover:shadow-[#83DF9C]/40 hover:scale-[1.02] transition-all flex items-center gap-2"
                        >
                            <Compass className="w-4 h-4 text-[#061826] group-hover:rotate-45 transition-transform" />
                            <span>Abrir Terminal de Campo</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#061826] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-16 sm:pt-24 pb-20 px-4 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3C60]/60 border border-[#83DF9C]/40 text-[#83DF9C] text-xs font-semibold mb-6 shadow-inner">
                        <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                        <span>Validación Oficial para el Sistema TRACES NT de la Unión Europea</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl">
                        Infraestructura Digital de <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#83DF9C] via-[#FAF2CA] to-[#83DF9C]">
                            Georreferenciación & Diligencia Debida
                        </span> <br className="hidden sm:inline" />
                        para la Primera Milla Agrícola
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAF2CA]/80 max-w-3xl leading-relaxed">
                        Garantiza el libre ingreso de tus cosechas al mercado europeo. Captura polígonos perimetrales inmutables en campo <strong>100% offline</strong>, certifica deforestación cero post-2020 y genera archivos GeoJSON sellados criptográficamente listos para auditar.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/terminal"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#83DF9C] hover:bg-[#97e8ad] text-[#061826] font-extrabold text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                        >
                            <Compass className="w-5 h-5" />
                            <span>Iniciar Caminata Perimetral</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="#especificaciones"
                            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0C3C60]/40 hover:bg-[#0C3C60]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 text-[#FAF2CA] font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                            <FileCheck className="w-4 h-4 text-[#83DF9C]" />
                            <span>Ficha Técnica IETF RFC 7946</span>
                        </a>
                    </div>

                    {/* Metric Stats Strip */}
                    <div className="mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#082840]/60 border border-[#0C3C60]/70 backdrop-blur-md shadow-2xl">
                        <div className="p-3 sm:p-4 text-center border-r border-[#0C3C60]/40 last:border-none">
                            <div className="text-2xl sm:text-3xl font-black text-[#83DF9C]">100%</div>
                            <div className="text-xs text-[#FAF2CA]/70 font-semibold mt-1">Operación Offline</div>
                            <div className="text-[10px] text-[#FAF2CA]/40">Sin señal en fincas remotas</div>
                        </div>
                        <div className="p-3 sm:p-4 text-center border-r border-[#0C3C60]/40 last:border-none">
                            <div className="text-2xl sm:text-3xl font-black text-white">SHA-256</div>
                            <div className="text-xs text-[#FAF2CA]/70 font-semibold mt-1">Sello Criptográfico</div>
                            <div className="text-[10px] text-[#FAF2CA]/40">Inmutable anti-manipulación</div>
                        </div>
                        <div className="p-3 sm:p-4 text-center border-r border-[#0C3C60]/40 last:border-none">
                            <div className="text-2xl sm:text-3xl font-black text-[#83DF9C]">&lt; 10m</div>
                            <div className="text-xs text-[#FAF2CA]/70 font-semibold mt-1">Sentinel-2 Ready</div>
                            <div className="text-[10px] text-[#FAF2CA]/40">Resolución satelital UE</div>
                        </div>
                        <div className="p-3 sm:p-4 text-center">
                            <div className="text-2xl sm:text-3xl font-black text-white">7 Cadenas</div>
                            <div className="text-xs text-[#FAF2CA]/70 font-semibold mt-1">Commodities EUDR</div>
                            <div className="text-[10px] text-[#FAF2CA]/40">Café, Cacao, Palma y más</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 1: EL RETO HISTÓRICO EUDR */}
            <section id="normativa" className="relative z-10 py-16 sm:py-24 px-4 bg-[#082840]/40 border-y border-[#0C3C60]/50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-4 border border-[#83DF9C]/20">
                                Mandato Regulatorio Europeo
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Reglamento (UE) 2023/1115: <br />
                                <span className="text-[#83DF9C]">Trazabilidad Obligatoria o Cierre de Mercado</span>
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-[#FAF2CA]/80 leading-relaxed">
                                A partir del plazo oficial fijado por la Comisión Europea, ningún importador podrá ingresar café, cacao, palma o madera a la Unión Europea sin presentar una <strong>Declaración de Diligencia Debida (DDS)</strong> vinculada a los polígonos exactos donde fue cosechado el producto.
                            </p>

                            <div className="mt-6 space-y-3.5">
                                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60]/70">
                                    <CheckCircle2 className="w-5 h-5 text-[#83DF9C] shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Parcelas mayores a 4 Hectáreas</h4>
                                        <p className="text-xs text-[#FAF2CA]/70">Exigen polígono perimetral cerrado obligatorio con coordenadas geográficas en formato decimal de 6 cifras.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60]/70">
                                    <CheckCircle2 className="w-5 h-5 text-[#83DF9C] shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Fecha de Corte: 31 de Diciembre de 2020</h4>
                                        <p className="text-xs text-[#FAF2CA]/70">El terreno debe demostrar mediante cruce satelital que no ha sufrido deforestación ni degradación forestal después de dicha fecha.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0C3C60]/40 border border-[#0C3C60]/70">
                                    <CheckCircle2 className="w-5 h-5 text-[#83DF9C] shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Integración con TRACES NT</h4>
                                        <p className="text-xs text-[#FAF2CA]/70">Los datos deben subirse en formato estandarizado GeoJSON / Shapefile con proyección WGS84 (CRS84) estricta.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="lg:col-span-5">
                            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0C3C60]/80 to-[#082840] border border-[#83DF9C]/30 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#83DF9C]/10 rounded-full blur-2xl" />
                                <div className="flex items-center justify-between border-b border-[#0C3C60] pb-4 mb-5">
                                    <span className="text-xs font-bold text-[#83DF9C] uppercase tracking-wider">Cumplimiento en Aduanas</span>
                                    <span className="px-2 py-0.5 rounded bg-[#83DF9C]/20 text-[#83DF9C] text-[10px] font-bold">Auditoría Aprobada</span>
                                </div>

                                <div className="space-y-4 text-xs">
                                    <div>
                                        <span className="text-[#FAF2CA]/50 block text-[11px]">Régimen de Inspección</span>
                                        <span className="text-white font-semibold">Inspecciones aduaneras aleatorias y satelitales obligatorias por los Estados miembros de la UE.</span>
                                    </div>
                                    <div>
                                        <span className="text-[#FAF2CA]/50 block text-[11px]">Sanciones por Incumplimiento</span>
                                        <span className="text-[#FF7E7E] font-bold">Confiscación del cargamento, multas de hasta el 4% del volumen de negocios de la empresa en la UE y exclusión temporal del mercado.</span>
                                    </div>
                                    <div className="pt-3 border-t border-[#0C3C60]">
                                        <span className="text-[#FAF2CA]/50 block text-[11px]">Respuesta Tecnológica</span>
                                        <span className="text-[#83DF9C] font-extrabold text-sm">AxisTrace garantiza trazabilidad inmutable y blindaje documental en origen.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 2: CÓMO FUNCIONA AXISTRACE */}
            <section id="proceso" className="relative z-10 py-16 sm:py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/20">
                            Flujo de Operación
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">
                            De la Finca al Puerto Europeo en 4 Pasos
                        </h2>
                        <p className="mt-3 text-sm text-[#FAF2CA]/70">
                            Diseñado específicamente para técnicos de campo, productores y cooperativas agrícolas en terrenos montañosos o de difícil acceso.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Step 1 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col group">
                            <div className="w-12 h-12 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                                01
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Caminata Perimetral Offline</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed flex-1">
                                El técnico recorre el perímetro de la parcela a pie. AxisTrace registra coordenadas con alta precisión mediante el receptor GNSS del dispositivo sin consumir datos móviles.
                            </p>
                            <div className="mt-4 pt-3 border-t border-[#0C3C60]/60 flex items-center gap-1.5 text-[11px] text-[#83DF9C] font-semibold">
                                <Zap className="w-3.5 h-3.5" />
                                <span>Cero necesidad de cobertura</span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col group">
                            <div className="w-12 h-12 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                                02
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Filtro Antifraude & Rebotes</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed flex-1">
                                Algoritmo de deadband y control de inercia humana que descarta saltos por rebote de vegetación y previene la subida de polígonos sintéticos dibujados a mano en oficina.
                            </p>
                            <div className="mt-4 pt-3 border-t border-[#0C3C60]/60 flex items-center gap-1.5 text-[11px] text-[#83DF9C] font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Veracidad biométrica de paso</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col group">
                            <div className="w-12 h-12 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                                03
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Sellado Criptográfico SHA-256</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed flex-1">
                                Cada lote sellado calcula un hash criptográfico inmutable que enlaza fecha, hora UTC, secuencia de vértices y nombre del productor. Imposible de adulterar.
                            </p>
                            <div className="mt-4 pt-3 border-t border-[#0C3C60]/60 flex items-center gap-1.5 text-[11px] text-[#83DF9C] font-semibold">
                                <Lock className="w-3.5 h-3.5" />
                                <span>Firma digital inmutable</span>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col group">
                            <div className="w-12 h-12 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                                04
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Exportación TRACES NT</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed flex-1">
                                Generación inmediata de archivos GeoJSON IETF RFC 7946 y certificados de debida diligencia listos para incorporar a los sistemas de aduanas de la UE.
                            </p>
                            <div className="mt-4 pt-3 border-t border-[#0C3C60]/60 flex items-center gap-1.5 text-[11px] text-[#83DF9C] font-semibold">
                                <Download className="w-3.5 h-3.5" />
                                <span>GeoJSON, CSV, Shapefile</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Terminal Launcher Banner */}
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#00594C] via-[#0C3C60] to-[#082840] border border-[#83DF9C]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                        <div>
                            <h3 className="text-xl font-bold text-white">¿Listo para probar el visor y trazador de campo?</h3>
                            <p className="text-xs text-[#FAF2CA]/80 mt-1">Accede a la terminal interactiva con soporte de GPS satelital en tiempo real.</p>
                        </div>
                        <Link
                            href="/terminal"
                            className="px-6 py-3 rounded-xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#061826] font-bold text-xs shadow-lg hover:scale-105 transition-all whitespace-nowrap flex items-center gap-2"
                        >
                            <span>Lanzar Terminal Ahora</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: COMMODITIES REGULADOS */}
            <section id="commodities" className="relative z-10 py-16 sm:py-24 px-4 bg-[#082840]/30 border-y border-[#0C3C60]/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/20">
                            Cobertura de Mercado
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">
                            Los 7 Commodities Bajo Regulación EUDR
                        </h2>
                        <p className="mt-3 text-sm text-[#FAF2CA]/70">
                            AxisTrace implementa los metadatos y parámetros específicos exigidos por la Unión Europea para cada cadena de valor.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Cafe */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Coffee className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Café</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Arábica, Robusta y derivados. Cumplimiento de polígonos por finca.</p>
                        </div>

                        {/* Cacao */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <TreePine className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Cacao</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Grano en baba, seco, manteca y pasta. Trazabilidad de pequeños productores.</p>
                        </div>

                        {/* Palma */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Palma Aceitera</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Aceite crudo, refinado y derivados oleoquímicos certificados.</p>
                        </div>

                        {/* Caucho */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Caucho Natural</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Látex y hojas ahumadas para la industria automotriz y manufactura.</p>
                        </div>

                        {/* Madera */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <TreePine className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Madera & Celulosa</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Trozas, aserrada, tableros, papel y cartón de empaque.</p>
                        </div>

                        {/* Soja */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Soja</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Granos, harina, tortas y concentrados para alimentación animal.</p>
                        </div>

                        {/* Ganaderia */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Ganado Bovino</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Carne fresca, congelada y cueros con trazabilidad de pastoreo.</p>
                        </div>

                        {/* Fincas Mixtas */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#0C3C60]/30 border border-[#0C3C60]/70 hover:border-[#83DF9C]/40 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-3">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white">Agroforestería</h4>
                            <p className="text-[11px] text-[#FAF2CA]/60 mt-1">Polígonos multicultivo y sistemas regenerativos combinados.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 4: ESPECIFICACIONES TÉCNICAS */}
            <section id="especificaciones" className="relative z-10 py-16 sm:py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/20">
                            Rigor de Ingeniería
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">
                            Especificaciones Técnicas para Auditores
                        </h2>
                        <p className="mt-3 text-sm text-[#FAF2CA]/70">
                            Cumplimiento estricto de las directrices cartográficas y de ciberseguridad emitidas por la Comisión Europea.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-4">
                                <Satellite className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base text-white mb-2">IETF RFC 7946 / CRS84</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed mb-4">
                                Estructuración geométrica WGS84 nativa en orden estricto <code className="text-[#83DF9C] bg-[#061826] px-1 py-0.5 rounded">[longitud, latitud]</code> con anillo perimetral cerrado (<code className="text-[#83DF9C]">p[0] === p[n-1]</code>).
                            </p>
                            <ul className="space-y-2 text-xs text-[#FAF2CA]/80 mt-auto pt-4 border-t border-[#0C3C60]/60">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" />
                                    <span>6 decimales mínimos de precisión</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" />
                                    <span>Geometría Polygon simple sin auto-intersección</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-4">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base text-white mb-2">Hash SHA-256 Inmutable</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed mb-4">
                                El sello digital genera una huella criptográfica SHA-256 computada a partir de los vértices geográficos, la marca de tiempo atómica UTC y la identificación del productor.
                            </p>
                            <ul className="space-y-2 text-xs text-[#FAF2CA]/80 mt-auto pt-4 border-t border-[#0C3C60]/60">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" />
                                    <span>Inalterable tras la firma del lote</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" />
                                    <span>Verificable en cualquier auditoría externa</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 flex items-center justify-center text-[#83DF9C] mb-4">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base text-white mb-2">Algoritmo Deadband Dinámico</h3>
                            <p className="text-xs text-[#FAF2CA]/70 leading-relaxed mb-4">
                                Filtro de paso humano que rechaza vibraciones menores a 1.2 metros y descarta anomalías mayores a 35 metros producidas por caídas momentáneas de satélites GNSS.
                            </p>
                            <ul className="space-y-2 text-xs text-[#FAF2CA]/80 mt-auto pt-4 border-t border-[#0C3C60]/60">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" />
                                    <span>Elimina vértices redundantes</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83DF9C]" />
                                    <span>Garantiza polígonos limpios y ligeros</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN CTA FINAL */}
            <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-[#082840] to-[#061826] border-t border-[#0C3C60]/60">
                <div className="max-w-4xl mx-auto text-center p-8 sm:p-14 rounded-3xl bg-[#082840]/90 border border-[#83DF9C]/30 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#83DF9C]/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00594C]/30 rounded-full blur-3xl pointer-events-none" />

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Asegura el Futuro de tus Exportaciones a Europa
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-[#FAF2CA]/80 max-w-xl mx-auto">
                        Únete a los productores, cooperativas y exportadores que ya están georreferenciando con el estándar oficial EUDR.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/terminal"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00594C] to-[#83DF9C] text-[#061826] font-black text-sm shadow-xl shadow-[#83DF9C]/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <Compass className="w-5 h-5 text-[#061826]" />
                            <span>Entrar a la Terminal de Georreferenciación</span>
                            <ArrowRight className="w-4 h-4 text-[#061826]" />
                        </Link>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#FAF2CA]/60">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> Sin instalación requerida
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> Compatible con smartphones
                        </span>
                    </div>
                </div>
            </section>

            {/* FOOTER INSTITUCIONAL */}
            <footer className="relative z-10 border-t border-[#0C3C60]/60 bg-[#041019] py-12 px-4 text-xs text-[#FAF2CA]/60">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
                    <div className="md:col-span-5 space-y-4">
                        <div className="h-10 relative flex items-center">
                            <Image
                                src="/logo-axistrace-light.svg"
                                alt="AxisTrace"
                                width={180}
                                height={60}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <p className="text-xs text-[#FAF2CA]/70 leading-relaxed max-w-sm">
                            Infraestructura digital de trazabilidad, georreferenciación terrestre y debida diligencia ambiental conforme al Reglamento Europeo contra la Deforestación (UE) 2023/1115.
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-[#83DF9C]">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Diseñado para la Primera Milla Agrícola Global</span>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Plataforma</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/terminal" className="hover:text-[#83DF9C] transition-colors">Terminal de Campo</Link></li>
                            <li><a href="#proceso" className="hover:text-[#83DF9C] transition-colors">Caminata Digital</a></li>
                            <li><a href="#especificaciones" className="hover:text-[#83DF9C] transition-colors">Sello SHA-256</a></li>
                            <li><a href="#commodities" className="hover:text-[#83DF9C] transition-colors">Commodities</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Marco Legal</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="#normativa" className="hover:text-[#83DF9C] transition-colors">EUDR 2023/1115</a></li>
                            <li><a href="#especificaciones" className="hover:text-[#83DF9C] transition-colors">IETF RFC 7946</a></li>
                            <li><a href="#especificaciones" className="hover:text-[#83DF9C] transition-colors">WGS84 / CRS84</a></li>
                            <li><span className="hover:text-[#83DF9C] transition-colors">TRACES NT Specs</span></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3 space-y-3">
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Soporte & Auditoría</h4>
                        <p className="text-xs text-[#FAF2CA]/70">
                            ¿Necesitas asesoría para la integración con sistemas ERP de cooperativas o exportadores?
                        </p>
                        <Link
                            href="/terminal"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-semibold text-[#83DF9C] transition-colors"
                        >
                            <span>Iniciar Mapeo</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-6 border-t border-[#0C3C60]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
                    <div>
                        © {new Date().getFullYear()} AxisTrace. Todos los derechos reservados.
                    </div>
                    <div className="flex items-center gap-4 text-[#FAF2CA]/50">
                        <span>Privacidad de Datos Geoespaciales</span>
                        <span>•</span>
                        <span>Términos de Servicio</span>
                        <span>•</span>
                        <span>Cumplimiento UE</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}