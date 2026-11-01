'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Language } from '@/translations/content';

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang?: Language;
}

export default function PrivacyPolicyModal({ isOpen, onClose, lang = 'es' }: PrivacyPolicyModalProps) {
    if (!isOpen) return null;

    const isEn = lang === 'en';

    return createPortal(
        <div className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in overflow-y-auto">
            <div className="bg-[#082840] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#83DF9C]/40 shadow-2xl flex flex-col text-white animate-in zoom-in-95">
                {/* Header */}
                <div className="p-4 sm:p-5 bg-[#0C3C60] rounded-t-3xl border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#83DF9C]/20 border border-[#83DF9C]/40 flex items-center justify-center text-[#83DF9C] shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#83DF9C] block">
                                {isEn ? 'Legal & Privacy Compliance' : 'Marco Legal y Tratamiento de Datos'}
                            </span>
                            <h3 className="text-sm sm:text-base font-black text-white">
                                {isEn
                                    ? 'Data Protection Policy & EUDR Coordinates Consent'
                                    : 'Política de Tratamiento de Datos Personales y Coordenadas EUDR'}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                        title={isEn ? 'Close' : 'Cerrar'}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-7 space-y-6 text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                    {/* Badge Info */}
                    <div className="p-3.5 rounded-2xl bg-[#0C3C60]/60 border border-[#83DF9C]/20 flex items-start gap-3">
                        <Lock className="w-5 h-5 text-[#83DF9C] shrink-0 mt-0.5" />
                        <div className="text-xs text-white/80 space-y-1">
                            <p className="font-bold text-white">
                                {isEn
                                    ? 'Strict Compliance with Colombian Habeas Data (Law 1581/2012) and EU Regulation 2023/1115 (EUDR).'
                                    : 'Cumplimiento estricto de la Ley Estatutaria 1581 de 2012 (Habeas Data Colombia), Decreto 1377 de 2013 y Reglamento (UE) 2023/1115 (EUDR).'}
                            </p>
                            <p className="text-[11px] text-white/70">
                                {isEn
                                    ? 'Agricultural land coordinates and farmer personal details are treated as sensitive commercial information protected by digital audit seals.'
                                    : 'Las coordenadas de predios rurales y los datos de identificación de productores son tratados con altos estándares de seguridad y sellos digitales de auditoría.'}
                            </p>
                        </div>
                    </div>

                    {isEn ? (
                        /* ENGLISH TEXT */
                        <div className="space-y-5">
                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    1. Data Controller Identification
                                </h4>
                                <p>
                                    <strong>AxisTrace</strong> (developed and operated by <strong>Mouselab</strong>), with official support contact at{' '}
                                    <a href="mailto:contacto@axistrace.app" className="text-[#83DF9C] underline">contacto@axistrace.app</a>, acts as the technological platform and processor of personal, spatial, and agronomic data recorded by producers, cooperatives, and agricultural technicians.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    2. Categories of Collected Data
                                </h4>
                                <p>To generate the first-mile georeferencing dossier and verify EUDR compliance, the platform collects:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li><strong>Personal Identification Data:</strong> Full name, national identity number (Cédula / Tax ID), and contact phone/WhatsApp.</li>
                                    <li><strong>Farm & Holding Data:</strong> Farm name, parcel identifier, municipality, region, and cultivated commodity/variety.</li>
                                    <li><strong>Spatial & Geolocation Data:</strong> High-precision GNSS perimeter coordinates (latitude, longitude, altitude in WGS84 format) and parcel polygons.</li>
                                    <li><strong>Mobile Telemetry & Digital Audit:</strong> Timestamp (UTC), horizontal accuracy metrics, and Unique Verifiable Security Identifiers (UID).</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    3. Purpose of Processing & International Transfer
                                </h4>
                                <p>The collected data is processed strictly for the following purposes:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li>Generating technical georeferencing dossiers in PDF format and standard GeoJSON (IETF RFC 7946).</li>
                                    <li>Screening parcel coordinates against public global satellite baseline datasets (Global Forest Watch / Copernicus JRC GFC2020) to pre-validate non-deforestation status post-December 31, 2020.</li>
                                    <li>Enabling international transfer of agricultural geolocation datasets to buyers, coffee/cocoa cooperatives, exporters, and the European Union customs system (TRACES NT) as required under EU Regulation 2023/1115 due diligence.</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    4. Smallholder Rights (Habeas Data & GDPR)
                                </h4>
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
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    5. Institutional Disclaimer
                                </h4>
                                <p className="text-white/70 italic bg-black/20 p-3 rounded-xl border border-white/5">
                                    AxisTrace is an independent technological pre-validation and first-mile capture tool. It does not replace official national coffee registers (such as SICA / FNC in Colombia) nor does it relieve commercial importers/operators from their legal responsibility to perform comprehensive due diligence under Regulation (EU) 2023/1115.
                                </p>
                            </section>
                        </div>
                    ) : (
                        /* SPANISH TEXT */
                        <div className="space-y-5">
                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    1. Identificación del Responsable del Tratamiento
                                </h4>
                                <p>
                                    <strong>AxisTrace</strong> (desarrollada y operada por <strong>Mouselab</strong>), con correo electrónico institucional de contacto{' '}
                                    <a href="mailto:contacto@axistrace.app" className="text-[#83DF9C] underline">contacto@axistrace.app</a>, actúa como plataforma tecnológica y encargada del tratamiento de los datos personales, agronómicos y espaciales suministrados por productores, administradores de fincas, cooperativas y operadores de campo.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    2. Categorías de Datos Recolectados
                                </h4>
                                <p>Con el fin de generar los informes de georreferenciación de primera milla y evaluar el cumplimiento técnico del Reglamento (UE) 2023/1115, se recolectan:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li><strong>Datos Personales de Identificación:</strong> Nombre completo, documento de identidad (Cédula de Ciudadanía / NIT) y número de teléfono o WhatsApp de contacto.</li>
                                    <li><strong>Datos del Predio y del Cultivo:</strong> Nombre de la finca, denominación de la parcela/lote, municipio, departamento, producto (café, cacao, palma, carne/cuero, madera, caucho) y variedad cultivada.</li>
                                    <li><strong>Datos Geográficos y Coordenadas Espaciales:</strong> Coordenadas perimetrales GNSS (latitud, longitud y altitud en sistema WGS84), polígonos cerrados, distancia y cálculo de área superficial.</li>
                                    <li><strong>Telemetría y Registro de Integridad:</strong> Marca de tiempo en hora UTC, precisión estimada en metros y Sello Digital de Seguridad (UID).</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    3. Finalidades del Tratamiento y Transferencia de Coordenadas
                                </h4>
                                <p>El titular autoriza de manera previa, expresa e informada que sus datos personales y coordenadas espaciales sean utilizados para:</p>
                                <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                                    <li>Elaborar y emitir el Informe Técnico de Georreferenciación en PDF y el archivo estándar GeoJSON (IETF RFC 7946).</li>
                                    <li>Contrastar las coordenadas de la parcela contra bases satelitales globales públicas (Global Forest Watch y mapas del Centro Común de Investigación de la Comisión Europea - JRC GFC2020) para verificar de forma preliminar la ausencia de deforestación posterior al 31 de diciembre de 2020.</li>
                                    <li>Transferir legítimamente las coordenadas y datos del lote a cooperativas, asociaciones de productores, comercializadores, exportadores, operadores comerciales e importadores en la Unión Europea, con el fin exclusivo de alimentar declaraciones de debida diligencia y cargues al sistema oficial TRACES NT (Reglamento UE 2023/1115).</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    4. Derechos del Titular (Habeas Data - Ley 1581 de 2012)
                                </h4>
                                <p>
                                    El titular de la información tiene derecho a conocer, actualizar y rectificar sus datos personales frente a los responsables del tratamiento; solicitar prueba de la autorización otorgada; ser informado sobre el uso que se le ha dado a sus datos; y revocar la autorización o solicitar la supresión de sus datos mediante solicitud escrita enviada a <span className="text-[#83DF9C]">contacto@axistrace.app</span>.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    5. Declaración de Tenencia Legítima y Buena Fe
                                </h4>
                                <p>
                                    Al diligenciar los datos y trazar el perímetro, el usuario o recolector declara bajo la gravedad de juramento que ostenta la titularidad, posesión o autorización legítima para georreferenciar el predio, y que el polígono trazado coincide con los linderos reales de la parcela cultivada.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h4 className="text-sm font-black text-[#83DF9C] uppercase tracking-wider">
                                    6. Aviso Institucional y Regulatorio
                                </h4>
                                <p className="text-white/70 italic bg-black/20 p-3 rounded-xl border border-white/5">
                                    AxisTrace es una herramienta tecnológica independiente de apoyo técnico para la primera milla. No constituye un certificado de origen ni reemplaza las certificaciones o registros oficiales del Sistema de Información Cafetera (SICA / Federación Nacional de Cafeteros), ni exime a los operadores comerciales de su debida diligencia obligatoria ante las autoridades europeas.
                                </p>
                            </section>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-5 bg-[#0C3C60] rounded-b-3xl border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/60">
                        {isEn ? 'Last updated: November 2026 • Version 1.0' : 'Última actualización: Noviembre 2026 • Versión 1.0'}
                    </span>
                    <button
                        onClick={onClose}
                        className="bg-[#83DF9C] hover:bg-[#6fd48b] text-[#0C3C60] px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider cursor-pointer transition-all shadow-md"
                    >
                        {isEn ? 'Close Window' : 'Cerrar Ventana'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
