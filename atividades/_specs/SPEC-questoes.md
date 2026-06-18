# Spec — Atividade 4: Simulado — Questões Comentadas

Spec de conteúdo + implementação para a **Atividade 4**. Pressupõe a arquitetura
multi-atividade já decidida em `SPEC-painel-multiatividade.md` (tabela única `respostas`,
sessão por aula, shell de painel com seletor + módulos por atividade). Aqui: o desenho
pedagógico, o contrato dos itens e os pontos específicos. Conteúdo das questões (vinheta,
enunciado, alternativas, gabarito comentado) vive em `atividades/lib/questoes-data.js`;
texto de tela verbatim em `TEXT-questoes.md`.

Fonte das âncoras: **Sims, *Sintomas da Mente*, 5ª ed. (tradução)** — citado por
**capítulo + seção** (a cópia digital é reflowed, sem paginação impressa). Divergências
de nomenclatura (Sims × roteiro) explicadas no Glossário, "Um fenômeno, muitos nomes"
(`apendices/10.3-glossario.qmd#sec-nomes-do-fenomeno`).

*Criado: junho de 2026.*

---

## 1. Ideia e ponte pedagógica

É a atividade de **consolidação/fechamento**. As Atvs 1 (Continuum) e 2 (Júri) trabalharam
o **julgamento** (eixo, responsabilidade); a Atv3 recuou para **nomear** o fenômeno. A Atv4
dá o passo seguinte: **raciocinar sobre a propriedade/mecanismo**.

A linha que a separa da Atv3, régua de cada questão:

- **Atv3 pergunta "o quê"** — qual o nome do fenômeno.
- **Atv4 pergunta "por quê / o que se segue"** — qual *propriedade* o define (egodistonia ×
  egossintonia, **autoria**, consciência, finalidade/alívio, juízo crítico), **em que ponto
  do arco do ato voluntário** ele quebra, e o que muda na agência/responsabilidade.

Toda questão deve **falhar** se o aluno só sabe o nome e **passar** se sabe a propriedade.

Recorte firme (decisão do autor): **semiologia, não nosologia**. Nunca diagnóstico, conduta,
CID ou localização de lesão. Os distratores são sempre **vizinhos reais** do mesmo eixo, nunca
aleatórios.

## 2. O gesto

Por questão (1–8): lê a vinheta curta → escolhe a **melhor** entre **4 alternativas**
(embaralhadas) → trava → **revelação com gabarito comentado** (o porquê de cada alternativa)
+ âncora no Sims + (quando há) link ao Glossário. Pontua +1 por acerto.

Bônus (9–10): formato **asserção-razão** (5 opções fixas A–E) → trava → revelação comentada
(o porquê de cada uma das 5 letras). Pontua à parte (§7).

Não há fase de evocação digitada — isso é da Atv3. Aqui o único gesto é discriminar a melhor
resposta. O que ensina é o **comentário**, não o acerto.

## 3. Princípios firmes (decididos jun/2026)

- **Esta atividade pontua** (tem gabarito). Honestidade intelectual: "os termos seguem o
  roteiro; o Sims às vezes dá outro nome ao mesmo fenômeno (ver Glossário); fronteiras reais
  podem ser tênues". Dito na abertura, em tom leve (não é prova).
- **Só questões objetivas.** Backbone em **melhor resposta A–D** (curto, robusto no celular).
  Os **2 bônus** em **asserção-razão** — único lugar onde o "porque" é o próprio conteúdo.
- **8 base + 2 bônus opcionais.** As 8 espelham a Atv3 (8 itens, gabarito, medalha por contagem).
  Os bônus não penalizam quem pula (§7).
- **Ancorada no Sims**, com gabarito comentado citando **cap. + seção**. Onde o conceito não
  está no Sims, dizê-lo (não ocorre nas 10 atuais; ver §6, itens fora do Sims foram cortados).
- **Painel: sim** — mapa de confusão por questão (§8). Melhor gancho de debate.

---

## 4. As 10 questões (gabarito-resumo)

