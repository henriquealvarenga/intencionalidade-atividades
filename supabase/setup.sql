-- =============================================================================
-- ATIVIDADES (painel multi-atividade) · Configuração do Supabase
-- Rode este script UMA vez no SQL Editor do seu projeto Supabase.
-- Cria a tabela ÚNICA de respostas (com discriminador `atividade`) e as
-- políticas de acesso (RLS). Os dados são efêmeros (limpos entre aulas) — não
-- há migração: cria a tabela nova, repõe a config (lib/supabase-config.js) e
-- larga a antiga. Ver Spec "Painel do professor multi-atividade".
-- =============================================================================

-- 1) Tabela única de respostas. Uma linha = um grupo, numa atividade, numa aula.
create table if not exists public.respostas (
  id          bigint generated always as identity primary key,
  criado_em   timestamptz not null default now(),
  sessao      text not null,          -- código da AULA (compartilhado entre atividades)
  atividade   text not null,          -- discriminador: 'continuum', 'juri', ...
  grupo       text not null,          -- nome/número do grupo
  pontuacao   int,                    -- genérico; NULL se a atividade não pontua
  dados       jsonb not null          -- payload específico da atividade
);

-- Índice para o painel filtrar rápido por (sessao, atividade).
create index if not exists idx_respostas_sessao_atividade
  on public.respostas (sessao, atividade);

-- Índice ÚNICO (sessao, atividade, grupo): habilita o UPSERT do envio incremental.
-- Cada grupo tem UMA linha por atividade por sessão; reenviar (a cada caso
-- concluído) sobrescreve essa linha via on_conflict em vez de duplicar.
create unique index if not exists respostas_sessao_atividade_grupo_uidx
  on public.respostas (sessao, atividade, grupo);

-- 2) Habilita Row Level Security
alter table public.respostas enable row level security;

-- 3) Políticas para uso em sala (anônimo).
--    Escopo de sala de aula: a chave anon (pública) pode INSERIR (alunos enviando)
--    e LER (painel exibindo). Não há dados pessoais; os dados são efêmeros.
drop policy if exists "anon_insert_respostas" on public.respostas;
create policy "anon_insert_respostas" on public.respostas
  for insert to anon with check (true);

--    LEITURA restrita ao PROFESSOR (login por email — ver atividades/lib/painel-auth.js).
--    O painel lê com o token do usuário autenticado; só o email autorizado enxerga
--    as respostas. Substitui a leitura anônima: a chave anon NÃO lê mais a tabela
--    (os alunos só ESCREVEM — insert/update acima). Trocar de professor = trocar o
--    email abaixo. (Rollout: aplique owner_select primeiro; só remova a leitura
--    anônima — drop anon_select_respostas — depois que o login estiver funcionando.)
drop policy if exists "anon_select_respostas" on public.respostas;
drop policy if exists "owner_select_respostas" on public.respostas;
create policy "owner_select_respostas" on public.respostas
  for select to authenticated
  using ( (auth.jwt() ->> 'email') = 'henriquealvarenga@gmail.com' );

--    UPDATE é NECESSÁRIO para o envio incremental: o upsert
--    (on_conflict=sessao,atividade,grupo + resolution=merge-duplicates) entra
--    pelo caminho ON CONFLICT DO UPDATE quando o grupo reenvia. Sem esta
--    política, a 2ª gravação falha com 42501 (RLS). Mesmo escopo de sala dos
--    demais (using/check = true): um grupo sobrescreve a própria linha.
drop policy if exists "anon_update_respostas" on public.respostas;
create policy "anon_update_respostas" on public.respostas
  for update to anon using (true) with check (true);

-- 4) Faxina automática (pg_cron): apaga respostas com mais de 30 dias.
--    Os dados são efêmeros e não-pessoais; sem isso o banco só cresce. Roda todo
--    dia às 04:00 UTC (~01:00 BRT, fora de aula). Idempotente: reagenda o job.
--    criado_em é definido no INSERT e NÃO muda no upsert, então marca a 1ª
--    criação da linha do grupo.
create extension if not exists pg_cron;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'faxina_respostas') then
    perform cron.unschedule('faxina_respostas');
  end if;
end $$;

select cron.schedule(
  'faxina_respostas',
  '0 4 * * *',
  $cmd$delete from public.respostas where criado_em < now() - interval '30 days'$cmd$
);

-- =============================================================================
-- Limpeza manual após a aula (a faxina automática só age aos 30 dias).
-- Para ver os códigos existentes:
--   select distinct sessao from public.respostas;
-- Apagar UMA sessão inteira (código em MAIÚSCULAS, ex.: o que o painel gerou):
--   delete from public.respostas where sessao = 'JTU96';
-- Apagar só UMA atividade de uma sessão (o índice (sessao, atividade) cobre):
--   delete from public.respostas where sessao = 'JTU96' and atividade = 'continuum';
-- Apagar tudo:
--   truncate public.respostas;
-- =============================================================================
