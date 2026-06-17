/* =============================================================================
   CONFIG DO SUPABASE — atividades do Continuum
   Carregado tanto pela atividade do aluno quanto pelo painel do professor.

   ⚠️  COLE AQUI APENAS OS DOIS VALORES PÚBLICOS:
       • url      → Project URL  (Settings → API → Project URL)
       • anonKey  → chave "anon" / "publishable" (a PÚBLICA)

   ⛔  NUNCA coloque aqui a service_role / secret key. Ela ignora o RLS e dá
       acesso total ao banco; jamais deve ir para o navegador nem para o git.

   A chave anon é segura no código: a proteção vem das políticas RLS do banco
   (ver supabase-setup.sql).
   ============================================================================= */
window.SUPABASE_CONFIG = {
  url:     "https://yfnilksnqehysxunujli.supabase.co",     // ex.: https://abcdxyz.supabase.co
  anonKey: "sb_publishable_7TvKSU1mXbodAHVwr_gS6g_gXsHKd7p",      // ex.: eyJhbGciOi... (a pública)
  table:   "respostas_continuum",
  sessaoPadrao: "aula"                    // usado se a URL não trouxer ?sessao=
};
