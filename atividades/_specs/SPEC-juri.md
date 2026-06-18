# Spec — Atividade 2: Júri simulado (imputabilidade e responsabilidade)

Spec de conteúdo + implementação para a **Atividade 2**. Pressupõe a arquitetura
multi-atividade já decidida em `SPEC-painel-multiatividade.md` (tabela única `respostas`,
sessão por aula, shell de painel com seletor + módulos por atividade). Aqui: o desenho
pedagógico, o conteúdo dos 4 casos e os contratos específicos do júri.

*Criado: junho de 2026.*

---

## 1. Ideia e ponte pedagógica

A Atividade 1 (Continuum) colocou os casos num eixo **descritivo** (flexibilidade↔determinação).
O júri faz a virada **normativa**: *e daí, para a responsabilidade?* O elo é direto — o polo
"determinação" do continuum é exatamente o segundo critério do art. 26 do Código Penal:
capacidade de **determinar-se** de acordo com o entendimento.

Cada grupo é uma **corte** que delibera e devolve um veredito por caso. Diferente do continuum,
o caso vem **revelado** (julgar exige os fatos). Reaproveita os 4 casos-âncora que o aluno já
encontrou no continuum → *callback* descritivo→normativo.

Três casos são **criminais** (responsabilidade retrospectiva: punir ou desculpar um dano?). O
quarto (EVR) é **civil** (responsabilidade prospectiva: essa pessoa deve seguir decidindo por si?)
— o *outro rosto* da mesma pergunta do livre-arbítrio, com a valência invertida (ver §4.1).

## 2. O esqueleto jurídico (art. 26 CP — critério biopsicológico)

A imputabilidade exige **duas** capacidades íntegras, ao tempo do ato:

- **Entender** o caráter ilícito do fato (cognição).
- **Determinar-se** de acordo com esse entendimento (volição).

Gradação legal:

- **Imputável** — capaz das duas → responde com pena.
- **Semi-imputável** (art. 26, § único) — "não inteiramente capaz" de uma delas → condenação
  com pena reduzida (1/3 a 2/3) ou substituição por medida de segurança.
- **Inimputável** (art. 26, caput) — "inteiramente incapaz" de uma delas → isento de pena;
  pode receber medida de segurança (tratamento).

> Distinção que a atividade explora de propósito: **automatismo** (caso Parks) é *anterior* ao
> art. 26 — sem sujeito consciente não há **conduta** (ato voluntário), logo não há fato típico a
> imputar. É exclusão de conduta, não isenção de pena por doença mental. Por isso o painel oferece
> uma 4ª via de veredito (ver §4).

## 3. Princípios firmes (decididos)

- **Sem placar / sem gabarito.** Veredito não se pontua — gamificar puniria o dissenso, que é o
  combustível do debate. (`placar: false` no módulo de painel.)
- **Casos:** os 4 âncora do continuum (Parks, Burns & Swerdlow, Whitman, EVR).
- **Input enxuto do grupo (Ockham):** capacidade comprometida → veredito → justificativa escrita.
- **Honestidade intelectual:** o "desfecho real" é referência, não gabarito; casos sem julgamento
  (Whitman morreu; EVR é civil) são ditos como tais ao aluno.
- **Link para o caso completo só na revelação** (§6).

---

## 4. O que o grupo registra por caso

1. **Capacidade comprometida** (diagnóstico do raciocínio do grupo):
   `entender` · `determinar-se` · `ambas` · `nenhuma`.
2. **Veredito** — o conjunto depende da marca `corte` do caso (ver §4.1):
   - **Casos criminais** (`corte: "criminal"`, casos 1–3) — quatro vias:
     `imputavel` · `semi` · `inimputavel` · `sem_acao` (absolvição por **ausência de ação**).
   - **Caso civil** (`corte: "civil"`, caso 4 / EVR) — três vias:
     `autonomia` · `apoiada` (tomada de decisão apoiada) · `curatela` (restrita a atos patrimoniais).
3. **Justificativa** (texto livre) — o argumento que o grupo defende no debate da turma.

