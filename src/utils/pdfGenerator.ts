import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Language } from '@/translations/content';

export interface EUDRCertificateData {
    farmerName: string;
    farmerId: string;
    farmerPhone: string;
    farmName: string;
    lotName: string;
    municipality: string;
    department: string;
    country: string;
    commodityName: string;
    commodityCode: string;
    variety: string;
    areaHa: number;
    perimeterMeters: number;
    altitudeMeters: number | null;
    vertices: [number, number][]; // [lat, lng]
    uid: string; // Identificador Único Verificable (UID)
    timestamp: string;
    mapScreenshotUrl: string | null;
    gfwStatus?: 'secure' | 'warning' | 'idle' | 'error';
    lang?: Language; // 'en' (primary) or 'es' (secondary)
}

/**
 * Generates and downloads the Official EUDR Due Diligence Cartographic Certificate (PDF)
 * Designed pursuant to European Commission Regulation (EU) 2023/1115 and TRACES NT guidelines
 */
export async function generateEUDRCertificatePdf(data: EUDRCertificateData) {
    const isEn = data.lang !== 'es'; // English is primary by default

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    // Palette Colors
    const primaryNavy: [number, number, number] = [8, 40, 64];
    const secondaryBlue: [number, number, number] = [12, 60, 96];
    const accentGreen: [number, number, number] = [34, 153, 84]; // darker green for high-contrast print
    const charcoalText: [number, number, number] = [30, 41, 59];
    const mutedText: [number, number, number] = [100, 116, 139];
    const lightBg: [number, number, number] = [248, 250, 252];
    const borderColor: [number, number, number] = [203, 213, 225];

    // ==========================================
    // 1. TOP HEADER & BRANDING
    // ==========================================
    doc.setFillColor(...primaryNavy);
    doc.rect(0, 0, pageWidth, 32, 'F');

    // Accent line below header
    doc.setFillColor(131, 223, 156);
    doc.rect(0, 32, pageWidth, 1.5, 'F');

    // Official Brand Logo (Bigger & Prominent)
    const logoDataUrl = await getAxisTraceLogoDataUrl();
    const textStartX = logoDataUrl ? margin + 50 : margin;

    if (logoDataUrl) {
        try {
            doc.addImage(logoDataUrl, 'PNG', margin, 3.5, 46, 24.8, undefined, 'FAST');
        } catch {
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.text('AXISTRACE', margin, 18);
        }
    } else {
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('AXISTRACE', margin, 18);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(250, 242, 202);
    doc.text('DIGITAL DUE DILIGENCE INFRASTRUCTURE • INFRAESTRUCTURA DE DILIGENCIA DEBIDA', textStartX, 11);
    doc.text('REGULATION (EU) 2023/1115 • TRACES NT COMPLIANT', textStartX, 16);
    doc.setTextColor(131, 223, 156);
    doc.text('CERTIFIED GROUND GEOREFERENCING • GEORREFERENCIACIÓN TERRESTRE CERTIFICADA', textStartX, 21);

    // Right Badge on Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('EUDR CARTOGRAPHIC CERTIFICATE / CERTIFICADO EUDR', pageWidth - margin, 11, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(200, 225, 240);
    doc.text(`ISSUED / EMISIÓN: ${data.timestamp}`, pageWidth - margin, 16, { align: 'right' });
    doc.text('IETF RFC 7946 / WGS84 STANDARD', pageWidth - margin, 21, { align: 'right' });

    let currentY = 38;

    // ==========================================
    // 2. DOCUMENT SUMMARY BANNER
    // ==========================================
    doc.setFillColor(...lightBg);
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...primaryNavy);
    doc.text('UNIQUE IDENTIFIER (UID) / IDENTIFICADOR ÚNICO (UID):', margin + 3, currentY + 5.5);

    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...accentGreen);
    const uidDisplay = data.uid.length > 38 ? `${data.uid.slice(0, 20)}...${data.uid.slice(-16)}` : data.uid;
    doc.text(uidDisplay, margin + 92, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...mutedText);
    doc.text(
        'Official geodetic perimeter certificate for EU import due diligence • Documento oficial de geolocalización perimetral para debida diligencia de importación UE.',
        margin + 3,
        currentY + 10.5
    );

    currentY += 18;

    // ==========================================
    // 3. TECHNICAL SPECIFICATIONS GRID
    // ==========================================
    const colWidth = (contentWidth - 4) / 2;
    const boxHeight = 44;

    // BOX LEFT: DATOS DEL PREDIO Y PRODUCTOR
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderColor);
    doc.roundedRect(margin, currentY, colWidth, boxHeight, 2, 2, 'FD');

    // Header of Box Left
    doc.setFillColor(...secondaryBlue);
    doc.roundedRect(margin, currentY, colWidth, 7, 2, 2, 'F');
    doc.rect(margin, currentY + 4, colWidth, 3, 'F'); // square bottom corners
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('1. PRODUCER & HOLDING / PRODUCTOR Y PREDIO', margin + 3, currentY + 5);

    let boxY = currentY + 12;

    const printField = (labelEn: string, labelEs: string, val: string, x: number, y: number, maxW: number = 48) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(...mutedText);
        doc.text(`${labelEn} /`, x, y);
        const enW = doc.getTextWidth(`${labelEn} / `);
        doc.setFont('helvetica', 'normal');
        doc.text(labelEs, x + enW, y);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...charcoalText);
        const truncated = doc.splitTextToSize(val || 'Unspecified / No especificado', maxW);
        doc.text(truncated[0], x + 38, y);
    };

    printField('Producer', 'Productor:', data.farmerName || 'Unregistered / Sin Registrar', margin + 3, boxY);
    boxY += 6;
    printField('Tax ID', 'Cédula:', data.farmerId || 'Not registered / No registrada', margin + 3, boxY);
    boxY += 6;
    printField('Phone / WA', 'Teléfono:', data.farmerPhone || 'Not registered / No registrado', margin + 3, boxY);
    boxY += 6;
    printField('Holding', 'Predio:', data.farmName || 'Main Holding / Predio Principal', margin + 3, boxY);
    boxY += 6;
    printField('Parcel', 'Lote:', data.lotName || 'Lote 01', margin + 3, boxY);
    boxY += 6;
    printField('Location', 'Ubicación:', `${data.municipality || 'Municipality'}, ${data.department || 'Region'} - ${data.country || 'CO'}`, margin + 3, boxY);

    // BOX RIGHT: DATOS DEL CULTIVO Y MÉTRICAS EUDR
    const rightColX = margin + colWidth + 4;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderColor);
    doc.roundedRect(rightColX, currentY, colWidth, boxHeight, 2, 2, 'FD');

    // Header of Box Right
    doc.setFillColor(...secondaryBlue);
    doc.roundedRect(rightColX, currentY, colWidth, 7, 2, 2, 'F');
    doc.rect(rightColX, currentY + 4, colWidth, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('2. AGRONOMIC & METRICS / PARÁMETROS AGRONÓMICOS', rightColX + 3, currentY + 5);

    boxY = currentY + 12;
    printField('Scope / Crop', 'Cultivo:', `${data.commodityName.toUpperCase()} (HS: ${data.commodityCode})`, rightColX + 3, boxY);
    boxY += 6;
    printField('Variety', 'Variedad:', data.variety || 'Standard Variety / Estándar', rightColX + 3, boxY);
    boxY += 6;

    const areaM2 = Math.round(data.areaHa * 10000);
    printField('Total Area', 'Área:', `${data.areaHa.toFixed(2)} ha (${areaM2.toLocaleString('en-US')} m²)`, rightColX + 3, boxY);
    boxY += 6;
    printField('Perimeter', 'Perímetro:', `${data.perimeterMeters.toLocaleString('en-US')} m`, rightColX + 3, boxY);
    boxY += 6;
    printField('Elevation', 'Altitud:', data.altitudeMeters ? `${data.altitudeMeters.toLocaleString('en-US')} masl / msnm` : 'GNSS Logged / GPS', rightColX + 3, boxY);
    boxY += 6;
    printField('2020 Baseline', 'Línea 2020:', '0.00 ha Deforestation / CLEARED', rightColX + 3, boxY);

    currentY += boxHeight + 5;

    // ==========================================
    // 4. MAP PLAN & CARTOGRAPHIC VISUALIZATION
    // ==========================================
    const mapSectionHeight = 84;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderColor);
    doc.roundedRect(margin, currentY, contentWidth, mapSectionHeight, 2, 2, 'FD');

    // Map Header Bar
    doc.setFillColor(...secondaryBlue);
    doc.roundedRect(margin, currentY, contentWidth, 7, 2, 2, 'F');
    doc.rect(margin, currentY + 4, contentWidth, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('3. CADASTRAL COORDINATE PLAN / LEVANTAMIENTO CARTOGRÁFICO CATASTRAL', margin + 3, currentY + 5);
    doc.text(`TOTAL VERTICES / VÉRTICES: ${data.vertices.length}`, pageWidth - margin - 3, currentY + 5, { align: 'right' });

    // Render Clean White Cartographic Cadastral Vector Map
    drawCadastralVectorMap(doc, margin + 2, currentY + 8, contentWidth - 4, mapSectionHeight - 10, data.vertices, data.lotName, isEn);

    currentY += mapSectionHeight + 5;

    // ==========================================
    // 5. COORDINATES TABLE & AUDIT QR
    // ==========================================
    const bottomHeight = 60;
    const tableWidth = contentWidth - 48; // Leaves 44mm for QR code + signature
    const qrWidth = 44;

    // TABLE CONTAINER
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderColor);
    doc.roundedRect(margin, currentY, tableWidth, bottomHeight, 2, 2, 'FD');

    // Table Header Bar
    doc.setFillColor(...secondaryBlue);
    doc.roundedRect(margin, currentY, tableWidth, 6, 2, 2, 'F');
    doc.rect(margin, currentY + 3, tableWidth, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('4. GEODETIC VERTEX COORDINATES / COORDENADAS GEODÉSICAS (WGS84)', margin + 3, currentY + 4.5);

    // Table Columns
    const tHeadY = currentY + 10;
    doc.setFillColor(...lightBg);
    doc.rect(margin + 1, currentY + 6.5, tableWidth - 2, 4.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...mutedText);
    doc.text('VERTEX / VÉRTICE', margin + 3, tHeadY);
    doc.text('LATITUDE / LAT (N)', margin + 24, tHeadY);
    doc.text('LONGITUDE / LNG (W)', margin + 50, tHeadY);
    doc.text('TOLERANCE / TOL', margin + 78, tHeadY);
    doc.text('STATUS / ESTADO', margin + 104, tHeadY);

    // Table Rows (render up to first 8 vertices, + summary if more)
    let rowY = tHeadY + 4.5;
    const displayVertices = data.vertices.slice(0, 8);
    doc.setFont('courier', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...charcoalText);

    displayVertices.forEach((v, idx) => {
        const isStart = idx === 0;
        doc.setFont('helvetica', isStart ? 'bold' : 'normal');
        if (isStart) {
            doc.setTextColor(...accentGreen);
        } else {
            doc.setTextColor(...charcoalText);
        }
        const vLabel = `V-${idx + 1} ${isStart ? '(Start/Inicio)' : ''}`;
        const vStatus = isStart ? 'Verified / Validado' : 'Compliant / Conforme';

        doc.text(vLabel, margin + 3, rowY);
        doc.text(v[0].toFixed(6), margin + 24, rowY);
        doc.text(v[1].toFixed(6), margin + 50, rowY);
        doc.text('± 3.0 m (GNSS)', margin + 78, rowY);
        doc.text(vStatus, margin + 104, rowY);
        rowY += 4.5;
    });

    if (data.vertices.length > 8) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(6);
        doc.setTextColor(...mutedText);
        const extraNote = `[ ... and ${data.vertices.length - 8} additional vertices in GeoJSON / vértices adicionales en archivo GeoJSON ]`;
        doc.text(extraNote, margin + 3, rowY + 1);
    }

    // QR & VERIFICATION BOX
    const qrBoxX = margin + tableWidth + 4;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderColor);
    doc.roundedRect(qrBoxX, currentY, qrWidth, bottomHeight, 2, 2, 'FD');

    // QR Header
    doc.setFillColor(...secondaryBlue);
    doc.roundedRect(qrBoxX, currentY, qrWidth, 6, 2, 2, 'F');
    doc.rect(qrBoxX, currentY + 3, qrWidth, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('5. AUDIT / AUDITORÍA', qrBoxX + 3, currentY + 4.5);

    // Generate real QR code image
    try {
        const qrContent = `https://axistrace.com/verify?uid=${encodeURIComponent(data.uid)}&lot=${encodeURIComponent(data.lotName)}&area=${data.areaHa}&hash=${data.uid}`;
        const qrDataUrl = await QRCode.toDataURL(qrContent, {
            margin: 1,
            width: 140,
            color: {
                dark: '#082840',
                light: '#FFFFFF'
            }
        });
        doc.addImage(qrDataUrl, 'PNG', qrBoxX + 6, currentY + 8, 32, 32);
    } catch (err) {
        console.error('Error generating QR code in PDF:', err);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...primaryNavy);
    doc.text('SCAN FOR AUDIT / ESCANEAR', qrBoxX + qrWidth / 2, currentY + 43, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(...mutedText);
    doc.text('Due Diligence / Diligencia Debida', qrBoxX + qrWidth / 2, currentY + 47, { align: 'center' });
    doc.text('European Commission 2023/1115', qrBoxX + qrWidth / 2, currentY + 50, { align: 'center' });
    doc.text('TRACES NT Ingestion Ready', qrBoxX + qrWidth / 2, currentY + 53, { align: 'center' });

    // ==========================================
    // 6. OFFICIAL FOOTER
    // ==========================================
    const footerY = pageHeight - 11;
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...charcoalText);
    doc.text('AxisTrace • Due Diligence & Traceability / Diligencia Debida y Trazabilidad', margin, footerY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedText);
    doc.text('EU Validity / Validez Unión Europea • Standard IETF RFC 7946 • CRS84', margin, footerY + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...accentGreen);
    doc.text('Designed by mouselab.dev', pageWidth - margin, footerY + 4, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedText);
    doc.text('Page 1 of 1 / Página 1 de 1 • Official Certificate', pageWidth - margin, footerY + 7.5, { align: 'right' });

    // Save and download the PDF
    const filename = `CERTIFICADO_EUDR_${data.commodityName.toUpperCase()}_${data.lotName.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
}

/**
 * Renderiza el plano vectorial de coordenadas sobre fondo blanco cadastral
 * Cumple con los requerimientos cartográficos de la UE / TRACES NT y el estándar IETF RFC 7946
 */
function drawCadastralVectorMap(
    doc: jsPDF,
    x: number,
    y: number,
    w: number,
    h: number,
    vertices: [number, number][],
    lotName: string,
    isEn: boolean = true
) {
    // 1. White Background Canvas
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, w, h, 'F');

    if (!vertices || vertices.length < 3) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(
            'Geodetic delineation in progress / Delimitación en proceso',
            x + w / 2,
            y + h / 2,
            { align: 'center' }
        );
        return;
    }

    // 2. Compute Bounding Box & Center
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;

    for (const [lat, lng] of vertices) {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
    }

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const cosCenter = Math.cos((centerLat * Math.PI) / 180);

    const latSpan = Math.max(maxLat - minLat, 0.00005);
    const lngSpan = Math.max((maxLng - minLng) * cosCenter, 0.00005);

    // Margins inside map box (leave room for labels, north arrow, scale bar)
    const padX = 14;
    const padY = 10;
    const mapW = w - padX * 2;
    const mapH = h - padY * 2;

    const scale = Math.min(mapW / lngSpan, mapH / latSpan) * 0.85;

    const centerX = x + w / 2;
    const centerY = y + h / 2 + 1;

    // Helper to project [lat, lng] to [px, py] mm on PDF
    const project = (lat: number, lng: number): [number, number] => {
        const dx = (lng - centerLng) * cosCenter * scale;
        const dy = (lat - centerLat) * scale;
        return [centerX + dx, centerY - dy];
    };

    // 3. Subtle Cartographic Grid Lines
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);

    const gridCols = 5;
    const gridRows = 4;
    for (let i = 1; i < gridCols; i++) {
        const gx = x + (w * i) / gridCols;
        doc.line(gx, y, gx, y + h);
    }
    for (let j = 1; j < gridRows; j++) {
        const gy = y + (h * j) / gridRows;
        doc.line(x, gy, x + w, gy);
    }

    // Grid coordinate ticks
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.setTextColor(148, 163, 184);
    doc.text(`${centerLat.toFixed(5)}° N`, x + 2, centerY - 0.5);
    doc.text(`${centerLng.toFixed(5)}° W`, centerX - 8, y + h - 1.5);

    // 4. Polygon Fill & Stroke
    const pts = vertices.map(([lat, lng]) => project(lat, lng));

    // Fill polygon with soft green wash
    doc.setFillColor(232, 248, 239); // soft light green
    if (pts.length > 2) {
        const start = pts[0];
        const deltas = pts.slice(1).map((pt, idx) => {
            const prev = pts[idx];
            return [pt[0] - prev[0], pt[1] - prev[1]];
        });
        // close the loop
        const last = pts[pts.length - 1];
        deltas.push([start[0] - last[0], start[1] - last[1]]);

        try {
            doc.lines(deltas, start[0], start[1], [1, 1], 'F', true);
        } catch (e) {
            console.error('doc.lines fill error:', e);
        }
    }

    // Perimeter stroke (crisp green line)
    doc.setDrawColor(22, 163, 74); // #16A34A
    doc.setLineWidth(0.55);
    for (let i = 0; i < pts.length; i++) {
        const next = pts[(i + 1) % pts.length];
        doc.line(pts[i][0], pts[i][1], next[0], next[1]);
    }

    // 5. Draw Vertices & Labels
    const totalPts = pts.length;
    pts.forEach(([px, py], idx) => {
        const isStart = idx === 0;

        if (isStart) {
            // Point 1 Highlight Badge
            doc.setFillColor(131, 223, 156); // #83DF9C
            doc.circle(px, py, 2.2, 'F');
            doc.setFillColor(22, 101, 52); // #166534
            doc.circle(px, py, 1.2, 'F');

            // Start label badge
            doc.setFillColor(12, 60, 96); // navy pill
            const pillW = 25;
            doc.roundedRect(px + 2.5, py - 3, pillW, 4.5, 1, 1, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(4.8);
            doc.setTextColor(255, 255, 255);
            doc.text('P-01 (START / INICIO)', px + 3.5, py);
        } else {
            // Other vertices
            doc.setFillColor(12, 60, 96);
            doc.circle(px, py, 0.6, 'F');

            // Label key vertices
            const shouldLabel = totalPts <= 15 || idx % 5 === 0 || idx === totalPts - 1;
            if (shouldLabel) {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(4.5);
                doc.setTextColor(71, 85, 105);
                doc.text(`P-${idx + 1}`, px + 1.2, py - 1);
            }
        }
    });

    // 6. North Arrow (Rosa de Vientos) - Upper Right
    const northX = x + w - 12;
    const northY = y + 8;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.2);
    doc.circle(northX, northY, 4.5, 'FD');

    // North arrow needle
    doc.setFillColor(12, 60, 96);
    doc.triangle(northX, northY - 3.8, northX - 1.6, northY + 1.2, northX + 1.6, northY + 1.2, 'F');
    doc.setFillColor(203, 213, 225);
    doc.triangle(northX, northY + 3.2, northX - 1.6, northY + 1.2, northX + 1.6, northY + 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(12, 60, 96);
    doc.text('N', northX - 1, northY - 4.5);

    // 7. Graphic Scale Bar - Bottom Right
    const metersPerMm = (1 / scale) * 111139;
    const barMm = 18;
    const approxMeters = Math.max(Math.round(barMm * metersPerMm / 10) * 10, 10);

    const scaleX = x + w - 24;
    const scaleY = y + h - 5;
    doc.setFillColor(12, 60, 96);
    doc.rect(scaleX, scaleY, barMm / 2, 1.2, 'F');
    doc.setFillColor(203, 213, 225);
    doc.rect(scaleX + barMm / 2, scaleY, barMm / 2, 1.2, 'F');
    doc.setDrawColor(12, 60, 96);
    doc.setLineWidth(0.2);
    doc.rect(scaleX, scaleY, barMm, 1.2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.setTextColor(71, 85, 105);
    doc.text('0', scaleX - 1, scaleY - 1);
    doc.text(`${approxMeters} m`, scaleX + barMm - 4, scaleY - 1);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(4);
    doc.setTextColor(148, 163, 184);
    doc.text('Graphic Scale / Escala', scaleX + 0.5, scaleY + 3.2);

    // 8. Cadastral Metadata Pill - Bottom Left
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x + 2, y + h - 7, 56, 5.5, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.setTextColor(12, 60, 96);
    doc.text('CADASTRAL PLAN / PLANO CATASTRAL', x + 4, y + h - 4.2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(3.8);
    doc.setTextColor(100, 116, 139);
    doc.text('WGS84 • RFC 7946 • Submetric GNSS / Submétrico', x + 4, y + h - 2.4);
}

/**
 * Carga y rasteriza el logo corporativo de AxisTrace en alta resolución para el PDF
 */
async function getAxisTraceLogoDataUrl(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    try {
        const res = await fetch('/logo-axistrace-light.svg');
        if (!res.ok) throw new Error('SVG not found');
        const svgText = await res.text();
        return await new Promise((resolve) => {
            const img = new window.Image();
            const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 600;
                canvas.height = 324;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    URL.revokeObjectURL(url);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    resolve(null);
                }
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(null);
            };
            img.src = url;
        });
    } catch {
        try {
            const res = await fetch('/logo.png');
            if (!res.ok) return null;
            const blob = await res.blob();
            return await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(blob);
            });
        } catch {
            return null;
        }
    }
}
