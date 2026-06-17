/* =============================================================================
   PAINEL DO PROFESSOR — SHELL GENÉRICO (multi-atividade)
   Vanilla JS, sem framework, sem CDN. Tudo que NÃO é específico de uma atividade
   mora aqui: geração/trava do código da aula, seletor de atividades (abas),
   polling, dedup de grupos, paleta de cores, legenda e placar.

   Cada atividade se auto-registra chamando window.registrarPainel({...}) a partir
   do seu módulo (ex.: lib/painel-continuum.js), carregado DEPOIS deste arquivo.
   O registry é só um array em memória: os <script> em painel.html são a fonte da
   verdade de quais atividades existem (decisão de Ockham — sem auto-discovery).

   Contrato do módulo:
     { id, label, rota, placar?, dataGlobal?, render(container, grupos, cores) }
   O shell entrega ao render():
     container : <div> limpo onde desenhar o miolo específico
     grupos    : linhas já deduplicadas + ordenadas por pontuação (cada uma com .dados)
     cores     : Map(grupo -> cor) — usar p/ marcadores baterem com legenda/placar
   ============================================================================= */
(function (global) {
  "use strict";

  /* Paleta de cores distintas para os grupos (legíveis sobre paper). Atribuída
     na ordem do placar, de modo que legenda, marcadores e placar concordem. */
  var PALETA = ["#b45309","#2f6db4","#2f7d4f","#9b2f8f","#b0331f",
                "#1f8f96","#8f6b1f","#5a4fb4","#b42f6b","#4a4a4a"];

  var POLL_MS    = 4000;
  var STORE_KEY  = "painel-sessao"; // genérico — compartilhado entre atividades
  var ALFABETO   = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sem 0 O 1 I L
  var CODIGO_LEN = 5;

  var registry = [];          // módulos registrados (ordem dos <script>)
  var atividadeAtiva = null;  // id da atividade selecionada
  var sessao = "";
  var timer = null;

  function $(id){ return document.getElementById(id); }
  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];
    });
  }
  /* Hora local HH:MM:SS para "última atualização" */
  function agora(){
    var d = new Date(), p = function(n){ return String(n).padStart(2,"0"); };
    return p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
  }

  /* ---- Registry: chamado pelos módulos de atividade ao carregar ---- */
  global.registrarPainel = function (mod) {
    if (mod && mod.id) registry.push(mod);
  };
  function moduloAtivo(){
    for (var i=0;i<registry.length;i++) if (registry[i].id === atividadeAtiva) return registry[i];
    return null;
  }

  /* ---- Código da sessão: gerado aqui, sem QR. Alfabeto sem ambíguos. ----
     Travado: persiste em localStorage e reflete em ?sessao= na URL (reload não
     troca). "Novo código" regenera (confirmando). Campo = override manual. */
  function gerarCodigo(){
    var s = "";
    for (var i=0;i<CODIGO_LEN;i++) s += ALFABETO[Math.floor(Math.random()*ALFABETO.length)];
    return s;
  }
  function sessaoInicial(){
    var url = (new URLSearchParams(location.search).get("sessao") || "").trim().toUpperCase();
    if (url) return url;
    var salvo = (localStorage.getItem(STORE_KEY) || "").trim().toUpperCase();
    if (salvo) return salvo;
    return gerarCodigo();
  }
  function fixarSessao(novo){
    sessao = (novo || "").trim().toUpperCase();
    try { localStorage.setItem(STORE_KEY, sessao); } catch (e) { /* storage indisponível: segue na URL */ }
    refletirNaURL();
    $("sessaoInput").value = sessao;
    $("codigoBig").textContent = sessao || "—";
    iniciarPolling();
  }

  /* ---- Atividade ativa: ?atividade= (se existir no registry) > 1ª registrada ---- */
  function atividadeInicial(){
    var url = (new URLSearchParams(location.search).get("atividade") || "").trim().toLowerCase();
    if (url && registry.some(function(m){ return m.id === url; })) return url;
    return registry.length ? registry[0].id : null;
  }
  function trocaAtividade(id){
    atividadeAtiva = id;
    refletirNaURL();
    montarAbas();
    atualizarInstrucao();
    iniciarPolling();
  }

  /* Reflete sessao + atividade em ?sessao=&atividade= sem recarregar. */
  function refletirNaURL(){
    var u = new URL(location.href);
    if (sessao) u.searchParams.set("sessao", sessao);
    if (atividadeAtiva) u.searchParams.set("atividade", atividadeAtiva);
    history.replaceState(null, "", u);
  }

  /* ---- Abas (só aparecem com 2+ atividades) ---- */
  function montarAbas(){
    var box = $("abas");
    if (registry.length <= 1){ box.style.display = "none"; box.innerHTML = ""; return; }
    box.style.display = "";
    box.innerHTML = "";
    registry.forEach(function(m){
      var b = document.createElement("button");
      b.className = "aba" + (m.id === atividadeAtiva ? " ativa" : "");
      b.textContent = m.label;
      b.addEventListener("click", function(){ if (m.id !== atividadeAtiva) trocaAtividade(m.id); });
      box.appendChild(b);
    });
  }

  /* ---- Instrução do código: nome da atividade selecionada ---- */
  function atualizarInstrucao(){
    var m = moduloAtivo();
    $("instrAtividade").textContent = m ? m.label : "—";
  }

  /* ---- Indicador "ao vivo" ---- */
  function setLive(on, texto){
    $("liveTag").classList.toggle("off", !on);
    $("liveText").textContent = texto;
  }

  /* ---- Dedup: um grupo pode reenviar; fica o mais recente.
          Os dados chegam ordenados por criado_em asc → o último sobrescreve. */
  function porGrupo(rows){
    var m = new Map();
    rows.forEach(function(r){ m.set(r.grupo, r); });
    return Array.from(m.values());
  }

  /* ---- Render: legenda + miolo do módulo + placar (genéricos no shell) ---- */
  function render(rows){
    var mod = moduloAtivo();
    var grupos = porGrupo(rows);

    // ordena por pontuação desc (depois nome) → define cor estável de cada grupo
    grupos.sort(function(a,b){
      return (b.pontuacao||0) - (a.pontuacao||0) || String(a.grupo).localeCompare(b.grupo);
    });
    var cores = new Map();
    grupos.forEach(function(g,i){ cores.set(g.grupo, PALETA[i % PALETA.length]); });

    $("grupoCount").textContent = grupos.length;

    // legenda (genérica: grupo + cor)
    $("legend").innerHTML = grupos.map(function(g){
      return '<span class="g"><span class="swatch" style="background:'+cores.get(g.grupo)+'"></span>'+esc(g.grupo)+'</span>';
    }).join("");

    // miolo específico da atividade
    var cont = $("atividadeContainer");
    cont.innerHTML = "";
    if (mod && mod.dataGlobal && !global[mod.dataGlobal]){
      cont.innerHTML = '<div class="empty">Dados da atividade ('+esc(mod.dataGlobal)+') não carregados.</div>';
    } else if (mod && typeof mod.render === "function"){
      mod.render(cont, grupos, cores);
    }

    // placar (genérico) — só se o módulo declara placar:true
    var sb = $("scoreboardWrap");
    if (mod && mod.placar && grupos.length){
      sb.style.display = "";
      $("scoreboard").innerHTML = grupos.map(function(g,i){
        return '<div class="score-row">'+
          '<span class="rank">'+(i+1)+'.</span>'+
          '<span class="swatch" style="background:'+cores.get(g.grupo)+'"></span>'+
          '<span class="name">'+esc(g.grupo)+'</span>'+
          '<span class="pts">'+(g.pontuacao == null ? "—" : g.pontuacao)+' pts</span>'+
        '</div>';
      }).join("");
    } else {
      sb.style.display = "none";
    }
  }

  /* ---- Ciclo de atualização ---- */
  async function atualizar(){
    if (!sessao){ setLive(false, "informe a sessão"); return; }
    if (!atividadeAtiva){ setLive(false, "sem atividade"); return; }
    var rows = await SB.consultarSessao(sessao, atividadeAtiva);
    render(rows);
    $("lastUpdate").textContent = "última atualização " + agora();
    setLive(true, "ao vivo");
  }
  function iniciarPolling(){
    if (timer) clearInterval(timer);
    atualizar();
    timer = setInterval(atualizar, POLL_MS);
  }

  /* ---- Boot (após todos os <script> de módulo terem registrado) ---- */
  function init(){
    if (!(global.SB && SB.configValida())){
      $("notice").style.display = "";
      $("notice").innerHTML = "Backend não configurado (chave/URL ainda são placeholders em " +
        "<code>lib/supabase-config.js</code>). O painel não tem dados para mostrar.";
      setLive(false, "sem backend");
      return;
    }
    if (!registry.length){
      $("notice").style.display = "";
      $("notice").textContent = "Nenhuma atividade registrada (inclua os <script> da atividade em painel.html).";
      setLive(false, "sem atividade");
      return;
    }

    atividadeAtiva = atividadeInicial();
    montarAbas();
    atualizarInstrucao();

    // Campo editável = override manual; normaliza e fixa como o código vigente.
    $("sessaoInput").addEventListener("change", function(){ fixarSessao($("sessaoInput").value); });
    // "Novo código": confirma (desconecta grupos já ligados ao código atual).
    $("novoCodigoBtn").addEventListener("click", function(){
      if (!confirm("Gerar um novo código? Os grupos que já entraram com o código atual deixarão de aparecer aqui.")) return;
      fixarSessao(gerarCodigo());
    });
    $("refreshBtn").addEventListener("click", atualizar);

    fixarSessao(sessaoInicial()); // trava o código e dispara o polling
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
