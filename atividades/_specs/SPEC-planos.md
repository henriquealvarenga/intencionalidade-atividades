# Spec — Atividade 5 (extra): A arquitetura da ação

Spec de conteúdo + implementação da **Atividade 5**, **extra/opcional**. Pressupõe a arquitetura
multi-atividade (`SPEC-painel-multiatividade.md`: tabela única `respostas`, sessão por aula, shell
de painel com seletor + módulos). Texto de tela verbatim em `TEXT-planos.md`.

É a atividade **filosófica** do conjunto: lê os fenômenos da vontade pela **teoria do planejamento
de Michael Bratman**, que já é espinha dorsal do livro (cap. 1.1 e 1.4). Recorte mantido: não é
metafísica solta — cada questão aponta **onde, na arquitetura da ação intencional, a coisa quebrou**,
usando casos clínicos.

*Criado: junho de 2026.*

---

## 1. Ideia e ponte pedagógica

Fecha o arco das atividades: Atv1 (continuum) posicionou; Atv2 (júri) responsabilizou; Atv3
(nomear) deu o vocabulário; Atv4 (simulado) cobrou a propriedade semiológica; a **Atv5** sobe um
nível de abstração e pergunta pela **estrutura da agência**: dado um fenômeno da vontade/impulso,
**em que ponto da arquitetura do planejamento** ele se explica.

Fundamento (do próprio livro, cap. 1.4 — *Intencionalidade Prática e Planejamento*): somos
**agentes planejadores**; a intenção não é mero desejo — é um compromisso que conduz a conduta,
resiste à reconsideração frívola e se organiza em planos hierárquicos e parciais. O autocontrole
"não é uma força unitária, mas uma arquitetura com múltiplos pontos de falha". Esta atividade pede
ao aluno **localizar a falha**.

Honestidade intelectual (dita na abertura): há resposta "melhor" — a régua é a do livro/Bratman —,
mas alguns casos reais ficam na fronteira entre dois pontos; o foco é o **raciocínio**, não decorar.

## 2. O gesto

Por questão: vinheta curta e nova → **melhor resposta** entre 4 opções da régua (embaralhadas) →
trava → **+1 se correta** → revelação com **gabarito comentado** + **fundamento** (livro, cap.
1.4/1.1, e Bratman, *Intention, Plans, and Practical Reason*, 1987). Sem evocação digitada (isso é
da Atv3). 8 questões. Pontua.

## 3. A régua — os 6 pontos de falha (conjunto de respostas)

