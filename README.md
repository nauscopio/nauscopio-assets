# Nauscopio · activos compartidos de Blogger

## Estado de producción (14-11-2026)

- **Tema utilizado en Blogger:** V9.0.78 (XML depurado; comprobado visualmente por el propietario). **No hay copia de este XML en este repositorio todavía.**
- **XML conservado en este repositorio:** `blogger/Tema-Blogger-V9-0-71-ACTIVOS-V7-4-SHA-FIJO.xml` (V9.0.71 histórica; **no** es la versión activa).
- **Activos en producción:** permanecen fijados al commit inmutable `477fa1e9f21ac81adf18e4c55be706a238bdaa33`:

  - `v7.4/report-core.css`
  - `v7.4/report-extras.css`
  - `v7.4/initP52.js`

URL base: `https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@477fa1e9f21ac81adf18e4c55be706a238bdaa33/v7.4/<archivo>`

## Candidata V7.5 incorporada a main

La carpeta `v7.5/` contiene **un candidato de `initP52.js`**, junto con un README de pruebas. Se incorporó mediante [PR #2](https://github.com/nauscopio/nauscopio-assets/pull/2), commit de fusión `896ecb2c7b0b5a225d935c01e31b01073333733f`.

Corrección: no interceptar clics en imágenes que conducen a páginas, PDF u otros recursos ajenos al lightbox; conserva la ampliación de imágenes y la exclusión especial del Magnat MA 900. **No hay despliegue automático en Blogger.**

La V7.5 **no** sustituye a V7.4 en producción por el mero hecho de estar fusionada en `main`. El tema de Blogger continúa apuntando al SHA fijo anterior, salvo modificación explícita posterior.

## Control de cambios

1. Conservar los archivos `v7.4/` y el SHA de producción como respaldo.
2. Completar las comprobaciones de navegación, zoom, temas, calculadoras y páginas ES/EN/DE descritas en `v7.5/README.md` antes de actualizar el tema.
3. Si se decide desplegar V7.5, publicar el JS y actualizar **solo su URL** a un nuevo SHA fijo en el XML del tema, probar Blogger y conservar una copia para volver atrás.
4. No borrar referencias históricas ni modificar recursos de SHA inmutable.

La publicación de los HTML y páginas se gestiona en Blogger. Este repositorio no sincroniza por sí solo el tema ni las páginas.
