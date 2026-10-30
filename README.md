# AxisTrace (axistrace.app)

**Infraestructura Digital de Georreferenciación & Debida Diligencia EUDR**

AxisTrace es un motor autónomo y multi-cultivo de caminata digital diseñado para la primera milla agrícola, en estricto cumplimiento con el Reglamento (UE) 2023/1115 (EUDR) y los estándares de la plataforma aduanera europea TRACES NT.

---

## 🌾 Commodities Cubiertos (EUDR)
- ☕ **Café** (HS 0901)
- 🍫 **Cacao** (HS 1801)
- 🌴 **Palma de Aceite** (HS 1511)
- 🌳 **Caucho** (HS 4001)
- 🪵 **Madera** (HS 4403)
- 🐄 **Ganadería Bovina** (HS 0102)
- 🌿 **Otros cultivos**

---

## 🛡️ Fundamentos Técnicos & Cumplimiento Legal
1. **IETF RFC 7946 GeoJSON**: Orden estricto de coordenadas `[longitud, latitud]`, anillo lineal cerrado (`primer vértice === último vértice`) y proyección WGS84 CRS84 (`urn:ogc:def:crs:OGC:1.3:CRS84`).
2. **Sello Criptográfico SHA-256**: Hash inmutable calculado en origen que garantiza la integridad matemática de los vértices y la fecha de captura.
3. **Filtro de Inercia & Detección de Paso Humano**: Telemetría inercial (IMU) y filtro deadband (<1.2m) con rechazo de saltos espurios GNSS (>35m).
4. **Modo Bolsillo & WakeLock**: Bloqueo de seguridad táctil y mantenimiento de pantalla activa para recorridos en campo sin interrupciones.
5. **Cruce Satelital Global Forest Watch**: Verificación de cobertura forestal y deforestación posterior al 31 de diciembre de 2020.

---

## 🚀 Despliegue
Desarrollado sobre Next.js 16 con React 19 y Leaflet. Desplegado en Vercel para [axistrace.app](https://axistrace.app).
