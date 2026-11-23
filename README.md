# Nauscopio · recursos compartidos de Blogger

## Producción verificada · 23-11-2026

**Tema activo en Blogger: V9.0.90**, optimizado tras la auditoría de las 59 páginas del sitio.

El XML V9.0.90 utiliza recursos versionados e inmutables unificados en un único commit de `main`:

| Función | Ruta | Carga | Commit SHA fijado |
|---|---|---|---|
| CSS principal | `v7.8/report-core.min.css` | Informes `#p52-report` | `118de66f1587863373f65fdf825315c8a43892f7` |
| CSS adicional | `v7.6/report-extras.min.css` | Informes con calculadoras/lightbox/listas | `118de66f1587863373f65fdf825315c8a43892f7` |
| CSS Tarragona | `v7.8/tarragona.min.css` | Solo páginas de Tarragona (ES/CA) | `118de66f1587863373f65fdf825315c8a43892f7` |
| JavaScript | `v7.7/initP52.js` | Informes `#p52-report` (`defer`) | `118de66f1587863373f65fdf825315c8a43892f7` |

URL base por recurso: `https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@<SHA>/<ruta>`.

### Novedades de V7.7 / V7.8 (en `118de66f…`)
- **`v7.8/report-core.min.css`:** consolida los componentes compartidos detectados en informes (`.mnav-fallback`, `.ma-procon`, `.ma-note`, `.na-evidence-note`, `.na-video-summary`, `.na-fig`/`.na-chart-svg`, `.na-glossary`, `.na-streamer-photo`, `.calc-card h3.seo-level-fix`).
- **`v7.8/tarragona.min.css`:** extrae del XML del tema los ~9 KB específicos de `.p52-tarragona` para servirlos únicamente en las 2 páginas de Tarragona con caché inmutable.
- **`v7.7/initP52.js`:** incorpora el fallback automático de `data-label` en tablas `.table-wrap.responsive-cards` (desde `<thead>`), soporte completo de idioma catalán (`ca`), decimales EN y avisos accesibles de impedancia nominal (`Znom`).

## Trazabilidad y respaldo

- **V9.0.80:** versión anterior validada (14-11-2026); usa CSS `v7.6` y JS `v7.5` (`896ecb2c…`).
- **V9.0.79 / V9.0.78:** respaldos históricos previos a CSS `v7.6` y JS `v7.5`.
- **V7.4:** CSS y JS originales conservados para rollback en `v7.4/`.
- **V7.5:** JS corregido ([PR #2](https://github.com/nauscopio/nauscopio-assets/pull/2) y [PR #4](https://github.com/nauscopio/nauscopio-assets/pull/4)), conservado en `v7.5/`.
- **V7.6:** CSS compactados ([PR #3](https://github.com/nauscopio/nauscopio-assets/pull/3)), conservados en `v7.6/`.
- **V7.7:** `report-core.min.css` con topbar sticky y `initP52.js` con fallback `data-label` + catalán (`ca`), conservados en `v7.7/`.

## Reglas de mantenimiento

1. Mantener los SHA fijados a un único commit estable de `main` mientras no se prepare y valide un nuevo tema.
2. No borrar activos históricos de `v7.4/`, `v7.5/`, `v7.6/` ni `v7.7/`.
3. Para nuevas optimizaciones, usar ramas y PR; comprobar respuestas `HTTP 200` en jsDelivr, probar visualmente y mantener posibilidad de reversión.
4. La publicación de páginas y temas se hace en Blogger, no automáticamente mediante GitHub.
