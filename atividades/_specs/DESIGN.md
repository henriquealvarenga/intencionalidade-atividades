# Design das Atividades — Intencionalidade, Vontade, Impulsividade e Livre Arbítrio

Notas de design das atividades didáticas do projeto. Servem para orientar qualquer
agente (Cowork, Claude Code) ou chat novo a continuar o trabalho sem reexplicar tudo.
Complementa o `CLAUDE.md` (princípios gerais do projeto).

*Última atualização: junho de 2026.*

---

## Propósito e público

- Atividades clínicas para uma disciplina de **psicopatologia, graduação em Medicina**.
- Objetivo: dar **"ar clínico"** a um material denso e filosófico, sem virar prova teórica.
- Formato de uso: **pequenos grupos (3–4 alunos), 1 dispositivo por grupo**, discussão
  interna → depois **debate com a turma toda** conduzido pelo professor.
- Tudo **online, dentro do site** do projeto. Nada de papel, cards ou apps externos de votação.

## Princípios pedagógicos (decisões firmes)

1. **Foco em fenomenologia da vontade/impulso + agência e responsabilidade.** "Ar clínico"
   aqui = semiologia + livre-arbítrio. Farmacologia/conduta entram só como tempero leve.
2. **NÃO usar localização de lesão / neuroanatomia como eixo.** Decisão explícita do autor.
   Evitar perguntas do tipo "onde está a lesão?".
3. **Honestidade intelectual.** Ex.: as faixas de posição no continuum foram *calculadas pela
   IA Claude* — isso é dito ao aluno; não são consenso de especialistas. A posição no eixo
   **não tem gabarito**; o que vale é o argumento.
4. **Discutir/planejar antes de construir.** O autor prefere fechar conteúdo e design na
   conversa antes de gerar arquivos.

## A régua semiológica — 6 categorias (sem neuroanatomia)

- **Abulia** — vontade/iniciativa abolida (ausência de impulso).
- **Impulso egodistônico** — reconhece como errado, mas não controla.
- **Compulsão** — ritual que alivia tensão; juízo crítico preservado.
- **Agência alienada** — não reconhece o ato/impulso como seu.
- **Ação sem consciência** — automatismo; não há sujeito consciente agindo.
- **Decisão empobrecida** — escolhe mal, sem impulso anômalo nem compulsão.

## Banco de casos

- Os 8 casos da Atividade 1 vivem em `atividades/lib/continuum-data.js` (orientado a dados:
  acrescentar caso = acrescentar objeto). Cada caso: vinheta cega, categoria correta,
  faixa (min/max) no eixo, contra-argumento, reversibilidade, revelação (quem é + fonte).
- **Casos atuais (1–8):** lobotomia/Rosemary (abulia estrutural), esquizofrenia/impulsos feitos
  (agência alienada), abulia funcional por neuroléptico + sintoma negativo (abulia reversível),
  TOC (compulsão), tumor orbitofrontal/Burns & Swerdlow (impulso egodistônico reversível),
  EVR/Elliott (decisão empobrecida), Whitman (impulso violento premeditado), Parks (ação sem
  consciência). Pares de contraste: 1↔3 (abulia) e 5↔7 (impulso).
- **Banco de reserva:** mão alienígena, hipersexualidade dopaminérgica, adição/uso de
  substâncias, Tourette, transtorno explosivo intermitente.
- **Pendência de conteúdo:** criar um caso real de **esquizofrenia (impulsos feitos)** em
  `casos/`, com referência da literatura, para dar lastro ao caso 2.

## Atividade 1 — Continuum (construída)

Transforma a tese do livro (continuum flexibilidade ↔ determinação) em gesto.
- **Fluxo por caso (blind-then-reveal):** ler vinheta cega → classificar a natureza
  **[pontuado]** → posicionar no eixo (tocar na linha) + redigir um pequeno texto de
  justificativa **[não pontuado]** → revelar (identidade + faixa de referência da IA +
  reversibilidade + contra-argumento).
