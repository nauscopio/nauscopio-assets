# Auditoría estática de rendimiento — Nauscopio V9.0.80

Fecha: 14-11-2026. Objetivo: evaluar nuevas reducciones después de la minificación CSS V7.6 y del JS V7.5.

## Evidencia inspeccionada

Recursos leídos desde la rama `main` mediante el conector de GitHub:
- `v7.6/report-core.min.css`: 47.522 caracteres, 404 bloques con llaves, 12 `@media`, 25 usos de `!important`, 58 declaraciones de propiedades `--p52-*`.
- `v7.6/report-extras.min.css`: 6.390 caracteres, 46 bloques, 2 `@media`, 2 usos de `!important`.
- `v7.5/initP52.js`: 29.328 caracteres, 2 listeners `scroll` y 2 `resize` (el script ya utiliza `requestAnimationFrame` para tareas de scroll).

La heurística de agrupación por texto del selector encontró 23 repeticiones de selector en Core, **sin distinguir completamente entre contextos `@media` ni el orden de cascada**. Por tanto, no debe interpretarse como CSS redundante ni borrarse automáticamente.

No aparecen `@import` ni URL externas `url(https://...)` en los dos CSS.

## Alcance y límites

- Esta es **una auditoría estática**: sin acceso HTTP a Blogger ni jsDelivr desde el entorno de ejecución de esta revisión.
- No se han medido respuestas HTTP, Content-Encoding, tamaño comprimido Gzip/Brotli, transferencia, FCP, LCP, CLS, INP, Lighthouse, ni cobertura CSS en navegador.
- No se afirma mejora adicional de velocidad real.
- El usuario ha confirmado visualmente V9.0.80; esta auditoría no sustituye pruebas con DevTools.

## Prioridad de próximas actuaciones

1. **P0: Medición real antes de editar.** Registrar en navegador DevTools Network y Coverage en Portada, Front-page, índices ES/EN y al menos un informe completo ES/EN, en claro/oscuro y móvil. Medir bytes transferidos, caché y porcentaje CSS no utilizado por página, sin extrapolar a todo el sitio.
2. **P1: Consolidación CSS mediante análisis de cascada.** Revisar repeticiones dentro del mismo `@media`; las sobreescrituras en secciones posteriores pueden ser intencionadas. Crear tests visuales antes de borrar propiedades.
3. **P1: Carga CSS.** Comparar el coste de `report-extras.min.css` en páginas sin calculadoras/lightbox. No implantar carga condicional sin probar todas las páginas que lo requieren.
4. **P2: JavaScript.** Eliminar módulos solo tras inventario de páginas; el fichero de ~29 KB comparte funciones de navegación, accesibilidad, calculadoras y lightbox.
5. **Versionado.** Mantener V9.0.80 en producción y V9.0.79 como rollback. Publicar cambios de rendimiento futuros bajo nueva ruta y SHA inmutable.

## Resultado

**Sin cambios en activos de producción ni tema Blogger.** No existe evidencia suficiente para eliminar CSS o JavaScript funcionalmente necesario. La siguiente optimización debe basarse en cobertura real, no en coincidencias textuales.
