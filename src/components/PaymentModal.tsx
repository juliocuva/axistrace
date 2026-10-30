'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Smartphone, Landmark, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppFloating';

export interface PlanPaymentInfo {
    title: string;
    priceUsd: string;
    priceCop: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: PlanPaymentInfo | null;
    lang: 'en' | 'es';
}

export default function PaymentModal({ isOpen, onClose, plan, lang }: PaymentModalProps) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'nequi' | 'bank' | 'international'>('nequi');

    const nequiNumber = '3013970002';
    const formattedNumber = '301 397 0002';

    const handleCopy = () => {
        navigator.clipboard.writeText(nequiNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const planName = plan?.title || (lang === 'es' ? 'Pase de Caminata Digital' : 'Digital Walk Pass');
    const priceText = plan ? `${plan.priceUsd} (${plan.priceCop})` : '$25 USD (~ 100.000 COP)';

    const waMessage = lang === 'es'
        ? `Hola, realicé/deseo realizar el pago para: *${planName}* por un valor de *${priceText}*. Adjunto datos para activación del lote en AxisTRACE.`
        : `Hello, I made/wish to make the payment for: *${planName}* valued at *${priceText}*. Attached details for parcel activation in AxisTRACE.`;

    const waUrl = `https://wa.me/573013970002?text=${encodeURIComponent(waMessage)}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#082840] via-[#040E17] to-[#02070D] border-2 border-[#83DF9C]/50 shadow-2xl p-6 sm:p-8 z-10 text-white"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                            aria-label="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="mb-6">
                            <span className="px-3 py-1 rounded-full bg-[#83DF9C]/15 border border-[#83DF9C]/30 text-[#83DF9C] text-[10px] font-black uppercase tracking-wider">
                                {lang === 'es' ? 'Activación Inmediata de Predio' : 'Immediate Parcel Activation'}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                                {lang === 'es' ? 'Transferencias & Nequi' : 'Bank Transfers & Nequi'}
                            </h3>
                            <p className="text-xs text-[#FAF2CA]/70 mt-1">
                                {lang === 'es'
                                    ? `Plan a pagar: ${planName} • ${priceText}`
                                    : `Plan to pay: ${planName} • ${priceText}`}
                            </p>
                        </div>

                        {/* Payment Tabs */}
                        <div className="grid grid-cols-3 gap-1 p-1 bg-[#040E17] border border-[#0C3C60] rounded-2xl mb-6 text-xs font-bold">
                            <button
                                onClick={() => setActiveTab('nequi')}
                                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === 'nequi'
                                        ? 'bg-[#0E5A36] text-[#83DF9C] border border-[#83DF9C]/50 shadow-lg'
                                        : 'text-[#FAF2CA]/60 hover:text-white'
                                }`}
                            >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>Nequi</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('bank')}
                                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === 'bank'
                                        ? 'bg-[#83DF9C] text-[#040E17] shadow-lg'
                                        : 'text-[#FAF2CA]/60 hover:text-white'
                                }`}
                            >
                                <Landmark className="w-3.5 h-3.5" />
                                <span>{lang === 'es' ? 'Bancolombia' : 'Local Bank'}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('international')}
                                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === 'international'
                                        ? 'bg-[#0C3C60] text-white shadow-lg'
                                        : 'text-[#FAF2CA]/60 hover:text-white'
                                }`}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span>{lang === 'es' ? 'Internacional' : 'Intl USD'}</span>
                            </button>
                        </div>

                        {/* Tab Content: NEQUI */}
                        {activeTab === 'nequi' && (
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#082840]/90 to-[#04131d]/95 border border-[#83DF9C]/40 mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#0E5A36] border border-[#83DF9C]/50 flex items-center justify-center text-[#83DF9C] font-black text-xs">
                                            N
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">Nequi / Transfiya Colombia</div>
                                            <div className="text-[10px] text-white/60">Acepta pagos desde cualquier banco vía Transfiya</div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#83DF9C]/15 text-[#83DF9C] border border-[#83DF9C]/30">
                                        Sin comisión
                                    </span>
                                </div>

                                <div className="mt-4 p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                                            {lang === 'es' ? 'Número de Cuenta Nequi' : 'Nequi Account Number'}
                                        </div>
                                        <div className="text-xl sm:text-2xl font-mono font-black text-[#83DF9C] tracking-wider mt-0.5">
                                            {formattedNumber}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E5A36] hover:bg-[#0A4529] text-white text-xs font-bold transition-all shadow border border-[#83DF9C]/40"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-[#83DF9C]" /> : <Copy className="w-3.5 h-3.5 text-[#83DF9C]" />}
                                        <span>{copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar' : 'Copy')}</span>
                                    </button>
                                </div>

                                <div className="mt-4 space-y-1.5 text-[11px] text-[#FAF2CA]/80">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-4 h-4 rounded-full bg-[#83DF9C]/20 text-[#83DF9C] flex items-center justify-center text-[10px] font-bold">1</span>
                                        <span>{lang === 'es' ? 'Abre tu app Nequi o tu banco habitual (Transfiya).' : 'Open your Nequi app or any bank with Transfiya.'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-4 h-4 rounded-full bg-[#83DF9C]/20 text-[#83DF9C] flex items-center justify-center text-[10px] font-bold">2</span>
                                        <span>{lang === 'es' ? `Envía el valor exacto: ${priceText}.` : `Transfer exact amount: ${priceText}.`}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-4 h-4 rounded-full bg-[#83DF9C]/20 text-[#83DF9C] flex items-center justify-center text-[10px] font-bold">3</span>
                                        <span>{lang === 'es' ? 'Envía el pantallazo al WhatsApp para activar tu predio en 2 minutos.' : 'Send screenshot via WhatsApp for 2-min activation.'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab Content: BANCOLOMBIA */}
                        {activeTab === 'bank' && (
                            <div className="p-5 rounded-2xl bg-[#082840]/80 border border-[#83DF9C]/30 mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#FDDA24] flex items-center justify-center text-[#040E17] font-black text-xs">
                                            B
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">Transferencia Bancolombia / Red ACH</div>
                                            <div className="text-[10px] text-[#FAF2CA]/60">Cuenta de Ahorros & Facturación Electrónica</div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#83DF9C]/20 text-[#83DF9C] border border-[#83DF9C]/40">
                                        Colombia
                                    </span>
                                </div>

                                <div className="mt-3 p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                                    <div className="flex justify-between items-center py-1 border-b border-white/10">
                                        <span className="text-[#FAF2CA]/60">{lang === 'es' ? 'Banco:' : 'Bank:'}</span>
                                        <span className="font-bold text-white">Bancolombia</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-white/10">
                                        <span className="text-[#FAF2CA]/60">{lang === 'es' ? 'Línea de Transferencia Rápida:' : 'Quick Transfer Line:'}</span>
                                        <span className="font-mono font-bold text-[#83DF9C]">{formattedNumber}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-[#FAF2CA]/60">{lang === 'es' ? 'Factura / RUT Empresa:' : 'Corporate Invoice:'}</span>
                                        <span className="font-semibold text-white">{lang === 'es' ? 'Disponible vía WhatsApp' : 'Available on WhatsApp'}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-[#FAF2CA]/70 mt-3">
                                    {lang === 'es'
                                        ? 'Para transferencias empresariales o pagos de cooperativas por bolsa masiva, coordinamos la factura oficial por WhatsApp.'
                                        : 'For bulk cooperative or corporate bank wire transfers, we coordinate official invoices directly.'}
                                </p>
                            </div>
                        )}

                        {/* Tab Content: INTERNATIONAL */}
                        {activeTab === 'international' && (
                            <div className="p-5 rounded-2xl bg-[#082840]/80 border border-[#0C3C60] mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#0C3C60] flex items-center justify-center text-white font-black text-xs">
                                            $
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">International Wire / Card (USD)</div>
                                            <div className="text-[10px] text-[#FAF2CA]/60">Credit Card, Wise & SWIFT Clearance</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FAF2CA]/80 space-y-2">
                                    <p>
                                        {lang === 'es'
                                            ? 'Para clientes en Europa, Norteamérica o pagos en dólares (USD), facilitamos enlace de pago con tarjeta de crédito o cuenta Wise/SWIFT internacional.'
                                            : 'For customers in Europe, North America, or overseas cooperatives, we provide direct credit card checkout links and international Wise/SWIFT bank details.'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action WhatsApp Button */}
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                        >
                            <WhatsAppIcon className="w-5 h-5 fill-current" />
                            <span>{lang === 'es' ? 'Enviar Comprobante por WhatsApp' : 'Send Receipt on WhatsApp'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>

                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#FAF2CA]/50 font-medium text-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#83DF9C]" />
                            <span>
                                {lang === 'es'
                                    ? 'Activación garantizada con soporte directo al WhatsApp +57 301 397 0002'
                                    : 'Guaranteed activation with direct support at WhatsApp +57 301 397 0002'}
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
