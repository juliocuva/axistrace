'use server';

/**
 * AXIS TRACE - GFW BRIDGE
 * Validación previa de pérdida de cobertura arbórea contra el dataset de Global Forest Watch (UMD).
 * Consulta de línea base posterior al 31 de diciembre de 2020 según Reglamento (UE) 2023/1115 (EUDR).
 *
 * NOTA TÉCNICA METODOLÓGICA:
 * - Dataset consultado: University of Maryland (UMD) Tree Cover Loss vía GFW Data API.
 * - Resolución espacial: ~30m x 30m por píxel (aprox. 0.09 hectáreas).
 * - Esta consulta es una verificación técnica preliminar y no constituye certificación oficial
 *   ni exime de la debida diligencia del operador comercial.
 */

export interface GfwValidationResult {
    success: boolean;
    status: 'SIN_PERDIDA_DETECTADA' | 'PERDIDA_DETECTADA' | 'NO_VERIFICADO';
    isDeforestationFree: boolean | null;
    lossDetectedHa: number | null;
    cutoffDate: string;
    dataSource: string;
    error?: string;
    details?: string;
}

export async function validateDeforestationWithGFW(geoJson: string): Promise<GfwValidationResult> {
    try {
        if (!geoJson) {
            return {
                success: false,
                status: 'NO_VERIFICADO',
                isDeforestationFree: null,
                lossDetectedHa: null,
                cutoffDate: '31-Dec-2020',
                dataSource: 'Global Forest Watch (UMD)',
                error: 'No se proporcionó geometría para validación.'
            };
        }

        const parsedGeo = JSON.parse(geoJson);
        
        let geometry = parsedGeo;
        if (parsedGeo.type === 'FeatureCollection') {
            geometry = parsedGeo.features?.[0]?.geometry;
        } else if (parsedGeo.type === 'Feature') {
            geometry = parsedGeo.geometry;
        }

        if (!geometry || !geometry.coordinates) {
            return {
                success: false,
                status: 'NO_VERIFICADO',
                isDeforestationFree: null,
                lossDetectedHa: null,
                cutoffDate: '31-Dec-2020',
                dataSource: 'Global Forest Watch (UMD)',
                error: 'Geometría no válida o vacía.'
            };
        }

        // Si la geometría es un punto único, la consulta de área satelital de deforestación por polígono no aplica directamente
        if (geometry.type === 'Point') {
            return {
                success: true,
                status: 'NO_VERIFICADO',
                isDeforestationFree: null,
                lossDetectedHa: 0,
                cutoffDate: '31-Dec-2020',
                dataSource: 'Global Forest Watch (UMD)',
                details: 'Predio de punto único (≤ 4 ha). El cruce satelital perimetral requiere polígono cerrado.'
            };
        }

        const URL = 'https://data-api.globalforestwatch.org/dataset/umd_tree_cover_loss/latest/query';
        
        const sql = `
            SELECT sum(umd_tree_cover_loss__ha) as total_loss_ha 
            FROM results 
            WHERE umd_tree_cover_loss__year >= 2021
        `;

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sql: sql,
                    geometry: geometry
                }),
                signal: AbortSignal.timeout(8000) 
            });

            if (!response.ok) {
                throw new Error(`GFW API HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            const lossHa = result.data?.[0]?.total_loss_ha || 0;

            // La resolución espacial del dataset Landsat UMD es de 30m (~0.09 ha por píxel).
            // Pérdidas menores a 0.09 ha pueden corresponder a ruido de borde o error de alineación de píxel.
            const hasLoss = lossHa >= 0.09;

            return {
                success: true,
                status: hasLoss ? 'PERDIDA_DETECTADA' : 'SIN_PERDIDA_DETECTADA',
                isDeforestationFree: !hasLoss,
                lossDetectedHa: Math.round(lossHa * 100) / 100,
                cutoffDate: '31-Dec-2020',
                dataSource: 'GFW / UMD Tree Cover Loss (Landsat 30m)'
            };
        } catch (apiErr: any) {
            console.warn('GFW query network or service error:', apiErr?.message || apiErr);
            // CRÍTICO: Nunca fingir aprobación en caso de falla de red o servicio
            return {
                success: false,
                status: 'NO_VERIFICADO',
                isDeforestationFree: null,
                lossDetectedHa: null,
                cutoffDate: '31-Dec-2020',
                dataSource: 'GFW / UMD Tree Cover Loss',
                error: 'Consulta satelital no disponible o sin conexión. Estado: NO_VERIFICADO.'
            };
        }
    } catch (e: any) {
        console.error('Error procesando geometría EUDR:', e);
        return {
            success: false,
            status: 'NO_VERIFICADO',
            isDeforestationFree: null,
            lossDetectedHa: null,
            cutoffDate: '31-Dec-2020',
            dataSource: 'GFW / UMD Tree Cover Loss',
            error: e.message || 'Error interno de validación'
        };
    }
}
