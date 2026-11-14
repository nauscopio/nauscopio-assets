# Nauscopio · recursos compartidos de Blogger

## Producción verificada por el propietario · 14-11-2026

**Tema activo en Blogger: V9.0.80**, actualizado y comprobado visualmente por el propietario.

El XML V9.0.80 utiliza recursos versionados e inmutables:

| Función | Ruta | Commit SHA fijado |
|---|---|---|
| CSS principal | `v7.6/report-core.min.css` | `ccb3eb02b83ae1f022ee66641609d72294570e80` |
| CSS adicional | `v7.6/report-extras.min.css` | `ccb3eb02b83ae1f022ee66641609d72294570e80` |
| JavaScript | `v7.5/initP52.js` | `896ecb2c7b0b5a225d935c01e31b01073333733f` |

URL base por recurso: `https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@<SHA>/<ruta>`.

**Nota:** esta documentación identifica las URL del XML V9.0.80 preparado y confirmado por el propietario. La respuesta HTTP del CDN y las métricas de rendimiento no se han auditado aquí de forma independiente.

## Trazabilidad y respaldo

- **V9.0.79:** respaldo inmediato; usa CSS V7.4 y JS V7.5.
- **V9.0.78:** versión anterior validada, previa a la actualización JS V7.5.
- **V9.0.71:** XML histórico conservado en `blogger/Tema-Blogger-V9-0-71-ACTIVOS-V7-4-SHA-FIJO.xml`. **No es el tema activo.**
- **V7.4:** CSS y JS originales conservados para rollback en el commit `477fa1e9f21ac81adf18e4c55be706a238bdaa33`.
- **V7.5:** JS corregido, [PR #2](https://github.com/nauscopio/nauscopio-assets/pull/2).
- **V7.6:** CSS compactados sin cambiar secuencias de tokens, [PR #3](https://github.com/nauscopio/nauscopio-assets/pull/3), fusionada en `main`.

El XML V9.0.80 y sus versiones 9.0.78/79 **no se han añadido aún al repositorio**: el único XML del directorio `blogger/` es V9.0.71. No presentar esa copia histórica como respaldo exacto del tema activo.

## Reglas de mantenimiento

1. Mantener los SHA fijados mientras no se prepare y valide un nuevo tema.
2. No borrar activos históricos de `v7.4/`, `v7.5/` o `v7.6/`.
3. Para nuevas optimizaciones, usar ramas y PR; comparar tokens/reglas, probar visualmente y mantener posibilidad de reversión.
4. La publicación de páginas y temas se hace en Blogger, no automáticamente mediante GitHub.
