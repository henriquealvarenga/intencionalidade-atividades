# Spec — Dois modos (aula / treino) + campeonato acumulado

Spec de implementação para o **Claude Code**. Decisões de design fechadas na conversa
(jun/2026), complementando `DESIGN.md` e `CLAUDE.md`. Aqui é o *como*: o hub, a
identidade única, os dois modos, o REVELAR do painel, o agregador acumulado e o pódio.

Princípio condutor: **um hub dirige tudo.** O aluno entra uma vez; a presença (ou não)
do código de aula decide o modo. Nada de framework, nada de CDN, nada de estado novo no
servidor — vanilla JS no padrão que já existe (data files + módulos de render + shell).

*Criado: junho de 2026.*

---

## 0. O que motivou esta spec (3 dores de sala)

1. **Re-login a cada atividade.** O nome do grupo não persiste entre atividades; cada
   `.html` re-pergunta tudo. Causa-raiz: identidade gravada por atividade, não compartilhada.
2. **Não há tela de pontuação de todos os grupos ao fim de cada atividade.**
3. **Não há tela final** com a pontuação de cada etapa + total, para premiar o vencedor.

As três se resolvem com **um hub + identidade compartilhada + um agregador acumulado**.

---

## 1. Os dois modos

Discriminador único: **existe código de aula?** Sem flag nova, sem estado de servidor.

| | **Aula** (com código) | **Treino** (sem código) |
|---|---|---|
| Entrada | código + grupo (lista fixa) | nada — entra direto |
| Navegação | **sequência travada** (campeonato) | **livre** — qualquer atividade, inclusive o Júri |
| Reveal por caso (device do aluno) | **imediato** (blind-then-reveal, mantido) | imediato |
| Pontuação | calculada **e enviada** ao Supabase | calculada **só na tela**, nada é enviado |
| Refazer | etapa concluída fica **read-only** | refaz à vontade (botão "Recomeçar") |
| Painel/ranking | sim (REVELAR + pódio acumulado) | n/a |

> **Decisão (jun/2026):** durante a aula o aluno **mantém** o reveal imediato no próprio
> device — é o coração das Atv 1/3/4/5 (`DESIGN.md`). A proteção contra "spoiler no telão"
> vive **só no painel** (REVELAR, §6), não no device do aluno. Vazamento de categoria entre
> grupos é inerente a qualquer quiz em grupo e aceitável numa sala cooperativa (Ockham:
> não construir fortaleza para um risco que a sala não tem).

---

## 2. O hub — página de cards (`atividades/index.html`, novo)

Substitui o **dropdown** "Atividades" do navbar por **uma página** no tema editorial
(paper off-white, acento `#b45309`, Playfair/Inter — fontes self-hosted em `../fonts/`).
Página HTML standalone, fullscreen, **sem o sidebar do livro** (mesmo padrão dos `.html`
de atividade, que vivem fora do fluxo `.qmd`).

Dois cards:

```
┌──────────────────────┐   ┌──────────────────────┐
│   🎓 ENTRAR NA AULA   │   │   🔁 TREINAR SOZINHO  │
│  código + seu grupo   │   │  sem código, livre    │
│  campeonato, ranking  │   │  refaz, vê o gabarito │
└──────────────────────┘   └──────────────────────┘
```

- **Entrar na aula:** pede o código (projetado pelo professor) → valida → mostra a
  **lista fixa de grupos** (§4) → grava identidade (§3) → abre o **mapa do campeonato**
  (etapas em ordem: ✓ feita / ▶ atual / 🔒 bloqueada).
- **Treinar sozinho:** sem código; abre direto a **grade livre** das 5 atividades.

### Registry de atividades do hub (fonte da ordem)

A **ordem do fluxo** vive aqui, **não no número do arquivo**. Um array em JS:

```js
// lib/hub-config.js
window.HUB_ATIVIDADES = [
  { id:"continuum", arquivo:"01-continuum.html", titulo:"Continuum",           pontua:true  },
  { id:"fenomenos", arquivo:"02-fenomenos.html", titulo:"Nomear o fenômeno",   pontua:true  },
  { id:"questoes",  arquivo:"03-questoes.html",  titulo:"Simulado comentado",  pontua:true  },
  { id:"planos",    arquivo:"04-planos.html",    titulo:"Arquitetura da ação", pontua:true  },
  { id:"juri",      arquivo:"05-juri.html",      titulo:"Júri simulado",       pontua:false }, // último, sem placar
];
```