Conteúdo completo (vinheta, enunciado, alternativas, comentários) em `lib/questoes-data.js`.
Aqui, o mapa: tema, propriedade testada, correta, distratores e âncora.

| # | Formato | Propriedade que decide | Correta | Distratores (vizinhos) | Sims (cap. · seção) |
|---|---|---|---|---|---|
| 1 | melhor | egodistonia + **alívio de tensão** | Ato compulsivo | ato impulsivo · estereotipia · automatismo | 17 · Obsessões e Compulsões |
| 2 | melhor | **autoria** (não-eu) | Vivência de influência | impulso egodistônico · automatismo · despersonalização | 12 · Perturbações do Eu |
| 3 | melhor | **consciência** ausente no ato | Automatismo | vivência de influência · estupor · negativismo | 3 · Consciência e Distúrbios da Consciência |
| 4 | melhor | **finalidade + alívio** (exclusivos da compulsão) | Ato compulsivo | tique · estereotipia · maneirismo | 18 · Distúrbios do Movimento e Comportamento |
| 5 | melhor | **qual função** falha (iniciativa) | Vontade/iniciativa (abulia) | anedonia · apatia · estupor | 18 · Anormalidades da Necessidade, Instinto, Motivação e Vontade |
| 6 | melhor | duas vontades que **travam a decisão** | Ambivalência/ambitendência | abulia · negativismo · passividade | 18 · Anormalidades da Necessidade, Instinto, Motivação e Vontade |
| 7 | melhor | **ideia × ato** + **juízo crítico** preservado | Obsessão | compulsão · delírio · inserção do pensamento | 17 · Obsessões e Compulsões |
| 8 | melhor | estranheza **de si** × **do mundo** | Despersonalização | desrealização · influência · alteração da consciência de existência | 13 · Despersonalização |
| **9** | **AR** · bônus | **arco do ato voluntário** (onde a abulia quebra) | **A** | — (5 fixas A–E) | 18 · Anseio, impulso e vontade e seus distúrbios |
| **10** | **AR** · bônus | **autoria × responsabilidade** (II falsa = troca com egodistônico) | **C** | — (5 fixas A–E) | 12 · Perturbações do Eu |

Cobertura: volição (5, 6, 9), impulso/controle (1, 7), psicomotricidade (3, 4),
Eu/agência (2, 8, 10) — impulso e agência no miolo e no fecho. Itens com link ao Glossário:
2, 5, 7, 9, 10 (onde a divergência de nome Sims × roteiro é alto rendimento).

### 4.1 Por que os bônus são asserção-razão

São os dois pontos em que o **"porque" é o conteúdo**: a Q9 testa *onde* na sequência do ato
voluntário a abulia atua (a II justifica a I → **A**); a Q10 amarra autoria e responsabilidade
e usa uma **razão falsa** — a II descreve o impulso egodistônico ("é meu, não controlo"), não a
passividade ("não é meu") → **C**. A Q10 é a ponte explícita com o Júri (Atv2): o frame de
responsabilidade é jurídico (não do Sims); o **fenômeno** (passividade) ancora no Sims cap. 12.

---

## 5. Modelo de dados — `atividades/lib/questoes-data.js`

Mesmo padrão do `fenomenos-data.js` (orientado a dados; fonte única para atividade + painel).
Expõe `window.QUESTOES_DATA = { QUESTOES, AR_OPCOES, NOTA_REVELACAO }`. Duas formas de item:

**Melhor resposta** (`formato:"melhor"`):
```js
{
  id, formato:"melhor", grupo, correta /* chave em opcoes */,
  ancora: { cap, titulo },         // Sims cap. + seção
  glossario,                       // opcional: URL#âncora p/ "Ver no Glossário"
  vinheta, enunciado,              // HTML
  opcoes: [ { chave, label, comentario /* HTML, o porquê */ }, … 4 ]
}
```
A correta vem **primeiro** por legibilidade; o render **embaralha**.

