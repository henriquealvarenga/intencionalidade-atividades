# Spec — Painel do professor multi-atividade

Spec de implementação para o **Claude Code**. Decisões de design já fechadas (ver
`DESIGN.md`, seção "Arquitetura do painel com VÁRIAS atividades — DECIDIDO"). Aqui é o
*como*: schema, refactor de `lib/`, contrato do shell e plano de arquivos.

Princípio condutor: **um código por aula, uma tabela com discriminador, um shell com
seletor.** Cada nova atividade pluga um data file + um módulo de render e **não toca**
em infra nem no shell.

*Criado: junho de 2026.*

---

## 1. Schema do Supabase

Tabela única `respostas`, substituindo `respostas_continuum`. Como os dados são efêmeros
(limpos entre aulas), **não há migração de dados**: cria a nova, repona a config, larga a antiga.

```sql
create table if not exists public.respostas (
  id         bigint generated always as identity primary key,
  criado_em  timestamptz not null default now(),
  sessao     text  not null,   -- código da AULA (compartilhado entre atividades)
  atividade  text  not null,   -- discriminador: 'continuum', 'juri', ...
  grupo      text  not null,
  pontuacao  int,              -- genérico; NULL se a atividade não pontua
  dados      jsonb not null    -- payload específico da atividade
);

-- Painel filtra por (sessao, atividade)
create index if not exists idx_respostas_sessao_atividade
  on public.respostas (sessao, atividade);

-- Único (sessao, atividade, grupo) → habilita o upsert incremental.
-- Cada grupo tem UMA linha por atividade por sessão; reenviar sobrescreve.
create unique index if not exists respostas_sessao_atividade_grupo_uidx
  on public.respostas (sessao, atividade, grupo);

alter table public.respostas enable row level security;

drop policy if exists "anon_insert_respostas" on public.respostas;
create policy "anon_insert_respostas" on public.respostas
  for insert to anon with check (true);

drop policy if exists "anon_select_respostas" on public.respostas;
create policy "anon_select_respostas" on public.respostas
  for select to anon using (true);

-- UPDATE é necessário p/ o upsert (on_conflict → ON CONFLICT DO UPDATE). Mesmo
-- escopo de sala: dados efêmeros, não-pessoais.
drop policy if exists "anon_update_respostas" on public.respostas;
create policy "anon_update_respostas" on public.respostas
  for update to anon using (true) with check (true);
```

Cleanup `pg_cron`: mesmo padrão do `setup.sql` atual, renomeando o job para
`faxina_respostas` e apontando para `public.respostas`. Manter os comandos manuais de
limpeza no rodapé (`select distinct sessao ...`, `delete ... where sessao = '...'`,
`truncate public.respostas`).

> O `(sessao, atividade)` no índice/cleanup permite, se um dia quiser, limpar só uma
> atividade de uma aula — mas o caso normal segue sendo limpar a sessão inteira.

---

## 2. Refactor de `lib/`

### `lib/supabase-config.js`
Trocar apenas a tabela:
```js
table: "respostas"   // era "respostas_continuum"
```

### `lib/supabase.js`
Generalizar com o parâmetro `atividade`. O `dados` jsonb passa a carregar o payload
específico (antes `casos` era coluna; agora vira `dados.casos`).

- `enviarResultado(payload)` — `payload = { sessao, atividade, grupo, pontuacao, dados }`.
  Upsert com `?on_conflict=sessao,atividade,grupo` (era `sessao,grupo`).
- `consultarSessao(sessao, atividade)` — filtra por **ambos**; `select=grupo,pontuacao,dados,criado_em&order=criado_em.asc`.

Resto do helper (headers, `configValida`, tratamento de erro, fire-and-forget) inalterado.

---

## 3. Shell do painel + contrato do módulo

### `atividades/painel.html` (novo) — o shell genérico
Extrai do `painel-continuum.html` atual tudo que **não** é específico do continuum:

- Geração/trava do código (localStorage + `?sessao=` na URL + display grande + "Novo código").
  Generalizar a `STORE_KEY` para `"painel-sessao"` (não mais `"continuum-painel-sessao"`).
- Seletor de atividade (abas) montado a partir do **registry** (ver abaixo).
- Polling 4s chamando `SB.consultarSessao(sessao, atividadeAtiva)`.
- Dedup por grupo (`porGrupo`), ordenação por pontuação, **paleta de cores** e mapa
  `cores` → tudo genérico, fica no shell.
- **Legenda** e **placar** ficam no shell (genéricos: grupo + cor + pontuação). O placar só
  aparece se o módulo declarar `placar: true`.
