/* =============================================================================
   MÓDULO DE PAINEL — Atividade "Continuum" (Flexibilidade ↔ Determinação)
   Desenha SÓ o miolo específico: um eixo por caso, com a faixa de referência e
   os marcadores dos grupos. O shell (painel-core.js) cuida de código, abas,
   polling, legenda e placar. Auto-registra via registrarPainel() ao carregar.

   Lê a posição de cada grupo em row.dados.casos (tabela única `respostas`,
   coluna jsonb `dados`). Metadados dos 8 casos vêm de window.CONTINUUM_DATA
   (mesma fonte da atividade), carregado por <script> antes deste arquivo.

   A CSS específica do continuum mora AQUI (injetada uma vez), para a atividade
   "plugar" sem tocar no shell — o painel.html só carrega CSS genérica.
   ============================================================================= */
(function (global) {
  "use strict";

  /* CSS específica do continuum — injetada uma única vez. Herda as variáveis
     do tema editorial definidas no <style> do shell (paper + laranja queimado). */
  function injetarCSS(){
    if (document.getElementById("css-painel-continuum")) return;
    var s = document.createElement("style");
    s.id = "css-painel-continuum";
    s.textContent =
      ".cases{display:grid; grid-template-columns:1fr; gap:14px}" +
      "@media(min-width:900px){ .cases{grid-template-columns:1fr 1fr} }" +
      ".case{background:var(--paper-content); border:1px solid var(--border-color); border-radius:6px; padding:18px 20px}" +
      ".case h2{font-family:var(--font-serif); font-size:1.25rem; font-weight:700; color:var(--text-primary); margin:0 0 4px; line-height:1.2}" +
      ".case .num{font-family:var(--font-mono); color:var(--brand); font-size:.9rem}" +
      ".poles{display:flex; justify-content:space-between; font-size:.78rem; color:var(--text-muted); margin:14px 0 6px}" +
      ".poles b{color:var(--text-secondary)}" +
      ".axis{position:relative; height:64px; margin-bottom:4px}" +
      ".axis-line{position:absolute; top:30px; left:0; right:0; height:4px; border-radius:2px; background:linear-gradient(90deg,#cfe0d4,#e9d9c0,#e6c5a6)}" +
      ".zone{position:absolute; top:22px; height:20px; background:var(--brand-soft); border-left:2px dashed var(--brand-line); border-right:2px dashed var(--brand-line)}" +
      ".gmark{position:absolute; width:18px; height:18px; margin-left:-9px; border-radius:50%; border:2px solid #fff; box-shadow:0 1px 3px rgba(0,0,0,.3)}" +
      ".refnote{font-size:.78rem; color:var(--text-muted); text-align:center}" +
      ".empty{font-size:.9rem; color:var(--text-muted); text-align:center; padding:14px 0}";
    document.head.appendChild(s);
  }

  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];
    });
  }

  /* Posição de um grupo num caso específico (ou null). Casa por caso_id; cai
     para o número sequencial se preciso. Lê de row.dados.casos. */
  function posicaoNoCaso(row, casoId){
    var dados = row.dados || {};
    var arr = Array.isArray(dados.casos) ? dados.casos : [];
    var e = null;
    for (var i=0;i<arr.length;i++){ if (arr[i].caso_id === casoId){ e = arr[i]; break; } }
    if (!e) for (var j=0;j<arr.length;j++){ if (arr[j].caso === casoId){ e = arr[j]; break; } }
    return (e && typeof e.posicao === "number") ? e.posicao : null;
  }

  function render(container, grupos, cores){
    var CASOS = global.CONTINUUM_DATA.CASOS;
    var html = '<div class="cases">' + CASOS.map(function(c){
      var zona = '<div class="zone" style="left:'+c.min+'%; width:'+(c.max - c.min)+'%"></div>';
      var marcadores = grupos.map(function(g){
        var p = posicaoNoCaso(g, c.id);
        if (p === null) return "";
        // leve escalonamento vertical para reduzir sobreposição entre grupos
        var top = 22 + (grupos.indexOf(g) % 3) * 9;
        return '<div class="gmark" title="'+esc(g.grupo)+': '+p+'" '+
               'style="left:'+p+'%; top:'+(top - 4)+'px; background:'+cores.get(g.grupo)+'"></div>';
      }).join("");
      var algum = grupos.some(function(g){ return posicaoNoCaso(g, c.id) !== null; });
      return '<div class="case">'+
        '<div class="num">Caso '+c.id+'</div>'+
        '<h2>'+esc(c.quem)+'</h2>'+
        '<div class="poles"><span><b>Flexibilidade</b> · 0</span><span>100 · <b>Determinação</b></span></div>'+
        '<div class="axis"><div class="axis-line"></div>'+zona+marcadores+'</div>'+
        (algum ? '<div class="refnote">Faixa de referência '+c.min+'–'+c.max+'</div>'
               : '<div class="empty">— sem respostas ainda —</div>')+
      '</div>';
    }).join("") + '</div>';
    container.innerHTML = html;
  }

  injetarCSS();
  global.registrarPainel({
    id: "continuum",              // === valor da coluna `atividade`
    label: "Continuum",           // rótulo da aba / instrução do código
    rota: "01-continuum.html",    // página da atividade
    placar: true,                 // shell mostra o placar genérico
    dataGlobal: "CONTINUUM_DATA", // window[...] carregado via <script> antes daqui
    render: render
  });
})(window);
