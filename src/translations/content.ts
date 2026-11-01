export type Language = 'en' | 'es';

export const translations = {
    en: {
        banner: {
            title: "Mandatory EU Deforestation Regulation (EU) 2023/1115 (EUDR) Compliance",
            subtitle: "Official formats engineered for European Customs TRACES NT system"
        },
        nav: {
            scope: "Agri Scope",
            solutions: "Platform",
            pricing: "Plans & Pricing",
            terminal: "Launch Terminal",
            whatsapp: "WhatsApp"
        },
        hero: {
            badge: "EUDR 2023/1115 & TRACES NT Compatible",
            rating: "High-Precision First-Mile Georeferencing",
            title1: "First-Mile",
            title2: "Georeferencing.",
            title3: "Proven Results.",
            description: "Support your export compliance for European markets. Capture parcel perimeter polygons offline in the field and generate GeoJSON dossiers with digital security seals (UID).",
            ctaPrimary: "Start Free Field Walk",
            ctaSecondary: "Explore Pricing Plans",
            perks: ["Zero App Store downloads required", "Operates directly on any smartphone"],
            telemetry: {
                title: "Live GNSS Farm Telemetry",
                status: "Live",
                accuracy: "GPS Precision:",
                accuracyVal: "± 3.0 m (Mobile GNSS)",
                deforestation: "Deforestation Check:",
                deforestationVal: "Zero post-2020",
                crypto: "Security Code:",
                cryptoVal: "DIGITAL SEAL"
            },
            bottom: {
                selfService: "100% Self-Service in the Field",
                resolution: "Copernicus & GFW Data Auditing",
                standard: "IETF RFC 7946 GeoJSON Standard"
            }
        },
        trust: {
            label: "Compatible & Validated with International Trade Systems:",
            badges: ["TRACES NT (European Commission)", "Sentinel-2 (Copernicus)", "IETF RFC 7946 GeoJSON", "WGS84 Decimal Degrees"]
        },
        scope: {
            tag: "Agricultural Scope & Regulated Chains",
            title1: "How Far Does the Platform Reach?",
            title2: "Precision Perimeter Mapping for Every Sector",
            subtitle: "Follow the perimeter trajectory. Each numbered vertex illustrates a key regulated commodity preparing for European market compliance.",
            items: {
                coffee: {
                    node: "11",
                    tag: "Coffee Sector",
                    badge: "Export Coffee",
                    title: "Coffee Plantations",
                    desc: "Map micro-lots and highland shade-grown coffee parcels. Enable green or specialty coffee shipments to include verified field perimeters and preliminary post-2020 deforestation checks.",
                    pills: ["Parcels >4 ha", "Exporter Cooperatives", "Digital Security Seal"]
                },
                cacao: {
                    node: "22",
                    tag: "Agroforestry Systems",
                    badge: "Cocoa & Derivatives",
                    title: "Cocoa Plantations",
                    desc: "Engineered for cacao cultivated under forest canopies in humid tropical regions. Distinguishes productive agroforestry canopy from primary deforestation to support due diligence.",
                    pills: ["Fine Flavour Cocoa", "Regenerative Agroforestry", "Offline Field Capture"]
                },
                palm: {
                    node: "35",
                    tag: "Large Acreage Holdings",
                    badge: "Oil Palm",
                    title: "Oil Palm Plantations",
                    desc: "High-throughput topological boundary verification for commercial oil palm blocks. Scales seamlessly from the 6th hectare upward at $3 USD/ha, verifying that fresh fruit bunches originate from documented pre-2020 production areas.",
                    pills: ["Scalable >100 ha", "Satellite Forest Baseline", "Mill Traceability"]
                },
                cattle: {
                    node: "48",
                    tag: "Sustainable Livestock",
                    badge: "Bovine & Hides",
                    title: "Cattle Ranching & Leather",
                    desc: "Georeference rotational grazing paddocks and silvopastoral systems. Generate technical records supporting due diligence for deforestation-free livestock supply chains.",
                    pills: ["EUDR Beef & Leather", "Silvopastoral Systems", "Closed Geometric Rings"]
                },
                closing: {
                    node: "58",
                    badge: "Geoclosure Vertex #58 • Verified Polygon",
                    question: "Which Agricultural Supply Chain Do You Need to Georeference for Europe?",
                    desc: "Whether you produce coffee, cocoa, palm, rubber, timber, soy, or livestock, AxisTrace provides the first-mile georeferencing dossier required to support your export due diligence.",
                    ctaPrimary: "Launch Field Walk on Smartphone",
                    ctaSecondary: "Talk via WhatsApp (+57 301 397 0002)",
                    ctaSecondaryText: "Chat on WhatsApp",
                    ctaSecondaryHref: "https://wa.me/573013970002?text=Hello%2C%20I%20would%20like%20advisory%20on%20EUDR%20georeferencing%20for%20my%20crop."
                }
            }
        },
        unifiedPlatform: {
            tag: "Precision Infrastructure",
            title1: "Bridging Nature & Data for",
            title2: "Frictionless European Market Access",
            subtitle: "From on-site perimeter footpaths to satellite remote sensing and automated customs dossiers.",
            stats: [
                { val: "100%", label: "Digital Self-Service", sub: "Operators survey with their own phone" },
                { val: "0%", label: "Cellular Dependency", sub: "Field perimeter survey offline in remote terrain" },
                { val: "100%", label: "Security Seal (UID)", sub: "Digital verification code with UTC timestamp" }
            ],
            cards: [
                {
                    image: "/images/field-technician.jpg",
                    tag: "01 • Offline Pocket Walk",
                    title: "Digital Field Perimeter Walk",
                    desc: "Field operators walk parcel boundaries. AxisTrace logs coordinates automatically with deadband kinematic filtering that rejects GNSS multipath bounces.",
                    bullet: "Automated perimeter closure with zero data usage"
                },
                {
                    image: "/images/satellite-survey.jpg",
                    tag: "02 • Sentinel-2 Copernicus",
                    title: "Satellite Deforestation Audit",
                    desc: "Cross-checks parcel boundaries against satellite records, strictly auditing forest loss indicators after the December 31, 2020 regulatory cutoff.",
                    bullet: "Topological verification & CRS84 WGS84 compliance"
                },
                {
                    image: "/images/export-compliance.jpg",
                    tag: "03 • TRACES NT Ready",
                    title: "Due Diligence Pre-Validation Dossier",
                    desc: "Automated generation of A4 cartographic PDF reports with QR verification and standardized RFC 7946 GeoJSON files formatted for customs systems.",
                    bullet: "Engineered for TRACES NT import due diligence standards"
                }
            ]
        },
        pricing: {
            tag: "100% Self-Service (SaaS)",
            title: "Transparent Per-Lot Pricing",
            subtitle: "You or your field technicians survey parcels using your own smartphones. Pay strictly per processed lot—no recurring lock-in fees.",
            plans: {
                audit: {
                    badge: "No walk needed",
                    title: "Satellite Polygon Audit",
                    subtitle: "For parcels with existing surveyor coordinates.",
                    price: "$10",
                    unit: "USD / lot",
                    ref: "~ 40,000 COP",
                    features: [
                        "Topological repair of vertex sequence",
                        "Post-2020 satellite forest baseline check",
                        "Valid TRACES NT GeoJSON + Cartographic PDF"
                    ],
                    cta: "Audit Coordinates"
                },
                walk: {
                    popular: "Most Popular on Farm",
                    badge: "1 to 5 Hectares",
                    title: "Digital Walk Pass",
                    subtitle: "On-site self-service mapping with the operator's phone.",
                    price: "$25",
                    unit: "USD / base lot",
                    ref: "~ 100,000 COP",
                    features: [
                        "Pocket mode with inertial telemetry to mitigate tampering",
                        "Copernicus & GFW post-2020 satellite cross-check",
                        "A4 Cartographic PDF report with QR",
                        "RFC 7946 GeoJSON with Integrity Identifier (UID)"
                    ],
                    cta: "Start Field Walk"
                },
                corporate: {
                    badge: "Up to 100 Lots",
                    title: "Corporate Bulk Pack",
                    subtitle: "For producer associations, cooperatives & exporters.",
                    price: "$650",
                    unit: "USD / pack",
                    ref: "$6.50 USD / lot (~ 2,600,000 COP total)",
                    features: [
                        "100 mapping passes for internal technicians",
                        "Centralized dashboard for member lots",
                        "Bulk batch export compatible with TRACES NT"
                    ],
                    cta: "Order via WhatsApp",
                    ctaHref: "https://wa.me/573013970002?text=Hello%2C%20I%20am%20interested%20in%20the%20Corporate%20Bulk%20Pack%20(100%20lots)%20for%20AxisTRACE."
                }
            },
            addons: {
                extraHa: {
                    title: "Additional Hectare (Large Acreage)",
                    desc: "Applies from the 6th hectare onward for oil palm, cattle ranches, or large cocoa estates.",
                    price: "+$3 USD",
                    ref: "~ 12,000 COP / ha"
                },
                deliverables: {
                    title: "Technical Deliverables Included",
                    desc: "A4 Cartographic PDF Report with QR + RFC 7946 GeoJSON with Unique Identifier (UID).",
                    badge: "Included"
                }
            }
        },
        finalCta: {
            title: "Start Georeferencing Today",
            subtitle: "100% Field self-service on your smartphone. Zero mandatory monthly subscriptions.",
            button: "Launch Field Terminal Now",
            whatsappButton: "Chat on WhatsApp (+57 301 397 0002)"
        },
        footer: {
            rights: "All rights reserved. Designed for Global Agricultural First-Mile Traceability."
        }
    },
    es: {
        banner: {
            title: "Cumplimiento obligatorio Reglamento (UE) 2023/1115 (EUDR)",
            subtitle: "Formatos oficiales para el sistema aduanero TRACES NT de la Unión Europea"
        },
        nav: {
            scope: "Alcance Agro",
            solutions: "Plataforma",
            pricing: "Planes & Precios",
            terminal: "Abrir Terminal",
            whatsapp: "WhatsApp"
        },
        hero: {
            badge: "EUDR 2023/1115 & TRACES NT Compatible",
            rating: "Georreferenciación de Alta Precisión en Primera Milla",
            title1: "Georreferenciación",
            title2: "de Primera Milla.",
            title3: "Resultados Comprobados.",
            description: "Apoya el cumplimiento de exportación hacia la Unión Europea. Captura polígonos perimetrales sin conexión en finca y genera informes GeoJSON con sellos digitales de seguridad (UID).",
            ctaPrimary: "Iniciar Caminata Gratis",
            ctaSecondary: "Estructura de Planes",
            perks: ["Sin descargas de app", "Funciona con tu propio smartphone"],
            telemetry: {
                title: "Telemetría GNSS en Finca",
                status: "En Vivo",
                accuracy: "Precisión GPS:",
                accuracyVal: "± 3.0 m (GNSS Móvil)",
                deforestation: "Cruce Deforestación:",
                deforestationVal: "Cero post-2020",
                crypto: "Sello de Integridad:",
                cryptoVal: "SELLO DIGITAL"
            },
            bottom: {
                selfService: "100% Autoservicio en Terreno",
                resolution: "Auditoría Satelital Copernicus & GFW",
                standard: "Validación IETF RFC 7946"
            }
        },
        trust: {
            label: "Compatible y Validado con Sistemas de Comercio Exterior:",
            badges: ["TRACES NT (Comisión Europea)", "Sentinel-2 (Copernicus)", "IETF RFC 7946 GeoJSON", "WGS84 Decimal"]
        },
        scope: {
            tag: "Alcance Agrícola & Cadenas Productivas",
            title1: "¿Hasta Dónde Llega el Sistema?",
            title2: "Delimitación Precisa para Cada Sector",
            subtitle: "Sigue el recorrido perimetral. Cada vértice numerado ilustra una de las cadenas reguladas que apoyamos en su debida diligencia de exportación.",
            items: {
                coffee: {
                    node: "11",
                    tag: "Sector Cafetero",
                    badge: "Café de Exportación",
                    title: "Plantaciones de Café",
                    desc: "Delimita microlotes y fincas cafeteras tradicionales o bajo sombra en laderas de alta montaña. Permite que el café de exportación cuente con su delimitación perimetral y validación técnica previa de no deforestación post-2020.",
                    pills: ["Lotes >4 ha", "Asociaciones Cafeteras", "Sello Digital UID"]
                },
                cacao: {
                    node: "22",
                    tag: "Sistemas Agroforestales",
                    badge: "Cacao & Derivados",
                    title: "Plantaciones de Cacao",
                    desc: "Ideal para cacaotales bajo dosel forestal en zonas tropicales húmedas. La app discrimina la cobertura arbórea productiva de la deforestación primaria, apoyando a los pequeños cacaocultores en el cumplimiento técnico de debida diligencia de la UE.",
                    pills: ["Cacao Fino y de Aroma", "Agroforestería Regenerativa", "Captura sin Conexión"]
                },
                palm: {
                    node: "35",
                    tag: "Grandes Extensiones",
                    badge: "Palma de Aceite",
                    title: "Plantaciones de Palma",
                    desc: "Monitoreo perimetral y topológico de parcelas palmicultoras. Aplica a partir de la 6ta hectárea con tarifa escalable de $3 USD/ha, verificando que los racimos de fruta fresca provienen de áreas establecidas antes de 2020.",
                    pills: ["Escalabilidad >100 ha", "Línea Base Satelital", "Trazabilidad Almazaras"]
                },
                cattle: {
                    node: "48",
                    tag: "Ganadería Sostenible",
                    badge: "Bovinos & Pastoreo",
                    title: "Ganadería Bovina & Cueros",
                    desc: "Georreferenciación de potreros y rotación silvopastoril. Aporta registros técnicos georreferenciados para respaldar la debida diligencia de hatos ganaderos en predios sin deforestación post-2020.",
                    pills: ["Carne & Cueros EUDR", "Predios Silvopastoriles", "Perímetros Cerrados"]
                },
                closing: {
                    node: "58",
                    badge: "Punto de Geocierre #58 • Polígono Verificado",
                    question: "¿En qué rama del agro necesitas georreferenciar para ingresar a Europa?",
                    desc: "No importa tu cultivo ni el tamaño de tu predio. Si produces café, cacao, palma, caucho, madera o ganado, AxisTrace es tu herramienta de primera milla para respaldar la debida diligencia de acceso a la Unión Europea.",
                    ctaPrimary: "Iniciar Caminata en Terreno Ahora",
                    ctaSecondary: "Hablar por WhatsApp (+57 301 397 0002)",
                    ctaSecondaryText: "Contactar por WhatsApp",
                    ctaSecondaryHref: "https://wa.me/573013970002?text=Hola%2C%20quisiera%20asesor%C3%ADa%20sobre%20georreferenciaci%C3%B3n%20EUDR%20para%20mi%20cultivo."
                }
            }
        },
        unifiedPlatform: {
            tag: "Infraestructura de Precisión",
            title1: "Conectando la Naturaleza con los Datos",
            title2: "Acceso Libre al Mercado Europeo",
            subtitle: "Desde la caminata perimetral en finca hasta la verificación satelital y la emisión de expedientes oficiales.",
            stats: [
                { val: "100%", label: "Autoservicio Digital", sub: "El operario mapea con su propio celular" },
                { val: "0%", label: "Dependencia de Red", sub: "Captura de perímetro sin conexión en zonas remotas" },
                { val: "100%", label: "Sello de Integridad (UID)", sub: "Trazabilidad con código de seguridad y hora UTC" }
            ],
            cards: [
                {
                    image: "/images/field-technician.jpg",
                    tag: "01 • Caminata Offline",
                    title: "Caminata Digital de Campo",
                    desc: "El operario recorre el perímetro de la parcela. AxisTrace captura coordenadas con filtro cinemático deadband que descarta rebotes GNSS.",
                    bullet: "Cierre perimetral automático sin consumo de datos"
                },
                {
                    image: "/images/satellite-survey.jpg",
                    tag: "02 • Sentinel-2 Copernicus",
                    title: "Auditoría Satelital de Deforestación",
                    desc: "Cruce de geometrías con series históricas satelitales. Verificación técnica preliminar con fecha de corte oficial del 31 de diciembre de 2020.",
                    bullet: "Comprobación topológica y formato WGS84 CRS84"
                },
                {
                    image: "/images/export-compliance.jpg",
                    tag: "03 • Listo para TRACES NT",
                    title: "Expediente de Diligencia Debida (DDS)",
                    desc: "Generación de informes cartográficos en PDF A4 con código QR y archivos GeoJSON RFC 7946 listos para aduanas europeas.",
                    bullet: "Formato técnico compatible con TRACES NT (Reglamento UE 2023/1115)"
                }
            ]
        },
        pricing: {
            tag: "Modelo 100% Autoservicio (SaaS)",
            title: "Planes Transparentes por Predio",
            subtitle: "Tú o tus operarios caminan la finca con su propio teléfono. Paga únicamente por predio procesado, sin suscripciones forzosas.",
            plans: {
                audit: {
                    badge: "Sin caminata",
                    title: "Auditoría Satelital",
                    subtitle: "Para predios con coordenadas o cartografía previa.",
                    price: "$10",
                    unit: "USD / predio",
                    ref: "~ 40.000 COP",
                    features: [
                        "Reparación topológica del polígono",
                        "Cruce satelital línea base bosque post-2020",
                        "GeoJSON compatible TRACES NT + Informe PDF"
                    ],
                    cta: "Auditar Coordenadas"
                },
                walk: {
                    popular: "Más Popular en Finca",
                    badge: "1 a 5 Hectáreas",
                    title: "Pase Caminata Digital",
                    subtitle: "Autoservicio en terreno con el celular del operario.",
                    price: "$25",
                    unit: "USD / lote base",
                    ref: "~ 100.000 COP",
                    features: [
                        "Modo bolsillo con telemetría inercial para mitigar manipulación",
                        "Cruce satelital Copernicus & GFW post-2020",
                        "Informe cartográfico A4 con QR",
                        "GeoJSON RFC 7946 con Identificador de Integridad (UID)"
                    ],
                    cta: "Iniciar Caminata"
                },
                corporate: {
                    badge: "Hasta 100 Predios",
                    title: "Bolsa Corporativa",
                    subtitle: "Para asociaciones, cooperativas y exportadores.",
                    price: "$650",
                    unit: "USD / bolsa",
                    ref: "$6,50 USD / predio (~ 2.600.000 COP total)",
                    features: [
                        "100 pases para técnicos propios",
                        "Panel centralizado de lotes asociados",
                        "Exportación masiva GeoJSON compatible con TRACES NT"
                    ],
                    cta: "Pedir por WhatsApp",
                    ctaHref: "https://wa.me/573013970002?text=Hola%2C%20me%20interesa%20adquirir%20la%20Bolsa%20Corporativa%20(100%20predios)%20de%20AxisTRACE."
                }
            },
            addons: {
                extraHa: {
                    title: "Hectárea Adicional (Predios Extensos)",
                    desc: "A partir de la 6ta hectárea en palma, ganadería o cacao extenso.",
                    price: "+$3 USD",
                    ref: "~ 12.000 COP / ha"
                },
                deliverables: {
                    title: "Entregables Técnicos Incluidos",
                    desc: "Informe Técnico A4 + GeoJSON RFC 7946 con Identificador Único (UID).",
                    badge: "Incluido"
                }
            }
        },
        finalCta: {
            title: "Comienza a Georreferenciar Hoy Mismo",
            subtitle: "100% Autoservicio en campo con tu propio smartphone. Sin suscripciones fijas ni cobros mensuales.",
            button: "Abrir Terminal de Campo",
            whatsappButton: "Hablar por WhatsApp (+57 301 397 0002)"
        },
        footer: {
            rights: "Todos los derechos reservados. Diseñado para la Primera Milla Agrícola Global."
        }
    }
};