A 4ª via criminal (`sem_acao`) dá casa ao Parks e torna a distinção conduta × imputabilidade
selecionável (quem marcar `sem_acao` em outro caso revela uma leitura forte).

### 4.1 Duas cortes, um mecanismo (o caso EVR)

O EVR **não cometeu crime** — julgá-lo por imputabilidade é encaixe errado. A pergunta real dele é
**civil**: essa pessoa deve seguir decidindo por si, ou alguém decide por ela? É o *outro rosto* da
responsabilidade (prospectiva, não retrospectiva), e inverte a valência: nos crimes a falta de
controle *desculpa*; no EVR ela pode *custar* o direito de decidir.

Para não virar gambiarra, o modelo trata isso na raiz: a **Pergunta 1 (capacidade) é comum a todos**
(diagnóstico que liga à régua do continuum), e a **Pergunta 2 (veredito) é escolhida pela marca
`corte`** de cada caso. Base legal civil (atual, pós-Lei 13.146/2015): autonomia plena é a regra;
curatela é extraordinária e restrita a atos patrimoniais; entre as duas, a tomada de decisão apoiada
(art. 1.783-A CC).

## 5. Modelo de dados — `atividades/lib/juri-data.js`

Mesmo padrão do `continuum-data.js` (orientado a dados; fonte única para atividade + painel).
Expõe `window.JURI_DATA = { VEREDITOS, CAPACIDADES, CASOS }`. O arquivo guarda **metadados e
revelação** — nunca o que o grupo digita.

```js
(function (global) {
  "use strict";

  // Dois conjuntos de veredito, selecionados pela marca `corte` de cada caso.
  var VEREDITOS = {
    criminal: {
      imputavel:   { label: "Imputável",     desc: "responde com pena" },
      semi:        { label: "Semi-imputável", desc: "pena reduzida ou medida de segurança" },
      inimputavel: { label: "Inimputável",   desc: "isento de pena; medida de segurança" },
      sem_acao:    { label: "Absolvição (ausência de ação)", desc: "automatismo: não houve conduta" }
    },
    civil: {
      autonomia: { label: "Autonomia plena", desc: "decide por si, mesmo decidindo mal" },
      apoiada:   { label: "Tomada de decisão apoiada", desc: "mantém a capacidade, com apoiadores de confiança" },
      curatela:  { label: "Curatela", desc: "outra pessoa decide, só nos atos patrimoniais" }
    }
  };

  // Pergunta 2 (rótulo), por corte.
  var PERGUNTA_VEREDITO = {
    criminal: "Qual é o veredito do júri?",
    civil:    "A pessoa deve manter o direito de decidir sobre a própria vida?"
  };

  var CAPACIDADES = {  // Pergunta 1 — comum a todos os casos
    entender:   { label: "Entender o ilícito (cognição)" },
    determinar: { label: "Determinar-se (volição)" },
    ambas:      { label: "Ambas" },
    nenhuma:    { label: "Nenhuma comprometida" }
  };

  // Cada caso tem `corte: "criminal" | "civil"` → seleciona VEREDITOS[corte].
  var CASOS = [ /* ver §5.1 — um objeto por caso */ ];

  global.JURI_DATA = {
    VEREDITOS: VEREDITOS, PERGUNTA_VEREDITO: PERGUNTA_VEREDITO,
    CAPACIDADES: CAPACIDADES, CASOS: CASOS
  };
})(window);
```

### 5.1 Conteúdo dos 4 casos (prontos para virar objetos de `CASOS`)

A progressão é proposital: **sem ato algum** (Parks) → **compelido, mesmo sabendo** (B&S) →
**sabia e em boa parte podia** (Whitman) → **sabia mas não executa, sem ser compelido** (EVR).
Percorre todo o eixo volitivo e mostra onde o art. 26 encaixa e onde racha.

---

**Caso 1 — Kenneth Parks** · `corte: "criminal"` · `elo_continuum: 8` · `caso_completo: "../casos/5.11-sonambulismo-homicida.html#sec-parks"`

