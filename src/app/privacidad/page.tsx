'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Lock, ArrowLeft, Globe, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
    const [lang, setLang] = useState<'es' | 'en'>('es');
    const isEn = lang === 'en';

    return (
        <div className="min-h-screen bg-[#082840] text-white flex flex-col font-sans selection:bg-[#83DF9C] selection:text-[#0C3C60]">
            {/* Header */}
            <header className="border-b border-[#0C3C60] bg-[#040E17]/90 backdrop-blur-md sticky top-0 z-30 px-4 py-3.5">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-4 h-4 text-[#83DF9C]" />
                        <Image
                            src="/logo-axistrace-light.svg"
                            alt="AxisTrace"
                            width={110}
                            height={32}
                            className="h-6 w-auto object-contain"
                        />
                    </Link>

                    {/* Language Switch */}
                    <div className="flex items-center gap-2 bg-[#0C3C60]/80 p-1 rounded-xl border border-white/10 text-xs">
                        <button
                            onClick={() => setLang('es')}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                                !isEn ? 'bg-[#83DF9C] text-[#0C3C60]' : 'text-white/60 hover:text-white'
                            }`}
                        >
                            ES
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                                isEn ? 'bg-[#83DF9C] text-[#0C3C60]' : 'text-white/60 hover:text-white'
                            }`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto p-4 sm:p-8 flex-1 w-full space-y-6">
                {/* Title Card */}
                <div className="bg-[#0C3C60]/60 p-6 sm:p-8 rounded-3xl border border-[#83DF9C]/30 shadow-xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83DF9C]/20 border border-[#83DF9C]/40 text-[#83DF9C] text-xs font-black uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{isEn ? 'Legal & Privacy Policy' : 'Marco Legal y Tratamiento de Datos'}</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                        {isEn
                            ? 'Data Protection Policy, Farm Coordinates & EUDR Compliance'
                            : 'Política de Tratamiento de Datos Personales, Coordenadas y Cumplimiento EUDR'}
                    </h1>
                    <p className="text-white/70 text-xs sm:text-sm">
                        {isEn
                            ? 'Governed under Colombian Statutory Law 1581/2012 (Habeas Data), Decree 1377/2013, and European Union Deforestation Regulation (EU) 2023/1115.'
                            : 'En estricto cumplimiento de la Ley Estatutaria 1581 de 2012 de Colombia (Habeas Data), Decreto 1377 de 2013 y el Reglamento (UE) 2023/1115 de la Unión Europea.'}
                    </p>
                </div>

                {/* Body Content */}
                <div className="bg-[#040E17]/70 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-sm text-white/80 leading-relaxed">
                    {isEn ? (
                        <>
                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    1. Identification of the Data Controller
                                </h2>
                                <p>
                                    <strong>AxisTrace</strong> (developed and operated by <strong>Mouselab</strong>), with official support contact at{' '}
                                    <a href="mailto:contacto@axistrace.app" className="text-[#83DF9C] underline">contacto@axistrace.app</a>, acts as the technological platform and processor of personal, spatial, and agronomic data recorded by producers, cooperatives, and agricultural technicians.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    2. Categories of Collected Data
                                </h2>
                                <p>To generate the first-mile georeferencing dossier and verify EUDR compliance, the platform collects:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li><strong>Personal Identification Data:</strong> Full name, national identity number (Cédula / Tax ID), and contact phone/WhatsApp.</li>
                                    <li><strong>Farm & Holding Data:</strong> Farm name, parcel identifier, municipality, region, and cultivated commodity/variety.</li>
                                    <li><strong>Spatial & Geolocation Data:</strong> High-precision GNSS perimeter coordinates (latitude, longitude, altitude in WGS84 format) and parcel polygons.</li>
                                    <li><strong>Mobile Telemetry & Digital Audit:</strong> Timestamp (UTC), horizontal accuracy metrics, and Unique Verifiable Security Identifiers (UID).</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    3. Purpose of Processing & International Transfer
                                </h2>
                                <p>The collected data is processed strictly for the following purposes:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li>Generating technical georeferencing dossiers in PDF format and standard GeoJSON (IETF RFC 7946).</li>
                                    <li>Screening parcel coordinates against public global satellite baseline datasets (Global Forest Watch / Copernicus JRC GFC2020) to pre-validate non-deforestation status post-December 31, 2020.</li>
                                    <li>Enabling international transfer of agricultural geolocation datasets to buyers, coffee/cocoa cooperatives, exporters, and the European Union customs system (TRACES NT) as required under EU Regulation 2023/1115 due diligence.</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    4. Smallholder Rights (Habeas Data & GDPR)
                                </h2>
                                <p>
                                    In accordance with statutory data protection regulations, the data owner holds the rights to:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-white/80">
                                    <li>Access and review all personal and geographic data recorded.</li>
                                    <li>Request updates, corrections, or polygon rectifications.</li>
                                    <li>Request deletion of data when the processing does not respect constitutional and legal principles.</li>
                                    <li>Revoke the granted authorization via email to <span className="text-[#83DF9C]">contacto@axistrace.app</span>.</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    5. Institutional Disclaimer
                                </h2>
                                <p className="text-white/70 italic bg-black/30 p-4 rounded-2xl border border-white/5">
                                    AxisTrace is an independent technological pre-validation and first-mile capture tool. It does not replace official national coffee registers (such as SICA / FNC in Colombia) nor does it relieve commercial importers/operators from their legal responsibility to perform comprehensive due diligence under Regulation (EU) 2023/1115.
                                </p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    1. Identificación del Responsable del Tratamiento
                                </h2>
                                <p>
                                    <strong>AxisTrace</strong> (desarrollada y operada por <strong>Mouselab</strong>), con correo electrónico institucional de contacto{' '}
                                    <a href="mailto:contacto@axistrace.app" className="text-[#83DF9C] underline">contacto@axistrace.app</a>, actúa como plataforma tecnológica y encargada del tratamiento de los datos personales, agronómicos y espaciales suministrados por productores, administradores de fincas, cooperativas y operadores de campo.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    2. Categorías de Datos Recolectados
                                </h2>
                                <p>Con el fin de generar los informes de georreferenciación de primera milla y evaluar el cumplimiento técnico del Reglamento (UE) 2023/1115, se recolectan:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li><strong>Datos Personales de Identificación:</strong> Nombre completo, documento de identidad (Cédula de Ciudadanía / NIT) y número de teléfono o WhatsApp de contacto.</li>
                                    <li><strong>Datos del Predio y del Cultivo:</strong> Nombre de la finca, denominación de la parcela/lote, municipio, departamento, producto (café, cacao, palma, carne/cuero, madera, caucho) y variedad cultivada.</li>
                                    <li><strong>Datos Geográficos y Coordenadas Espaciales:</strong> Coordenadas perimetrales GNSS (latitud, longitud y altitud en sistema WGS84), polígonos cerrados, distancia y cálculo de área superficial.</li>
                                    <li><strong>Telemetría y Registro de Integridad:</strong> Marca de tiempo en hora UTC, precisión estimada en metros y Sello Digital de Seguridad (UID).</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    3. Finalidades del Tratamiento y Transferencia de Coordenadas
                                </h2>
                                <p>El titular autoriza de manera previa, expresa e informada que sus datos personales y coordenadas espaciales sean utilizados para:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li>Elaborar y emitir el Informe Técnico de Georreferenciación en PDF y el archivo estándar GeoJSON (IETF RFC 7946).</li>
                                    <li>Contrastar las coordenadas de la parcela contra bases satelitales globales públicas (Global Forest Watch y mapas del Centro Común de Investigación de la Comisión Europea - JRC GFC2020) para verificar de forma preliminar la ausencia de deforestación posterior al 31 de diciembre de 2020.</li>
                                    <li>Transferir legítimamente las coordenadas y datos del lote a cooperativas, asociaciones de productores, comercializadores, exportadores, operadores comerciales e importadores en la Unión Europea, con el fin exclusivo de alimentar declaraciones de debida diligencia y cargues al sistema oficial TRACES NT (Reglamento UE 2023/1115).</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    4. Derechos del Titular (Habeas Data - Ley 1581 de 2012)
                                </h2>
                                <p>
                                    El titular de la información tiene derecho a conocer, actualizar y rectificar sus datos personales frente a los responsables del tratamiento; solicitar prueba de la autorización otorgada; ser informado sobre el uso que se le ha dado a sus datos; y revocar la autorización o solicitar la supresión de sus datos mediante solicitud escrita enviada a <span className="text-[#83DF9C]">contacto@axistrace.app</span>.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    5. Declaración de Tenencia Legítima y Buena Fe
                                </h2>
                                <p>
                                    Al diligenciar los datos y trazar el perímetro, el usuario o recolector declara bajo la gravedad de juramento que ostenta la titularidad, posesión o autorización legítima para georreferenciar el predio, y que el polígono trazado coincide con los linderos reales de la parcela cultivada.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h2 className="text-base font-black text-[#83DF9C] uppercase tracking-wide">
                                    6. Aviso Institucional y Regulatorio
                                </h2>
                                <p className="text-white/70 italic bg-black/30 p-4 rounded-2xl border border-white/5">
                                    AxisTrace es una herramienta tecnológica independiente de apoyo técnico para la primera milla. No constituye un certificado de origen ni reemplaza las certificaciones o registros oficiales del Sistema de Información Cafetera (SICA / Federación Nacional de Cafeteros), ni exime a los operadores comerciales de su debida diligencia obligatoria ante las autoridades europeas.
                                </p>
                            </section>
                        </>
                    )}
                </div>

                <div className="pt-4 flex justify-between items-center text-xs text-white/50">
                    <span>© {new Date().getFullYear()} AxisTrace • mouselab.dev</span>
                    <Link href="/terminal" className="text-[#83DF9C] hover:underline font-bold">
                        {isEn ? 'Return to Field Terminal →' : 'Volver a la Terminal de Campo →'}
                    </Link>
                </div>
            </main>
        </div>
    );
}
