'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppFloatingProps {
    lang: 'en' | 'es';
}

export function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
    );
}

export default function WhatsAppFloating({ lang }: WhatsAppFloatingProps) {
    const [isHovered, setIsHovered] = useState(false);

    const defaultMsg = lang === 'es'
        ? 'Hola, me gustaría recibir más información y asesoría sobre georreferenciación EUDR con AxisTRACE.'
        : 'Hello, I would like more information and advisory on AxisTRACE EUDR georeferencing.';

    const tooltipTitle = lang === 'es' ? '¿Tienes dudas sobre tu predio?' : 'Questions about your farm?';
    const tooltipAction = lang === 'es' ? 'Chatear por WhatsApp (+57 301 397 0002)' : 'Chat on WhatsApp (+57 301 397 0002)';

    const waHref = `https://wa.me/573013970002?text=${encodeURIComponent(defaultMsg)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {/* Tooltip visible on hover / focus */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="hidden sm:flex flex-col bg-[#040E17]/95 backdrop-blur-md border border-[#25D366]/40 text-white rounded-2xl py-2 px-3.5 shadow-2xl shadow-black/60 pointer-events-none"
                    >
                        <span className="text-[11px] font-bold text-[#25D366]">{tooltipTitle}</span>
                        <span className="text-[12px] text-white/90 font-medium">{tooltipAction}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-[#25D366]/35 hover:shadow-[#25D366]/60 hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="WhatsApp Contact"
            >
                {/* Ping animado */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#83DF9C] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#83DF9C] border-2 border-[#040E17]"></span>
                </span>

                <WhatsAppIcon className="w-7 h-7 text-white fill-current" />
            </a>
        </div>
    );
}