> **Renumerar os arquivos para a ordem do fluxo (decisão do autor, jun/2026).**
> Renomear com `git mv` (preserva histórico) **nesta ordem** (liberar o "02" só depois de
> mover o Júri):
>
> | De | Para |
> |---|---|
> | `02-juri.html`      | `05-juri.html` |
> | `03-fenomenos.html` | `02-fenomenos.html` |
> | `04-questoes.html`  | `03-questoes.html` |
> | `05-planos.html`    | `04-planos.html` |
> | `01-continuum.html` | *(inalterado)* |
>
> Depois, `grep -rn` pelos nomes antigos e atualizar **todas** as referências: `rota:` dos
> módulos `painel-*.js`, `_quarto.yml`, links entre atividades (`href`), `apresentacao/keynote*.qmd`,
> e referências em `_specs/`. **Verificar zero link morto** ao fim (checklist §13).
>
> Os rótulos conceituais "Atividade N" nos docs de design históricos (`DESIGN.md`,
> `SPEC-juri.md`…) descrevem a *ordem em que foram desenhadas* — **manter como registro**.
> Só a numeração de **arquivo + runtime + UI** segue o fluxo.

---

## 3. Identidade única — fim do re-login

Uma chave compartilhada de `localStorage`, **uma só para todas as atividades**:

```js
// chave: "aula:identidade"
{ modo:"aula",   sessao:"JTU96", grupo:"Grupo 3" }   // modo aula
{ modo:"treino" }                                     // modo treino (sem sessao/grupo)
```

- O **hub grava** isso uma vez. Cada atividade **lê** no boot.
- **As telas de login individuais das atividades saem.** A atividade, ao abrir:
  - sem `aula:identidade` → **redireciona ao hub** (`location.replace("index.html")`);
  - com identidade → entra direto, já sabendo modo/sessao/grupo.
- O `localStorage` por-atividade (`continuum:estado:{sessao}:{grupo}`) **continua** servindo
  para retomar a atividade — só a *entrada de identidade* deixa de ser repetida.

> Isto, sozinho, mata a Dor 1. O hub é o **portão único de identidade**.

---

## 4. Grupos — lista fixa (mata a fragmentação de nomes)

Campo livre de nome gera "Mesa 3" / "mesa-3" / "Mesa3" = três grupos no ranking. Solução:

- O **professor define a quantidade** no painel: **default 6**, ajustável de **2 a 10**.
  Persistido no painel (`localStorage`, ex.: `painel-num-grupos`).
- O **hub oferece a lista para clicar**: `Grupo 1` … `Grupo N`. O aluno escolhe, não digita.
- Nomes canônicos (`Grupo 1`…) → batem 1-a-1 entre device, envio e painel. Sem regex, sem
  divergência. (A quantidade pode ir na URL do hub, ex.: `index.html?grupos=6`, ou o hub lê
  um default e o professor projeta "somos 6 grupos".)

---

## 5. Modo aula — sequência travada (soft-lock)

- O **mapa do campeonato** no hub é a única porta de entrada das etapas: ✓ feita (read-only),
  ▶ atual, 🔒 próximas. "Etapa concluída" leva **de volta ao hub**, não a um beco.
- Etapa concluída reabre **somente leitura** (vê o que respondeu; não re-pontua) — senão um
  grupo mudaria a resposta depois de ver o reveal.
- **Soft-lock, não cadeado de servidor.** Site estático: não dá pra impedir fisicamente que
  alguém force a URL de um `.html`. "Travar" = tirar da navegação + redirecionar ao hub quando
  falta identidade/ordem. Suficiente numa sala cooperativa; um hard-lock exigiria estado novo
  no servidor — fora de escopo (Ockham).

---

## 6. Painel — REVELAR + masking (resolve o "telão mostra as respostas")

Hoje o painel projetado expõe as respostas ao vivo. Adicionar **um botão REVELAR** em
`painel-core.js` (genérico → vale para **todas** as atividades de uma vez):

| | **Antes de revelar** (padrão) | **Depois de REVELAR** |
|---|---|---|
| Painel mostra | grupos conectados + **quantos enviaram** ("5/6 ✓") + status ao vivo | respostas + acertos + **placar da rodada** |
| Serve para | monitorar (hora de fechar a rodada) sem spoiler | discutir o gabarito no telão |

