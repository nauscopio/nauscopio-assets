# Nauscopio V7.5 — candidata, no publicada

Fecha: 2026-11-14. Esta carpeta contiene únicamente `initP52.js` candidato; los CSS de producción siguen en `v7.4/`.

## Cambio respecto a v7.4

Se conserva la selección de figuras, exclusiones de fotos provisionales y la exclusión especial `a.ma-photo-zoom`, pero **no** se intercepta el enlace de una figura salvo que:
- `href` apunte directamente a un fichero de imagen (.jpg, .jpeg, .png, .webp, .avif, .gif; se admiten query y fragment), o
- la imagen indique explícitamente `data-full`.

Los enlaces `#`, vacíos y los enlaces a HTML, PDF u otros recursos permanecen navegables; no se les añade un handler de zoom. No se modifica CSS, lógica de calculadoras, controles de tema, TOC o redirecciones.

## Revisión manual antes de incorporar

1. Informes Magnat MA 900 ES/EN: `ma-photo-zoom` sigue usando su zoom particular, sin doble ventana.
2. Figuras enlazadas a imágenes directas: clic abre zoom; Escape cierra; se restaura foco/scroll.
3. Figuras con enlace a una página o PDF: clic navega normalmente, sin preventDefault.
4. Imágenes sin enlace dentro de `.figure` o con `.zoomable`: clic y Enter/Espacio abren zoom.
5. Figura provisional / enlace `#`: no se activa lightbox.
6. Portada y Front-page ES/EN: navegación, tema, bordes y títulos conservados.
7. Informes ES/EN/DE, móvil, anexos, scrollspy, calculadoras SPL/Zout y modo oscuro.

## Publicación

No sustituir ninguna URL de Blogger ni modificar el SHA fijo `477fa1e9f21ac81adf18e4c55be706a238bdaa33` hasta pruebas funcionales satisfactorias.

Esta candidata es una corrección de comportamiento, **no una minificación ni una mejora de rendimiento medida**. Para liberar una nueva versión se necesita fijar un nuevo commit/tag en Blogger y mantener el SHA anterior como rollback.
