/* =============================================================================
   MÓDULO DE PAINEL — Atividade "Simulado" (Questões Comentadas)
   Desenha SÓ o miolo específico: por questão, um TALLY das ESCOLHAS entre os
   grupos sobre as opções (4 de item.opcoes nas "melhor resposta"; 5 de
   QUESTOES_DATA.AR_OPCOES nos bônus asserção-razão), com a `correta` destacada —
   o "mapa de confusão". Bloco base (1–8) separado do bloco bônus (9–10).

   Pontua → registrarPainel placar:true (o shell mostra o placar genérico, que
   ordena por `pontuacao` = base + bônus). O gabarito comentado NÃO vai ao painel
   (é da tela do aluno). Lê row.dados.itens (escolha por item_id). Auto-registra.
   CSS específica injetada aqui; herda as variáveis do tema do shell.
   ============================================================================= */
(function (global) {
  "use strict";

  function injetarCSS(){
    if (document.getElementById("css-painel-questoes")) return;
    var s = document.createElement("style");
    s.id = "css-painel-questoes";
    s.textContent =
      ".q-block-title{font-family:var(--font-mono); font-size:.8rem; text-transform:uppercase; letter-spacing:.06em; color:var(--brand); margin:6px 0 10px}" +
      ".q-block-title:not(:first-child){margin-top:24px}" +
      ".q-cases{display:grid; grid-template-columns:1fr; gap:14px}" +
      "@media(min-width:900px){ .q-cases{grid-template-columns:1fr 1fr} }" +
      ".q-case{background:var(--paper-content); border:1px solid var(--border-color); border-radius:6px; padding:18px 20px}" +
      ".q-case .num{font-family:var(--font-mono); color:var(--brand); font-size:.9rem}" +
      ".q-case h2{font-family:var(--font-serif); font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0 0 10px; line-height:1.2}" +
      ".q-alt{margin:9px 0}" +
      ".q-alt-label{font-size:.88rem; color:var(--text-secondary); line-height:1.25; margin-bottom:3px}" +
      ".q-alt.correta .q-alt-label{color:var(--live); font-weight:600}" +
      ".q-alt-bar{display:flex; align-items:center; gap:8px}" +
      ".q-track{position:relative; flex:1 1 auto; height:14px; background:var(--sidebar-bg); border-radius:7px; overflow:hidden}" +
      ".q-fill{position:absolute; left:0; top:0; bottom:0; background:var(--brand); border-radius:7px; transition:width .3s}" +
      ".q-alt.correta .q-fill{background:var(--live)}" +
      ".q-n{font-family:var(--font-mono); font-weight:600; color:var(--brand); min-width:1.6em; text-align:right}" +
      ".q-alt.correta .q-n{color:var(--live)}" +
      ".q-empty{font-size:.9rem; color:var(--text-muted); text-align:center; padding:12px 0}";
    document.head.appendChild(s);
  }

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }

  function escolhaNoItem(row, itemId){
    var dados = row.dados || {};
    var arr = Array.isArray(dados.itens) ? dados.itens : [];
    for (var i=0;i<arr.length;i++){ if (arr[i].item_id === itemId) return arr[i].escolha; }
    return null;
  }
  function contar(grupos, itemId){
    var m = {};
    grupos.forEach(function(g){ var e = escolhaNoItem(g, itemId); if (e != null) m[e] = (m[e]||0)+1; });
    return m;
  }

  /* Marca um cartão de questão com o tally das escolhas. */
  function cartao(q, grupos, AR){
    var opcoes = (q.formato === "assercao_razao") ? AR : q.opcoes;
    var contagem = contar(grupos, q.id);
    var total = Object.keys(contagem).reduce(function(s,k){ return s + contagem[k]; }, 0);
    var rotulo = q.bonus ? ("Bônus " + q.id) : ("Questão " + q.id);

    var barras = opcoes.map(function(o){
      var n = contagem[o.chave] || 0;
      var pct = total ? Math.round(n/total*100) : 0;
      var correta = (o.chave === q.correta);
      var label = (q.formato === "assercao_razao") ? (o.chave + ") " + o.label) : o.label;
      return '<div class="q-alt' + (correta ? " correta" : "") + '">' +
        '<div class="q-alt-label">' + (correta ? "✓ " : "") + esc(label) + '</div>' +
        '<div class="q-alt-bar"><span class="q-track"><span class="q-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="q-n">' + n + '</span></div>' +
      '</div>';
    }).join("");

    return '<div class="q-case">' +
      '<div class="num">' + rotulo + '</div>' +
      '<h2>' + esc(q.grupo) + '</h2>' +
      (total ? barras : '<div class="q-empty">— sem respostas ainda —</div>') +
    '</div>';
  }

  function render(container, grupos /*, cores */){
    var Q = global.QUESTOES_DATA.QUESTOES;
    var AR = global.QUESTOES_DATA.AR_OPCOES;
    var base = Q.filter(function(q){ return !q.bonus; });
    var bonus = Q.filter(function(q){ return q.bonus; });

    var html = '<div class="q-block-title">Questões 1–' + base.length + '</div>' +
      '<div class="q-cases">' + base.map(function(q){ return cartao(q, grupos, AR); }).join("") + '</div>';
    if (bonus.length){
      html += '<div class="q-block-title">Bônus (asserção-razão)</div>' +
        '<div class="q-cases">' + bonus.map(function(q){ return cartao(q, grupos, AR); }).join("") + '</div>';
    }
    container.innerHTML = html;
  }

  injetarCSS();
  global.registrarPainel({
    id: "questoes",
    label: "Simulado",
    rota: "03-questoes.html",
    placar: true,
    maxPontos: 8,                // agregador §7: 8 questões-base = 100; os 2 bônus são
                                 // seguro (a normalização limita a nota a 100) — bônus
                                 // não penaliza quem para antes. (Decisão do autor, jun/2026.)
    // aba "concluída" = todos fizeram as 8 questões-base (os 2 bônus são opcionais)
    itensParaCompletar: global.QUESTOES_DATA.QUESTOES.filter(function(q){ return !q.bonus; }).length,
    dataGlobal: "QUESTOES_DATA",
    render: render
  });
})(window);