- **Gamificação leve:** pontos só na classificação; **sem placar** na posição do eixo.
- **Toque na linha** (não arrastar-soltar — robustez no celular).
- Abertura instrucional (não menciona "o livro"; o aluno não leu). Nome do grupo obrigatório
  e validado (`^[A-Za-z0-9_-]$`: letras sem acento, números, hífen, underline).
- **Síntese final:** eixo do grupo + pontuação + medalha + ganchos para o debate de turma +
  (planejado) link/CTA para a página inicial do projeto (`../index.html`).

## Arquitetura técnica (decisões)

- **Client-side, sem CDN, sem framework.** Tema editorial herdado (paleta CSS + fontes em
  `../fonts/`). Single-file por página quando possível.
- **Supabase via REST puro (`fetch`)**, sem biblioteca. Helper em `atividades/lib/supabase.js`
  expõe `configValida()`, `enviarResultado()` (upsert `on_conflict=sessao,grupo`),
  `consultarSessao()`.
- **Separação de concerns:** infra/migração em `/supabase/setup.sql` (NÃO publicado, fora dos
  `resources` do Quarto); config de runtime + helpers em `atividades/lib/`.
- **Config pública** em `atividades/lib/supabase-config.js`: Project URL + chave **anon/publishable**
  (pública, pode commitar — proteção é o RLS). **NUNCA** service_role/secret no cliente nem no git.
- **Persistência:** envio **incremental** (a cada caso, cumulativo, via upsert) + `localStorage`;
  sem botão de "registrar" no fim. "Refazer" pede confirmação.
- **Código de sessão:** gerado e travado no **painel** (curto, alfabeto sem ambiguidade,
  sem 0/O/1/I/L), **sem QR**. Aluno entra pela página → menu **Atividades** → digita o código.
  O padrão compartilhado "aula" foi descartado (colisão entre turmas na web pública).
- **RLS:** anon `insert` + `select` (dados efêmeros, sem PII). Limpar a tabela entre aulas.
- **Painel do professor** (`painel-continuum.html`): telão, polling a cada ~4s, um marcador por
  grupo por caso + placar. Sem agregação em tempo real além de polling.
- **Publicação:** Quarto copia `atividades/` para `docs/` via `resources`; GitHub Pages via Actions.

## Divisão de trabalho

- **Cowork / este agente de chat:** design, pedagogia, conteúdo dos casos, redação de textos,
  e escrever *specs* para o Claude Code.
- **Claude Code:** implementação, testes ao vivo (curl/servir local), `git`, `quarto render`,
  e aplicar SQL no Supabase via `psql` (a connection string fica só no terminal local dele).
- **Autor:** rodar SQL/credenciais no Supabase, revisar, decidir commit/push.
- Evitar duas mãos editando o mesmo arquivo ao mesmo tempo (já quase deu conflito uma vez).

## Próximas atividades — roadmap (a discutir)

Decisões firmes que valem para todas: público de Medicina (grad), trabalho em grupos, **sem
localização de lesão**, e reaproveitamento do tema/arquitetura (mesmo `lib/`, mesmo padrão de
sessão e painel quando precisar agregar).

**Atividade 2 — Júri simulado (DECIDIDA, jun/2026).** Imputabilidade e responsabilidade pelo
art. 26 do CP (entender × determinar-se). Os 4 casos-âncora do continuum (Parks, Burns &
Swerdlow, Whitman, EVR), revelados (não cegos), virada descritivo→normativo. Sem placar (veredito
não tem gabarito). Input do grupo: capacidade comprometida (comum) → veredito → justificativa.
**Duas cortes:** casos 1–3 são criminais (veredito: imputável/semi/inimputável/ausência de ação);
o caso 4 (EVR) é civil — não há crime, a pergunta é a autonomia (autonomia plena / decisão apoiada
/ curatela, pós-Lei 13.146/2015), o *outro rosto* da responsabilidade. Marca `corte` por caso
resolve na raiz. Link p/ o caso completo em `casos/` só na revelação. Spec + conteúdo em
`SPEC-juri.md`; texto de tela em `TEXT-juri.md`.

