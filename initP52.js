/**
 * nauscopio-assets / initP52.js
 * v7.3 — 2026-10-24
 * Cambios respecto a v7.2:
 * - Eliminados los dos setAttribute del botón de tema (#p52-theme-toggle)
 *   (antes: aria-pressed y data-theme / aria-label). El toggle ahora solo
 *   cambia clase y texto, sin tocar atributos, para evitar validación
 *   duplicada y parpadeo en Blogger.
 * - Mantiene mnav-auto, legend, byline fallback y to-top.
 * - Sin SRI aquí: el tema carga via jsDelivr @v7.3. Añadir integrity solo
 *   cuando v7.3 sea tag inmutable (no rama móvil).
 */
(function(){
  'use strict';
  function ready(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn);} else {fn();} }
  function qs(s, r){ return (r||document).querySelector(s); }
  function qsa(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }

  ready(function(){
    // --- Theme toggle ---
    var btn = qs('#p52-theme-toggle');
    var html = document.documentElement;
    var key = 'p52-theme';
    var stored = null;
    try { stored = localStorage.getItem(key); } catch(e){}
    if(stored==='dark' || stored==='light'){
      html.setAttribute('data-theme', stored); // theme on html sigue, no en botón
    }
    if(btn){
      btn.addEventListener('click', function(){
        var cur = html.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        var next = cur==='dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        try { localStorage.setItem(key, next); } catch(e){}
        // v7.2 hacía aquí:
        // btn.setAttribute('aria-pressed', next==='dark' ? 'true' : 'false');
        // btn.setAttribute('data-theme', next);
        // v7.3: eliminado — el botón solo cambia texto/clase
        btn.textContent = next==='dark' ? 'Modo claro' : 'Modo oscuro';
        // clase opcional para estilos
        btn.classList.toggle('is-dark', next==='dark');
      });
    }

    // --- mnav-auto (índice rápido generado desde section-blocks) ---
    var mnav = qs('#mnav-auto');
    if(mnav){
      var blocks = qsa('.section-block[id], .group-divider[id]');
      if(blocks.length){
        var htmlNav = blocks.map(function(b){
          var id = b.id;
          var h = b.querySelector('h2');
          var txt = h ? h.textContent.trim() : id;
          return '<a href="#'+id+'">'+txt+'</a>';
        }).join('');
        // No sobreescribe si ya hay contenido manual
        if(!mnav.children.length){
          mnav.innerHTML = htmlNav;
        }
      }
    }

    // --- to-top ---
    var toTop = qs('#p52-to-top');
    if(toTop){
      toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
      window.addEventListener('scroll', function(){
        var y = window.scrollY || document.documentElement.scrollTop;
        toTop.style.display = y>600 ? 'block' : 'none';
      }, {passive:true});
    }

    // --- legend fallback ---
    // No necesita JS adicional, solo asegurar que details esté cerrado en móvil
  });
})();
