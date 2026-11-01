'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EUDRGeoreference, { CommodityType } from '@/components/EUDRGeoreference';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Language } from '@/translations/content';

function AxisTraceApp() {
    const searchParams = useSearchParams();
    const lotId = searchParams.get('lotId') || searchParams.get('lote') || undefined;
    const cropParam = (searchParams.get('crop') || searchParams.get('commodity') || 'cafe').toLowerCase();
    const returnUrl = searchParams.get('returnUrl') || searchParams.get('callback');
    const farmer = searchParams.get('farmer') || searchParams.get('productor');

    // Language state: English first (default), Spanish second
    const [lang, setLang] = useState<Language>('en');

    const validCommodities: CommodityType[] = ['cafe', 'cacao', 'palma', 'caucho', 'madera', 'ganaderia', 'otro'];
    const initialCommodity: CommodityType = validCommodities.includes(cropParam as CommodityType)
        ? (cropParam as CommodityType)
        : 'cafe';

    return (
        <div className="min-h-screen bg-[#082840] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60]">
            {/* Top Brand Header */}
            <header className="sticky top-0 z-40 bg-[#082840]/95 backdrop-blur-md border-b border-[#0C3C60]/60 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {returnUrl ? (
                            <a
                                href={returnUrl}
                                className="p-2 -ml-2 rounded-xl bg-[#0C3C60]/50 hover:bg-[#0C3C60] text-[#FAF2CA] transition-colors flex items-center gap-1.5 text-xs font-bold"
                                title={lang === 'es' ? 'Volver al sistema de origen' : 'Return to origin'}
                            >
                                <ArrowLeft className="w-4 h-4 text-[#83DF9C]" />
                                <span className="hidden sm:inline">{lang === 'es' ? 'Volver' : 'Back'}</span>
                            </a>
                        ) : (
                            <Link
                                href="/"
                                className="p-2 -ml-2 rounded-xl bg-[#0C3C60]/50 hover:bg-[#0C3C60] text-[#FAF2CA] transition-colors flex items-center gap-1.5 text-xs font-bold"
                                title={lang === 'es' ? 'Volver a la página principal' : 'Return to homepage'}
                            >
                                <ArrowLeft className="w-4 h-4 text-[#83DF9C]" />
                                <span className="hidden sm:inline">{lang === 'es' ? 'Inicio' : 'Home'}</span>
                            </Link>
                        )}
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="relative h-9 flex items-center">
                                <Image
                                    src="/logo-axistrace-light.svg"
                                    alt="AxisTrace Logo"
                                    width={150}
                                    height={48}
                                    className="h-9 w-auto object-contain"
                                    priority
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30">
                                        {lang === 'es' ? 'Terminal de Campo EUDR 2023/1115' : 'EUDR 2023/1115 Field Terminal'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Right side info & Language switcher */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {lotId && (
                            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C3C60]/80 border border-[#83DF9C]/20 text-[11px]">
                                <span className="text-[#FAF2CA]/60">{lang === 'es' ? 'Lote:' : 'Lot:'}</span>
                                <span className="font-bold text-[#83DF9C]">{lotId}</span>
                                {farmer && <span className="text-[#FAF2CA]/40">({farmer})</span>}
                            </div>
                        )}

                        {/* Language Switcher (EN / ES) - English first */}
                        <div className="flex items-center gap-1 bg-[#0C3C60]/70 p-1 rounded-xl border border-white/10 shadow-xs">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                                    lang === 'en'
                                        ? 'bg-[#83DF9C] text-[#0C3C60] shadow-sm'
                                        : 'text-[#FAF2CA]/70 hover:text-white'
                                }`}
                                title="English (Primary)"
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('es')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                                    lang === 'es'
                                        ? 'bg-[#83DF9C] text-[#0C3C60] shadow-sm'
                                        : 'text-[#FAF2CA]/70 hover:text-white'
                                }`}
                                title="Español (Secundario)"
                            >
                                ES
                            </button>
                        </div>

                        <Link
                            href="/#normativa"
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-semibold text-[#FAF2CA] transition-colors"
                        >
                            <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                            <span className="hidden sm:inline">{lang === 'es' ? 'Estándar EUDR' : 'EUDR Standard'}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Operational Container */}
            <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col">
                <EUDRGeoreference
                    lotId={lotId}
                    initialCommodity={initialCommodity}
                    lang={lang}
                    onLanguageChange={setLang}
                />
            </main>

            {/* Footer */}
            <footer className="border-t border-[#0C3C60]/60 bg-[#082840] py-6 px-4 text-center text-xs text-[#FAF2CA]/50">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-white">AxisTrace</span>
                        <span>•</span>
                        <span>{lang === 'es' ? 'Infraestructura Digital de Diligencia Debida' : 'Digital Due Diligence Infrastructure'}</span>
                        <span>•</span>
                        <span>{lang === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#FAF2CA]/70">{lang === 'es' ? 'Diseñado por' : 'Designed by'}</span>
                        <a
                            href="https://mouselab.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#83DF9C] font-bold hover:underline transition-colors"
                        >
                            mouselab.dev
                        </a>
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
                    <p className="text-xs font-semibold text-[#83DF9C] uppercase tracking-wider">Loading AxisTrace Terminal...</p>
                </div>
            </div>
        }>
            <AxisTraceApp />
        </Suspense>
    );
}