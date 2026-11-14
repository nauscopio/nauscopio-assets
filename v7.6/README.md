# Nauscopio V7.6 — CSS compacto, candidato

Fecha: 2026-11-14. **No publicado en Blogger.** La plantilla validada V9.0.79 continúa usando CSS de V7.4 y JS de V7.5.

## Archivos

| Archivo candidato | Fuente original | Tamaño original | Tamaño candidato | Ahorro sin comprimir |
|---|---|---:|---:|---:|
| `report-core.min.css` | `v7.4/report-core.css` | 52.388 caracteres | 47.522 caracteres | 9,29 % |
| `report-extras.min.css` | `v7.4/report-extras.css` | 7.342 caracteres | 6.390 caracteres | 12,97 % |

**Ahorro conjunto:** 5.818 caracteres sobre 59.730 (9,74 %). Los tamaños corresponden a cadenas UTF-8 decodificadas de la API de GitHub; no son mediciones de transferencia HTTP comprimida. No se ha medido rendimiento ni diferencia Gzip/Brotli.

## Transformación

- Se eliminan exclusivamente los comentarios CSS y se contraen secuencias de espacios fuera de cadenas a un único espacio.
- Se conservan las cadenas, los selectores, las declaraciones, su orden, `@media`, `!important` y las referencias `var(...)`.
- Una comparación de tokens, excluyendo solo espacios y comentarios, muestra secuencias idénticas entre el archivo fuente y el candidato (Core: 10.635; Extras: 1.448 tokens).
- Se comprobó equilibrio de llaves y cierre de cadenas en el proceso de generación.
- **No constituye una prueba visual, ni una validación completa de CSS por navegador.**

## Pruebas antes de publicar

1. Comprobar carga HTTP 200 de ambos CSS en la URL definitiva de jsDelivr con SHA fijo.
2. Comparar en desktop/móvil Portada, Front-page, índices ES/EN y varios informes largos.
3. Probar modo claro/oscuro, contraste, tablas, navegación/anexos, SVG, calculadoras, lightbox e impresión.
4. Verificar consola de desarrollador, Network y métricas reales de transferencia y renderizado.
5. Mantener `v7.4/` como rollback y no sobrescribirlo.
6. Si todo es correcto, generar tema V9.0.80 candidato cambiando **solo** las dos URL CSS a `v7.6/*.min.css` fijadas a un commit inmutable y manteniendo `initP52.js` V7.5.

La minificación CSS es de bajo riesgo, pero no aporta por sí misma nuevas funciones. Se prioriza el control de regresiones sobre el ahorro de bytes.
