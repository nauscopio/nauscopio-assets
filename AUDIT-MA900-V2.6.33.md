# Auditoría SPL MA 900 V2.6.33

Cambios propuestos:
- Comparar márgenes únicamente cuando `data-refs` contiene `z:4` o `z:8` y el informe ofrece `#c-load` con la misma carga.
- Sin impedancia verificable no se presentan márgenes potencialmente engañosos (retrocompatibilidad conservadora).
- Conservar la fórmula de potencia SPL y el cálculo Zout sin cambios.
- Mostrar mensaje accesible cuando falla la carga de imagen en el lightbox; restaurar los estilos de scroll previos.
- Sincronizar `initP52.min.js` (alias histórico, **todavía no minificado realmente**).

Integración: el HTML del informe V2.6.33 se entrega por separado. Debe publicarse junto con la nueva versión del JS; no reutilizar el tag inmutable v7.2.

Pruebas pendientes antes de publicar: navegador con HTML+tema Blogger V9.0.46, carga CDN, 4/8 Ω, controles de teclado, modo oscuro, regresiones en otros informes.