- O masking é um **toggle no navegador do professor** — `painel-core` só passa o miolo
  (`mod.render`) quando `revelado === true`; antes disso renderiza só o resumo de progresso.
- **Reset por aba/atividade:** trocar de atividade volta a `revelado = false`.
- **Sem flag no servidor.** Como o reveal do *aluno* é imediato (§1), o REVELAR controla
  apenas a projeção — nenhum device de aluno precisa consultar "já revelou?".

---

## 7. Agregador normalizado acumulado (resolve Dores 2 e 3)

Um só componente, revelado ao fim de **cada** rodada; a última revelação **é** a final.

### Leitura
Nova função no helper: `SB.consultarSessaoTudo(sessao)` — `select` de **todas** as linhas
da sessão (sem filtrar `atividade`), usando o token do professor (a policy `owner_select`
já permite). **Sem mudança de backend.**

### Normalização
Cada etapa pontuada declara seu **máximo** no módulo de painel:

```js
registrarPainel({ id:"continuum", /* … */ placar:true, maxPontos:80 });
```

Para cada linha: `nota = pontuacao / maxPontos × 100` (cada etapa vale **100**). Júri tem
`pontuacao = null` e **sem `maxPontos`** → **excluído**. Somar por grupo:

- **Total acumulado** = Σ notas normalizadas; **máximo dinâmico** = `100 × (nº de etapas
  pontuadas já jogadas)`. Ao fim das 4 pontuadas → 400.
- **Etapa não feita por um grupo = 0** (contra o máximo da rodada). Mostrar **"etapas N/4"**
  ao lado do total — transparente, sem mascarar quem faltou.
- Máximos esperados (conferir contra a constante de score de cada atividade no checklist):
  Continuum **80**, Fenômenos **8**, Questões **9**, Planos **8**.

---

## 8. Pódio progressivo — duas telas

Ao clicar **REVELAR**, o professor avança por clique (suspense):

1. **Resultado da rodada** — desempenho **nesta** atividade, em *acertos* ("7/8"), rótulo
   **"Nesta rodada"**.
2. **Classificação geral** — 🥇🥈🥉 pódio + lista completa, em *pontos normalizados* acumulados
   ("Grupo 3 — 285 pts · etapas 3/3"), rótulo **"Geral"**.

- **Setas ↑↓ de movimentação:** o agregador roda a conta **duas vezes** (com e sem a rodada
  atual) e compara posições → "Grupo 5 subiu 2". Barato, alto retorno em drama.
- **Clareza de números:** rodada em *acertos*, geral em *pontos* — rótulos distintos para não
  confundir no telão.
- **Clímax = pódio após a última etapa pontuada (4ª).** O Júri, último no fluxo e sem placar,
  fecha a aula como respiro reflexivo, sem alterar a classificação. A "tela final" é só a
  última revelação acumulada, com capricho visual extra (§10).

---

## 9. Empate
Aceitar **empate no pódio** (dividir a colocação). Sem critério de desempate — é o mais
honesto. (Se um dia quiser, desempate secundário pelo Simulado; não implementar agora.)

---

## 10. Sons (`lib/sfx.js`, novo) + animação — tudo sintetizado, sem arquivo

**Web Audio API** (osciladores) — zero asset, zero CDN, zero licença.

- **Device do aluno:** clique (tick curto), **acerto** (arpejo curto ascendente), **erro**
  (nota grave breve). **Sutis e curtos** (sala com vários devices). **Mudo disponível** (canto
  da tela), **som ligado por padrão**. `AudioContext` **destravado no 1º toque** (autoplay
  policy do browser; como todo som vem de gesto, resolve sozinho).
- **Painel (telão, fonte única de evento):** "whoosh" curto a cada colocação do pódio +
  **fanfarra sintetizada** na grande final.
- **Animação final (painel):** CSS (barras crescem, pódio "sobe") + confete leve (canvas
  mínimo ou CSS). Respeitar **`prefers-reduced-motion`**.

---

## 11. Escape hatches

- **"Sair / trocar grupo"** no hub: limpa `aula:identidade` e volta aos cards.
- **"Novo código"** no painel: confirmação **reforçada**, explícita sobre a consequência —
  *"Gerar um novo código? Os grupos conectados ao código atual precisarão reentrar com o novo.
  As respostas já enviadas continuam salvas."* (Gerar código novo **não apaga nada** — só
  inicia uma sessão limpa.)
