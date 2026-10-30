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
    Zap,
    CreditCard,
    Landmark
} from 'lucide-react';
import { translations, Language } from '@/translations/content';
import ScopeTimeline from '@/components/ScopeTimeline';
import WhatsAppFloating, { WhatsAppIcon } from '@/components/WhatsAppFloating';
import PaymentModal, { PlanPaymentInfo, BancolombiaIcon, NequiIcon } from '@/components/PaymentModal';

export default function LandingPage() {
    const [lang, setLang] = useState<Language>('en');
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentModalTab, setPaymentModalTab] = useState<'nequi' | 'bank' | 'international'>('nequi');
    const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PlanPaymentInfo | null>(null);
    const t = translations[lang];

    const openPaymentForPlan = (
        title: string,
        priceUsd: string,
        priceCop: string,
        tab: 'nequi' | 'bank' | 'international' = 'nequi'
    ) => {
        setSelectedPlanForPayment({ title, priceUsd, priceCop });
        setPaymentModalTab(tab);
        setPaymentModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#040E17] text-[#FAF2CA] flex flex-col selection:bg-[#83DF9C] selection:text-[#0C3C60] font-sans overflow-x-clip">
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-[#00594C] via-[#0C3C60] to-[#082840] border-b border-[#83DF9C]/20 px-4 py-2 text-center text-[11px] font-semibold text-[#FAF2CA] flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#83DF9C] animate-pulse" />
                <span>{t.banner.title}</span>
                <span className="hidden sm:inline text-[#83DF9C]">•</span>
                <span className="hidden sm:inline text-[#FAF2CA]/80">{t.banner.subtitle}</span>
            </div>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-[#040E17]/95 backdrop-blur-xl border-b border-[#0C3C60]/80 px-4 py-3.5 transition-all shadow-xl">
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

                        <a
                            href={`https://wa.me/573013970002?text=${encodeURIComponent(
                                lang === 'es'
                                    ? 'Hola, me gustaría contactarme para recibir más información y asesoría sobre georreferenciación EUDR con AxisTRACE.'
                                    : 'Hello, I would like to contact you for more information and advisory on AxisTRACE EUDR georeferencing.'
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF2CA] text-[#040E17] font-black text-xs transition-all shadow-md hover:scale-[1.03] border border-white/30"
                            title="WhatsApp: +57 301 397 0002"
                        >
                            <WhatsAppIcon className="w-4 h-4 text-[#040E17] fill-current" />
                            <span>{lang === 'es' ? 'Contáctame' : 'Contact me'}</span>
                        </a>

                        <Link
                            href="/terminal"
                            className="px-4 py-2 rounded-xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#040E17] font-extrabold text-xs shadow-lg shadow-[#83DF9C]/20 hover:scale-[1.03] transition-all flex items-center gap-1.5"
                        >
                            <Compass className="w-4 h-4 text-[#040E17]" />
                            <span>{t.nav.terminal}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#040E17]" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION (FULL WIDTH EDGE-TO-EDGE, SIN BORDES REDONDEADOS) */}
            <section className="relative z-10 w-full overflow-hidden border-b border-[#0C3C60]/50">
                {/* Full-bleed Landscape Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-agritech.jpg"
                        alt="AxisTrace Precision Landscape"
                        fill
                        priority
                        className="object-cover object-center filter brightness-[0.88] contrast-[1.08]"
                    />
                    {/* Balanced overlays: soft fade on bottom to merge with next section, subtle side gradient for crystal-clear readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#040E17]/80 via-[#040E17]/40 to-transparent sm:w-3/5" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-14 sm:pb-20 flex flex-col justify-between min-h-[620px] sm:min-h-[680px]">
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

                    {/* Strip de 3 Métricas Clave de Ingeniería (Sin recuadro) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 py-6 mb-12 border-y border-[#0C3C60]/40">
                        {t.unifiedPlatform.stats.map((stat, idx) => (
                            <div key={idx} className="text-center md:text-left md:pl-6 md:border-l first:border-l-0 border-[#0C3C60]/60">
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#83DF9C] tracking-tight">{stat.val}</div>
                                <div className="text-sm sm:text-base font-bold text-white mt-1.5">{stat.label}</div>
                                <div className="text-xs text-[#FAF2CA]/65 mt-0.5">{stat.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Las 3 Cards de Plataforma (Diseño Minimalista High-Tech sin Imágenes) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {t.unifiedPlatform.cards.map((card, idx) => {
                            const icons = [
                                <Smartphone key="0" className="w-5 h-5" />,
                                <Satellite key="1" className="w-5 h-5" />,
                                <ShieldCheck key="2" className="w-5 h-5" />
                            ];
                            return (
                                <div 
                                    key={idx} 
                                    className="group rounded-3xl p-7 bg-gradient-to-b from-[#082840]/90 to-[#040E17]/90 border border-[#0C3C60] hover:border-[#83DF9C]/60 hover:shadow-2xl hover:shadow-[#83DF9C]/10 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Top Icon & Tag */}
                                        <div className="flex items-center justify-between gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-[#83DF9C]/10 border border-[#83DF9C]/30 text-[#83DF9C] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#83DF9C] group-hover:text-[#040E17] transition-all duration-300">
                                                {icons[idx] || <CheckCircle2 className="w-5 h-5" />}
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-[#040E17] border border-[#0C3C60] text-[10px] font-bold text-[#83DF9C] tracking-wide">
                                                {card.tag}
                                            </div>
                                        </div>

                                        {/* Text Info */}
                                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#83DF9C] transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-[#FAF2CA]/70 leading-relaxed mb-6">
                                            {card.desc}
                                        </p>
                                    </div>

                                    {/* Bottom Bullet */}
                                    <div className="pt-4 border-t border-[#0C3C60]/60">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-[#83DF9C]">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                                            <span>{card.bullet}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECCIÓN PLANES & PRECIOS (Fondo Claro Elegante) */}
            <section id="planes" className="relative z-10 py-20 sm:py-28 px-4 bg-gradient-to-b from-[#F9F6EA] via-[#FAF3DB] to-[#F2EAD0] text-[#082840] border-y border-[#E5DAC0]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#082840]/10 text-[#082840] text-xs font-bold uppercase tracking-wider mb-3 border border-[#082840]/20">
                            {t.pricing.tag}
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-[#082840]">
                            {t.pricing.title}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-[#0C3C60]/80">
                            {t.pricing.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">

                        {/* Plan 2: Featured (Tarjeta Oscura Destacada para Máximo Contraste) */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-[#082840] text-white border-2 border-[#83DF9C] shadow-2xl shadow-[#082840]/30 flex flex-col justify-between relative scale-[1.02]">
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

                            <div className="mt-8">
                                <Link
                                    href="/terminal"
                                    className="w-full py-3.5 px-4 rounded-xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#040E17] font-black text-xs text-center shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                                >
                                    <Compass className="w-4 h-4 text-[#040E17]" />
                                    <span>{t.pricing.plans.walk.cta}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-[#040E17]" />
                                </Link>

                                <button
                                    onClick={() => openPaymentForPlan(
                                        t.pricing.plans.walk.title,
                                        t.pricing.plans.walk.price,
                                        t.pricing.plans.walk.ref
                                    )}
                                    className="mt-2.5 w-full py-2.5 px-3 rounded-xl bg-[#E6EAEC] hover:bg-white border border-[#082840]/20 text-[11px] font-bold text-[#082840] text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Image src="/images/nequi-dark.png" alt="Nequi" width={52} height={18} className="h-3.5 w-auto object-contain mr-1" />
                                    <span>{lang === 'es' ? 'Transferencia' : 'Transfer'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Plan 3 */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#082840]/15 shadow-xl shadow-[#082840]/5 flex flex-col justify-between text-[#082840]">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#082840]/10 border border-[#082840]/15 flex items-center justify-center text-[#082840]">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#082840]/10 text-[#082840] border border-[#082840]/20">
                                        {t.pricing.plans.corporate.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-[#082840] mb-1">{t.pricing.plans.corporate.title}</h3>
                                <p className="text-xs text-[#0C3C60]/75 mb-6">
                                    {t.pricing.plans.corporate.subtitle}
                                </p>
                                
                                <div className="mb-6 pb-6 border-b border-[#082840]/15">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-[#082840]">{t.pricing.plans.corporate.price}</span>
                                        <span className="text-xs text-[#0C3C60]/70 font-semibold">{t.pricing.plans.corporate.unit}</span>
                                    </div>
                                    <div className="text-[11px] text-[#0C6056] font-bold mt-0.5">
                                        {t.pricing.plans.corporate.ref}
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-xs text-[#082840]/85">
                                    {t.pricing.plans.corporate.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#0C6056] shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <a
                                    href={t.pricing.plans.corporate.ctaHref || `https://wa.me/573013970002?text=${encodeURIComponent(
                                        lang === 'es'
                                            ? 'Hola, me interesa adquirir la Bolsa Corporativa (100 predios) de AxisTRACE.'
                                            : 'Hello, I am interested in the Corporate Bulk Pack (100 lots) for AxisTRACE.'
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 px-4 rounded-xl bg-[#082840] hover:bg-[#0C3C60] text-xs font-black text-white text-center transition-all flex items-center justify-center gap-2 group shadow-md"
                                >
                                    <WhatsAppIcon className="w-4 h-4 text-white fill-current group-hover:scale-110 transition-transform" />
                                    <span>{lang === 'es' ? 'Contactar por WhatsApp' : 'Chat on WhatsApp'}</span>
                                </a>

                                <button
                                    onClick={() => openPaymentForPlan(
                                        t.pricing.plans.corporate.title,
                                        t.pricing.plans.corporate.price,
                                        t.pricing.plans.corporate.ref,
                                        'bank'
                                    )}
                                    className="mt-2.5 w-full py-2.5 px-3 rounded-xl bg-[#082840]/10 hover:bg-[#082840]/15 border border-[#082840]/20 text-[11px] font-bold text-[#082840] text-center transition-all flex items-center justify-center gap-1.5"
                                >
                                    <Image src="/images/bancolombia-dark.png" alt="Bancolombia" width={75} height={18} className="h-3.5 w-auto object-contain mr-1" />
                                    <span>{lang === 'es' ? 'Transferencia Bancaria / Factura' : 'Bank Wire / Invoice'}</span>
                                </button>
                            </div>
                        </div>
                    </div>




                </div>
            </section>

            {/* CTA FINAL */}
            <section className="relative z-10 py-36 sm:py-52 px-4 text-center overflow-hidden">
                {/* Full-width Section Background Image showing the mountain peaks clearly */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-agritech.jpg"
                        alt="AxisTrace Agritech Mountain Field"
                        fill
                        className="object-cover object-[center_25%] sm:object-top filter brightness-[0.92] contrast-[1.08]"
                    />
                    {/* Minimal overlays so the mountain and sky are clearly visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02070D] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#040E17]/50 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] tracking-tight">
                        {t.finalCta.title}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-[#FAF2CA] font-medium max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] leading-relaxed">
                        {t.finalCta.subtitle}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                        <Link
                            href="/terminal"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#040E17] font-black text-sm shadow-xl shadow-[#83DF9C]/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <Compass className="w-5 h-5 text-[#040E17]" />
                            <span>{t.finalCta.button}</span>
                            <ArrowRight className="w-4 h-4 text-[#040E17]" />
                        </Link>
                        <a
                            href={`https://wa.me/573013970002?text=${encodeURIComponent(
                                lang === 'es'
                                    ? 'Hola, me gustaría contactarme para recibir más información y asesoría sobre georreferenciación EUDR con AxisTRACE.'
                                    : 'Hello, I would like to contact you for more information and advisory on AxisTRACE EUDR georeferencing.'
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-[#FAF2CA] text-[#040E17] font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 border border-white/40"
                        >
                            <WhatsAppIcon className="w-5 h-5 text-[#040E17] fill-current" />
                            <span>{lang === 'es' ? 'Contáctame' : 'Contact me'}</span>
                        </a>
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
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] text-[#FAF2CA]/50">
                        <span>© {new Date().getFullYear()} AxisTrace. {t.footer.rights}</span>
                        <span className="hidden sm:inline text-[#0C3C60]">•</span>
                        <a 
                            href="https://mouselab.dev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#FAF2CA]/70 hover:text-[#83DF9C] transition-colors font-medium flex items-center gap-1 group"
                        >
                            <span>{lang === 'es' ? 'Desarrollado por' : 'Developed by'}</span>
                            <span className="font-bold text-white group-hover:text-[#83DF9C] underline underline-offset-4 decoration-[#83DF9C]/50 group-hover:decoration-[#83DF9C] transition-all">Mouselab</span>
                        </a>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Widget */}
            <WhatsAppFloating lang={lang} />

            {/* Modal de Pagos Nequi & Transferencias */}
            <PaymentModal
                isOpen={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                plan={selectedPlanForPayment}
                lang={lang}
                defaultTab={paymentModalTab}
            />
        </div>
    );
}
