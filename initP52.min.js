/*
 * Nauscopio · initP52
 * V7.2 Fix audit 2 · 2026-10-21
 * - Fix TOC: autocrea #mnav-auto antes de .layout si no existe, no aborta scrollspy
 * - Fix theme: clave unica nauscopio-p52-theme, migra p52-theme, evita doble handler, default light
 * - Fix lightbox: excluye 11 figuras provisionales (logo marcador, texto "pendiente", data-provisional, href="#")
 * - Caret anexos: añade data-anexo-toggle a enlaces del índice que apuntan a <details>
 * - Cabecera unica V7.2
 * Carga condicional solo en item/static_page
 */
(function () {
  'use strict';
  var REPORT_ID = 'p52-report';
  var getLang = function(root){
    var raw = (root.getAttribute('lang') || document.documentElement.lang || 'es').toLowerCase();
    if (raw.indexOf('en')===0) return 'en';
    if (raw.indexOf('de')===0) return 'de';
    return 'es';
  };
  var i18n = {
    es: { light:'Modo claro', dark:'Modo oscuro', ariaToDark:'Cambiar a modo oscuro', ariaToLight:'Cambiar a modo claro', enlarged:'Imagen ampliada', close:'Cerrar', calcSPLTitle:'Calculadora SPL y potencia necesaria', sens:'Sensibilidad (dB/W/m)', dist:'Distancia de escucha (m)', spl:'SPL objetivo (pico) dB', gain:'Factor de corrección acústica', gainOpts:['0 dB - mono / campo libre','3 dB - estéreo energético','6 dB - estéreo coherente / sala seca','8 dB - estéreo coherente + sala viva'], zoutTitle:'Calculadora de variación de respuesta por Zout', zout:'Zout del amplificador (Ω)', zmin:'Zmin del altavoz (Ω)', znom:'Znom del altavoz (Ω)', attZmin:'Atenuación @Zmin', attZnom:'Atenuación @Znom', varLevel:'Variación de nivel entre Zmin y Znom', scenario:'Escenario activo (según controles)', spl1w:'SPL @ 1 W a', splTarget:'SPL objetivo', factor:'factor activo', power:'potencia', perChannel:'por canal', fixedCompare:'Comparación de escenarios fijos', reference:'Referencia', marginsNote:'Márgenes frente a potencia nominal declarada, no frente a P@1 % THD.', liveSPL:function(spl,gain,power){ return 'SPL objetivo '+spl+' dB, factor '+gain+' dB. Potencia necesaria: '+power+' W por canal.'; }, liveZ:function(delta,df){ return 'Variación de nivel '+delta+' dB. Factor de amortiguamiento '+df+'.'; } },
    en: { light:'Light mode', dark:'Dark mode', ariaToDark:'Switch to dark mode', ariaToLight:'Switch to light mode', enlarged:'Enlarged image', close:'Close', calcSPLTitle:'SPL & power requirement calculator', sens:'Sensitivity (dB/W/m)', dist:'Listening distance (m)', spl:'Target SPL (peak) dB', gain:'Acoustic correction factor', gainOpts:['0 dB - mono / free field','3 dB - stereo decorrelated','6 dB - stereo coherent / dry room','8 dB - stereo coherent + live room'], zoutTitle:'Response variation by Zout calculator', zout:'Amplifier Zout (Ω)', zmin:'Speaker Zmin (Ω)', znom:'Speaker Znom (Ω)', attZmin:'Attenuation @Zmin', attZnom:'Attenuation @Znom', varLevel:'Level variation between Zmin and Znom', scenario:'Active scenario (per controls)', spl1w:'SPL @ 1 W at', splTarget:'Target SPL', factor:'active factor', power:'power', perChannel:'per channel', fixedCompare:'Fixed scenario comparison', reference:'Reference', marginsNote:'Margins vs rated nominal power, not vs P@1% THD.', liveSPL:function(spl,gain,power){ return 'Target SPL '+spl+' dB, factor '+gain+' dB. Required power: '+power+' W per channel.'; }, liveZ:function(delta,df){ return 'Level variation '+delta+' dB. Damping factor '+df+'.'; } },
    de: { light:'Heller Modus', dark:'Dunkler Modus', ariaToDark:'In dunklen Modus wechseln', ariaToLight:'In hellen Modus wechseln', enlarged:'Vergrössertes Bild', close:'Schliessen', calcSPLTitle:'SPL- & Leistungsbedarfsrechner', sens:'Empfindlichkeit (dB/W/m)', dist:'Hörabstand (m)', spl:'Ziel-SPL (Peak) dB', gain:'Akustischer Korrekturfaktor', gainOpts:['0 dB - Mono / Freifeld','3 dB - Stereo dekorreliert','6 dB - Stereo kohärent / trockener Raum','8 dB - Stereo kohärent + halliger Raum'], zoutTitle:'Rechner für Pegelabweichung durch Zout', zout:'Verstärker Zout (Ω)', zmin:'Lautsprecher Zmin (Ω)', znom:'Lautsprecher Znom (Ω)', attZmin:'Dämpfung @Zmin', attZnom:'Dämpfung @Znom', varLevel:'Pegelabweichung zwischen Zmin und Znom', scenario:'Aktives Szenario (nach Reglern)', spl1w:'SPL @ 1 W bei', splTarget:'Ziel-SPL', factor:'aktiver Faktor', power:'Leistung', perChannel:'pro Kanal', fixedCompare:'Vergleich fester Szenarien', reference:'Referenz', marginsNote:'Margen vs Nennleistung, nicht vs P@1% THD.', liveSPL:function(spl,gain,power){ return 'Ziel-SPL '+spl+' dB, Faktor '+gain+' dB. Benötigte Leistung: '+power+' W pro Kanal.'; }, liveZ:function(delta,df){ return 'Pegelabweichung '+delta+' dB. Dämpfungsfaktor '+df+'.'; } }
  };
  var prefersReducedMotion = function(){ return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); };

  function initTheme(root){
    var themeBtn = root.querySelector('#p52-theme-toggle');
    var topbar = root.querySelector('.p52-topbar');
    if (topbar) root.style.setProperty('--p52-nbtn', String(topbar.children.length));
    var lang = getLang(root); var t = i18n[lang] || i18n.es;
    var apply = function(light){
      root.classList.toggle('light', light);
      root.classList.remove('dark');
      if(themeBtn){
        themeBtn.textContent = light ? t.dark : t.light;
        themeBtn.setAttribute('aria-label', light ? t.ariaToDark : t.ariaToLight);
        themeBtn.setAttribute('aria-pressed', String(!light));
      }
    };
    var KEY='nauscopio-p52-theme'; var LEGACY='p52-theme'; var saved=null;
    try{ saved=localStorage.getItem(KEY); if(saved===null) saved=localStorage.getItem(LEGACY); }catch(e){}
    var isLight = true;
    if(saved==='dark') isLight=false; else if(saved==='light') isLight=true;
    apply(isLight);
    if(themeBtn && !themeBtn.dataset.p52ThemeBound){
      themeBtn.dataset.p52ThemeBound='1';
      themeBtn.addEventListener('click', function(){
        var next=!root.classList.contains('light');
        apply(next);
        try{ localStorage.setItem(KEY, next ? 'light' : 'dark'); localStorage.removeItem(LEGACY); }catch(e){}
      });
    }
  }

  function initTOC(root){
    var toc=root.querySelector('.toc');
    if(!toc) return;
    var layout=root.querySelector('.layout');
    var mnav=root.querySelector('#mnav-auto');
    if(!mnav){
      mnav=document.createElement('nav');
      mnav.className='mnav';
      mnav.id='mnav-auto';
      mnav.setAttribute('aria-label','Navegación móvil del informe');
      if(layout && layout.parentNode) layout.parentNode.insertBefore(mnav, layout);
      else root.insertBefore(mnav, root.firstChild);
    }
    if(!mnav.dataset.filled){
      var frag=document.createDocumentFragment();
      var allLinks=toc.querySelectorAll('a:not(.sub-link)');
      for(var i=0;i<allLinks.length;i++){
        var orig=allLinks[i];
        var href=orig.getAttribute('href');
        var clone=orig.cloneNode(true);
        if(href && href.charAt(0)==='#' && href.length>1){
          var id=href.slice(1);
          var targetEl=root.querySelector('[id="'+CSS.escape(id)+'"]');
          var det=null;
          if(targetEl){
            if(targetEl.tagName==='DETAILS') det=targetEl;
            else if(targetEl.closest) det=targetEl.closest('details');
          }
          if(det){
            // caret giratorio para anexos
            orig.setAttribute('data-anexo-toggle', det.id || id);
            clone.setAttribute('data-anexo-toggle', det.id || id);
            if(!orig.hasAttribute('aria-controls')) orig.setAttribute('aria-controls', det.id || id);
            if(!clone.hasAttribute('aria-controls')) clone.setAttribute('aria-controls', det.id || id);
          }
        }
        frag.appendChild(clone);
      }
      mnav.replaceChildren(frag); mnav.dataset.filled='1';
    }
    var links=root.querySelectorAll('.toc a, #mnav-auto a');
    var seen=new Set(), ordered=[];
    for(var j=0;j<links.length;j++){
      var h=links[j].getAttribute('href');
      if(h&&h.length>1&&h.charAt(0)==='#'){
        try{
          var el0=root.querySelector('[id="'+CSS.escape(h.slice(1))+'"]');
          if(el0&&!seen.has(el0)){ seen.add(el0); ordered.push(el0); }
        }catch(e){
          var el0b=document.getElementById(h.slice(1));
          if(el0b&&!seen.has(el0b)){ seen.add(el0b); ordered.push(el0b); }
        }
      }
    }
    ordered.sort(function(x,y){ return (x.compareDocumentPosition(y)&4)?-1:1; });
    var ticking=false;
    var spy=function(){
      ticking=false;
      var line=window.innerHeight*0.25, cur=null;
      for(var i=0;i<ordered.length;i++){
        var el=ordered[i];
        var d=el.closest ? el.closest('details') : null;
        if(d&&d!==el&&!d.open) continue;
        var r=el.getBoundingClientRect();
        if(!r.height) continue;
        if(r.top<=line) cur=el;
      }
      var id=cur?'#'+cur.id:null;
      for(var k=0;k<links.length;k++){
        var on=id!==null&&links[k].getAttribute('href')===id;
        links[k].classList.toggle('active',on);
        if(on) links[k].setAttribute('aria-current','true'); else links[k].removeAttribute('aria-current');
      }
    };
    var schedule=function(){ if(!ticking){ ticking=true; requestAnimationFrame(spy); } };
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule, {passive:true});
    root.addEventListener('toggle', schedule, true);
    spy();
    root.addEventListener('click', function(e){
      var a=e.target.closest('a[href^="#"]');
      if(!a) return;
      var href=a.getAttribute('href');
      if(!href||href.length<2) return;
      var el=null;
      try{ el=root.querySelector('[id="'+CSS.escape(href.slice(1))+'"]'); }catch(err){ el=document.getElementById(href.slice(1)); }
      if(!el) return;
      var p=el;
      while(p&&p!==root){
        if(p.tagName==='DETAILS'&&!p.open) p.open=true;
        p=p.parentElement;
      }
      e.preventDefault();
      try{ history.replaceState(null,'',href); }catch(err){}
      if(el.tagName!=='DETAILS'){
        if(!el.hasAttribute('tabindex')) el.setAttribute('tabindex','-1');
        try{ el.focus({preventScroll:true}); }catch(err){}
      }
      requestAnimationFrame(function(){
        try{ el.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth', block:'start'}); }
        catch(err){ el.scrollIntoView(); }
      });
    });
  }

  function initToggles(root){
    var toggleSelector='a[data-guide-toggle],a[data-referencias-toggle],a[data-anexo-toggle],a[data-anexo-prop-toggle],a[data-anexo-nfb-toggle],a[data-glosario-toggle]';
    var toggleLinks=root.querySelectorAll(toggleSelector);
    var detailsByControl=new Map();
    var resolveDetails=function(idOrHref){
      if(!idOrHref || idOrHref.charAt(0)!=='#' || idOrHref.length<2) return null;
      var id=idOrHref.slice(1);
      var target=null;
      try{ target=root.querySelector('[id="'+CSS.escape(id)+'"]'); }catch(e){ target=document.getElementById(id); }
      if(!target) return null;
      if(target.tagName==='DETAILS') return target;
      var p=target.parentElement;
      while(p && p!==root){
        if(p.tagName==='DETAILS') return p;
        p=p.parentElement;
      }
      return null;
    };
    for(var t=0;t<toggleLinks.length;t++){
      var linkEl=toggleLinks[t];
      var ctrlId=linkEl.getAttribute('aria-controls') || linkEl.getAttribute('data-anexo-toggle') || linkEl.getAttribute('data-guide-toggle') || linkEl.getAttribute('data-referencias-toggle');
      var hrefAttr=linkEl.getAttribute('href');
      var detEl=null;
      if(ctrlId) detEl=resolveDetails('#'+ctrlId);
      if(!detEl) detEl=resolveDetails(hrefAttr);
      if(!detEl) continue;
      if(!detailsByControl.has(detEl)){
        detailsByControl.set(detEl,[]);
        (function(det){
          det.addEventListener('toggle', function(){
            var as=detailsByControl.get(det)||[];
            for(var i=0;i<as.length;i++){
              as[i].classList.toggle('open', det.open);
              as[i].setAttribute('aria-expanded', String(det.open));
            }
          });
        })(detEl);
      }
      detailsByControl.get(detEl).push(linkEl);
    }
    requestAnimationFrame(function(){
      detailsByControl.forEach(function(links,det){
        for(var i=0;i<links.length;i++){
          links[i].classList.toggle('open', det.open);
          links[i].setAttribute('aria-expanded', String(det.open));
        }
      });
    });
  }

  function initToTop(root){
    var toTop=root.querySelector('#p52-to-top'); if(!toTop) return;
    var ticking=false;
    var update=function(){
      var y=window.scrollY||document.documentElement.scrollTop;
      toTop.classList.toggle('visible', y>600);
      ticking=false;
    };
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking=true; }
    }, {passive:true});
    update();
    toTop.addEventListener('click', function(){
      if(prefersReducedMotion()) window.scrollTo(0,0);
      else try{ window.scrollTo({top:0, behavior:'smooth'});}catch(e){ window.scrollTo(0,0);}
    });
  }

  function initLegend(root){
    var legend=root.querySelector('#p52-legend'); if(!legend) return;
    var KEY='nauscopio-p52-legend-open';
    var read=function(){ try{ return localStorage.getItem(KEY);}catch(e){ return null;}};
    var write=function(v){ try{ localStorage.setItem(KEY,v);}catch(e){}};
    var set=function(open){ legend.open=open;};
    var s0=read();
    set(s0===null?window.innerHeight>=900:s0==='1');
    var suppress=false;
    legend.addEventListener('toggle', function(){
      if(suppress){ suppress=false; return; }
      write(legend.open?'1':'0');
    });
    window.addEventListener('resize', function(){
      if(read()!==null) return;
      var want=window.innerHeight>=900;
      if(legend.open!==want){ suppress=true; set(want); }
    }, {passive:true});
  }

  function initCalculators(root){
    var lang=getLang(root); var tr=i18n[lang]||i18n.es;
    var fmt=function(n,k){ return n.toFixed(k).replace('.',','); };
    var sg=function(n){ return (n>=0?'+':'\u2212')+fmt(Math.abs(n),2); };
    var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
    var fLabel=function(f){ return f===0?'0':sg(f).replace(',00',''); };
    function ensureSPL(){
      var out=root.querySelector('#c-out'); if(!out) return null;
      if(root.querySelector('#c-sens')) return out;
      var card=out.closest('.calc-card')||document.createElement('div');
      if(!card.classList.contains('calc-card')){
        card.className='calc-card';
        out.parentNode.insertBefore(card,out); card.appendChild(out);
        var h=document.createElement('h4'); h.textContent=tr.calcSPLTitle;
        card.insertBefore(h,out);
      }
      var grid=card.querySelector('.calc-grid');
      if(!grid){ grid=document.createElement('div'); grid.className='calc-grid'; card.insertBefore(grid,out); }
      grid.innerHTML=''+
        '<div class="calc-row"><label for="c-sens">'+tr.sens+'</label><input id="c-sens" type="range" min="80" max="100" step="0.1" value="89.0" /><span class="calc-val" id="c-sens-val"></span></div>'+
        '<div class="calc-row"><label for="c-dist">'+tr.dist+'</label><input id="c-dist" type="range" min="1" max="6" step="0.1" value="3.0" /><span class="calc-val" id="c-dist-val"></span></div>'+
        '<div class="calc-row"><label for="c-spl">'+tr.spl+'</label><input id="c-spl" type="range" min="80" max="110" step="1" value="95" /><span class="calc-val" id="c-spl-val"></span></div>'+
        '<div class="calc-row"><label for="c-gain">'+tr.gain+'</label><select id="c-gain"><option value="0">'+tr.gainOpts[0]+'</option><option value="3" selected>'+tr.gainOpts[1]+'</option><option value="6">'+tr.gainOpts[2]+'</option><option value="8">'+tr.gainOpts[3]+'</option></select></div>';
      if(!out.getAttribute('data-refs')) out.setAttribute('data-refs','[]');
      if(!out.getAttribute('data-factors')) out.setAttribute('data-factors','0,3,6');
      var live=root.querySelector('#c-out-live');
      if(!live){
        live=document.createElement('div');
        live.id='c-out-live'; live.className='sr-only';
        live.setAttribute('aria-live','polite');
        card.appendChild(live);
      }
      return out;
    }
    function ensureZout(){
      var out=root.querySelector('#z-out'); if(!out) return null;
      if(root.querySelector('#z-zout')) return out;
      var card=out.closest('.calc-card')||document.createElement('div');
      if(!card.classList.contains('calc-card')){
        card.className='calc-card';
        out.parentNode.insertBefore(card,out); card.appendChild(out);
        var h=document.createElement('h4'); h.textContent=tr.zoutTitle;
        card.insertBefore(h,out);
      }
      var grid=card.querySelector('.calc-grid');
      if(!grid){ grid=document.createElement('div'); grid.className='calc-grid'; card.insertBefore(grid,out); }
      grid.innerHTML=''+
        '<div class="calc-row"><label for="z-zout">'+tr.zout+'</label><input id="z-zout" type="range" min="0.1" max="5" step="0.1" value="2.0" /><span class="calc-val" id="z-zout-val"></span></div>'+
        '<div class="calc-row"><label for="z-zmin">'+tr.zmin+'</label><input id="z-zmin" type="range" min="2" max="10" step="0.1" value="4.9" /><span class="calc-val" id="z-zmin-val"></span></div>'+
        '<div class="calc-row"><label for="z-znom">'+tr.znom+'</label><input id="z-znom" type="range" min="2" max="16" step="0.1" value="6.0" /><span class="calc-val" id="z-znom-val"></span></div>';
      var live=root.querySelector('#z-out-live');
      if(!live){
        live=document.createElement('div');
        live.id='z-out-live'; live.className='sr-only';
        live.setAttribute('aria-live','polite');
        card.appendChild(live);
      }
      return out;
    }
    ensureSPL(); ensureZout();
    (function(){
      var sens=root.querySelector('#c-sens'), dist=root.querySelector('#c-dist');
      var spl=root.querySelector('#c-spl'), gain=root.querySelector('#c-gain');
      var sensVal=root.querySelector('#c-sens-val'), distVal=root.querySelector('#c-dist-val'), splVal=root.querySelector('#c-spl-val');
      var out=root.querySelector('#c-out'), live=root.querySelector('#c-out-live');
      if(!sens||!dist||!spl||!gain||!out) return;
      var refs=[], factors=[3,6], last=0;
      try{ refs=JSON.parse(out.getAttribute('data-refs')||'[]'); }catch(e){ refs=[]; }
      (out.getAttribute('data-factors')||'3,6').split(',').forEach(function(f,i){ var v=parseFloat(f); if(!isNaN(v)) factors[i]=v; });
      factors=factors.filter(function(v){ return !isNaN(v); });
      var render=function(){
        var S=parseFloat(sens.value), D=parseFloat(dist.value), L=parseFloat(spl.value), G=parseFloat(gain.value)||0;
        if(sensVal) sensVal.textContent=fmt(S,1)+' dB/W/m';
        if(distVal) distVal.textContent=fmt(D,1)+' m';
        if(splVal) splVal.textContent=L.toFixed(0)+' dB';
        var spl1w=S-20*Math.log10(D);
        last=Math.pow(10,(L-spl1w-G)/10);
        var html='<span class="co-head">'+tr.scenario+'</span>'+
          '<span class="co-line">'+tr.spl1w+' <b>'+fmt(D,2)+' m</b>: <b>'+fmt(spl1w,2)+' dB</b></span>'+
          '<span class="co-line">'+tr.splTarget+': <b>'+L.toFixed(0)+' dB</b> - '+tr.factor+': <b>'+fLabel(G)+' dB</b> - '+tr.power+': <b>'+fmt(last,2)+' W</b> '+tr.perChannel+'</span>';
        if(refs.length){
          html+='<span class="co-sep"></span><span class="co-head">'+tr.fixedCompare+'</span>';
          factors.forEach(function(f){
            var p=Math.pow(10,(L-spl1w-f)/10);
            var cls=f===0?' co-factor-0':'';
            html+='<span class="co-line'+cls+'"><b>'+tr.reference+' '+fLabel(f)+' dB</b>:</span>';
            refs.forEach(function(r){ html+='<span class="co-line">  - '+esc(r.n)+': <b>'+sg(10*Math.log10(r.p/p))+' dB</b></span>'; });
          });
          html+='<span class="co-line" style="color:var(--p52-muted2);font-size:11.5px;margin-top:6px">'+tr.marginsNote+'</span>';
        }
        out.innerHTML=html;
      };
      var announce=function(){ if(live) live.textContent=tr.liveSPL(spl.value, gain.value, fmt(last,1)); };
      [sens, dist, spl, gain].forEach(function(el){
        el.addEventListener('input', render);
        el.addEventListener('change', function(){ render(); announce(); });
      });
      render();
    })();
    (function(){
      var zout=root.querySelector('#z-zout'), zmin=root.querySelector('#z-zmin'), znom=root.querySelector('#z-znom');
      var zo=root.querySelector('#z-out'), zlive=root.querySelector('#z-out-live');
      if(!zout||!zmin||!znom||!zo) return;
      var zoutVal=root.querySelector('#z-zout-val'), zminVal=root.querySelector('#z-zmin-val'), znomVal=root.querySelector('#z-znom-val');
      var lastDelta=0, lastDf=0;
      var renderZ=function(){
        var zm=parseFloat(zmin.value), zn=parseFloat(znom.value);
        if(zm>zn){ zn=zm; znom.value=zn; }
        var z=parseFloat(zout.value);
        if(zoutVal) zoutVal.textContent=fmt(z,1)+' \u03a9';
        if(zminVal) zminVal.textContent=fmt(zm,1)+' \u03a9';
        if(znomVal) znomVal.textContent=fmt(zn,1)+' \u03a9';
        var aMin=20*Math.log10(zm/(zm+z)), aNom=20*Math.log10(zn/(zn+z));
        var delta=aMin-aNom; lastDelta=Math.abs(delta); lastDf=zn/z;
        zo.innerHTML='<span class="co-line">'+tr.attZmin+' ('+fmt(zm,1)+' \u03a9): <b>'+sg(aMin)+' dB</b></span>'+
          '<span class="co-line">'+tr.attZnom+' ('+fmt(zn,1)+' \u03a9): <b>'+sg(aNom)+' dB</b></span>'+
          '<span class="co-line">'+tr.varLevel+': <b>'+fmt(Math.abs(delta),2)+' dB</b></span>'+
          '<span class="co-sep"></span>'+
          '<span class="co-line">DF @Znom: <b>'+fmt(zn/z,1)+'</b> - DF @8 \u03a9: <b>'+fmt(8/z,1)+'</b></span>';
      };
      var announceZ=function(){ if(zlive) zlive.textContent=tr.liveZ(fmt(lastDelta,2), fmt(lastDf,1)); };
      [zout, zmin, znom].forEach(function(el){
        el.addEventListener('input', renderZ);
        el.addEventListener('change', function(){ renderZ(); announceZ(); });
      });
      renderZ();
    })();
  }

  function initLightbox(root){
    var lang=getLang(root); var tr=i18n[lang]||i18n.es;
    var allImgs=root.querySelectorAll('img');
    var imgs=Array.prototype.filter.call(allImgs, function(img){
      if(img.closest('[data-no-lightbox]')) return false;
      if(img.classList.contains('no-lightbox') || img.classList.contains('no-zoom')) return false;
      var fig=img.closest('.figure, .exec-img, .x-img');
      if(fig){
        if(fig.dataset.provisional!==undefined) return false;
        if(fig.classList.contains('provisional') || fig.classList.contains('pending') || fig.classList.contains('figure-pending') || fig.classList.contains('is-provisional')) return false;
        var capEl=fig.querySelector('.figure-caption, .x-cap, .cap, figcaption');
        var capText=capEl ? capEl.textContent.toLowerCase() : '';
        if(capText.indexOf('figura pendiente')!==-1 || capText.indexOf('pendiente de imagen')!==-1 || capText.indexOf('fuente prevista')!==-1 || capText.indexOf('marcador')!==-1) return false;
        var src=(img.getAttribute('src')||'').toLowerCase();
        if(src.indexOf('logo')!==-1 && (src.indexOf('nauscopio')!==-1 || src.indexOf('placeholder')!==-1)) return false;
        if(fig.querySelector('[data-provisional]')) return false;
      }
      var link=img.closest('a');
      if(link){
        var href=(link.getAttribute('href')||'').trim();
        if(href==='#' || href==='') return false;
        if(href.charAt(0)==='#') return false;
      }
      return !!(fig || img.classList.contains('zoomable'));
    });
    if(!imgs.length) return;
    var lb=document.createElement('div');
    lb.className='nauscopio-p52-lightbox';
    lb.setAttribute('role','dialog');
    lb.setAttribute('aria-modal','true');
    lb.setAttribute('aria-label', tr.enlarged);
    lb.innerHTML='<button type="button" class="lb-close" aria-label="'+tr.close+'">&times;</button><img alt=""><span class="lb-cap" hidden></span>';
    document.body.appendChild(lb);
    var lbImg=lb.querySelector('img');
    var lbCap=lb.querySelector('.lb-cap');
    var lbClose=lb.querySelector('.lb-close');
    var lastFocus=null; var scrollCompensated=false;
    var captionFor=function(img){
      var fig=img.closest('.figure, .x-img, .exec-img');
      if(!fig) return '';
      var cap=fig.querySelector('.figure-caption, .x-cap, .cap, figcaption');
      return cap ? cap.textContent.trim() : '';
    };
    var lockScroll=function(){
      var sw=window.innerWidth-document.documentElement.clientWidth;
      document.documentElement.style.overflow='hidden';
      if(sw>0){ document.documentElement.style.paddingRight=sw+'px'; scrollCompensated=true; }
    };
    var unlockScroll=function(){
      document.documentElement.style.overflow='';
      if(scrollCompensated){ document.documentElement.style.paddingRight=''; scrollCompensated=false; }
    };
    var open=function(src,alt,cap){
      lbImg.src=src; lbImg.alt=alt||'';
      if(cap){ lbCap.textContent=cap; lbCap.hidden=false; }
      else{ lbCap.textContent=''; lbCap.hidden=true; }
      lockScroll();
      lb.classList.add('open');
      lastFocus=document.activeElement;
      try{ lbClose.focus(); }catch(e){}
    };
    var close=function(){
      lb.classList.remove('open');
      lbImg.removeAttribute('src');
      unlockScroll();
      if(lastFocus&&lastFocus.focus){ try{ lastFocus.focus(); }catch(e){} }
    };
    imgs.forEach(function(img){
      img.classList.add('zoomable');
      var link=img.closest('a');
      var trigger=function(e){
        e.preventDefault(); e.stopPropagation();
        var isImgLink=link && /\.(jpe?g|png|webp|avif|gif)(\?|$)/i.test(link.href);
        var src=img.dataset.full || (isImgLink ? link.href : null) || img.currentSrc || img.src;
        open(src, img.alt, captionFor(img));
      };
      if(link){
        link.addEventListener('click', trigger);
      } else {
        if(!img.hasAttribute('tabindex')) img.setAttribute('tabindex','0');
        img.setAttribute('role','button');
        img.addEventListener('click', trigger);
        img.addEventListener('keydown', function(e){
          if(e.key==='Enter'||e.key===' '||e.key==='Spacebar') trigger(e);
        });
      }
    });
    lbClose.addEventListener('click', close);
    lb.addEventListener('click', function(e){ if(e.target===lb) close(); });
    document.addEventListener('keydown', function(e){
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close();
      else if(e.key==='Tab'){ e.preventDefault(); try{ lbClose.focus(); }catch(err){} }
    });
  }

  function initPrint(root){
    window.addEventListener('beforeprint', function(){
      var dts=root.querySelectorAll('details');
      for(var q=0;q<dts.length;q++){ dts[q].dataset.wasOpen=dts[q].open?'1':'0'; dts[q].open=true; }
    });
    window.addEventListener('afterprint', function(){
      var dts=root.querySelectorAll('details');
      for(var r=0;r<dts.length;r++) if(dts[r].dataset.wasOpen==='0') dts[r].open=false;
    });
  }

  function init(){
    var root=document.getElementById(REPORT_ID);
    if(!root||root.dataset.p52init) return;
    root.dataset.p52init='1';
    initTheme(root);
    initTOC(root);
    initToggles(root);
    initToTop(root);
    initLegend(root);
    initCalculators(root);
    initLightbox(root);
    initPrint(root);
    // hash -> abrir anexo si viene con #anexo
    if(location.hash){
      try{
        var t=document.getElementById(location.hash.slice(1));
        var d=t ? (t.tagName==='DETAILS'?t:t.closest('details')) : null;
        if(d) d.open=true;
      }catch(e){}
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