Destilada do cap. 1.4 ("falhar em formar intenções, em mantê-las estáveis, em articulá-las em
subplanos, em executar esses subplanos quando chega o momento, ou em resistir a razões insuficientes
para reconsideração") + o caso Parks (5.11), que acrescenta a ausência do **agente**.

| chave | Ponto de falha | Em uma frase |
|---|---|---|
| `naoforma` | **Não formar a intenção** | o compromisso futuro não se constitui; vive-se no imediato. |
| `naoarticula` | **Não articular o plano** | há intenção geral, mas ela não vira subplanos/meios executáveis. |
| `instabilidade` | **Instabilidade** (reconsideração excessiva) | a intenção se forma, mas é abandonada por razões insuficientes. |
| `rigidez` | **Rigidez** (reconsideração insuficiente) | o plano não é revisto quando deveria; persiste além do razoável. |
| `execucao` | **Colapso na execução** | a intenção é firme e estável, mas não controla a conduta na hora. |
| `agente` | **Agente ausente** | não há sujeito consciente sustentando intenção e plano. |

> `instabilidade` × `rigidez` são os dois lados do **limiar de reconsideração** (cap. 1.4, "O
> problema da reconsideração"): baixo demais × alto demais. `agente` é categoricamente diferente —
> não é uma etapa do planejamento que falhou, é a ausência do planejador (caso Parks).

## 4. Os 8 casos (gabarito-resumo)

Conteúdo verbatim (vinheta, enunciado, opções, gabarito comentado) em `TEXT-planos.md`. Distratores
sempre **outros pontos da régua** — nunca aleatórios.

| # | Correto | O que a vinheta isola | Distratores | Fundamento |
|---|---|---|---|---|
| 1 | `naoforma` | a intenção nunca nasce (avolição) | execucao · instabilidade · naoarticula | cap. 1.4 (intenção ≠ desejo) · Bratman 1987 |
| 2 | `naoarticula` | intenção geral firme, mas sem passos | naoforma · execucao · rigidez | cap. 1.4 (hierarquia/parcialidade dos planos) · Bratman 1987 |
| 3 | `instabilidade` | forma e larga ao primeiro obstáculo | naoforma · rigidez · execucao | cap. 1.4 (estabilidade como variável) · Bratman 1987 |
| 4 | `rigidez` | mantém o plano com o contexto já mudado | instabilidade · naoarticula · agente | cap. 1.4 (o problema da reconsideração) · Bratman 1987 |
| 5 | `execucao` | intenção firme de *não* fazer, mas o impulso vence na hora | naoforma · instabilidade · naoarticula | cap. 1.4 (condução da conduta; akrasia × impulsividade) · Bratman 1987/1979 |
| 6 | `agente` | ação complexa sem sujeito consciente | execucao · naoforma · naoarticula | cap. 1.1 + caso Parks (5.11); três componentes · Bratman 1987 |
| 7 | `execucao` | **contraste:** formou, articulou, começou — e desabou na execução | naoforma · naoarticula · instabilidade | cap. 1.4 (localizar a falha) · Bratman 1987 |
| 8 | `instabilidade` | **contraste:** os dois erros de reconsideração lado a lado | rigidez · execucao · naoforma | cap. 1.4 (limiar de reconsideração) · Bratman 1987 |

Cobertura dos 6 pontos + 2 itens de fronteira (7 localiza a etapa; 8 separa instabilidade × rigidez).

## 5. Modelo de dados — `atividades/lib/planos-data.js`

Mesmo padrão de `fenomenos-data.js` / `questoes-data.js` (orientado a dados; fonte de runtime,
espelha o `TEXT-planos.md`). Expõe `window.PLANOS_DATA = { REGUA, ITENS, NOTA_REVELACAO }`.

```js
// REGUA: os 6 pontos (chave → label) — referência única para opções e painel.
var REGUA = [
  { chave: "naoforma",      label: "A intenção não chega a se formar" },
  { chave: "naoarticula",   label: "A intenção geral não vira subplanos executáveis" },
  { chave: "instabilidade", label: "A intenção se forma, mas é abandonada cedo demais" },
  { chave: "rigidez",       label: "O plano não é revisto quando deveria" },
  { chave: "execucao",      label: "A intenção é firme, mas não controla a conduta na hora" },
  { chave: "agente",        label: "Não há sujeito consciente sustentando intenção e plano" }
];

// Um item por questão. `correta` = chave em REGUA. `opcoes` = 4 chaves da REGUA (a correta +
// 3 distratores); a ORDEM é embaralhada no render. `ancora` monta o "Fundamento".
var ITENS = [
  {
    id: 1, correta: "naoforma",
    ancora: { cap: "1.4", secao: "A Teoria do Planejamento", obra: "Bratman, Intention, Plans, and Practical Reason (1987)" },
    vinheta: "…",            // TEXT-planos §3, item 1
    enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
    opcoes: ["naoforma","execucao","instabilidade","naoarticula"],  // chaves da REGUA
    comentarios: {           // o porquê de cada opção presente — verbatim TEXT-planos §5
      naoforma: "…", execucao: "…", instabilidade: "…", naoarticula: "…"
    }
  }
  // … itens 2–8
];
```

> Ockham: a régua é fonte única; o item só lista **quais 4 chaves** entram e o comentário de cada
> uma. Acrescentar questão = acrescentar objeto. O label de cada opção vem da `REGUA` (não se
> repete no item). Embaralhar é responsabilidade do render.

> Alternativa de implementação (à escolha do Claude Code): em vez de `opcoes:[chaves]` +
> `comentarios:{}`, usar `opcoes:[{chave,comentario}]` como nas outras atividades. O que importa:
> 4 opções por item, `correta` é chave da régua, cada opção tem comentário, label vem da régua.

## 6. Fluxo (`atividades/05-planos.html`)

Herda do `04-questoes.html` (que herda do `03-fenomenos.html`): abertura/identidade (nome de grupo
validado, código de sessão), tema editorial, topbar com contador **e** pontuação, envio incremental
(upsert), "Refazer" com confirmação. Por questão: vinheta + enunciado → 4 opções **embaralhadas** →
escolhe/trava → **+1 se correta** → revelação: nota fixa (`PLANOS_DATA.NOTA_REVELACAO`) → opção
correta destacada + comentário de cada opção → **"Fundamento: livro, cap. \<ancora.cap\> —
*\<ancora.secao\>*; \<ancora.obra\>"** com link ao capítulo (`target="_blank"`). Sem botão de
"registrar". Abertura apresenta Bratman em 2–3 frases acessíveis (verbatim em `TEXT-planos §1`).

Link ao capítulo: `../capitulos/1.4-intencionalidade-pratica.html` (e `1.1-liberdade-coordenacao.html`
no item 6). Conferir que o caminho resolve a partir de `docs/atividades/`.

## 7. Pontuação

+1 por acerto, máx. 8. **Medalha** sobre /8 (mesmo esquema do continuum/Atv3/4), com títulos do
tema: `≥7` *Arquiteto da ação* · `≥4` *Planejador em formação* · `<4` *Aprendiz do planejamento*.
Sem bônus (é atividade extra; mantém simples).

Payload (`SB.enviarResultado`, ver `SPEC-painel-multiatividade.md §2`):
```js
{ sessao, atividade: "planos", grupo,
  pontuacao: <nº de acertos>,
  dados: { itens: [ { item_id, escolha, correto } /* cumulativo */ ] } }
```

## 8. Contrato do painel — `atividades/lib/painel-planos.js`

`registrarPainel({ id:"planos", label:"Arquitetura da ação", rota:"05-planos.html", placar:true, … })`.
Miolo idêntico em espírito ao `painel-questoes.js`: por questão, **tally das escolhas** dos grupos
sobre as opções daquele item (chaves da `REGUA`, label da régua), com a `correta` **destacada** — o
mapa de confusão (em qual ponto da régua a turma errou). Lê `row.dados.itens`. O gabarito comentado
não vai ao painel.

## 9. Plano de arquivos

| Arquivo | Ação |
|---|---|
| `atividades/lib/planos-data.js` | **Novo** — `PLANOS_DATA` (§5), 8 itens preenchidos a partir do `TEXT-planos.md`. |
| `atividades/05-planos.html` | **Novo** — atividade do aluno (§6), herdando do `04-questoes.html`. |
| `atividades/lib/painel-planos.js` | **Novo** — módulo de render do painel (§8). |
| `atividades/painel.html` | Incluir os `<script>` de `planos-data.js` + `painel-planos.js` → a aba "Arquitetura da ação" aparece sozinha (registry). |
| `_quarto.yml` | Opcional: incluir `05-planos.html` no dropdown "Atividades" (marcar como *extra*). |

**Zero DDL:** `atividade:"planos"` + `dados.itens` reaproveitam a tabela `respostas`.


## 10. Checklist (para quem implementar)

- [ ] Percorre as 8 questões: 4 opções **embaralhadas** → escolha trava → revelação com comentário
      de cada opção + "Fundamento: livro cap. + Bratman 1987" + link ao capítulo (`target="_blank"`).
- [ ] Envio grava em `respostas` com `atividade='planos'`, `dados.itens` cumulativo, `pontuacao` =
      acertos; reenvio do grupo **sobrescreve**.
- [ ] Medalha sobre /8 com os títulos do §7.
- [ ] `05-planos.html` não vaza a resposta antes da escolha; opções embaralhadas (posição não prevê).
- [ ] Painel: aba "Arquitetura da ação", com placar; tally por questão sobre a régua, correta
      destacada; troca de aba repolla com `atividade='planos'`.
- [ ] Links dos capítulos resolvem a partir de `docs/atividades/`.
- [ ] `quarto render` copia `atividades/**`; sem CDN, sem framework, fontes self-hosted, tema editorial.

## 11. Micro-decisões

- **Só teoria do planejamento** (jun/2026) — o veio "autogoverno/identificação" (Frankfurt/Bratman)
  ficou de fora desta atividade; depende de reforço do texto do livro, a fazer depois.
- **Pontua, com gabarito comentado** ancorado no **livro** (cap. 1.4/1.1) e em **Bratman 1987**
  (citar a obra clássica é parte do ponto). Onde o caso é de fronteira, a revelação reconhece.
- **Casos novos** (não reaproveita Parks/Gage/EVR nomeados das Atvs 1–2) — muda o foco do julgamento
  para a **estrutura** da ação.
- **Atividade extra/opcional** — a mais abstrata; fecha o arco clínico→filosófico.