- Se o código mudar no meio da aula, o device do aluno (identidade órfã) é mandado de volta
  ao hub para reentrar.

---

## 12. Plano de arquivos

| Arquivo | Ação |
|---|---|
| `atividades/index.html` | **Novo** — hub de cards, lista de grupos, mapa do campeonato (§2,§4,§5). |
| `atividades/lib/hub-config.js` | **Novo** — `HUB_ATIVIDADES` (ordem do fluxo; Júri por último) (§2). |
| `atividades/lib/sfx.js` | **Novo** — sons sintetizados (§10). |
| `atividades/lib/supabase.js` | **+** `consultarSessaoTudo(sessao)` (§7). |
| `atividades/lib/painel-core.js` | **+** REVELAR/masking (§6); **+** agregador + pódio 2 telas + setas + animação (§7,§8,§10). |
| `atividades/lib/painel-*.js` | **+** `maxPontos` nas pontuadas (§7). |
| **Renomear** (`git mv`) | `03→02-fenomenos`, `04→03-questoes`, `05→04-planos`, `02→05-juri` (mapa §2). Mover o Júri 1º. |
| `atividades/0*-*.html` (todas as 5) | Ler `aula:identidade` (sem login próprio); guard `modo==="aula"` no envio; carregar `sfx.js`; etapa read-only se concluída em aula (§3,§1,§5). Júri sem pontuação; livre no treino. |
| `grep` pelos nomes antigos | Atualizar `rota:` dos `painel-*.js`, `href` entre atividades, `apresentacao/keynote*.qmd` (§2). |
| `_quarto.yml` | Navbar: dropdown "Atividades" (5 links) → **um link** para `atividades/index.html`. "Painel do professor" segue à parte. Conferir `resources:` cobre `index.html` + novos `lib/`. |

**Sem mudança em `supabase/setup.sql`** — RPC `enviar_resposta` e `owner_select` já bastam.

---

## 13. Checklist de verificação (Claude Code)

- [ ] Navbar abre o **hub** (não o dropdown). Hub renderiza os 2 cards no tema editorial.
- [ ] **Aula:** código + grupo (lista fixa) → identidade gravada **uma vez**; abrir 2ª
      atividade **não** re-pede nada. (Dor 1.)
- [ ] Abrir uma atividade **sem** identidade → redireciona ao hub.
- [ ] **Treino:** sem código, navegação livre, refaz; **nada** chega ao Supabase (conferir a
      tabela `respostas`); gabarito imediato.
- [ ] Reveal por caso **imediato** no device do aluno em **ambos** os modos (Atv 1/3/4/5).
- [ ] Painel: **REVELAR** alterna progresso↔respostas; antes de revelar **não** expõe respostas;
      reset ao trocar de atividade.
- [ ] Lista fixa de grupos: 6 default, ajustável 2–10; nomes batem device↔painel.
- [ ] Agregador: lê **todas** as atividades da sessão; normaliza cada uma /100; Júri **fora**;
      etapa faltante = 0; "etapas N/4" correto.
- [ ] Pódio em **2 telas** (rodada → geral), setas ↑↓, rótulos "Nesta rodada"/"Geral";
      clímax após a 4ª pontuada; Júri fecha sem placar.
- [ ] Sons sintetizados: aluno (clique/acerto/erro) sutis + **mudo**, som **on** por padrão,
      destrava no 1º toque; painel (whoosh + fanfarra) + animação final; `prefers-reduced-motion`.
- [ ] "Sair/trocar grupo" no hub; "Novo código" com confirmação reforçada.
- [ ] Arquivos renomeados via `git mv` (mapa §2); `grep -rn` pelos nomes antigos não acha
      nada; **zero link morto** (navbar, `rota:` dos painéis, `href` entre atividades, keynotes).
- [ ] `maxPontos` de cada módulo confere com a constante de score real da atividade.
- [ ] `quarto render` copia `atividades/**` (inclui `index.html`, `lib/`) para `docs/`;
      `supabase/` fora dos resources. Sem CDN, sem framework, fontes self-hosted.

---

## 14. Divisão de trabalho (lembrete do DESIGN.md)

- **Este chat:** esta spec, conteúdo, redação, decisões de design.
- **Claude Code:** implementar §2–§12, testar ao vivo, `git`, `quarto render`.
- **Autor:** revisar, decidir commit/push. (Backend já está pronto — nada de SQL desta vez.)
- Evitar duas mãos no mesmo arquivo ao mesmo tempo.