- **fatos:** Homem de 23 anos, sob forte estresse e privação de sono, adormece no sofá. Durante a
  noite levanta-se, dirige ~23 km até a casa dos sogros — com quem tinha excelente relação —, mata
  a sogra e fere gravemente o sogro; depois vai à delegacia, confuso e sangrando das próprias mãos,
  dizendo não compreender o que fez. Sem motivo, conflito ou ganho. Polissonografia muito anômala
  e história familiar densa de parasonias.
- **capacidade (enquadramento):** nenhuma das duas é sequer alcançada — não há sujeito consciente.
  Por isso é caso de **ausência de conduta**, anterior ao art. 26.
- **tensão:** o ato foi complexo demais (dirigir, usar a chave, atacar pessoas específicas) para
  ser "automático"? Pode haver ação dirigida a alvos sem agente?
- **desfecho_real:** Absolvido pelo júri (1988); confirmado pela Suprema Corte do Canadá (1992)
  como **automatismo não-insano** — absolvição plena, distinta do automatismo insano (que levaria
  à internação). `fonte: "R. v. Parks (1992); Broughton et al. (1994)."`

**Caso 2 — Pedófilo por tumor orbitofrontal (Burns & Swerdlow)** · `corte: "criminal"` · `elo_continuum: 5` · `caso_completo: "../casos/5.3-pedofilia.html"`

- **fatos:** Professor de 40 anos, sem antecedentes, desenvolve em meses impulsos pedofílicos
  intrusivos que **reconhece como abomináveis** e tenta evitar, descrevendo "uma força interna
  estranha" que decide por ele. Encaminhado à Justiça após assediar menores. Investigação revela
  tumor orbitofrontal direito. Removido → impulsos somem e o autocontrole volta; recidiva → voltam
  idênticos; nova cirurgia → somem de novo.
- **capacidade (enquadramento):** **cognição preservada, volição abolida** — entende perfeitamente
  o ilícito; falha a capacidade de determinar-se. Encaixe mais limpo no art. 26 (critério
  volitivo). Causa **reversível** → o caso que mais favorece **medida de segurança/tratamento**
  sobre pena.
- **tensão:** a reversibilidade total prova determinação biológica — ou prova que, removida a
  causa, a liberdade volta (e logo "nunca foi ele")?
- **desfecho_real:** Caso clínico, sem julgamento criminal documentado; a literatura o usa como
  demonstração de vontade dependente de circuito orbitofrontal. `fonte: "Burns & Swerdlow (2003)."`

**Caso 3 — Charles Whitman** · `corte: "criminal"` · `elo_continuum: 7` · `caso_completo: "../casos/5.9-charles-whitman.html#sec-whitman"`

- **fatos:** 25 anos, ex-fuzileiro, sem antecedentes. Meses de cefaleia e "pensamentos violentos e
  irracionais" que estranha — procura o médico e um psiquiatra. **Na véspera, escreve pedindo que
  façam uma autópsia em seu cérebro após a morte, "para ver se há alguma desordem física".** Em
  seguida, de forma **planejada** (reúne armas e suprimentos, escolhe um ponto elevado), mata a
  esposa, a mãe e comete o massacre da torre. A autópsia que ele mesmo pediu revela um glioblastoma
  comprimindo a amígdala. Tomava doses crescentes de anfetamina.
- **capacidade (enquadramento):** **cognição plenamente intacta; volição só parcialmente
  comprometida.** O **pedido de autópsia é a evidência-chave que o júri tem de pesar**: é prova de
  *insight preservado* — ele reconhece os impulsos como estranhos a si, busca ajuda e antecipa uma
  causa física. Esse mesmo insight, somado à premeditação meticulosa e à função executiva
  preservada, puxa para **imputável**; o substrato tumoral, a anfetamina e o relato de "não me
  controlo" puxam para **semi**. A Comissão Connally concluiu que o tumor "poderia ter contribuído",
  **sem determinar**. É o caso deliberadamente **contestado** do conjunto — e o pedido de autópsia
  é o pivô do dilema: prova de lucidez ou grito de quem se sente dominado?
- **tensão:** ele planejou tudo e pediu para ser examinado. Premeditação e insight convivem com
  determinação biológica — ou a excluem?
