/* =============================================================================
   HELPER SUPABASE — atividades do Continuum
   Vanilla JS, sem dependências, sem CDN. Fala direto com a REST API (PostgREST).
   Carregado tanto pela atividade do aluno quanto pelo painel do professor;
   centralizar o fetch aqui evita duplicar URL/headers nos dois lugares.

   Depende de window.SUPABASE_CONFIG (ver supabase-config.js), carregado ANTES.
   Usa SOMENTE a chave anon/publishable (pública). A proteção do banco vem do
   RLS (ver ../../supabase/setup.sql), não do segredo da chave.
   Expõe a API em window.SB.
   ============================================================================= */
(function (global) {
  "use strict";

  var cfg = global.SUPABASE_CONFIG || {};

  /* Placeholders deixados no supabase-config.js antes de preencher os valores
     reais. Se a config ainda estiver nesse estado, o backend está "desligado"
     e quem chama deve cair no modo offline. */
  var PLACEHOLDERS = [
    "", undefined, null,
    "https://SEU-PROJETO.supabase.co",
    "COLE_AQUI_A_URL",
    "COLE_AQUI_A_ANON_KEY"
  ];

  function ehPlaceholder(v) {
    return PLACEHOLDERS.indexOf(v) !== -1;
  }

  function configValida() {
    return !ehPlaceholder(cfg.url) &&
           !ehPlaceholder(cfg.anonKey) &&
           !!cfg.table;
  }

  /* Cabeçalhos comuns a toda chamada. apikey + Bearer usam a MESMA chave anon. */
  function headers(extra) {
    var h = {
      "apikey": cfg.anonKey,
      "Authorization": "Bearer " + cfg.anonKey
    };
    if (extra) {
      for (var k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) h[k] = extra[k];
      }
    }
    return h;
  }

  function endpoint() {
    return cfg.url + "/rest/v1/" + cfg.table;
  }

  /* Envia o resultado de um grupo (INSERT).
     payload deve trazer só colunas existentes na tabela: sessao, grupo,
     pontuacao, casos. Retorna {ok:true} ou {ok:false, erro}. Nunca lança:
     quem chama trata o ok=false como "salvou só local". */
  async function enviarResultado(payload) {
    if (!configValida()) {
      return { ok: false, erro: "config-invalida" };
    }
    try {
      var resp = await fetch(endpoint(), {
        method: "POST",
        headers: headers({
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        }),
        body: JSON.stringify(payload)
      });
      if (!resp.ok) {
        var texto = await resp.text().catch(function () { return ""; });
        return { ok: false, erro: "HTTP " + resp.status + " " + texto };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, erro: String(e) };
    }
  }

  /* Lê todas as respostas de uma sessão (SELECT), ordenadas por criação.
     Retorna um array (vazio em caso de erro — o painel mostra "sem dados"
     em vez de quebrar). */
  async function consultarSessao(sessao) {
    if (!configValida()) return [];
    try {
      var qs = "?sessao=eq." + encodeURIComponent(sessao) +
               "&select=grupo,pontuacao,casos,criado_em" +
               "&order=criado_em.asc";
      var resp = await fetch(endpoint() + qs, {
        method: "GET",
        headers: headers()
      });
      if (!resp.ok) return [];
      var dados = await resp.json();
      return Array.isArray(dados) ? dados : [];
    } catch (e) {
      return [];
    }
  }

  global.SB = {
    configValida: configValida,
    enviarResultado: enviarResultado,
    consultarSessao: consultarSessao
  };
})(window);
