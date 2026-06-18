# Texto de tela — Atividade 2: Júri simulado

Todo o texto que o **aluno lê na tela**, em versão final, no tom do `01-continuum.html`
("vocês", direto, sem mencionar "o livro"). O Claude Code deve usar este texto **verbatim**;
os metadados (ordem dos casos, links, fontes) estão na `SPEC-juri.md`.

Ordem dos casos (progressão deliberada): **1 Parks → 2 Pedófilo/tumor → 3 Whitman → 4 EVR.**

---

## 1. Abertura (tela de entrada)

> **Kicker:** Atividade 2 · Júri simulado
>
> **Título:** O júri: até onde vai a responsabilidade?
>
> Vocês são o júri de um tribunal. Vão analisar uma série de casos reais e decidir, em grupo,
> **quanto cada pessoa responde pelo que fez** — e o que a lei deve fazer com isso.
>
> No Brasil, os crimes contra a vida, como o homicídio, não são decididos por um juiz: quem decide
> é um **júri popular** — sete pessoas comuns, sorteadas, sem formação em Direito. São elas que
> ouvem a acusação e a defesa (cada lado puxando os fatos para o seu argumento) e decidem a pergunta
> central: a pessoa é responsável pelo que fez? É aí que entram teses como a da inimputabilidade. O
> juiz preside o julgamento e respeita o que o júri decidir; depois, cabe a ele fixar a pena. Esse
> júri, hoje, são vocês.
>
> Na maioria dos casos, alguém causou dano e a pergunta é criminal: para responder por um ato, a
> pessoa precisa, no momento dele, de duas capacidades — **entender** que aquilo é errado e
> **conseguir se controlar** de acordo com esse entendimento. Quando uma delas falha por causa de
> uma condição mental, a responsabilidade pode ser reduzida ou desaparecer.
>
> **O último caso não é crime**, ninguém feriu ninguém. A pergunta é se esta pessoa ainda deve
> decidir por si mesma, ou se alguém deveria decidir por ela.
>
> Em cada caso, vocês vão ler os fatos, identificar qual capacidade estava comprometida e dar um
> veredito.
>
> Para todos esses casos **não há uma resposta correta**: peritos e tribunais reais divergem, e o
> que se decide numa época pode não valer no futuro. Por isso, redijam um pequeno texto justificando
> o veredito do seu grupo — é ele que vocês vão defender no debate com a turma.

> *(Card de entrada — mesmo do continuum:)* Trabalhem em grupo, num só aparelho. Para começar,
> digitem o código da sessão que o professor projetou na tela e escolham um nome para o grupo.
> *(campos: Código da sessão / Nome ou número do grupo · botão: Começar)*

---

## 2. Topbar do loop

- Contador: **Caso 1 de 4** *(sem placar de pontos — o júri não pontua)*

---

## 3. Vinhetas (só os fatos — sem análise)

**Caso 1 — Kenneth Parks**
> Um homem de 23 anos, sob forte estresse e sem dormir direito há semanas, adormece no sofá de
> casa enquanto assiste à TV. Durante a madrugada, levanta-se, entra no carro e dirige cerca de
> 23 km até a casa dos sogros — com quem tinha ótima relação. Entra com a chave que guardava, mata
> a sogra e fere gravemente o sogro. Em seguida dirige até a delegacia e se entrega, confuso e
> sangrando das próprias mãos, dizendo não entender o que tinha feito. Não havia motivo, não havia brigas
> entre ele e os sogros, nem havia ganho possível. Exames do sono revelam um padrão muito anômalo,
> e há histórico denso de distúrbios do sono na família.

**Caso 2 — Pedófilo por tumor**
> Um professor de 40 anos, casado, sem qualquer antecedente, passa a desenvolver em poucos meses
> impulsos sexuais por crianças. Ele considera esses impulsos abomináveis e tenta o tempo todo
> evitá-los, descrevendo "uma força interna estranha" que parece decidir por ele. Os impulsos passam a se
> traduzir em atos: ele começa a colecionar pornografia infantil e a fazer investidas sexuais sobre
> a enteada. A esposa descobre, ele é afastado de casa e acaba respondendo a um processo na Justiça.
> Uma investigação médica encontra
> um tumor no cérebro; retirado o tumor, os impulsos desaparecem por completo e ele retoma o
> autocontrole. Meses depois eles voltam, idênticos — e descobre-se que o tumor havia voltado a
> crescer. Uma nova cirurgia os elimina outra vez.

