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
    FileText,
    Users,
    Smartphone,
    PlusCircle,
    Activity,
    Zap
} from 'lucide-react';
import { translations, Language } from '@/translations/content';
import ScopeTimeline from '@/components/ScopeTimeline';

export default function LandingPage() {
    const [lang, setLang] = useState<Language>('en');
    const t = translations[lang];

    return (
        <div className="min-h-screen bg-[#040E17] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60] font-sans overflow-x-hidden">
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-[#00594C] via-[#0C3C60] to-[#082840] border-b border-[#83DF9C]/20 px-4 py-2 text-center text-[11px] font-semibold text-[#FAF2CA] flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#83DF9C] animate-pulse" />
                <span>{t.banner.title}</span>
                <span className="hidden sm:inline text-[#83DF9C]">•</span>
                <span className="hidden sm:inline text-[#FAF2CA]/80">{t.banner.subtitle}</span>
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
                        <a href="#alcance" className="hover:text-[#83DF9C] transition-colors">{t.nav.scope}</a>
                        <a href="#plataforma" className="hover:text-[#83DF9C] transition-colors">{t.nav.solutions}</a>
                        <a href="#planes" className="hover:text-[#83DF9C] transition-colors">{t.nav.pricing}</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Language Switcher (EN / ES) */}
                        <div className="flex items-center p-0.5 rounded-xl bg-[#082840] border border-[#0C3C60] text-xs font-bold">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${
                                    lang === 'en'
                                        ? 'bg-[#83DF9C] text-[#040E17] shadow-sm'
                                        : 'text-[#FAF2CA]/60 hover:text-white'
                                }`}
                                title="English (Default)"
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('es')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${
                                    lang === 'es'
                                        ? 'bg-[#83DF9C] text-[#040E17] shadow-sm'
                                        : 'text-[#FAF2CA]/60 hover:text-white'
                                }`}
                                title="Español (Secundario)"
                            >
                                ES
                            </button>
                        </div>

                        <Link
                            href="/terminal"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#040E17] font-extrabold text-xs shadow-lg shadow-[#83DF9C]/20 hover:scale-[1.03] transition-all flex items-center gap-1.5"
                        >
                            <Compass className="w-4 h-4 text-[#040E17]" />
                            <span>{t.nav.terminal}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#040E17]" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-4 sm:pt-6 pb-12 sm:pb-20 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#0C3C60]/80 shadow-2xl bg-[#082840]/90">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/hero-agritech.jpg"
                                alt="AxisTrace Precision Landscape"
                                fill
                                priority
                                className="object-cover object-center filter brightness-[0.78] contrast-[1.12]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/45 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#040E17]/95 via-[#040E17]/60 to-transparent sm:w-2/3" />
                        </div>

                        <div className="relative z-10 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between min-h-[580px] sm:min-h-[640px]">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#040E17]/70 backdrop-blur-md border border-[#83DF9C]/40 text-[#83DF9C] text-xs font-semibold shadow-lg">
                                    <ShieldCheck className="w-4 h-4 text-[#83DF9C]" />
                                    <span>{t.hero.badge}</span>
                                </div>
                                <span className="text-[11px] text-[#FAF2CA]/75 hidden sm:inline-flex items-center gap-1.5 bg-[#040E17]/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <span className="text-[#83DF9C]">★</span> {t.hero.rating}
                                </span>
                            </div>

                            <div className="max-w-2xl">
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
                                    {t.hero.title1} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#83DF9C] via-[#FAF2CA] to-[#83DF9C]">
                                        {t.hero.title2}
                                    </span> <br />
                                    {t.hero.title3}
                                </h1>

                                <p className="mt-5 text-sm sm:text-base md:text-lg text-[#FAF2CA]/90 font-medium leading-relaxed drop-shadow">
                                    {t.hero.description}
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
                                    <Link
                                        href="/terminal"
                                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#040E17] font-black text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Compass className="w-5 h-5 text-[#040E17]" />
                                        <span>{t.hero.ctaPrimary}</span>
                                        <ArrowRight className="w-4 h-4 text-[#040E17]" />
                                    </Link>
                                    <a
                                        href="#planes"
                                        className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#040E17]/70 hover:bg-[#040E17] backdrop-blur-md border border-[#FAF2CA]/30 text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <FileText className="w-4 h-4 text-[#83DF9C]" />
                                        <span>{t.hero.ctaSecondary}</span>
                                    </a>
                                </div>
                                <div className="mt-3 text-[11px] text-[#FAF2CA]/60 flex items-center gap-2">
                                    <span>✓ {t.hero.perks[0]}</span>
                                    <span>•</span>
                                    <span>✓ {t.hero.perks[1]}</span>
                                </div>
                            </div>

                            {/* Floating Telemetry Card */}
                            <div className="absolute top-8 right-8 hidden lg:block w-72 rounded-2xl bg-[#040E17]/85 backdrop-blur-xl border border-[#83DF9C]/30 p-4 shadow-2xl">
                                <div className="flex items-center justify-between pb-3 border-b border-[#0C3C60]">
                                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                                        <Activity className="w-4 h-4 text-[#83DF9C] animate-pulse" />
                                        <span>{t.hero.telemetry.title}</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#83DF9C]/20 text-[#83DF9C]">
                                        {t.hero.telemetry.status}
                                    </span>
                                </div>
                                <div className="mt-3 space-y-2.5 text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#FAF2CA]/60">{t.hero.telemetry.accuracy}</span>
                                        <span className="font-bold text-[#83DF9C]">{t.hero.telemetry.accuracyVal}</span>
                                    </div>
                                    <div className="w-full bg-[#0C3C60]/60 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-[#83DF9C] h-full w-[94%]" />
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="text-[#FAF2CA]/60">{t.hero.telemetry.deforestation}</span>
                                        <span className="font-semibold text-white">{t.hero.telemetry.deforestationVal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="text-[#FAF2CA]/60">{t.hero.telemetry.crypto}</span>
                                        <span className="font-mono text-[#83DF9C] text-[10px]">{t.hero.telemetry.cryptoVal}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#FAF2CA]/80">
                                <div className="flex items-center gap-6">
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> {t.hero.bottom.selfService}
                                    </span>
                                    <span className="hidden sm:flex items-center gap-1.5 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> {t.hero.bottom.resolution}
                                    </span>
                                    <span className="hidden md:flex items-center gap-1.5 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#83DF9C]" /> {t.hero.bottom.standard}
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

            {/* TRUST BAR */}
            <section className="relative z-10 py-6 px-4 border-b border-[#0C3C60]/40">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FAF2CA]/50">
                        {t.trust.label}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#FAF2CA]/70">
                        {t.trust.badges.map((b, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-lg bg-[#082840]/60 border border-[#0C3C60]">{b}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN ALCANCE AGRO CON TRAZO PERIMETRAL EN SCROLL */}
            <ScopeTimeline t={t} />

            {/* ========================================================================= */}
            {/* SECCIÓN UNIFICADA Y CONDENSADA (REEMPLAZA LAS 2 SECCIONES ANTERIORES)      */}
            {/* Combina: 3 Cards Fotográficas + 4 Métricas Clave de Ingeniería en 1 Sola  */}
            {/* ========================================================================= */}
            <section id="plataforma" className="relative z-10 py-20 sm:py-28 px-4 border-t border-[#0C3C60]/50 bg-gradient-to-b from-[#040E17] via-[#082840]/30 to-[#040E17]">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/25">
                                <Zap className="w-3.5 h-3.5 text-[#83DF9C]" />
                                <span>{t.unifiedPlatform.tag}</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                                {t.unifiedPlatform.title1} <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#83DF9C] via-[#FAF2CA] to-[#83DF9C]">
                                    {t.unifiedPlatform.title2}
                                </span>
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-[#FAF2CA]/70 max-w-md">
                            {t.unifiedPlatform.subtitle}
                        </p>
                    </div>

                    {/* Strip de 4 Métricas Clave de Ingeniería (Compacto y Potente) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
                        {t.unifiedPlatform.stats.map((stat, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-[#082840]/70 border border-[#0C3C60] text-center">
                                <div className="text-2xl sm:text-3xl font-black text-[#83DF9C]">{stat.val}</div>
                                <div className="text-xs font-bold text-white mt-1">{stat.label}</div>
                                <div className="text-[10px] text-[#FAF2CA]/60 mt-0.5">{stat.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Las 3 Cards Fotográficas Optimizadas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {t.unifiedPlatform.cards.map((card, idx) => (
                            <div key={idx} className="group rounded-3xl overflow-hidden bg-[#082840]/60 border border-[#0C3C60] hover:border-[#83DF9C]/50 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#082840] via-transparent to-transparent" />
                                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#040E17]/85 backdrop-blur-md text-[10px] font-bold text-[#83DF9C] border border-[#83DF9C]/30">
                                            {card.tag}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                                        <p className="text-xs text-[#FAF2CA]/70 leading-relaxed mb-4">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 pb-6 pt-0 border-t border-[#0C3C60]/40 mt-auto">
                                    <div className="pt-3 flex items-center gap-2 text-[11px] font-medium text-[#83DF9C]">
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        <span>{card.bullet}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN PLANES & PRECIOS */}
            <section id="planes" className="relative z-10 py-16 sm:py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#83DF9C]/25">
                            {t.pricing.tag}
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">
                            {t.pricing.title}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-[#FAF2CA]/75">
                            {t.pricing.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        
                        {/* Plan 1 */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0C3C60]/50 border border-[#0C3C60] flex items-center justify-center text-[#83DF9C]">
                                        <Satellite className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0C3C60]/60 text-[#FAF2CA]/70 border border-[#0C3C60]">
                                        {t.pricing.plans.audit.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{t.pricing.plans.audit.title}</h3>
                                <p className="text-xs text-[#FAF2CA]/65 mb-6">
                                    {t.pricing.plans.audit.subtitle}
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#0C3C60]/60">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-white">{t.pricing.plans.audit.price}</span>
                                        <span className="text-xs text-[#FAF2CA]/60 font-semibold">{t.pricing.plans.audit.unit}</span>
                                    </div>
                                    <div className="text-[11px] text-[#83DF9C] font-medium mt-0.5">
                                        {t.pricing.plans.audit.ref}
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#FAF2CA]/80">
                                    {t.pricing.plans.audit.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/terminal"
                                className="mt-8 w-full py-3 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] hover:text-white text-center transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>{t.pricing.plans.audit.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Plan 2: Featured */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0C3C60]/70 via-[#082840]/90 to-[#082840] border-2 border-[#83DF9C] shadow-2xl shadow-[#83DF9C]/15 flex flex-col justify-between relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#83DF9C] text-[#040E17] text-[10px] font-black uppercase tracking-wider shadow">
                                {t.pricing.plans.walk.popular}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#83DF9C]/15 border border-[#83DF9C]/30 flex items-center justify-center text-[#83DF9C]">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30">
                                        {t.pricing.plans.walk.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{t.pricing.plans.walk.title}</h3>
                                <p className="text-xs text-[#FAF2CA]/65 mb-6">
                                    {t.pricing.plans.walk.subtitle}
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#0C3C60]/60">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-[#83DF9C]">{t.pricing.plans.walk.price}</span>
                                        <span className="text-xs text-[#FAF2CA]/60 font-semibold">{t.pricing.plans.walk.unit}</span>
                                    </div>
                                    <div className="text-[11px] text-[#FAF2CA]/75 font-medium mt-0.5">
                                        {t.pricing.plans.walk.ref}
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#FAF2CA]/90">
                                    {t.pricing.plans.walk.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/terminal"
                                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#040E17] font-black text-xs text-center shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                            >
                                <Compass className="w-4 h-4 text-[#040E17]" />
                                <span>{t.pricing.plans.walk.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#040E17]" />
                            </Link>
                        </div>

                        {/* Plan 3 */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-[#082840]/70 border border-[#0C3C60] hover:border-[#83DF9C]/40 transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#0C3C60]/50 border border-[#0C3C60] flex items-center justify-center text-[#83DF9C]">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#83DF9C]/10 text-[#83DF9C] border border-[#83DF9C]/20">
                                        {t.pricing.plans.corporate.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{t.pricing.plans.corporate.title}</h3>
                                <p className="text-xs text-[#FAF2CA]/65 mb-6">
                                    {t.pricing.plans.corporate.subtitle}
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#0C3C60]/60">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-white">{t.pricing.plans.corporate.price}</span>
                                        <span className="text-xs text-[#FAF2CA]/60 font-semibold">{t.pricing.plans.corporate.unit}</span>
                                    </div>
                                    <div className="text-[11px] text-[#83DF9C] font-semibold mt-0.5">
                                        {t.pricing.plans.corporate.ref}
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#FAF2CA]/80">
                                    {t.pricing.plans.corporate.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#83DF9C] shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href="mailto:support@axistrace.app?subject=AxisTrace%20Corporate%20Pack%20Inquiry"
                                className="mt-8 w-full py-3 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] hover:text-white text-center transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>{t.pricing.plans.corporate.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Strip Adicional */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#082840]/60 border border-[#0C3C60] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] shrink-0">
                                    <PlusCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">{t.pricing.addons.extraHa.title}</h4>
                                    <p className="text-[11px] text-[#FAF2CA]/60">{t.pricing.addons.extraHa.desc}</p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-base font-black text-[#83DF9C]">{t.pricing.addons.extraHa.price}</div>
                                <div className="text-[10px] text-[#FAF2CA]/50">{t.pricing.addons.extraHa.ref}</div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl bg-[#082840]/60 border border-[#0C3C60] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#83DF9C]/10 border border-[#83DF9C]/20 flex items-center justify-center text-[#83DF9C] shrink-0">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">{t.pricing.addons.deliverables.title}</h4>
                                    <p className="text-[11px] text-[#FAF2CA]/60">{t.pricing.addons.deliverables.desc}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30 shrink-0">
                                {t.pricing.addons.deliverables.badge}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="relative z-10 py-16 sm:py-20 px-4 text-center">
                <div className="max-w-2xl mx-auto flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#082840] to-[#040E17] border border-[#83DF9C]/30 shadow-2xl">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">
                        {t.finalCta.title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-[#FAF2CA]/75 max-w-lg">
                        {t.finalCta.subtitle}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link
                            href="/terminal"
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#0c6056] to-[#83DF9C] text-[#040E17] font-black text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <Compass className="w-5 h-5 text-[#040E17]" />
                            <span>{t.finalCta.button}</span>
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
                        <span>EUDR Regulation (EU) 2023/1115</span>
                    </div>
                    <div className="text-[11px] text-[#FAF2CA]/40">
                        © {new Date().getFullYear()} AxisTrace. {t.footer.rights}
                    </div>
                </div>
            </footer>
        </div>
    );
}
