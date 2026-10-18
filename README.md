# Nauscopio - Tema V7.1 Opción B (Descompuesto)

## Qué se ha hecho
Tu Tema V7.html (64KB de b:skin + 24KB JS = ~88KB) se ha separado en:

| Archivo | Tamaño original | Tamaño nuevo | Dónde se carga |
|---------|---------------|--------------|----------------|
| base.css | 6.0KB dentro de b:skin | 4.4KB | Siempre (en b:skin) |
| report.css | 56.6KB dentro de b:skin | 57.1KB | Solo item/static_page via CDN |
| report-core.css | - | 49.8KB | Solo índices (opción avanzada) |
| report-extras.css | - | 6.8KB | Solo informes completos (opción avanzada) |
| initP52.js | 24.3KB inline | 24.4KB | Solo item/static_page via CDN |

### Ahorro
- Home / Kiosco / Archivo: 88KB -> 4.4KB (20x menos)
- Índice: 88KB -> 4.4+49.8=54.2KB (40% menos) si usas core, o 61.5KB con report completo
- Informe: 88KB -> 61.5KB pero con caché: 2ª visita 0KB de CSS/JS

## Archivos en /v7.1/
- base.css - para pegar en b:skin
- report.css - subir a GitHub
- report-core.css / report-extras.css - split avanzado opcional
- initP52.js - subir a GitHub
- base.min.css / report.min.css - versiones minificadas (ahorran ~30% más)

## Instalación Opción B Híbrida (recomendada)

1. Crea repo público en GitHub: `nauscopio-assets`
2. Sube `v7.1/report.css` y `v7.1/initP52.js` (y opcionalmente core/extras)
3. Crea un Release / Tag `v7.1` en GitHub
4. Verifica URLs:
   https://cdn.jsdelivr.net/gh/TU-USUARIO/nauscopio-assets@v7.1/report.css
   https://cdn.jsdelivr.net/gh/TU-USUARIO/nauscopio-assets@v7.1/initP52.js
5. En Blogger > Tema > Editar HTML, pega el contenido de `Tema-V8-OptionB.xml` (reemplaza USUARIO)
6. Guarda

### Qué cambiar en Tema-V8-OptionB.xml
Busca `USUARIO` y sustituye por tu usuario GitHub.
Si tu repo se llama distinto a `nauscopio-assets`, cambia también el nombre.

## Opción B Full External
Si quieres que TODO esté en CDN (incluso base), usa `Tema-V8-FullExternal.xml`.
En este caso b:skin queda vacío (solo variable) y base.css también va por CDN.
Ventaja: edición 100% en VS Code. Desventaja: una petición extra en Home.

## Purga de caché jsDelivr
Tras push, jsDelivr tarda 2-5 min. Si necesitas purga inmediata:
https://purge.jsdelivr.net/gh/TU-USUARIO/nauscopio-assets@v7.1/report.css

## Próximos pasos
- Cuando edites CSS, crea v7.2/, sube, tag v7.2, cambia @v7.1 por @v7.2 en el tema
- Rollback: vuelve a @v7.1 en 10 segundos
- Tier 2: activa el bloque comentado en Tema-V8-OptionB.xml para separar core/extras por URL

Generado automáticamente desde Tema-V7.html el 2026-10-18
