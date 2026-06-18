# Spec — Atividade 3: Reconhecer e nomear fenômenos

Spec de conteúdo + implementação para a **Atividade 3**. Pressupõe a arquitetura
multi-atividade já decidida em `SPEC-painel-multiatividade.md` (tabela única `respostas`,
sessão por aula, shell de painel com seletor + módulos por atividade). Aqui: o desenho
pedagógico, o conteúdo dos 8 itens e os contratos específicos.

Léxico-fonte e fronteiras: `FENOMENOS.md` (baseado no Roteiro do EEM do autor,
Dalgalarrondo 2019 e Kaplan & Sadock 2017). Texto de tela verbatim em `TEXT-fenomenos.md`.

*Criado: junho de 2026.*

---

## 1. Ideia e ponte pedagógica

As Atividades 1 (Continuum) e 2 (Júri) trabalham o **julgamento** sobre casos: onde fica no
eixo, quanto se responde. A Atividade 3 recua um passo, para a **semiologia**: antes de julgar,
é preciso **nomear** o que se vê. O alvo é o **vocabulário** e — mais que o termo isolado — as
**fronteiras** entre termos quase-sinônimos (abulia × apatia, impulsivo × compulsivo, ação
controlada × impulso egodistônico…).

Recorte (decisão do autor): o aluno **nomeia o fenômeno**, **não** diagnostica o transtorno.
Fenômenos da **vontade, impulso, ação e Eu** — coerente com o tema do livro. Diagnóstico
diferencial orgânico × primário foi descartado de propósito (puxa para raciocínio clínico, fora
do eixo de um curso de psicopatologia).

## 2. O gesto: evocar, depois discriminar (duas fases)

Espelha a Atividade 1 (pontua o discreto, não o texto livre). Por item:

1. **Evocação (não pontuada).** Lida a vinheta, o grupo **digita** o nome do fenômeno — de
   cabeça, sem opções à vista. É o gesto difícil (lembrar o termo) e fica **local** (não vai ao
   painel; ver §6).
2. **Discriminação (pontuada).** Só então aparecem **4 opções** — o termo correto + **3 vizinhos
   de confusão** do mesmo grupo do `FENOMENOS.md`. Escolher entre os confundíveis **é** o objetivo
   pedagógico (a fronteira), e é o que se pontua.
3. **Revelação.** Termo certo + a **fronteira** (por que é este e não o vizinho) + link para a
   seção do Roteiro do EEM.

> Por que duas fases e não MC direta: a evocação cega força o recall (currículo de semiologia);
> a MC seguinte testa a discriminação fina e resolve o auto-grading sem fragilidade de texto livre
> (sinônimo, acento, typo). A evocação é o análogo da justificativa do eixo na Atv1: registrada,
> não pontuada.

## 3. Princípios firmes (decididos jun/2026)

- **Esta atividade TEM gabarito.** Diferente das Atvs 1 e 2 — nomear um fenômeno tem resposta
  certa (é vocabulário). Logo, **pontua** (§7). A honestidade intelectual aqui muda de forma: não
  é "a posição não tem gabarito", é "os termos seguem o Roteiro/Dalgalarrondo; as fronteiras entre
  fenômenos reais às vezes são tênues". Dito ao aluno na abertura, em tom leve (não é prova).
- **Pontua só a discriminação (MC).** A evocação digitada não pontua. +1 por acerto, máx. 8.
- **Vinhetas curtas, anônimas, fictícias-mas-realistas** (2–3 frases), cada uma **engenheirada
  para cair em cima de uma fronteira** — o vizinho errado tem de tentar. **Não** reaproveita os
  casos reais nomeados das Atvs 1/2 (biografia demais para um instantâneo semiológico).
- **Distratores = vizinhos reais**, do mesmo grupo de confusão (ou adjacente) do `FENOMENOS.md`.
  Nunca aleatórios.
- **Grupos-alvo: 1 (volição), 3 (impulso/compulsão), 4 (Eu/agência), 5 (psicomotricidade).** O
  grupo 2 (afeto) entra como **distrator** da abulia, não como resposta-alvo — coerente com o
  recorte vontade/impulso/ação/Eu.
