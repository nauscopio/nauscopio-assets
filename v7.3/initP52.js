/* Nauscopio · initP52.js · v7.3.2 final merge · 2026-10-31
   Base: ChatGPT v7.3.1 (calculadoras SPL/Zout, leyenda, .light) + mejoras propias (mnav robusto, migración clave, rAF, aria-current, reduced-motion)
   CDN: https://cdn.jsdelivr.net/gh/nauscopio/nauscopio-assets@v7.3/initP52.js
*/
/* Nauscopio · initP52.js · v7.3.1 · 2026-10-31
   Restauración funcional compatible con la carpeta v7.3.
   - Tema local al informe (#p52-report.light / :not(.light)); migra clave antigua.
   - Índice móvil clonado desde .toc, scrollspy y apertura de details por anclas.
   - Estado accesible de enlaces que controlan anexos/details.
   - Botón arriba, persistencia de leyenda y calculadoras SPL/Zout.
   - NO crea lightbox: las páginas con visor propio conservan su implementación.
*/
(function(){
  'use strict';
  var ROOT_ID='p52-report', KEY='nauscopio-p52-theme', OLD_KEY='p52-theme';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function qs(s,r){return (r||document).querySelector(s);}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
  function reduced(){return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);}
  function safeId(id,root){var el=document.getElementById(id);return el&&root.contains(el)?el:null;}
  function init(root){
    var lang=(root.getAttribute('lang')||document.documentElement.lang||'es').toLowerCase();
    var en=lang.indexOf('en')===0;

    // Tema: .light significa claro; ausencia de .light significa oscuro.
    var themeBtn=qs('#p52-theme-toggle',root);
    function applyTheme(light){
      root.classList.toggle('light',!!light);
      root.classList.remove('dark');
      if(themeBtn){
        themeBtn.textContent=light?(en?'Dark mode':'Modo oscuro'):(en?'Light mode':'Modo claro');
        themeBtn.setAttribute('aria-label',light?(en?'Switch to dark mode':'Cambiar a modo oscuro'):(en?'Switch to light mode':'Cambiar a modo claro'));
        themeBtn.setAttribute('aria-pressed',String(!light));
      }
    }
    var saved=null;
    try{saved=localStorage.getItem(KEY);if(saved===null)saved=localStorage.getItem(OLD_KEY);}catch(e){}
    applyTheme(saved!=='dark');
    if(themeBtn&&!themeBtn.dataset.p52ThemeBound){
      themeBtn.dataset.p52ThemeBound='1';
      themeBtn.addEventListener('click',function(){
        var light=!root.classList.contains('light');applyTheme(light);
        try{localStorage.setItem(KEY,light?'light':'dark');localStorage.removeItem(OLD_KEY);}catch(e){}
      });
    }

    // Índice móvil: copia enlaces del índice real, no reconstruye títulos ni IDs.
    var toc=qs('.toc',root), layout=qs('.layout',root), mobile=qs('#mnav-auto',root);
    if(toc){
      if(!mobile){mobile=document.createElement('nav');mobile.id='mnav-auto';mobile.className='mnav';mobile.setAttribute('aria-label',en?'Mobile report navigation':'Navegación móvil del informe');if(layout&&layout.parentNode)layout.parentNode.insertBefore(mobile,layout);else root.insertBefore(mobile,root.firstChild);}
      if(!mobile.dataset.p52Filled){
        var frag=document.createDocumentFragment();
        qsa('a[href^="#"]:not(.sub-link)',toc).forEach(function(a){
          var href=a.getAttribute('href'),id=href&&href.slice(1),target=id&&safeId(id,root),clone=a.cloneNode(true);
          if(target){var det=target.tagName==='DETAILS'?target:target.closest('details');if(det){clone.setAttribute('data-p52-controls',det.id);}}
          frag.appendChild(clone);
        });
        mobile.replaceChildren(frag);mobile.dataset.p52Filled='1';
      }
      // Scrollspy ligero y limitado a enlaces con destino real.
      var navLinks=qsa('.toc a[href^="#"],#mnav-auto a[href^="#"]',root), targets=[];
      navLinks.forEach(function(a){var id=(a.getAttribute('href')||'').slice(1),el=safeId(id,root);if(el&&targets.indexOf(el)<0)targets.push(el);});
      targets.sort(function(a,b){return a.compareDocumentPosition(b)&4?-1:1;});
      var ticking=false;
      function spy(){ticking=false;var line=window.innerHeight*.27,current=null;targets.forEach(function(el){var d=el.closest('details');if(d&&!d.open&&d!==el)return;var r=el.getBoundingClientRect();if(r.height&&r.top<=line)current=el;});var href=current?'#'+current.id:null;navLinks.forEach(function(a){var active=!!href&&a.getAttribute('href')===href;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
      function schedule(){if(!ticking){ticking=true;window.requestAnimationFrame(spy);}}
      window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});root.addEventListener('toggle',schedule,true);spy();
      // Abrir cualquier details ancestro de una ancla antes de desplazar.
      root.addEventListener('click',function(e){
        var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||!root.contains(a))return;
        var id=(a.getAttribute('href')||'').slice(1),el=safeId(id,root);if(!el)return;
        var p=el;while(p&&p!==root){if(p.tagName==='DETAILS'&&!p.open)p.open=true;p=p.parentElement;}
        if(el.tagName==='DETAILS'&&el.open){};
        e.preventDefault();try{history.replaceState(null,'','#'+id);}catch(err){}
        if(el.tagName!=='DETAILS'){if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','-1');try{el.focus({preventScroll:true});}catch(err){}}
        window.requestAnimationFrame(function(){try{el.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});}catch(err){el.scrollIntoView();}});
      });
    }

    // Estado aria-expanded de controles que abren anexos, guías o referencias.
    var toggleSelector='a[data-guide-toggle],a[data-referencias-toggle],a[data-anexo-toggle],a[data-anexo-prop-toggle],a[data-anexo-nfb-toggle],a[data-glosario-toggle],a[data-p52-controls]';
    var toggles=qsa(toggleSelector,root);
    function resolveDetails(a){var id=a.getAttribute('aria-controls')||a.getAttribute('data-p52-controls')||a.getAttribute('data-anexo-toggle')||a.getAttribute('data-guide-toggle')||a.getAttribute('data-referencias-toggle');var el=id&&safeId(id,root);if(!el){var href=a.getAttribute('href');if(href&&href.charAt(0)==='#')el=safeId(href.slice(1),root);}if(!el)return null;return el.tagName==='DETAILS'?el:el.closest('details');}
    var bound=new Set();
    toggles.forEach(function(a){var det=resolveDetails(a);if(!det)return;function sync(){a.classList.toggle('open',det.open);a.setAttribute('aria-expanded',String(det.open));if(!a.hasAttribute('aria-controls')&&det.id)a.setAttribute('aria-controls',det.id);}sync();if(!bound.has(det)){bound.add(det);det.addEventListener('toggle',function(){toggles.forEach(function(x){if(resolveDetails(x)===det){x.classList.toggle('open',det.open);x.setAttribute('aria-expanded',String(det.open));}});});}});

    // Botón volver arriba.
    var top=qs('#p52-to-top',root);
    if(top){var topTick=false;function updateTop(){var y=window.scrollY||document.documentElement.scrollTop;top.classList.toggle('visible',y>600);topTick=false;}window.addEventListener('scroll',function(){if(!topTick){topTick=true;window.requestAnimationFrame(updateTop);}},{passive:true});updateTop();top.addEventListener('click',function(){if(reduced())window.scrollTo(0,0);else try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);}});}

    // Persistencia de apertura de la leyenda.
    var legend=qs('#p52-legend',root);
    if(legend){var LKEY='nauscopio-p52-legend-open',lv=null;try{lv=localStorage.getItem(LKEY);}catch(e){}if(lv!==null)legend.open=lv==='1';else legend.open=window.innerHeight>=900;legend.addEventListener('toggle',function(){try{localStorage.setItem(LKEY,legend.open?'1':'0');}catch(e){}});}

    // Calculadora SPL: los controles ya están en el HTML; no se duplican ni recrean.
    var sens=qs('#c-sens',root),dist=qs('#c-dist',root),spl=qs('#c-spl',root),gain=qs('#c-gain',root),out=qs('#c-out',root);
    if(sens&&dist&&spl&&gain&&out&&!out.dataset.p52Bound){
      out.dataset.p52Bound='1';var sVal=qs('#c-sens-val',root),dVal=qs('#c-dist-val',root),lVal=qs('#c-spl-val',root),live=qs('#c-out-live',root),refs=[];
      try{refs=JSON.parse(out.getAttribute('data-refs')||'[]');if(!Array.isArray(refs))refs=[];}catch(e){refs=[];}
      var fmt=function(n,k){return Number(n).toFixed(k).replace('.',',');},signed=function(n){return (n>=0?'+':'−')+fmt(Math.abs(n),2);},esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
      function renderSPL(){var S=+sens.value,D=+dist.value,L=+spl.value,G=+gain.value||0;if(!(S>0&&D>0))return;var at1=S-20*Math.log10(D),P=Math.pow(10,(L-at1-G)/10);if(sVal)sVal.textContent=fmt(S,1)+' dB/W/m';if(dVal)dVal.textContent=fmt(D,1)+' m';if(lVal)lVal.textContent=fmt(L,0)+' dB';var html='<span class="co-head">'+(en?'Active scenario':'Escenario activo')+'</span><span class="co-line">'+(en?'SPL at 1 W /':'SPL a 1 W /')+' <b>'+fmt(D,2)+' m</b>: <b>'+fmt(at1,2)+' dB</b></span><span class="co-line">'+(en?'Target':'Objetivo')+': <b>'+fmt(L,0)+' dB</b> · '+(en?'correction':'corrección')+': <b>'+signed(G).replace(',00','')+' dB</b> · '+(en?'required power':'potencia necesaria')+': <b>'+fmt(P,2)+' W</b> '+(en?'per channel':'por canal')+'</span>';
        if(refs.length){html+='<span class="co-sep"></span><span class="co-head">'+(en?'Fixed nominal-power comparison':'Comparación con potencias nominales declaradas')+'</span>';[0,3,6].forEach(function(f){var pf=Math.pow(10,(L-at1-f)/10);html+='<span class="co-line"><b>'+(en?'Correction':'Corrección')+' '+f+' dB</b></span>';refs.forEach(function(r){var rp=Number(r.p);if(rp>0)html+='<span class="co-line">'+esc(r.n||'Referencia')+': <b>'+signed(10*Math.log10(rp/pf))+' dB</b></span>';});});html+='<span class="co-line" style="font-size:11px">'+(en?'Compared with declared nominal power, not measured P@1% THD.':'Comparación con potencia nominal declarada, no con P@1 % THD medido.')+'</span>';}
        out.innerHTML=html;if(live)live.textContent=(en?'Required power ':'Potencia necesaria ')+fmt(P,2)+(en?' watts per channel.':' vatios por canal.');}
      [sens,dist,spl,gain].forEach(function(el){el.addEventListener('input',renderSPL);el.addEventListener('change',renderSPL);});renderSPL();
    }

    // Calculadora Zout: divisor resistivo simplificado, no modelo de carga compleja.
    var zout=qs('#z-zout',root),zmin=qs('#z-zmin',root),znom=qs('#z-znom',root),zoutOut=qs('#z-out',root);
    if(zout&&zmin&&znom&&zoutOut&&!zoutOut.dataset.p52Bound){
      zoutOut.dataset.p52Bound='1';var zv=qs('#z-zout-val',root),zminv=qs('#z-zmin-val',root),znv=qs('#z-znom-val',root),zlive=qs('#z-out-live',root);
      function renderZ(){var z=+zout.value,zm=+zmin.value,zn=+znom.value;if(!(z>0&&zm>0&&zn>0))return;if(zm>zn){zn=zm;znom.value=String(zn);}var amin=20*Math.log10(zm/(zm+z)),anom=20*Math.log10(zn/(zn+z)),delta=Math.abs(amin-anom),df=zn/z;var f=function(n){return Number(n).toFixed(2).replace('.',',');};if(zv)zv.textContent=f(z)+' Ω';if(zminv)zminv.textContent=f(zm)+' Ω';if(znv)znv.textContent=f(zn)+' Ω';zoutOut.innerHTML='<span class="co-line">Atenuación @Zmin ('+f(zm)+' Ω): <b>'+f(amin)+' dB</b></span><span class="co-line">Atenuación @Znom ('+f(zn)+' Ω): <b>'+f(anom)+' dB</b></span><span class="co-line">Diferencia de atenuación: <b>'+f(delta)+' dB</b></span><span class="co-sep"></span><span class="co-line">DF aproximado @Znom: <b>'+f(df)+'</b> · DF @8 Ω: <b>'+f(8/z)+'</b></span><span class="co-line" style="font-size:11px">Modelo resistivo simplificado; no sustituye el cálculo con ZL(f) y Zout(f) complejas.</span>';if(zlive)zlive.textContent='Diferencia de atenuación '+f(delta)+' dB; factor de amortiguamiento '+f(df)+'.';}
      [zout,zmin,znom].forEach(function(el){el.addEventListener('input',renderZ);el.addEventListener('change',renderZ);});renderZ();
    }
  }
  ready(function(){var root=document.getElementById(ROOT_ID);if(root)init(root);});
})();


// --- Mejora adicional v7.3.2: asegura #mnav-auto antes de .layout si el tema no lo creó (herencia v7.2) ---
(function(){
  try{
    var root=document.getElementById('p52-report');
    if(!root) return;
    var layout=root.querySelector('.layout');
    var mnav=document.getElementById('mnav-auto');
    if(!mnav && layout && layout.parentNode){
      mnav=document.createElement('nav');
      mnav.id='mnav-auto'; mnav.className='mnav';
      mnav.setAttribute('aria-label','Navegación móvil del informe');
      layout.parentNode.insertBefore(mnav, layout);
    }
  }catch(e){}
})();
