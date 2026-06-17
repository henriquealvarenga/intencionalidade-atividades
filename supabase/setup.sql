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

-- 4) Faxina automática (pg_cron): apaga respostas com mais de 30 dias.
--    Os dados são efêmeros e não-pessoais; sem isso o banco só cresce. Roda todo
--    dia às 04:00 UTC (~01:00 BRT, fora de aula). Idempotente: reagenda o job.
--    Requer a extensão pg_cron (disponível no Supabase). criado_em é definido no
--    INSERT e NÃO muda no upsert, então marca a 1ª criação da linha do grupo.
create extension if not exists pg_cron;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'faxina_respostas_continuum') then
    perform cron.unschedule('faxina_respostas_continuum');
  end if;
end $$;

select cron.schedule(
  'faxina_respostas_continuum',
  '0 4 * * *',
  $cmd$delete from public.respostas_continuum where criado_em < now() - interval '30 days'$cmd$
);

-- =============================================================================
-- Limpeza manual após a aula (a faxina automática só age aos 30 dias).
-- Para ver os códigos existentes:
--   select distinct sessao from public.respostas_continuum;
-- Apagar UMA sessão (código em MAIÚSCULAS, ex.: o que o painel gerou):
--   delete from public.respostas_continuum where sessao = 'JTU96';
-- Apagar tudo:
--   truncate public.respostas_continuum;
-- =============================================================================
