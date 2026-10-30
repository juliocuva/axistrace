import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#061826] text-[#FAF2CA] flex flex-col items-center justify-center p-4 selection:bg-[#83DF9C] selection:text-[#0C3C60]">
            <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#082840]/80 border border-[#0C3C60] shadow-2xl flex flex-col items-center">
                <div className="h-10 mb-6">
                    <Image
                        src="/logo-axistrace-light.svg"
                        alt="AxisTrace"
                        width={160}
                        height={50}
                        className="h-10 w-auto object-contain"
                    />
                </div>
                <div className="text-5xl font-black text-[#83DF9C] mb-2">404</div>
                <h1 className="text-xl font-bold text-white mb-2">Página No Encontrada</h1>
                <p className="text-xs text-[#FAF2CA]/70 mb-6">
                    La coordenada o ruta que buscas no existe en el sistema de georreferenciación.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                        href="/"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0C3C60]/60 hover:bg-[#0C3C60] border border-[#0C3C60] text-xs font-bold text-[#FAF2CA] flex items-center justify-center gap-2 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#83DF9C]" />
                        <span>Ir a Portada</span>
                    </Link>
                    <Link
                        href="/terminal"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#83DF9C] hover:bg-[#9cf0b3] text-xs font-bold text-[#061826] flex items-center justify-center gap-2 transition-all"
                    >
                        <Compass className="w-4 h-4 text-[#061826]" />
                        <span>Abrir Terminal</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
