/* =============================================================================
   MÓDULO DE PAINEL — Atividade "Júri" (imputabilidade e responsabilidade)
   Desenha SÓ o miolo específico: por caso, um TALLY categórico dos vereditos
   entre os grupos. O conjunto de barras depende da `corte` do caso — 4 vias nos
   criminais (imputável / semi / inimputável / ausência de ação) e 3 no civil
   (autonomia / decisão apoiada / curatela) — mostrando consenso e dissenso de
   relance. Tally secundário, compacto, da capacidade apontada (Pergunta 1).

   SEM placar (veredito não tem gabarito → registrarPainel placar:false). O shell
   (painel-core.js) cuida de código, abas, polling e legenda. Auto-registra via
   registrarPainel() ao carregar. Lê row.dados.vereditos (tabela única `respostas`).
   Metadados dos 4 casos vêm de window.JURI_DATA (mesma fonte da atividade).

   CSS específica do júri mora AQUI (injetada uma vez) — a atividade "pluga" sem
   tocar no shell; herda as variáveis do tema editorial do <style> do shell.
   ============================================================================= */
(function (global) {
  "use strict";

  function injetarCSS(){
    if (document.getElementById("css-painel-juri")) return;
    var s = document.createElement("style");
    s.id = "css-painel-juri";
    s.textContent =
      ".juri-cases{display:grid; grid-template-columns:1fr; gap:14px}" +
      "@media(min-width:900px){ .juri-cases{grid-template-columns:1fr 1fr} }" +
      ".juri-case{background:var(--paper-content); border:1px solid var(--border-color); border-radius:6px; padding:18px 20px}" +
      ".juri-case h2{font-family:var(--font-serif); font-size:1.25rem; font-weight:700; color:var(--text-primary); margin:0 0 2px; line-height:1.2}" +
      ".juri-case .num{font-family:var(--font-mono); color:var(--brand); font-size:.9rem}" +
      ".corte-tag{display:inline-block; font-family:var(--font-mono); font-size:.7rem; text-transform:uppercase; letter-spacing:.05em; " +
        "color:var(--text-muted); border:1px solid var(--border-soft); border-radius:20px; padding:2px 9px; margin-left:8px}" +
      ".tally{margin:14px 0 0}" +
      ".tl-row{display:grid; grid-template-columns:9.5em 1fr 2em; align-items:center; gap:10px; margin:7px 0; font-size:.92rem}" +
      ".tl-label{color:var(--text-secondary); text-align:right; line-height:1.2}" +
      ".tl-track{position:relative; height:16px; background:var(--sidebar-bg); border-radius:8px; overflow:hidden}" +
      ".tl-fill{position:absolute; left:0; top:0; bottom:0; background:var(--brand); border-radius:8px; min-width:0; transition:width .3s}" +
      ".tl-count{font-family:var(--font-mono); color:var(--brand); font-weight:600; text-align:right}" +
      ".cap-tally{margin-top:14px; padding-top:10px; border-top:1px solid var(--border-color); font-size:.82rem; color:var(--text-muted)}" +
      ".cap-tally b{color:var(--text-secondary); font-weight:600}" +
      ".juri-empty{font-size:.9rem; color:var(--text-muted); text-align:center; padding:12px 0}";
    document.head.appendChild(s);
  }

  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];
    });
  }

  // Rótulos compactos da capacidade (tally secundário) — a Pergunta 1 tem
  // labels longos; aqui cabe só o essencial.
  var CAP_CURTO = { entender:"Entender", determinar:"Controlar-se", ambas:"Ambas", nenhuma:"Nenhuma" };

  /* Entrada de um grupo para um caso (ou null). */
  function votoNoCaso(row, casoId){
    var dados = row.dados || {};
    var arr = Array.isArray(dados.vereditos) ? dados.vereditos : [];
    for (var i=0;i<arr.length;i++){ if (arr[i].caso_id === casoId) return arr[i]; }
    return null;
  }

  /* Contagem por valor de um campo entre os grupos, para um caso. */
  function contar(grupos, casoId, campo){
    var m = {};
    grupos.forEach(function(g){
      var v = votoNoCaso(g, casoId);
      if (v && v[campo] != null){ m[v[campo]] = (m[v[campo]] || 0) + 1; }
    });
    return m;
  }

  function render(container, grupos /*, cores */){
    var CASOS = global.JURI_DATA.CASOS;
    var VEREDITOS = global.JURI_DATA.VEREDITOS;

    var html = '<div class="juri-cases">' + CASOS.map(function(c){
      var vs = VEREDITOS[c.corte];                 // conjunto conforme a corte
      var contagem = contar(grupos, c.id, "veredito");
      var totalVotos = Object.keys(contagem).reduce(function(s,k){ return s + contagem[k]; }, 0);

      var barras = Object.keys(vs).map(function(k){
        var n = contagem[k] || 0;
        var pct = totalVotos ? Math.round(n / totalVotos * 100) : 0;
        return '<div class="tl-row">' +
          '<span class="tl-label">' + esc(vs[k].curto) + '</span>' +
          '<span class="tl-track"><span class="tl-fill" style="width:' + pct + '%"></span></span>' +
          '<span class="tl-count">' + n + '</span>' +
        '</div>';
      }).join("");

      // tally secundário da capacidade (compacto)
      var cap = contar(grupos, c.id, "capacidade");
      var capLinha = Object.keys(CAP_CURTO).map(function(k){
        return esc(CAP_CURTO[k]) + " " + (cap[k] || 0);
      }).join(" · ");

      var corteLabel = (c.corte === "civil") ? "civil" : "criminal";

      return '<div class="juri-case">' +
        '<div class="num">Caso ' + c.id + '<span class="corte-tag">' + corteLabel + '</span></div>' +
        '<h2>' + esc(c.quem) + '</h2>' +
        (totalVotos
          ? '<div class="tally">' + barras + '</div>' +
            '<div class="cap-tally"><b>Capacidade comprometida:</b> ' + capLinha + '</div>'
          : '<div class="juri-empty">— sem votos ainda —</div>') +
      '</div>';
    }).join("") + '</div>';

    container.innerHTML = html;
  }

  injetarCSS();
  global.registrarPainel({
    id: "juri",                  // === valor da coluna `atividade`
    label: "Júri",               // rótulo da aba / instrução do código
    rota: "05-juri.html",        // página da atividade (último no fluxo do campeonato)
    placar: false,               // sem placar — veredito não tem gabarito
    itensParaCompletar: global.JURI_DATA.CASOS.length, // aba "concluída" = todos julgaram os 4 casos
    dataGlobal: "JURI_DATA",     // window[...] carregado via <script> antes daqui
    render: render
  });
})(window);