**Asserção-razão** (`formato:"assercao_razao"`, `bonus:true`):
```js
{
  id, formato:"assercao_razao", bonus:true, grupo, correta /* "A".."E" */,
  ancora, glossario?,
  asfundo?,                        // contexto curto antes das asserções (HTML)
  assercao_I, assercao_II,         // HTML
  comentarios: { A, B, C, D, E }   // HTML, o porquê de cada letra
}
```
As 5 opções vêm de `AR_OPCOES` (compartilhado), em **ordem fixa** (não embaralha). Na tela,
as duas asserções aparecem conectadas por **pois** (formato clássico I — *pois* — II).

> Ockham: a única ramificação é `formato`. O render trata "melhor" (4 opções embaralhadas,
> chave) e "assercao_razao" (5 opções fixas, letra). Acrescentar questão = acrescentar objeto.

## 6. Fluxo da atividade (`atividades/04-questoes.html`)

Herda do `03-fenomenos.html`: abertura/identidade (nome de grupo validado, código de sessão
digitado), tema editorial, 1 dispositivo por grupo, topbar com contador **e** pontuação, envio
incremental, "Refazer" com confirmação. Por questão:

1. **Vinheta** + **enunciado**.
2. **Alternativas:** 4 embaralhadas (melhor) ou 5 fixas (AR). O grupo escolhe → trava → **+1
   se correta** (base) ou +1 bônus (bônus).
3. **Envio incremental** ao Supabase (upsert, cumulativo), `atividade:"questoes"` e
   `dados:{ itens:[…] }` (§7). Sem botão de "registrar".
4. **Revelação:** nota fixa → resposta/correta → **gabarito comentado** (comentário de cada
   alternativa) → "Fundamento: Sims, cap. N, *seção*" (de `ancora`) → "Ver no Glossário →"
   (se `glossario`, `target="_blank"`).
5. **Tela-ponte** após a 8ª: oferece os 2 bônus ou pular para o resultado.
6. **Resultado final:** acertos /8 + medalha (mesmo esquema do continuum/Atv3) + bônus à parte
   + louvor (§7) + lista questão→correta→✓/✕ + ganchos de debate + CTA. Verbatim em
   `TEXT-questoes.md §5`.

## 7. Pontuação (Modelo 1) e payload

- **Base (1–8):** +1 por acerto. **Medalha** calculada sobre /8, mesmas faixas do continuum/Atv3:
  `≥7` *Raciocínio semiológico afiado* · `≥4` *Semiólogo em formação* · `<4` *Aprendiz do raciocínio*.
- **Bônus (9–10):** +1 por acerto, **fora do denominador** (não penaliza quem pula). Somam ao
  placar do painel e habilitam a **menção de louvor**, exibida **por cima** da medalha (não é um
  quarto nível): só com 8/8 **e** 2/2.
- `pontuacao` (coluna genérica) = **acertos base + acertos bônus** (máx. 10) → o placar do shell
  ordena por total; o louvor/medalha é derivado no cliente a partir de `dados.itens`.

Payload (via `SB.enviarResultado`, ver `SPEC-painel-multiatividade.md §2`):
```js
{ sessao, atividade: "questoes", grupo,
  pontuacao: <base + bônus>,
  dados: { itens: [ { item_id, escolha, correto, bonus:true|false } /* cumulativo */ ] } }
```

## 8. Contrato do painel — `atividades/lib/painel-questoes.js`

Registrado no shell (`registrarPainel`), padrão `painel-fenomenos.js`:
```js
registrarPainel({
  id: "questoes",
  label: "Simulado",
  rota: "04-questoes.html",
  placar: true,
  // Miolo: por questão, um TALLY das ESCOLHAS entre os grupos sobre as opções
  // (4 de item.opcoes; ou 5 de QUESTOES_DATA.AR_OPCOES nos bônus), com a `correta`
  // destacada — o "mapa de confusão": de relance, onde a turma errou e em qual
  // vizinho caiu. Separar bloco base (1–8) do bloco bônus (9–10). Lê row.dados.itens.
  render(container, grupos, cores) {
    var Q = window.QUESTOES_DATA.QUESTOES;
    var AR = window.QUESTOES_DATA.AR_OPCOES;
    // … por questão: barras de contagem sobre as opções, marcar a correta
  }
});
```
O gabarito comentado **não** vai ao painel — é da tela do aluno (como o Roteiro na Atv3). O
painel agrega só a escolha (`escolha`).