- **desfecho_real:** **Morto no ataque — nunca julgado.** A imputabilidade aqui é hipótese de
  debate, não decisão de tribunal; o papel causal do tumor permanece disputado entre peritos.
  `fonte: "Comissão Connally (1966); Lavergne (1997)."`

**Caso 4 — EVR / "Elliott"** · `corte: "civil"` · `elo_continuum: 6` · `caso_completo: "../casos/5.13-evr-marcador-somatico.html#sec-evr"`

> **Caso-virada.** Não há crime: a pergunta não é "punir ou desculpar?", é "esta pessoa deve seguir
> decidindo por si?". A atividade exibe uma nota antes da Pergunta 2 e usa o conjunto de veredito
> `civil` (autonomia / apoiada / curatela). É o *outro rosto* da responsabilidade — a mesma perda de
> controle que, nos crimes, *desculpa*, aqui pode *custar* o direito de decidir.

- **fatos:** Contador bem-sucedido; ressecção de meningioma no pré-frontal ventromedial. QI
  superior, memória, linguagem e raciocínio **intactos nos testes** — mas perde a capacidade de
  *decidir*: paralisa em trivialidades, embarca em negócios ruinosos que ele próprio reconhece como
  arriscados. Na Iowa Gambling Task, sabe verbalmente qual baralho é ruim e **continua escolhendo-o**.
- **capacidade (enquadramento):** **cognição totalmente intacta; volição não está abolida nem ele
  é compelido** — apenas não consegue converter o que sabe em ação. A capacidade de *entender*
  preservada é justamente o que torna difícil restringir sua autonomia.
- **enquadramento civil:** a lei brasileira parte da **autonomia plena** (mesmo quem decide mal tem
  o direito de decidir); a **curatela** é extraordinária e restrita a atos patrimoniais; entre as
  duas, a **tomada de decisão apoiada** (art. 1.783-A CC) preserva a capacidade com apoiadores de
  confiança. A pergunta do grupo: até onde proteger alguém de si mesmo deixa de ser cuidado e vira
  tirar a liberdade?
- **tensão:** decidir mal é um direito? A partir de que ponto proteger vira restringir?
- **desfecho_real:** Caso clínico real e **civil** (não criminal — não cometeu crime). Mantinha
  inteligência superior e sabia, inclusive nos testes, qual era a escolha certa; só não conseguia
  agir conforme. `fonte: "Eslinger & Damasio (1985); Bechara et al. (1994)."`

---

## 6. Fluxo da atividade (`atividades/02-juri.html`)

Herda a abertura/identidade do `01-continuum.html` (nome de grupo validado, código de sessão
digitado, tema editorial, 1 dispositivo por grupo). Por caso:

1. **Os fatos** (vinheta revelada — identidade + fatos para julgar; **sem** análise).
2. **Deliberação → registro:** capacidade comprometida (Pergunta 1, comum) → veredito (Pergunta 2,
   conjunto conforme `corte` do caso) → justificativa. **No caso civil (EVR)**, exibir antes da
   Pergunta 2 a nota "Aqui não houve crime…" e usar os vereditos `civil`.
3. **Envio incremental** ao Supabase (cumulativo, upsert), idêntico ao continuum, mas com
   `atividade:"juri"` e `dados:{ vereditos: [...] }` (ver §7). Sem botão de "registrar" no fim.
4. **Revelação:** enquadramento (art. 26 nos criminais; capacidade civil no EVR) + desfecho real +
   fonte + **"Ler o caso completo →"** apontando para `caso_completo`, **`target="_blank"`** (nova
   aba, não derruba o estado no celular). O link aparece **só aqui** — nunca antes/durante a
   deliberação, senão o capítulo entrega o argumento pronto e mata o debate.
5. **Síntese final:** ganchos para o debate de turma (onde houve mais dissenso; o contraste
   criminal × civil — a mesma perda de controle que desculpa também pode restringir) + CTA para a
   página do projeto. Texto verbatim em `TEXT-juri.md`.

## 7. Payload e contrato do painel

Payload do envio (via `SB.enviarResultado`, ver `SPEC-painel-multiatividade.md` §2):

