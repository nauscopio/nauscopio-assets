# Nauscopio Assets - v7.2 Fix Audit 2

## Qué corrige v7.2 respecto a v7.1
- **TOC móvil:** autocrea `#mnav-auto` antes de `.layout` si el post no lo tiene. Antes `initTOC` abortaba y no había scrollspy ni índice en móvil.
- **Theme:** clave única `nauscopio-p52-theme`, migra `p52-theme`, evita doble handler que dejaba el botón inoperante. Default claro.
- **Lightbox:** excluye 11 figuras provisionales (logo marcador, `data-provisional`, texto "figura pendiente", "fuente prevista", href="#").
- **Carets anexos:** añade `data-anexo-toggle` automáticamente a enlaces del índice que apuntan a <details>.
- **Report-Min.css:** fix `#p52-report:is(` -> `#p52-report :is(` y `:where(`.
- **Modo oscuro cajas:** `.entry-nav` y `.method-box` ahora usan `var(--p52-card2)` / `var(--p52-border)` en lugar de vars inexistentes.
- **Mayúsculas:** todo en minúsculas, ruta `@v7.2/` simple, no `@v7.1/v7.1/`.

## Archivos
- `report-core.css` (50KB) + `report-core.min.css` - para home, kiosco, índices
- `report-extras.css` (7KB) + `report-extras.min.css` - solo informes completos
- `report.css` + `report.min.css` - core+extras combinado
- `base.css` + `base.min.css` - siempre en b:skin
- `initP52.js` + `initP52.min.js` - V7.2 Fix audit 2

## Instalación / Actualización

### 1. Subir a GitHub
En https://github.com/nauscopio/nauscopio-assets
- Crea carpeta `v7.2/` y sube los 10 archivos de este paquete
- Commit a main

### 2. Crear Release v7.2
- GitHub > Releases > Draft new release > Tag `v7.2` (crea tag en main)
- Title: `v7.2 Fix Audit 2 - mnav, theme, lightbox`
- Publish

### 3. Verificar URLs (deben dar 200)
```
https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/report-core.css
https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/report-extras.css
https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/report.css
https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/initP52.js
https://raw.githubusercontent.com/nauscopio/nauscopio-assets/v7.2/report-core.css
https://raw.githubusercontent.com/nauscopio/nauscopio-assets/v7.2/initP52.js
```

### 4. Purga jsDelivr (si hace falta)
```
https://purge.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/report-core.css
https://purge.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/report-extras.css
https://purge.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.2/initP52.js
```

### 5. Actualizar Blogger
- Blogger > Tema > Editar HTML > pega `Tema-Blogger-V8.9-v7.2.xml`
- Cambia `@v7.1` por `@v7.2` (ya viene hecho en el XML incluido)
- Guarda

### 6. Limpiar post
En el post del P52:
- Añade antes de `<div class="layout">`: `<nav class="mnav" id="mnav-auto" aria-label="Navegación móvil del informe"></nav>` (opcional, V7.2 lo autocrea)
- Borra todo el `<script>...</script>` final del post (theme, to-top, hash, aria-pressed ya los hace initP52.js)
- Quita las 11 `<figure>` provisionales o marca `data-provisional data-no-lightbox` y quita `<a href="#">` y `zoomable`

## Rollback
Si algo falla, vuelve a `@v7.1` en el tema en 10 segundos. Ambas versiones coexisten.

Generado 2026-10-21