## 9. Plano de arquivos

| Arquivo | Ação |
|---|---|
| `atividades/lib/questoes-data.js` | **Pronto** (este chat) — `QUESTOES_DATA`, 8 + 2 itens preenchidos. |
| `atividades/04-questoes.html` | **Novo** (Claude Code) — atividade do aluno (§6), herdando do `03-fenomenos.html`. |
| `atividades/lib/painel-questoes.js` | **Novo** (Claude Code) — módulo de render do painel (§8). |
| `atividades/painel.html` | Incluir os `<script>` de `questoes-data.js` + `painel-questoes.js` → a aba "Simulado" aparece sozinha (registry). |
| `_quarto.yml` | Opcional: incluir `04-questoes.html` no menu "Atividades" (dropdown) ao publicar. |

Nada de novo no schema do Supabase: `atividade:"questoes"` + `dados.itens` reaproveitam a
tabela única `respostas` (**zero DDL**).

## 10. Micro-decisões registradas

- **Conteúdo verbatim em `TEXT-questoes.md` (canônico) e espelhado em `questoes-data.js` (cópia de
  runtime)**, como nas demais atividades — editar o texto exige tocar nos dois.
- **Citação por capítulo + seção, não por página** (jun/2026) — a cópia digital do Sims é
  reflowed e não traz a paginação impressa. Cap. + seção é estável em qualquer edição.
- **Divergência Sims × roteiro vira conteúdo, não problema** — o gabarito usa o termo do roteiro
  como resposta e, no comentário, faz a ponte ("o Sims chama de…"), apontando ao Glossário. Itens
  2, 5, 7, 10.
- **Bônus opcionais, fora do denominador** (Modelo 1) — não penaliza quem pula; preserva o
  paralelo com a Atv3 (/8) e dá glória extra (louvor) a quem encara.
- **Embaralhar só "melhor resposta"** — nas asserção-razão, a ordem A–E é convencional/lógica e
  não se embaralha.
- **Três temas cortados por não ancorarem no Sims** (jun/2026): "decisão empobrecida (tipo EVR)"
  (é Damásio), "mapear fenômeno → função do EEM" (é o roteiro do autor, não a fenomenologia do
  Sims) e "responsabilidade penal / determinar-se" (frame jurídico). O fio da responsabilidade
  voltou, ancorável, no bônus 10 (fenômeno = passividade, Sims cap. 12).

## 11. Checklist de verificação (Claude Code)

- [ ] Aluno percorre as 8 questões; cada uma: 4 alternativas **embaralhadas** → escolha trava →
      revelação com **comentário de cada alternativa** + "Fundamento: Sims, cap./seção" + link ao
      Glossário quando houver (`target="_blank"`).
- [ ] Tela-ponte após a 8ª oferece os 2 bônus; quem pula vai direto ao resultado sem penalidade.
- [ ] Bônus em asserção-razão: 5 opções **fixas** A–E; revelação comenta cada letra.
- [ ] Envio incremental grava em `respostas` com `atividade='questoes'`, `dados.itens` cumulativo
      (com `bonus`), `pontuacao` = base + bônus; reenvio do grupo **sobrescreve**.
- [ ] Medalha sobre /8; **louvor** só com 8/8 **e** 2/2.
- [ ] `04-questoes.html` não vaza a resposta antes da escolha (comentário e link só na revelação).
- [ ] Painel: aba "Simulado", **com placar**; por questão, tally das escolhas sobre as opções com
      a correta destacada; bloco base separado do bloco bônus; troca de aba repolla com
      `atividade='questoes'`.
- [ ] `quarto render` copia `atividades/**` (inclui `04-questoes.html` e `lib/`) para `docs/`.
- [ ] Sem CDN, sem framework, fontes self-hosted; tema editorial herdado.