- **Painel: sim** — mapa de confusão por item (§7). É o melhor gancho de debate da atividade.

---

## 4. Os 8 itens (prontos para virar objetos de `ITENS`)

Cobertura por grupo: g1 (abulia, ambivalência volitiva), g3 (ato compulsivo), g4 (vivência de
influência, despersonalização), g5 (automatismo, estereotipia, estupor). Cada item: vinheta cega
(verbatim em `TEXT-fenomenos.md §3`), termo **correto**, **3 distratores** vizinhos, **fronteira**
(verbatim §5) e a âncora do Roteiro do EEM.

Base de URLs do Roteiro: `https://henriquealvarenga.com/entrevista/02-roteiro_eem.html`

| # | Correto | Grupo EEM | Distratores (vizinhos) | Âncora |
|---|---|---|---|---|
| 1 | **Abulia** | §12 Volição | Apatia · Anedonia · Hipobulia | `#volição` |
| 2 | **Ambivalência volitiva** | §12 Volição | Abulia · Negativismo · Hipobulia | `#volição` |
| 3 | **Ato compulsivo** | §14 Controle de impulsos | Ato impulsivo · Obsessão · Estereotipia | `#controle-de-impulsos` |
| 4 | **Vivência de influência (ação controlada)** | §15 Consciência do Eu | Impulso egodistônico · Despersonalização · Automatismo | `#consciência-e-valoração-do-eu` |
| 5 | **Automatismo** | §13 Psicomotricidade | Ação controlada · Estupor · Obediência automática | `#psicomotricidade` |
| 6 | **Estereotipia** | §13 Psicomotricidade | Maneirismo · Tique · Ato compulsivo | `#psicomotricidade` |
| 7 | **Estupor** | §13 Psicomotricidade | Abulia · Negativismo passivo · Catalepsia | `#psicomotricidade` |
| 8 | **Despersonalização** | §15 Consciência do Eu | Desrealização · Alteração da consciência de existência · Vivência de influência | `#consciência-e-valoração-do-eu` |

A ordem é proposital: abre nas confusões da **vontade** (1–2), passa pelo **impulso/controle**
(3), entra na **agência/Eu** (4), atravessa a **ação sem ou com sujeito** (5–7) e fecha de volta
no **Eu** (8). Impulso e agência — o coração do livro — ficam no miolo.

### 4.1 Fronteira-chave de cada item (resumo; texto verbatim em `TEXT-fenomenos.md §5`)

1. **Abulia** — a *iniciativa/vontade* está abolida (a ação não parte), não é falta de prazer
   (anedonia) nem frieza emocional (apatia); e é *ausência*, não mera diminuição (hipobulia).
2. **Ambivalência volitiva** — há vontade: *duas*, opostas e simultâneas, que se anulam (quer e
   contraquer). Na abulia não há vontade; no negativismo a oposição é a uma *ordem externa*.
3. **Ato compulsivo** — egodistônico, resiste, **alivia** a tensão ao realizar; o impulsivo é
   egossintônico e sem crítica; a *obsessão* é a **ideia**, não o ato; a estereotipia repete sem
   finalidade nem alívio.
4. **Vivência de influência** — o sujeito **não reconhece** o ato como seu (vivência de
   passividade); no impulso egodistônico ele reconhece o ato como **seu**, só não o controla. Não
   é automatismo (lá não há consciência) nem despersonalização (estranheza de si, sem força externa).
5. **Automatismo** — **não há sujeito consciente** agindo; na ação controlada há consciência, mas
   o ato é sentido como **imposto**; o estupor é imobilidade (o oposto); a obediência automática
   executa **ordens externas**, consciente.
6. **Estereotipia** — repetição **uniforme e sem finalidade**; o maneirismo é caricatura *bizarra
   de um gesto com sentido*; o tique é **súbito e involuntário**; a compulsão **alivia tensão** e
   tem crítica. Todos repetem, por mecanismos diferentes.
7. **Estupor** — imobilidade e mutismo por **inibição motora**, com consciência possivelmente
   preservada; na abulia a *vontade* está abolida, sem o bloqueio motor global; o negativismo
   passivo é **recusa**, não inibição; a catalepsia mantém *posturas impostas*.