- Bloco do código para os alunos digitarem (mesmo texto do painel atual, mas o caminho da
  atividade vem do módulo selecionado).

### Registry + contrato do módulo
Cada módulo de atividade se auto-registra. O shell expõe `window.registrarPainel(mod)`:

```js
// lib/painel-continuum.js
registrarPainel({
  id: "continuum",                 // === valor da coluna `atividade`
  label: "Continuum",              // rótulo da aba
  rota: "01-continuum.html",       // página da atividade (p/ instrução do código)
  placar: true,                    // shell mostra o placar genérico
  dataGlobal: "CONTINUUM_DATA",    // (opcional) window[...] já carregado via <script>
  // Desenha SÓ o miolo específico. O shell entrega:
  //   container : <div> limpo onde desenhar
  //   grupos    : linhas já deduplicadas + ordenadas (cada uma com .dados)
  //   cores     : Map(grupo -> cor) — usar p/ marcadores baterem com legenda/placar
  render(container, grupos, cores) {
    const CASOS = window.CONTINUUM_DATA.CASOS;
    // ... os eixos por caso (migrar a lógica de render() do painel atual,
    //     lendo a posição em row.dados.casos em vez de row.casos)
  }
});
```

O shell carrega, na ordem: `supabase-config.js` → `supabase.js` → (por atividade)
data file + módulo de painel. Para acrescentar uma atividade ao painel: incluir os dois
`<script>` dela; o registry e a aba aparecem sozinhos.

> Decisão de Ockham: o registry é só um array em memória populado por `registrarPainel`.
> Sem framework, sem auto-discovery — os `<script>` no `painel.html` são a fonte da verdade
> de quais atividades existem.

---

## 4. Ajuste na Atividade 1 (`01-continuum.html`)

Só o formato do envio muda (a UI não):

- `montarPayload()` passa a devolver
  `{ sessao, atividade:"continuum", grupo, pontuacao, dados:{ casos } }`
  (hoje devolve `{ sessao, grupo, pontuacao, casos }`).
- Nada mais muda: o fluxo incremental, o localStorage e o reenvio pendente continuam iguais.

---

## 5. Plano de arquivos

| Arquivo | Ação |
|---|---|
| `supabase/setup.sql` | Reescrever para `respostas` (schema §1). |
| `atividades/lib/supabase-config.js` | `table: "respostas"`. |
| `atividades/lib/supabase.js` | Generalizar com `atividade` (§2). |
| `atividades/lib/painel-core.js` | **Novo** — lógica do shell (§3). |
| `atividades/lib/painel-continuum.js` | **Novo** — módulo de render do continuum (§3). |
| `atividades/painel.html` | **Novo** — shell que carrega core + módulos + data files. |
| `atividades/01-continuum.html` | `montarPayload()` → `dados.casos` (§4). |
| `atividades/painel-continuum.html` | **Remover** (ou deixar um redirect curto p/ `painel.html?atividade=continuum`). |
| `_quarto.yml` | Conferir: navbar "Atividades" segue para `01-continuum.html`; o painel não precisa entrar no navbar (URL direta para o professor). |

`?atividade=` na URL do painel pode pré-selecionar a aba (conveniência), análogo ao
`?sessao=` de hoje.

---

## 6. Checklist de verificação (Claude Code)

- [ ] SQL roda limpo no Supabase; índice único `(sessao, atividade, grupo)` existe.
- [ ] Aluno envia na Atividade 1 → linha aparece em `respostas` com `atividade='continuum'`
      e `dados.casos` preenchido; reenvio do mesmo grupo **sobrescreve** (não duplica).
- [ ] `painel.html` mostra o código, a aba "Continuum", os eixos por caso e o placar —
      idênticos ao painel antigo.
- [ ] "Novo código" reinicia o polling e desconecta a sessão anterior.
- [ ] Trocar de aba (quando houver 2+ atividades) repolla com o `atividade` certo.
- [ ] `quarto render` copia `atividades/**` (inclui `painel.html` e `lib/`) para `docs/`;
      `supabase/` continua fora dos resources.
- [ ] Sem CDN, sem framework, fontes self-hosted — herdar o tema editorial.

---

## 7. Divisão de trabalho (lembrete do DESIGN.md)

- **Este chat / Cowork:** esta spec, conteúdo das próximas atividades, redação.
- **Claude Code:** implementar §1–§5, testar ao vivo, `git`, `quarto render`, aplicar o SQL.
- **Autor:** rodar SQL/credenciais no Supabase, revisar, decidir commit/push.
- Evitar duas mãos no mesmo arquivo ao mesmo tempo.