**Caso 3 — Charles Whitman**
> Um homem de 25 anos, ex-militar, sem antecedentes, passa meses atormentado por dores de cabeça
> intensas e por "pensamentos violentos e irracionais" que ele próprio estranha. Procura um médico
> e um psiquiatra. Na véspera, escreve um pedido: que examinem seu cérebro depois da morte, "para
> ver se há alguma desordem física". No dia seguinte, de forma planejada — reunindo armas e
> suprimentos e escolhendo um ponto elevado e estratégico —, mata a esposa e a mãe e comete um
> massacre, alcançando alvos a centenas de metros, antes de ser morto. A autópsia que ele mesmo
> pediu revela um tumor no cérebro.

**Caso 4 — EVR**
> Um contador bem-sucedido, casado e pai de família, retira um tumor no cérebro e se recupera sem
> sequelas aparentes: inteligência, memória e linguagem permanecem intactas, e nos testes seu
> raciocínio é normal. Na vida real, porém, tornou-se incapaz de decidir bem. Gasta horas em
> detalhes triviais, não consegue estabelecer prioridades e embarca em negócios ruinosos que ele
> mesmo reconhece como arriscados. Não há impulso anômalo, compulsão nem agressividade. Ele apenas
> decide mal, repetidamente, até perder emprego, patrimônio e casamento — sempre capaz de explicar
> lucidamente, depois, por que aquilo tinha sido uma má decisão.

---

## 4. Deliberação (rótulos dos controles)

A **Pergunta 1** é a mesma em todos os casos. A **Pergunta 2** muda: os casos 1–3 (crime) recebem
o veredito criminal; o caso 4 (sem crime) recebe o veredito civil. A atividade escolhe a versão
pela marca `corte` do caso (ver `SPEC-juri.md`).

**Pergunta 1 — capacidade** *(todos os casos)*
> No momento do ato, qual capacidade estava comprometida?

- Entender que o ato era errado *(cognição)*
- Controlar-se e agir conforme esse entendimento *(volição)*
- Ambas
- Nenhuma das duas

**Pergunta 2A — veredito criminal** *(casos 1–3)*
> Qual é o veredito do júri?

- **Imputável** — responde pelo ato, com pena
- **Semi-imputável** — pena reduzida, ou tratamento no lugar de parte da pena
- **Inimputável** — isento de pena; pode receber tratamento (medida de segurança)
- **Absolvição por ausência de ação** — não houve ato voluntário a julgar

**Pergunta 2B — veredito civil** *(caso 4 — EVR)*
> *(Nota fixa antes da pergunta, no topo da tela deste caso:)* **Aqui não houve crime.** Ninguém
> foi ferido. A pergunta é outra: esta pessoa ainda deve decidir por si mesma?
>
> A pessoa deve manter o direito de decidir sobre a própria vida?

- **Autonomia plena** — ele continua decidindo por si, mesmo decidindo mal: errar é um direito
- **Tomada de decisão apoiada** — mantém a capacidade, mas escolhe pessoas de confiança para
  apoiá-lo nas decisões da vida civil
- **Curatela** — outra pessoa passa a decidir por ele, **só** nos atos de dinheiro e patrimônio
  (o resto da vida continua sendo dele)

**Justificativa (textarea)** *(todos os casos)*
> Por que este veredito? Redijam em grupo o argumento que vão defender no debate.
> *(placeholder:)* Não há gabarito: o que vale é o argumento do grupo.

*(Botão para a revelação:)* Revelar →

---

## 5. Revelação (após o voto, por caso)

Estrutura fixa de cada revelação: **No mundo real** (desfecho) · **O que está em jogo** (como pesar,
sem entregar um gabarito) · **O que complica** (a tensão) · **Ler o caso completo →** (nova aba).

Nota honesta no topo do bloco (fixa): *Não há resposta única — peritos e tribunais divergem
sobre estes casos.*

**Caso 1 — Kenneth Parks**
> **No mundo real.** Parks foi absolvido pelo júri em 1988, e a Suprema Corte do Canadá confirmou
> a decisão em 1992, tratando o episódio como sonambulismo — um automatismo, não uma doença mental.
>
> **O que está em jogo.** Se ele não estava consciente, não houve um ato voluntário — e sem ato não
> há o que julgar. Antes de perguntar se ele entendia ou se controlava, é preciso perguntar se houve
> mesmo uma ação dele.
>
> **O que complica.** O ato foi complexo: dirigir 23 km, usar a chave certa, atacar pessoas
> específicas. Um comportamento tão dirigido pode mesmo acontecer sem ninguém "ao volante"?

