/* =============================================================================
   MÓDULO DE PAINEL — Atividade 5 (extra): A arquitetura da ação
   Desenha SÓ o miolo específico: por caso, um TALLY das ESCOLHAS entre os grupos
   sobre as 4 opções daquele caso (chaves da RÉGUA; label vindo da RÉGUA), com a
   `correta` destacada — o "mapa de confusão": em qual ponto da arquitetura a turma
   errou. O gabarito comentado NÃO vai ao painel (é da tela do aluno).

   Pontua → registrarPainel placar:true (o shell mostra o placar genérico, que
   ordena por `pontuacao` = nº de acertos). Lê row.dados.itens (escolha por
   item_id). Auto-registra. CSS específica injetada aqui; herda as variáveis do
   tema do shell. Sem CDN, sem framework.
   ============================================================================= */
(function (global) {
  "use strict";

  function injetarCSS(){
    if (document.getElementById("css-painel-planos")) return;
    var s = document.createElement("style");
    s.id = "css-painel-planos";
    s.textContent =
      ".p-cases{display:grid; grid-template-columns:1fr; gap:14px}" +
      "@media(min-width:900px){ .p-cases{grid-template-columns:1fr 1fr} }" +
      ".p-case{background:var(--paper-content); border:1px solid var(--border-color); border-radius:6px; padding:18px 20px}" +
      ".p-case .num{font-family:var(--font-mono); color:var(--brand); font-size:.9rem}" +
      ".p-case h2{font-family:var(--font-serif); font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0 0 10px; line-height:1.2}" +
      ".p-alt{margin:9px 0}" +
      ".p-alt-label{font-size:.88rem; color:var(--text-secondary); line-height:1.25; margin-bottom:3px}" +
      ".p-alt.correta .p-alt-label{color:var(--live); font-weight:600}" +
      ".p-alt-bar{display:flex; align-items:center; gap:8px}" +
      ".p-track{position:relative; flex:1 1 auto; height:14px; background:var(--sidebar-bg); border-radius:7px; overflow:hidden}" +
      ".p-fill{position:absolute; left:0; top:0; bottom:0; background:var(--brand); border-radius:7px; transition:width .3s}" +
      ".p-alt.correta .p-fill{background:var(--live)}" +
      ".p-n{font-family:var(--font-mono); font-weight:600; color:var(--brand); min-width:1.6em; text-align:right}" +
      ".p-alt.correta .p-n{color:var(--live)}" +
      ".p-empty{font-size:.9rem; color:var(--text-muted); text-align:center; padding:12px 0}";
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

  /* Cartão de um caso com o tally das escolhas sobre suas 4 opções (régua). */
  function cartao(q, grupos, LABEL){
    var contagem = contar(grupos, q.id);
    var total = Object.keys(contagem).reduce(function(s,k){ return s + contagem[k]; }, 0);

    var barras = q.opcoes.map(function(o){
      var n = contagem[o.chave] || 0;
      var pct = total ? Math.round(n/total*100) : 0;
      var correta = (o.chave === q.correta);
      return '<div class="p-alt' + (correta ? " correta" : "") + '">' +
        '<div class="p-alt-label">' + (correta ? "✓ " : "") + esc(LABEL[o.chave] || o.chave) + '</div>' +
        '<div class="p-alt-bar"><span class="p-track"><span class="p-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="p-n">' + n + '</span></div>' +
      '</div>';
    }).join("");

    return '<div class="p-case">' +
      '<div class="num">Caso ' + q.id + '</div>' +
      '<h2>' + esc(q.titulo) + '</h2>' +
      (total ? barras : '<div class="p-empty">— sem respostas ainda —</div>') +
    '</div>';
  }

  function render(container, grupos /*, cores */){
    var D = global.PLANOS_DATA;
    var LABEL = {};
    D.REGUA.forEach(function(r){ LABEL[r.chave] = r.label; });

    container.innerHTML = '<div class="p-cases">' +
      D.ITENS.map(function(q){ return cartao(q, grupos, LABEL); }).join("") +
    '</div>';
  }

  injetarCSS();
  global.registrarPainel({
    id: "planos",
    label: "Arquitetura da ação",
    rota: "05-planos.html",
    placar: true,
    dataGlobal: "PLANOS_DATA",
    render: render
  });
})(window);
