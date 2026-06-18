/* =============================================================================
   BANCO DE CASOS — Atividade 2 (Júri simulado: imputabilidade e responsabilidade)
   Orientado a dados. FONTE ÚNICA: consumido tanto pela atividade do aluno
   (02-juri.html) quanto pelo painel do professor (lib/painel-juri.js).

   Guarda METADADOS e REVELAÇÃO — nunca o que o grupo digita. Texto de tela é
   verbatim do _specs/TEXT-juri.md; metadados (corte, links, fontes) da _specs/SPEC-juri.md.

   Pergunta 1 (capacidade) é COMUM a todos os casos. Pergunta 2 (veredito) é
   escolhida pela marca `corte` de cada caso: 'criminal' (casos 1–3) ou 'civil'
   (caso 4 / EVR). Escala/conjunto de veredito em VEREDITOS[corte].
   Expõe window.JURI_DATA = { VEREDITOS, PERGUNTA_VEREDITO, CAPACIDADES, CASOS }.
   ============================================================================= */
(function (global) {
  "use strict";

  /* Dois conjuntos de veredito, selecionados pela marca `corte` de cada caso.
     label+desc = texto verbatim da opção na atividade (_specs/TEXT-juri §4);
     curto = rótulo compacto para as barras do painel (telão). */
  var VEREDITOS = {
    criminal: {
      imputavel:   { label: "Imputável",   desc: "responde pelo ato, com pena", curto: "Imputável" },
      semi:        { label: "Semi-imputável", desc: "pena reduzida, ou tratamento no lugar de parte da pena", curto: "Semi-imputável" },
      inimputavel: { label: "Inimputável", desc: "isento de pena; pode receber tratamento (medida de segurança)", curto: "Inimputável" },
      sem_acao:    { label: "Absolvição por ausência de ação", desc: "não houve ato voluntário a julgar", curto: "Ausência de ação" }
    },
    civil: {
      autonomia: { label: "Autonomia plena", desc: "ele continua decidindo por si, mesmo decidindo mal: errar é um direito", curto: "Autonomia plena" },
      apoiada:   { label: "Tomada de decisão apoiada", desc: "mantém a capacidade, mas escolhe pessoas de confiança para apoiá-lo nas decisões da vida civil", curto: "Decisão apoiada" },
      curatela:  { label: "Curatela", desc: "outra pessoa passa a decidir por ele, só nos atos de dinheiro e patrimônio (o resto da vida continua sendo dele)", curto: "Curatela" }
    }
  };

  /* Pergunta 2 (rótulo), por corte — verbatim _specs/TEXT-juri §4. */
  var PERGUNTA_VEREDITO = {
    criminal: "Qual é o veredito do júri?",
    civil:    "A pessoa deve manter o direito de decidir sobre a própria vida?"
  };

  /* Pergunta 1 — comum a todos os casos. label = título da opção; desc = a nota
     entre parênteses (cognição/volição), vazia quando não há. Verbatim §4. */
  var CAPACIDADES = {
    entender:   { label: "Entender que o ato era errado", desc: "cognição" },
    determinar: { label: "Controlar-se e agir conforme esse entendimento", desc: "volição" },
    ambas:      { label: "Ambas", desc: "" },
    nenhuma:    { label: "Nenhuma das duas", desc: "" }
  };

  /* Pergunta 1 (enunciado) e nota fixa do caso civil — verbatim §4. */
  var PERGUNTA_CAPACIDADE = "No momento do ato, qual capacidade estava comprometida?";
  var NOTA_CIVIL = "Aqui não houve crime. Ninguém foi ferido. A pergunta é outra: esta pessoa ainda deve decidir por si mesma?";

  /* Nota honesta fixa no topo de toda revelação — verbatim §5. */
  var NOTA_REVELACAO = "Não há resposta única — peritos e tribunais divergem sobre estes casos.";

  /* 4 casos-âncora do continuum, na progressão deliberada (Parks → tumor →
     Whitman → EVR). `fatos` (vinheta verbatim §3, anônima — sem análise);
     `quem` revela a identidade só na revelação; real/jogo/complica verbatim §5;
     fonte e caso_completo da SPEC §5.1. */
  var CASOS = [
    {
      id: 1, corte: "criminal", elo_continuum: 8,
      quem: "Kenneth Parks",
      caso_completo: "../casos/5.11-sonambulismo-homicida.html#sec-parks",
      fonte: "R. v. Parks (1992); Broughton et al. (1994).",
      fatos: `Um homem de 23 anos, sob forte estresse e sem dormir direito há semanas, adormece no sofá de casa enquanto assiste à TV. Durante a madrugada, levanta-se, entra no carro e dirige cerca de 23 km até a casa dos sogros — com quem tinha ótima relação. Entra com a chave que guardava, mata a sogra e fere gravemente o sogro. Em seguida dirige até a delegacia e se entrega, confuso e sangrando das próprias mãos, dizendo não entender o que tinha feito. Não havia motivo, não havia brigas entre ele e os sogros, nem havia ganho possível. Exames do sono revelam um padrão muito anômalo, e há histórico denso de distúrbios do sono na família.`,
      real: `Parks foi absolvido pelo júri em 1988, e a Suprema Corte do Canadá confirmou a decisão em 1992, tratando o episódio como sonambulismo — um automatismo, não uma doença mental.`,
      jogo: `Se ele não estava consciente, não houve um ato voluntário — e sem ato não há o que julgar. Antes de perguntar se ele entendia ou se controlava, é preciso perguntar se houve mesmo uma ação dele.`,
      complica: `O ato foi complexo: dirigir 23 km, usar a chave certa, atacar pessoas específicas. Um comportamento tão dirigido pode mesmo acontecer sem ninguém "ao volante"?`
    },
    {
      id: 2, corte: "criminal", elo_continuum: 5,
      quem: "Pedófilo por tumor (Burns & Swerdlow)",
      caso_completo: "../casos/5.3-pedofilia.html",
      fonte: "Burns & Swerdlow (2003).",
      fatos: `Um professor de 40 anos, casado, sem qualquer antecedente, passa a desenvolver em poucos meses impulsos sexuais por crianças. Ele considera esses impulsos abomináveis e tenta o tempo todo evitá-los, descrevendo "uma força interna estranha" que parece decidir por ele. Os impulsos passam a se traduzir em atos: ele começa a colecionar pornografia infantil e a fazer investidas sexuais sobre a enteada. A esposa descobre, ele é afastado de casa e acaba respondendo a um processo na Justiça. Uma investigação médica encontra um tumor no cérebro; retirado o tumor, os impulsos desaparecem por completo e ele retoma o autocontrole. Meses depois eles voltam, idênticos — e descobre-se que o tumor havia voltado a crescer. Uma nova cirurgia os elimina outra vez.`,
      real: `É um caso clínico real. A causa era um tumor numa região do cérebro ligada ao controle dos impulsos. Removido o tumor, os impulsos sumiram; quando ele voltou a crescer, voltaram idênticos; uma nova cirurgia os eliminou de novo.`,
      jogo: `Ele entendia que era errado; o que falhou foi a capacidade de se controlar. E como a causa era tratável, o caso costuma puxar para tratamento em vez de pena: tratada a lesão, cessa o risco.`,
      complica: `Se a liberdade dele voltou quando o tumor saiu, ela nunca tinha sido "dele" enquanto o tumor estava lá? Ou isso só prova que era pura biologia?`
    },
    {
      id: 3, corte: "criminal", elo_continuum: 7,
      quem: "Charles Whitman",
      caso_completo: "../casos/5.9-charles-whitman.html#sec-whitman",
      fonte: "Comissão Connally (1966); Lavergne (1997).",
      fatos: `Um homem de 25 anos, ex-militar, sem antecedentes, passa meses atormentado por dores de cabeça intensas e por "pensamentos violentos e irracionais" que ele próprio estranha. Procura um médico e um psiquiatra. Na véspera, escreve um pedido: que examinem seu cérebro depois da morte, "para ver se há alguma desordem física". No dia seguinte, de forma planejada — reunindo armas e suprimentos e escolhendo um ponto elevado e estratégico —, mata a esposa e a mãe e comete um massacre, alcançando alvos a centenas de metros, antes de ser morto. A autópsia que ele mesmo pediu revela um tumor no cérebro.`,
      real: `Whitman foi morto durante o ataque — nunca chegou a ser julgado. A autópsia que ele mesmo pediu revelou um tumor comprimindo uma região do cérebro ligada à emoção. Uma comissão de peritos concluiu que o tumor "poderia ter contribuído", sem conseguir afirmar que o causou — e ele também vinha usando doses crescentes de um estimulante.`,
      jogo: `O ponto difícil é o pedido de autópsia. Ele mostra que Whitman percebia o próprio estado: reconhecia os impulsos como estranhos, procurou ajuda e até suspeitou de uma causa física. Isso, com o ataque todo planejado, pesa a favor da responsabilidade. O tumor e o relato de não se controlar pesam contra. Pesar os dois lados é o trabalho de vocês.`,
      complica: `Ele planejou tudo e pediu para ser examinado. O pedido de autópsia é prova de lucidez — ou o grito de alguém que se sentia dominado por algo?`
    },
    {
      id: 4, corte: "civil", elo_continuum: 6,
      quem: "EVR / Elliott",
      caso_completo: "../casos/5.13-evr-marcador-somatico.html#sec-evr",
      fonte: "Eslinger & Damasio (1985); Bechara et al. (1994).",
      fatos: `Um contador bem-sucedido, casado e pai de família, retira um tumor no cérebro e se recupera sem sequelas aparentes: inteligência, memória e linguagem permanecem intactas, e nos testes seu raciocínio é normal. Na vida real, porém, tornou-se incapaz de decidir bem. Gasta horas em detalhes triviais, não consegue estabelecer prioridades e embarca em negócios ruinosos que ele mesmo reconhece como arriscados. Não há impulso anômalo, compulsão nem agressividade. Ele apenas decide mal, repetidamente, até perder emprego, patrimônio e casamento — sempre capaz de explicar lucidamente, depois, por que aquilo tinha sido uma má decisão.`,
      real: `É um caso clínico real, e civil: EVR não cometeu crime. Manteve inteligência superior e sabia — inclusive em testes — qual era a escolha certa. Só não conseguia agir de acordo com o que sabia. Hoje, quem decide sobre a vida dele não é um júri criminal, mas uma vara civil — a pedido da família, que quer protegê-lo das próprias decisões.`,
      jogo: `A lei brasileira hoje parte da autonomia plena: mesmo quem decide mal tem o direito de decidir. Tirar de alguém o comando da própria vida é medida extrema — a curatela só alcança atos de dinheiro e patrimônio, e mesmo assim em último caso; no meio existe a decisão apoiada, em que ele mantém a capacidade e escolhe pessoas de confiança para ajudá-lo. A dificuldade é que a capacidade de entender dele está intacta — e é difícil tirar de alguém o direito de errar.`,
      complica: `Decidir mal é um direito? A partir de que ponto proteger alguém de si mesmo deixa de ser cuidado e vira tirar a liberdade dessa pessoa?`
    }
  ];

  global.JURI_DATA = {
    VEREDITOS: VEREDITOS,
    PERGUNTA_VEREDITO: PERGUNTA_VEREDITO,
    CAPACIDADES: CAPACIDADES,
    PERGUNTA_CAPACIDADE: PERGUNTA_CAPACIDADE,
    NOTA_CIVIL: NOTA_CIVIL,
    NOTA_REVELACAO: NOTA_REVELACAO,
    CASOS: CASOS
  };
})(window);