**Atividade 3 — Reconhecer e nomear fenômenos (DECIDIDA, jun/2026).** Foco: o aluno **nomear o
fenômeno** psicopatológico, **não** diagnosticar o transtorno (decisão do autor — "diagnóstico
diferencial orgânico vs. primário" foi descartado por puxar para raciocínio clínico, fora do eixo
de um curso de psicopatologia). O que importa é o vocabulário e as **sutilezas** entre termos
quase-sinônimos. Recorte: fenômenos da **vontade, impulso, ação e Eu**. Fonte do léxico: o roteiro
do EEM do autor (<https://henriquealvarenga.com/entrevista/02-roteiro_eem.html>); lista curada por
**grupos de confusão** (definições + fronteiras) em `FENOMENOS.md`.
**Formato (fechado):** vinheta curta e anônima → o grupo **evoca** (digita de cabeça, não pontua) →
**discrimina** entre o termo certo e **3 vizinhos de confusão** (MC, **pontua** +1) → revelação com
a **fronteira** (por que é este e não o vizinho) + link à seção do Roteiro do EEM. Espelha a Atv1
(pontua o discreto, registra o texto livre). **8 itens**, alvos em volição (abulia, ambivalência
volitiva), impulso/compulsão (ato compulsivo), Eu/agência (vivência de influência, despersonalização)
e psicomotricidade (automatismo, estereotipia, estupor); o grupo "afeto" entra só como distrator.
**É a única atividade com gabarito** → pontua (a honestidade migra de "não há resposta certa" para
"os termos seguem o Roteiro; fronteiras reais podem ser tênues"). **Painel: sim** — mapa de confusão
por item (tally das escolhas, correta destacada). A evocação digitada **não** vai ao painel.
Reaproveita a arquitetura multi-atividade (`atividade:"fenomenos"`). Spec + conteúdo em
`SPEC-fenomenos.md`; texto de tela em `TEXT-fenomenos.md`.

Outras candidatas (formatos levantados, ainda não priorizadas):
- **Questões objetivas estilo residência** — vinheta + múltipla escolha, gabarito comentado.
  Evitar itens de localização anatômica.

**Arquitetura do painel do professor com VÁRIAS atividades (DECIDIDO — jun/2026).**
As três escolhas eram acopladas (a navegação depende do escopo da sessão, que depende do
modelo de dados). Decisões firmes:

1. **Sessão: um código por AULA**, compartilhado entre atividades. O professor gera UM código
   no início da aula; o aluno digita UMA vez e ele serve às atividades 1, 2, 3… Sem redigitar,
   sem multiplicar estado.
2. **Dados: tabela ÚNICA `respostas`** com discriminador `atividade` (texto: `'continuum'`,
   `'juri'`, …) + payload específico em `dados` (jsonb) + colunas genéricas `sessao/grupo/pontuacao`.
   Acrescentar atividade = novo valor de `atividade`, **zero DDL**. Uma RLS, um cron. Índice único
   `(sessao, atividade, grupo)` habilita o upsert incremental. Espelha a orientação-a-dados do
   `continuum-data.js`.
3. **Painel: shell ÚNICO + seletor.** Um `painel.html` genérico cuida de código/polling/seletor
   (abas) e delega o desenho do miolo a módulos por atividade em `lib/` (`painel-continuum.js`,
   `painel-juri.js`…), cada um registrando uma função `render`. O shell não cresce; cada atividade
   pluga renderizador + data file. Legenda, placar e cores ficam no shell (genéricos); o módulo
   desenha só a visualização específica.

Migração trivial: dados são efêmeros (limpos entre aulas) → criar a tabela `respostas` nova,
repontar a config e largar `respostas_continuum`. Sem dado a preservar. Spec de implementação
para o Claude Code em `SPEC-painel-multiatividade.md`.

## Preferências do autor (estilo)

- Conciso e direto; pouca firula de formatação.
- Best practices acima de soluções rápidas; navalha de Ockham; tratar causa-raiz; pensar em como
  o projeto envelhece. (Ver `CLAUDE.md` para os princípios completos.)