```js
{ sessao, atividade: "juri", grupo,
  pontuacao: null,                       // júri não pontua
  dados: { vereditos: [ { caso_id, capacidade, veredito } /* , ... cumulativo */ ] } }
```

> Nota: a justificativa textual **não** é enviada ao painel (é para o debate presencial do grupo,
> não para projeção). Mantém o payload enxuto e evita exibir texto livre no telão.

Módulo de painel `atividades/lib/painel-juri.js`, registrado no shell:

```js
registrarPainel({
  id: "juri",
  label: "Júri",
  rota: "02-juri.html",
  placar: false,                         // sem placar — veredito não tem gabarito
  // Miolo específico: por caso, um TALLY categórico dos vereditos entre os grupos.
  // O conjunto de barras depende da `corte` do caso: 4 vias nos criminais
  // (imputável / semi / inimputável / ausência de ação) e 3 no civil
  // (autonomia / apoiada / curatela). Opcional: tally secundário da capacidade.
  // Mostra consenso e dissenso de relance → combustível do debate. Lê row.dados.vereditos.
  render(container, grupos, cores) {
    var CASOS = window.JURI_DATA.CASOS, VEREDITOS = window.JURI_DATA.VEREDITOS;
    // por caso: var vs = VEREDITOS[caso.corte]; // 'criminal' | 'civil'
    // ... barras de contagem por caso, sobre as chaves de vs
  }
});
```

## 8. Plano de arquivos

| Arquivo | Ação |
|---|---|
| `atividades/lib/juri-data.js` | **Novo** — `JURI_DATA` (§5), 4 casos preenchidos (§5.1). |
| `atividades/02-juri.html` | **Novo** — atividade do aluno (§6). |
| `atividades/lib/painel-juri.js` | **Novo** — módulo de render do painel (§7). |
| `atividades/painel.html` | Incluir os `<script>` de `juri-data.js` + `painel-juri.js` → a aba "Júri" aparece sozinha (registry). |
| `_quarto.yml` | Opcional: incluir `02-juri.html` no menu "Atividades" (dropdown) quando publicar. |
| `references/references.bib` | Conferir que as chaves citadas existem: `broughton1994parks`, `parks1992scc`, `burns2003right`, `connally1966whitman`, `lavergne1997sniper`, `eslinger1985evr`, `bechara1994iowa`, `damasio1994descartes`. |

## 9. Checklist de verificação (Claude Code)

- [ ] Aluno percorre os 4 casos; envio incremental grava em `respostas` com `atividade='juri'`,
      `dados.vereditos` cumulativo, `pontuacao` nula; reenvio do grupo **sobrescreve**.
- [ ] Link "Ler o caso completo" só aparece na revelação, abre em nova aba e resolve para a página
      certa em `docs/casos/...` (conferir as 4 URLs após `quarto render`).
- [ ] Painel: aba "Júri", **sem placar**; tally conforme `corte` (4 vias nos casos 1–3, 3 vias no
      caso 4); troca de aba repolla com `atividade='juri'`.
- [ ] Caso 4 (EVR) usa o conjunto `civil`, mostra a nota "Aqui não houve crime" antes do veredito,
      e **não** exibe as opções criminais.
- [ ] `02-juri.html` não vaza análise antes do veredito; vinheta só com os fatos.
- [ ] Sem CDN, sem framework, fontes self-hosted; tema editorial herdado.

## 10. Micro-decisões registradas

- **4ª via criminal** (`sem_acao`, "absolvição por ausência de ação") — adotada para dar casa ao
  Parks e tornar selecionável a distinção conduta × imputabilidade. Simplificar para 3 vias é trocar
  `VEREDITOS.criminal` e a contagem do painel — sem impacto no schema.
- **Caso 4 (EVR) como corte civil** (jun/2026) — decisão do autor: o EVR não tem crime, então é
  julgado pela pergunta da autonomia (autonomia / decisão apoiada / curatela), não pela
  imputabilidade. Resolvido na raiz com a marca `corte` por caso (Pergunta 1 comum, Pergunta 2 por
  corte), sem gambiarra. Não afeta o schema do Supabase (`dados.vereditos` aceita qualquer chave).
