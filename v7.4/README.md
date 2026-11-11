# Nauscopio · Activos v7.4 (2026-11-11)

Esta carpeta contiene los tres activos completos de informes. El tema Blogger V9.0.71 los carga fijados al commit:

`477fa1e9f21ac81adf18e4c55be706a238bdaa33`

## Archivos

| Archivo | Procedencia | Cambios |
|---|---|---|
| `report-core.css` | `v7.2/report-core.css` (blob `2d626864a7e964872fbc8e8fafa9246b019b97f0`) | Copia idéntica |
| `report-extras.css` | `v7.2/report-extras.css` (blob `57ffce85c8942fbd7bec0a2005fac77daceac6a3`) | Copia idéntica |
| `initP52.js` | commit `198025a27ab567e17dae9dd1c54613f264599010` (blob `dd15134dfd4008f3d7972829753386f2cd133862`) | Cabecera v7.4 y exclusión `a.ma-photo-zoom` del lightbox general |

El JS mantiene el filtrado de referencias de potencia por impedancia coincidente (4/8 Ω), la actualización de controles y la restauración del estado de scroll del lightbox. Se conserva la exclusión previa `[data-no-lightbox]`.

**No usar la etiqueta `v7.3` existente:** sus CSS raíz contienen únicamente comentarios de marcador de posición, y el JS es una versión reducida que no reproduce todas las funciones.

## URLs fijadas del tema

- `https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@477fa1e9f21ac81adf18e4c55be706a238bdaa33/v7.4/report-core.css`
- `https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@477fa1e9f21ac81adf18e4c55be706a238bdaa33/v7.4/report-extras.css`
- `https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@477fa1e9f21ac81adf18e4c55be706a238bdaa33/v7.4/initP52.js`

## Validación y publicación

Comprobado en repositorio: existencia y contenido íntegro de los tres archivos, coincidencia byte a byte de CSS con v7.2, presencia de filtros de carga y exclusión de zoom en JS. Validado sintácticamente el XML V9.0.71 fuera de Blogger.

**Pendiente:** importación efectiva del tema en Blogger, comprobación HTTP/CDN y pruebas manuales de calculadoras, lightbox, modo oscuro, navegación móvil y enlaces de idioma. No hay etiqueta Git `v7.4` creada: el tema usa SHA inmutable, no una etiqueta mutable o inexistente.