8. **Despersonalização** — estranheza de **si**; a desrealização é irrealidade do **mundo**; a
   alteração da consciência de existência vai além (*"sou uma máquina/um nada"* — nega existir);
   a vivência de influência atribui a uma **força externa**, ausente aqui.

---

## 5. Modelo de dados — `atividades/lib/fenomenos-data.js`

Mesmo padrão do `continuum-data.js` / `juri-data.js` (orientado a dados; fonte única para
atividade + painel). Guarda **metadados e revelação** — nunca o que o grupo digita.

```js
(function (global) {
  "use strict";

  var ROTEIRO = "https://henriquealvarenga.com/entrevista/02-roteiro_eem.html";

  // Um objeto por item. `correta` = chave em `opcoes`. `opcoes` traz o termo certo +
  // 3 vizinhos (mesma forma {chave,label}); a ORDEM é embaralhada no render (§6),
  // então a posição nunca é dica. `vinheta`/`fronteira` = verbatim TEXT-fenomenos.
  var ITENS = [
    {
      id: 1, grupo_eem: "Volição (§12)", correta: "abulia",
      roteiro: ROTEIRO + "#volição",
      opcoes: [
        { chave: "abulia",    label: "Abulia" },
        { chave: "apatia",    label: "Apatia" },
        { chave: "anedonia",  label: "Anedonia" },
        { chave: "hipobulia", label: "Hipobulia" }
      ],
      vinheta: "…",     // TEXT-fenomenos §3, item 1
      fronteira: "…"    // TEXT-fenomenos §5, item 1
    }
    // … itens 2–8, mesma forma (correto + 3 distratores da tabela §4)
  ];

  global.FENOMENOS_DATA = { ITENS: ITENS };
})(window);
```

> Ockham: não há "escala" nem dois conjuntos como no júri — todo item tem a mesma forma (4 opções,
> 1 correta). Acrescentar item = acrescentar objeto. Embaralhar opções é responsabilidade do
> render, não do dado (o dado lista o certo primeiro, por legibilidade do arquivo).

---

## 6. Fluxo da atividade (`atividades/03-fenomenos.html`)

Herda a abertura/identidade do `01-continuum.html` (nome de grupo validado, código de sessão
digitado, tema editorial, 1 dispositivo por grupo, contador no topbar **com** pontuação). Por item:

