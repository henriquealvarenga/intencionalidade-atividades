-- =============================================================================
-- ATIVIDADE 1 — CONTINUUM · Configuração do Supabase
-- Rode este script UMA vez no SQL Editor do seu projeto Supabase.
-- Cria a tabela de respostas dos grupos e as políticas de acesso (RLS).
-- =============================================================================

-- 1) Tabela de respostas dos grupos
create table if not exists public.respostas_continuum (
  id          bigint generated always as identity primary key,
  criado_em   timestamptz not null default now(),
  sessao      text not null,          -- código da turma/sessão (separa as aulas)
  grupo       text not null,          -- nome/número do grupo
  pontuacao   int,                    -- pontos da camada de classificação
  casos       jsonb not null          -- posições + classificações por caso
);

-- Índice para o painel filtrar rápido por sessão
create index if not exists idx_respostas_continuum_sessao
  on public.respostas_continuum (sessao);

-- Índice ÚNICO (sessao, grupo): habilita o UPSERT do envio incremental.
-- Cada grupo tem UMA linha por sessão; reenviar (a cada caso concluído)
-- sobrescreve essa linha via on_conflict=sessao,grupo em vez de duplicar.
create unique index if not exists respostas_continuum_sessao_grupo_uidx
  on public.respostas_continuum (sessao, grupo);

-- 2) Habilita Row Level Security
alter table public.respostas_continuum enable row level security;

-- 3) Políticas para uso em sala (anônimo).
--    Escopo de sala de aula: a chave anon (pública) pode INSERIR (alunos enviando)
--    e LER (painel exibindo). Não há dados pessoais; os dados são efêmeros.
--    Se quiser, apague os registros depois da aula (ver comando no fim).
drop policy if exists "anon_insert_continuum" on public.respostas_continuum;
create policy "anon_insert_continuum" on public.respostas_continuum
  for insert to anon with check (true);

drop policy if exists "anon_select_continuum" on public.respostas_continuum;
create policy "anon_select_continuum" on public.respostas_continuum
  for select to anon using (true);

--    UPDATE é NECESSÁRIO para o envio incremental: o upsert
--    (on_conflict=sessao,grupo + resolution=merge-duplicates) entra pelo caminho
--    ON CONFLICT DO UPDATE quando o grupo reenvia. Sem esta política, a 2ª
--    gravação falha com 42501 (RLS). Mesmo escopo de sala dos demais (using/check
--    = true): um grupo sobrescreve a própria linha. Sem auth, não há como/por que
--    restringir mais — os dados são efêmeros e não-pessoais.
drop policy if exists "anon_update_continuum" on public.respostas_continuum;
create policy "anon_update_continuum" on public.respostas_continuum
  for update to anon using (true) with check (true);

-- =============================================================================
-- Limpeza opcional após a aula (descomente e rode quando quiser zerar):
--   delete from public.respostas_continuum where sessao = 'psico-2026-1';
-- ou tudo:
--   truncate public.respostas_continuum;
-- =============================================================================
