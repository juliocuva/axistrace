'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coffee, TreePine, Sparkles, ShieldCheck, Compass, ArrowRight } from 'lucide-react';

interface ScopeTimelineProps {
    t: any;
}

export default function ScopeTimeline({ t }: ScopeTimelineProps) {
    return (
        <section id="alcance" className="relative z-10 py-24 sm:py-32 px-4 bg-gradient-to-b from-[#040E17] via-[#061826] to-[#040E17] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header animado */}
                <motion.div 
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-20 sm:mb-28"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#83DF9C]/10 text-[#83DF9C] text-xs font-bold uppercase tracking-wider mb-4 border border-[#83DF9C]/25 shadow">
                        <Compass className="w-4 h-4 text-[#83DF9C]" />
                        <span>{t.scope.tag}</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                        {t.scope.title1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#83DF9C] via-[#FAF2CA] to-[#83DF9C]">
                            {t.scope.title2}
                        </span>
                    </h2>
                    <p className="mt-4 text-xs sm:text-sm md:text-base text-[#FAF2CA]/70 leading-relaxed">
                        {t.scope.subtitle}
                    </p>
                </motion.div>

                {/* Timeline Container con el Trazo Vectorial Zig-Zag Flotante por Encima */}
                <div className="relative">
                    
                    {/* TRAZO VECTORIAL ZIG-ZAG DINÁMICO POR ENCIMA DE LAS FOTOS (z-30) */}
                    <div className="hidden lg:block absolute inset-0 z-30 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1152 2450" fill="none" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="traceGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#83DF9C" stopOpacity="0.9" />
                                    <stop offset="50%" stopColor="#FAF2CA" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#83DF9C" stopOpacity="1" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            {/* Línea Zig-Zag que cruza sobre las imágenes de un lado al otro */}
                            <path
                                d="M 288,140 
                                   L 864,620 
                                   L 288,1100 
                                   L 864,1580 
                                   L 576,2040"
                                stroke="url(#traceGlow)"
                                strokeWidth="4.5"
                                strokeDasharray="12 12"
                                strokeLinecap="round"
                                filter="url(#glow)"
                                className="animate-pulse"
                            />
                        </svg>
                    </div>

                    <div className="space-y-24 sm:space-y-36 relative z-10">
                        
                        {/* ========================================================= */}
                        {/* ITEM 1: CAFÉ (Foto izquierda entra de izq, texto entra fade) */}
                        {/* ========================================================= */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Nodo GPS #11 */}
                            <motion.div 
                                initial={{ scale: 0, rotate: -45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#040E17] border-4 border-[#83DF9C] items-center justify-center text-sm font-black text-[#83DF9C] shadow-[0_0_20px_rgba(131,223,156,0.6)] z-40"
                            >
                                {t.scope.items.coffee.node}
                            </motion.div>

                            {/* Imagen Izquierda (Entra deslizándose desde la izquierda) */}
                            <motion.div 
                                initial={{ opacity: 0, x: -80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.75, ease: "easeOut" }}
                                className="lg:col-span-6 relative z-20"
                            >
                                <div className="relative rounded-3xl overflow-hidden border-2 border-[#0C3C60] hover:border-[#83DF9C]/60 transition-all shadow-2xl group h-72 sm:h-84">
                                    <Image
                                        src="/images/coffee-plantation.jpg"
                                        alt={t.scope.items.coffee.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/25 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                                        <span className="w-8 h-8 rounded-full bg-[#83DF9C] text-[#040E17] font-black text-xs flex items-center justify-center shadow">
                                            {t.scope.items.coffee.node}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-[#040E17]/85 backdrop-blur-md text-xs font-bold text-white border border-[#83DF9C]/30">
                                            {t.scope.items.coffee.badge}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Texto Derecha (Título fade desde arriba, párrafos desde abajo) */}
                            <div className="lg:col-span-6 lg:pl-10 relative z-20">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#83DF9C] mb-2"
                                >
                                    <Coffee className="w-4 h-4" /> {t.scope.items.coffee.tag}
                                </motion.div>

                                <motion.h3 
                                    initial={{ opacity: 0, y: -25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.2 }}
                                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                                >
                                    {t.scope.items.coffee.title}
                                </motion.h3>

                                <motion.p 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.3 }}
                                    className="mt-3 text-xs sm:text-sm text-[#FAF2CA]/75 leading-relaxed"
                                >
                                    {t.scope.items.coffee.desc}
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-[#83DF9C]"
                                >
                                    {t.scope.items.coffee.pills.map((p: string, idx: number) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0C3C60]/50 border border-[#0C3C60]">{p}</span>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* ========================================================= */}
                        {/* ITEM 2: CACAO (Foto derecha entra de der, texto entra fade) */}
                        {/* ========================================================= */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Nodo GPS #22 */}
                            <motion.div 
                                initial={{ scale: 0, rotate: 45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#040E17] border-4 border-[#83DF9C] items-center justify-center text-sm font-black text-[#83DF9C] shadow-[0_0_20px_rgba(131,223,156,0.6)] z-40"
                            >
                                {t.scope.items.cacao.node}
                            </motion.div>

                            {/* Texto Izquierda */}
                            <div className="lg:col-span-6 order-2 lg:order-1 lg:pr-10 lg:text-right relative z-20">
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="flex items-center lg:justify-end gap-2 text-xs font-bold uppercase tracking-wider text-[#83DF9C] mb-2"
                                >
                                    <TreePine className="w-4 h-4" /> {t.scope.items.cacao.tag}
                                </motion.div>

                                <motion.h3 
                                    initial={{ opacity: 0, y: -25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.2 }}
                                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                                >
                                    {t.scope.items.cacao.title}
                                </motion.h3>

                                <motion.p 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.3 }}
                                    className="mt-3 text-xs sm:text-sm text-[#FAF2CA]/75 leading-relaxed"
                                >
                                    {t.scope.items.cacao.desc}
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mt-4 flex flex-wrap lg:justify-end gap-2 text-[11px] font-semibold text-[#83DF9C]"
                                >
                                    {t.scope.items.cacao.pills.map((p: string, idx: number) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0C3C60]/50 border border-[#0C3C60]">{p}</span>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Imagen Derecha (Entra deslizándose desde la derecha) */}
                            <motion.div 
                                initial={{ opacity: 0, x: 80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.75, ease: "easeOut" }}
                                className="lg:col-span-6 order-1 lg:order-2 relative z-20"
                            >
                                <div className="relative rounded-3xl overflow-hidden border-2 border-[#0C3C60] hover:border-[#83DF9C]/60 transition-all shadow-2xl group h-72 sm:h-84">
                                    <Image
                                        src="/images/cacao-plantation.jpg"
                                        alt={t.scope.items.cacao.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/25 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                                        <span className="w-8 h-8 rounded-full bg-[#83DF9C] text-[#040E17] font-black text-xs flex items-center justify-center shadow">
                                            {t.scope.items.cacao.node}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-[#040E17]/85 backdrop-blur-md text-xs font-bold text-white border border-[#83DF9C]/30">
                                            {t.scope.items.cacao.badge}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ========================================================= */}
                        {/* ITEM 3: PALMA DE ACEITE (Foto izquierda entra de izq)    */}
                        {/* ========================================================= */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Nodo GPS #35 */}
                            <motion.div 
                                initial={{ scale: 0, rotate: -45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#040E17] border-4 border-[#83DF9C] items-center justify-center text-sm font-black text-[#83DF9C] shadow-[0_0_20px_rgba(131,223,156,0.6)] z-40"
                            >
                                {t.scope.items.palm.node}
                            </motion.div>

                            {/* Imagen Izquierda */}
                            <motion.div 
                                initial={{ opacity: 0, x: -80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.75, ease: "easeOut" }}
                                className="lg:col-span-6 relative z-20"
                            >
                                <div className="relative rounded-3xl overflow-hidden border-2 border-[#0C3C60] hover:border-[#83DF9C]/60 transition-all shadow-2xl group h-72 sm:h-84">
                                    <Image
                                        src="/images/palm-plantation.jpg"
                                        alt={t.scope.items.palm.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/25 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                                        <span className="w-8 h-8 rounded-full bg-[#83DF9C] text-[#040E17] font-black text-xs flex items-center justify-center shadow">
                                            {t.scope.items.palm.node}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-[#040E17]/85 backdrop-blur-md text-xs font-bold text-white border border-[#83DF9C]/30">
                                            {t.scope.items.palm.badge}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Texto Derecha */}
                            <div className="lg:col-span-6 lg:pl-10 relative z-20">
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#83DF9C] mb-2"
                                >
                                    <Sparkles className="w-4 h-4" /> {t.scope.items.palm.tag}
                                </motion.div>

                                <motion.h3 
                                    initial={{ opacity: 0, y: -25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.2 }}
                                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                                >
                                    {t.scope.items.palm.title}
                                </motion.h3>

                                <motion.p 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.3 }}
                                    className="mt-3 text-xs sm:text-sm text-[#FAF2CA]/75 leading-relaxed"
                                >
                                    {t.scope.items.palm.desc}
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-[#83DF9C]"
                                >
                                    {t.scope.items.palm.pills.map((p: string, idx: number) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0C3C60]/50 border border-[#0C3C60]">{p}</span>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* ========================================================= */}
                        {/* ITEM 4: GANADERÍA (Foto derecha entra de der)            */}
                        {/* ========================================================= */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Nodo GPS #48 */}
                            <motion.div 
                                initial={{ scale: 0, rotate: 45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#040E17] border-4 border-[#83DF9C] items-center justify-center text-sm font-black text-[#83DF9C] shadow-[0_0_20px_rgba(131,223,156,0.6)] z-40"
                            >
                                {t.scope.items.cattle.node}
                            </motion.div>

                            {/* Texto Izquierda */}
                            <div className="lg:col-span-6 order-2 lg:order-1 lg:pr-10 lg:text-right relative z-20">
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="flex items-center lg:justify-end gap-2 text-xs font-bold uppercase tracking-wider text-[#83DF9C] mb-2"
                                >
                                    <ShieldCheck className="w-4 h-4" /> {t.scope.items.cattle.tag}
                                </motion.div>

                                <motion.h3 
                                    initial={{ opacity: 0, y: -25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.2 }}
                                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                                >
                                    {t.scope.items.cattle.title}
                                </motion.h3>

                                <motion.p 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: 0.3 }}
                                    className="mt-3 text-xs sm:text-sm text-[#FAF2CA]/75 leading-relaxed"
                                >
                                    {t.scope.items.cattle.desc}
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mt-4 flex flex-wrap lg:justify-end gap-2 text-[11px] font-semibold text-[#83DF9C]"
                                >
                                    {t.scope.items.cattle.pills.map((p: string, idx: number) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0C3C60]/50 border border-[#0C3C60]">{p}</span>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Imagen Derecha */}
                            <motion.div 
                                initial={{ opacity: 0, x: 80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.75, ease: "easeOut" }}
                                className="lg:col-span-6 order-1 lg:order-2 relative z-20"
                            >
                                <div className="relative rounded-3xl overflow-hidden border-2 border-[#0C3C60] hover:border-[#83DF9C]/60 transition-all shadow-2xl group h-72 sm:h-84">
                                    <Image
                                        src="/images/cattle-ranching.jpg"
                                        alt={t.scope.items.cattle.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/25 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                                        <span className="w-8 h-8 rounded-full bg-[#83DF9C] text-[#040E17] font-black text-xs flex items-center justify-center shadow">
                                            {t.scope.items.cattle.node}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-[#040E17]/85 backdrop-blur-md text-xs font-bold text-white border border-[#83DF9C]/30">
                                            {t.scope.items.cattle.badge}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ========================================================= */}
                        {/* ITEM 5: GRAN CIERRE DE CAMINATA (Agrónomo en el centro)   */}
                        {/* ========================================================= */}
                        <div className="relative pt-12">
                            {/* Nodo GPS #58 */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -top-2 w-14 h-14 rounded-full bg-[#83DF9C] border-4 border-[#040E17] items-center justify-center text-base font-black text-[#040E17] shadow-[0_0_25px_rgba(131,223,156,0.8)] z-40"
                            >
                                {t.scope.items.closing.node}
                            </motion.div>

                            {/* Card Gigante Animada */}
                            <motion.div 
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.85, ease: "easeOut" }}
                                className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border-2 border-[#83DF9C]/60 shadow-2xl bg-[#082840]/90 z-20"
                            >
                                <div className="relative h-[480px] sm:h-[530px] w-full">
                                    <Image
                                        src="/images/agronomist-walking.jpg"
                                        alt="Agronomist field surveyor"
                                        fill
                                        className="object-cover object-center filter brightness-[0.72] contrast-[1.1]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E17] via-[#040E17]/50 to-transparent" />
                                    
                                    <div className="absolute inset-0 p-6 sm:p-12 md:p-16 flex flex-col justify-end text-center items-center">
                                        <motion.div 
                                            initial={{ opacity: 0, y: -15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C] text-[#040E17] text-xs font-black uppercase tracking-wider mb-4 shadow-lg"
                                        >
                                            <span>{t.scope.items.closing.badge}</span>
                                        </motion.div>

                                        <motion.h3 
                                            initial={{ opacity: 0, y: -25 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.65, delay: 0.3 }}
                                            className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl"
                                        >
                                            {t.scope.items.closing.question}
                                        </motion.h3>

                                        <motion.p 
                                            initial={{ opacity: 0, y: 25 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.65, delay: 0.4 }}
                                            className="mt-4 text-xs sm:text-sm md:text-base text-[#FAF2CA]/90 font-medium max-w-2xl leading-relaxed"
                                        >
                                            {t.scope.items.closing.desc}
                                        </motion.p>

                                        <motion.div 
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7, delay: 0.5 }}
                                            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
                                        >
                                            <Link
                                                href="/terminal"
                                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-[#040E17] font-black text-sm shadow-xl shadow-[#83DF9C]/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Compass className="w-5 h-5 text-[#040E17]" />
                                                <span>{t.scope.items.closing.ctaPrimary}</span>
                                                <ArrowRight className="w-4 h-4 text-[#040E17]" />
                                            </Link>
                                            <a
                                                href={t.scope.items.closing.ctaSecondaryHref || "#planes"}
                                                target={t.scope.items.closing.ctaSecondaryHref ? "_blank" : undefined}
                                                rel={t.scope.items.closing.ctaSecondaryHref ? "noopener noreferrer" : undefined}
                                                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#040E17]/80 hover:bg-[#040E17] border border-[#25D366]/60 hover:border-[#25D366] text-xs font-bold text-white transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#25D366]/10"
                                            >
                                                <svg className="w-4 h-4 text-[#25D366] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                                </svg>
                                                <span>{t.scope.items.closing.ctaSecondary}</span>
                                            </a>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