1. **Vinheta** (relato curto, anônimo).
2. **Evocação:** um `input` de texto — "Que fenômeno é este?". O grupo digita e confirma. **Não
   pontua, não vai ao painel.** Persistida em `localStorage` para reaparecer na síntese (§, "vocês
   digitaram X").
3. **Discriminação:** revelam-se as **4 opções** (ordem **embaralhada** por render). O grupo
   escolhe uma → trava → **+1 se correta**. A escolha é o que pontua e o que vai ao painel.
4. **Envio incremental** ao Supabase (cumulativo, upsert), idêntico ao continuum, com
   `atividade:"fenomenos"` e `dados:{ itens:[…] }` (§7). Sem botão de "registrar" no fim.
5. **Revelação:** o termo certo (destacado entre as opções) + a **fronteira** (contraste com os
   vizinhos, verbatim §5) + **"Ver no Roteiro do EEM →"** apontando para a âncora do item,
   **`target="_blank"`**. Mostrar também a evocação do grupo ao lado do termo correto ("vocês
   disseram **X**; o termo é **Y**") — fecha o ciclo evocar→descobrir.
6. **Síntese final:** pontuação + medalha (mesmo esquema do continuum) + lista item→evocação→termo
   correto + ganchos para o debate de turma + CTA para a página do projeto. Verbatim em
   `TEXT-fenomenos.md §6`.

> O link do Roteiro aparece **só na revelação** (como o "caso completo" no júri): antes, entregaria
> a resposta. `target="_blank"` para não derrubar o estado no celular.

## 7. Payload e contrato do painel

Payload do envio (via `SB.enviarResultado`, ver `SPEC-painel-multiatividade.md §2`):

```js
{ sessao, atividade: "fenomenos", grupo,
  pontuacao: <nº de acertos>,                 // genérico; aqui = soma dos corretos
  dados: { itens: [ { item_id, escolha, correto } /* , … cumulativo */ ] } }
```

> Nota (espelha o júri): a **evocação digitada não é enviada** — fica no aparelho do grupo (texto
> livre é ruído no telão e não agrega limpo). O painel agrega só a MC (`escolha`).

Módulo de painel `atividades/lib/painel-fenomenos.js`, registrado no shell:

```js
registrarPainel({
  id: "fenomenos",
  label: "Fenômenos",
  rota: "03-fenomenos.html",
  placar: true,                               // pontua → placar genérico do shell
  // Miolo: por item, um TALLY categórico das ESCOLHAS entre os grupos, sobre as
  // 4 opções (`FENOMENOS_DATA.ITENS[i].opcoes`), com a `correta` destacada. É o
  // "mapa de confusão": de relance, quantos grupos caíram em cada vizinho.
  // Forte gancho de debate ("8 disseram abulia, 3 apatia — qual a fronteira?").
  // Lê row.dados.itens (escolha por item_id).
  render(container, grupos, cores) {
    var ITENS = window.FENOMENOS_DATA.ITENS;
    // … por item: barras de contagem sobre item.opcoes, marcar item.correta
  }
});
```

## 8. Plano de arquivos

| Arquivo | Ação |
|---|---|
| `atividades/lib/fenomenos-data.js` | **Novo** — `FENOMENOS_DATA` (§5), 8 itens preenchidos (vinheta + fronteira verbatim dos textos). |
| `atividades/03-fenomenos.html` | **Novo** — atividade do aluno (§6). |
| `atividades/lib/painel-fenomenos.js` | **Novo** — módulo de render do painel (§7). |
| `atividades/painel.html` | Incluir os `<script>` de `fenomenos-data.js` + `painel-fenomenos.js` → a aba "Fenômenos" aparece sozinha (registry). |
| `_quarto.yml` | Opcional: incluir `03-fenomenos.html` no menu "Atividades" (dropdown) quando publicar. |

Nada de novo no schema do Supabase: `atividade:"fenomenos"` + `dados.itens` reaproveitam a tabela
única `respostas` (zero DDL).

## 9. Checklist de verificação (Claude Code)

- [ ] Aluno percorre os 8 itens; cada item: evocação digitada (local, não enviada) → 4 opções
      embaralhadas → escolha trava → revelação com fronteira + link do Roteiro (`target="_blank"`).
- [ ] Envio incremental grava em `respostas` com `atividade='fenomenos'`, `dados.itens` cumulativo,
      `pontuacao` = nº de acertos; reenvio do grupo **sobrescreve**.
- [ ] Opções **embaralhadas** por render (posição não prevê a correta); a `correta` bate com o
      `label` destacado na revelação.
- [ ] Painel: aba "Fenômenos", **com placar**; por item, tally das escolhas sobre as 4 opções com
      a correta destacada; troca de aba repolla com `atividade='fenomenos'`.
- [ ] `03-fenomenos.html` não vaza a resposta antes da escolha (link do Roteiro só na revelação).
- [ ] Âncoras do Roteiro resolvem para as 5 seções certas (testar os 8 links).
- [ ] Sem CDN, sem framework, fontes self-hosted; tema editorial herdado.

## 10. Micro-decisões registradas

- **Duas fases (evocar → discriminar)** (jun/2026) — preserva o recall *e* resolve o auto-grading;
  espelha a Atv1 (pontua o discreto, registra o texto). A evocação não vai ao painel.
- **Esta é a única atividade com gabarito** — por isso pontua (Atvs 1 e 2 não pontuam). A
  honestidade intelectual migra de "não há gabarito" para "termos seguem o Roteiro; fronteiras
  reais podem ser tênues".
- **Grupo 2 (afeto) só como distrator** — mantém o recorte vontade/impulso/ação/Eu sem excluir a
  fronteira abulia × apatia × anedonia, que é alto rendimento.
- **Banco de reserva** (não usados, prontos para virar itens): ato impulsivo (egossintônico),
  obsessão (ideia × ato), pensamento feito × roubo do pensamento, maneirismo, tique, acatisia,
  flexibilidade cérea, ecopraxia, embotamento × "sentimento de falta de sentimento".
</content>
</invoke>
