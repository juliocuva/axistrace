export type Language = 'en' | 'es';

export const translations = {
    en: {
        banner: {
            title: "Mandatory EU Deforestation Regulation (EU) 2023/1115 (EUDR) Due Diligence Support",
            subtitle: "First-mile perimeter georeferencing and preliminary satellite checks"
        },
        nav: {
            scope: "Agri Scope",
            solutions: "Platform",
            pricing: "Plans & Pricing",
            terminal: "Launch Terminal",
            whatsapp: "WhatsApp"
        },
        hero: {
            badge: "EUDR (EU) 2023/1115 Due Diligence Support",
            rating: "High-Precision First-Mile Georeferencing",
            title1: "First-Mile",
            title2: "Georeferencing.",
            title3: "Proven Results.",
            description: "Support your export due diligence for European markets. Capture parcel perimeter polygons offline in the field and generate GeoJSON dossiers with digital security seals (UID).",
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
                selfService: "Field Self-Service on Smartphone",
                resolution: "Global Forest Watch (GFW 30M) Baseline Check",
                standard: "IETF RFC 7946 GeoJSON Standard"
            }
        },
        trust: {
            label: "Technical Standards Supporting Due Diligence:",
            badges: ["EUDR (EU) 2023/1115 Formats", "Global Forest Watch (GFW 30M)", "IETF RFC 7946 GeoJSON", "WGS84 Coordinates"]
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
            tag: "How it works",
            title1: "The producer walks the plot.",
            title2: "You get the evidence.",
            subtitle: "Georeferencing done by the person who knows the boundaries, with a report you can review.",
            cards: [
                {
                    tag: "Step 01",
                    title: "1. Digital walk",
                    desc: "The producer walks the perimeter with their phone. Capture works without a connection and filters GPS noise under the canopy.",
                    bullet: "Offline capture under the canopy"
                },
                {
                    tag: "Step 02",
                    title: "2. Preliminary satellite check",
                    desc: "Looks for tree cover loss after 31 December 2020. Until it completes, the status shows as UNVERIFIED.",
                    bullet: "Post-2020 tree cover loss screening"
                },
                {
                    tag: "Step 03",
                    title: "3. Report and file",
                    desc: "A PDF with a QR code and a GeoJSON (RFC 7946), with an integrity seal and timestamp. It supports your due diligence; it is not a certificate.",
                    bullet: "RFC 7946 GeoJSON & PDF for due diligence"
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
                    title: "Satellite Polygon Check",
                    subtitle: "For parcels with existing surveyor coordinates.",
                    price: "$10",
                    unit: "USD / lot",
                    ref: "~ 40,000 COP",
                    features: [
                        "Topological repair of vertex sequence",
                        "Post-2020 satellite forest baseline check",
                        "Standardized GeoJSON (RFC 7946) + Cartographic PDF"
                    ],
                    cta: "Check Coordinates"
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
                        "Global Forest Watch (GFW) post-2020 screening",
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
                        "Bulk batch export in RFC 7946 format"
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
            title: "Apoyo para la debida diligencia del Reglamento contra la Deforestación (UE) 2023/1115 (EUDR)",
            subtitle: "Georreferenciación de primera milla y verificación satelital preliminar"
        },
        nav: {
            scope: "Alcance Agro",
            solutions: "Plataforma",
            pricing: "Planes & Precios",
            terminal: "Abrir Terminal",
            whatsapp: "WhatsApp"
        },
        hero: {
            badge: "Apoyo para Debida Diligencia EUDR 2023/1115",
            rating: "Georreferenciación de Alta Precisión en Primera Milla",
            title1: "Georreferenciación",
            title2: "de Primera Milla.",
            title3: "Resultados Comprobados.",
            description: "Apoya la debida diligencia de exportación hacia la Unión Europea. Captura polígonos perimetrales sin conexión en finca y genera informes GeoJSON con sellos digitales de seguridad (UID).",
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
                selfService: "Autoservicio en Terreno con Smartphone",
                resolution: "Cruce con Global Forest Watch (GFW 30M)",
                standard: "Validación IETF RFC 7946"
            }
        },
        trust: {
            label: "Estándares Técnicos de Apoyo a la Debida Diligencia:",
            badges: ["Formatos EUDR Comisión Europea", "Global Forest Watch (GFW 30M)", "IETF RFC 7946 GeoJSON", "Coordenadas WGS84"]
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
            tag: "Cómo funciona",
            title1: "El productor camina su lote.",
            title2: "Usted recibe la evidencia.",
            subtitle: "Georreferenciación hecha por quien conoce los linderos, con un informe que usted puede revisar.",
            cards: [
                {
                    tag: "Paso 01",
                    title: "1. Caminata digital",
                    desc: "El productor recorre el perímetro con su celular. La captura no necesita conexión y filtra el ruido del GPS bajo el dosel.",
                    bullet: "Captura sin conexión bajo el dosel"
                },
                {
                    tag: "Paso 02",
                    title: "2. Verificación satelital preliminar",
                    desc: "Consulta si hubo pérdida de cobertura arbórea después del 31 de diciembre de 2020. Mientras no se complete, el estado figura como NO VERIFICADO.",
                    bullet: "Cruce preliminar con fecha de corte 2020"
                },
                {
                    tag: "Paso 03",
                    title: "3. Informe y archivo",
                    desc: "PDF con código QR y GeoJSON (RFC 7946), con sello de integridad y fecha. Es un apoyo para su debida diligencia, no un certificado.",
                    bullet: "GeoJSON RFC 7946 e informe con código QR"
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
                    title: "Verificación Satelital",
                    subtitle: "Para predios con coordenadas o cartografía previa.",
                    price: "$10",
                    unit: "USD / predio",
                    ref: "~ 40.000 COP",
                    features: [
                        "Reparación topológica del polígono",
                        "Cruce satelital línea base bosque post-2020",
                        "GeoJSON estandarizado (RFC 7946) + Informe PDF"
                    ],
                    cta: "Verificar Coordenadas"
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
                        "Cruce satelital GFW post-2020",
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
                        "Exportación masiva en estándar RFC 7946"
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