**Caso 2 — Pedófilo por tumor**
> **No mundo real.** É um caso clínico real. A causa era um tumor numa região do cérebro ligada ao
> controle dos impulsos. Removido o tumor, os impulsos sumiram; quando ele voltou a crescer,
> voltaram idênticos; uma nova cirurgia os eliminou de novo.
>
> **O que está em jogo.** Ele entendia que era errado; o que falhou foi a capacidade de se controlar.
> E como a causa era tratável, o caso costuma puxar para tratamento em vez de pena: tratada a lesão,
> cessa o risco.
>
> **O que complica.** Se a liberdade dele voltou quando o tumor saiu, ela nunca tinha sido "dele"
> enquanto o tumor estava lá? Ou isso só prova que era pura biologia?

**Caso 3 — Charles Whitman**
> **No mundo real.** Whitman foi morto durante o ataque — nunca chegou a ser julgado. A autópsia que
> ele mesmo pediu revelou um tumor comprimindo uma região do cérebro ligada à emoção. Uma comissão
> de peritos concluiu que o tumor "poderia ter contribuído", sem conseguir afirmar que o causou — e
> ele também vinha usando doses crescentes de um estimulante.
>
> **O que está em jogo.** O ponto difícil é o pedido de autópsia. Ele mostra que Whitman percebia o
> próprio estado: reconhecia os impulsos como estranhos, procurou ajuda e até suspeitou de uma causa
> física. Isso, com o ataque todo planejado, pesa a favor da responsabilidade. O tumor e o relato de
> não se controlar pesam contra. Pesar os dois lados é o trabalho de vocês.
>
> **O que complica.** Ele planejou tudo e pediu para ser examinado. O pedido de autópsia é prova de
> lucidez — ou o grito de alguém que se sentia dominado por algo?

**Caso 4 — EVR**
> **No mundo real.** É um caso clínico real, e civil: EVR não cometeu crime. Manteve inteligência
> superior e sabia — inclusive em testes — qual era a escolha certa. Só não conseguia agir de acordo
> com o que sabia. Hoje, quem decide sobre a vida dele não é um júri criminal, mas uma vara civil —
> a pedido da família, que quer protegê-lo das próprias decisões.
>
> **O que está em jogo.** A lei brasileira hoje parte da **autonomia plena**: mesmo quem decide mal
> tem o direito de decidir. Tirar de alguém o comando da própria vida é medida extrema — a curatela
> só alcança atos de dinheiro e patrimônio, e mesmo assim em último caso; no meio existe a decisão
> apoiada, em que ele mantém a capacidade e escolhe pessoas de confiança para ajudá-lo. A dificuldade
> é que a capacidade de *entender* dele está intacta — e é difícil tirar de alguém o direito de errar.
>
> **O que complica.** Decidir mal é um direito? A partir de que ponto **proteger alguém de si mesmo**
> deixa de ser cuidado e vira tirar a liberdade dessa pessoa?

*(Botão:)* Próximo caso → *(no último caso:)* Ver a síntese →

---

## 6. Síntese final

> **Kicker:** Fim da sessão
>
> **Título:** O veredito de vocês
>
> Júri **\<nome do grupo\>**. Estes foram os vereditos de vocês, caso a caso. *(lista: caso →
> capacidade apontada → veredito)*

> *(Card de debate — fundo sidebar:)*
> **Para o debate de turma.** Olhem o conjunto antes de discutir com a sala:
> • Em qual caso a turma mais se **dividiu**?
> • Qual foi o **mais difícil** de decidir, e por quê?
> • Houve algum caso em que vocês **mudaram de ideia** ao pesar os dois lados?
> • Nos três crimes, a falta de controle *desculpava* a pessoa. No caso do contador, a mesma falta
>   de controle podia *custar* a ele o direito de decidir. Por que ela às vezes **livra** e às vezes
>   **restringe**?

> *(CTA de volta ao projeto — igual ao continuum:)*
> Esses casos vêm do livro *Intencionalidade, Vontade, Impulsividade e Livre Arbítrio*.
> [Conheça o projeto →](../index.html)

*(Botão:)* Refazer *(pede confirmação, como no continuum)*

---

## 7. Nota de implementação

- A justificativa textual **não** vai para o painel (fica no aparelho do grupo, para o debate).
- O link "Ler o caso completo" aparece **só** na revelação, `target="_blank"` (URLs na `SPEC-juri.md` §5.1).
- Sem placar em nenhuma tela.
