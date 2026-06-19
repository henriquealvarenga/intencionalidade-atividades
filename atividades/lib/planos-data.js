/* =============================================================================
   BANCO — Atividade 5 (extra): A arquitetura da ação
   Orientado a dados. FONTE ÚNICA de runtime: consumido pela atividade do aluno
   (05-planos.html) e pelo painel do professor (lib/painel-planos.js).

   Esta atividade RACIOCINA SOBRE A ARQUITETURA DA AÇÃO INTENCIONAL (teoria do
   planejamento de Michael Bratman): dado um fenômeno da vontade/impulso, em QUE
   PONTO da arquitetura do planejamento a coisa quebrou. NÃO é nomear o fenômeno
   (isso é a Atv3) nem a propriedade semiológica (Atv4) — é localizar a falha.

   RÉGUA: os 6 pontos de falha (chave → label). Fonte ÚNICA dos rótulos das
   opções e do painel. Cada item só lista QUAIS 4 chaves entram + o comentário de
   cada uma; o label vem sempre da RÉGUA (não se repete no item). A ORDEM das 4
   opções é EMBARALHADA no render (a posição nunca prevê a correta).

   GABARITO COMENTADO: cada opção do item traz `comentario` — o porquê de ela
   estar certa OU errada. Aparece só na revelação; NÃO vai ao painel.

   FUNDAMENTO: cada item tem `fundamento` (string verbatim do TEXT-planos §5,
   já no formato "livro, cap. … ; Bratman …") e `links` (capítulos do livro,
   abertos em nova aba, só na revelação — 1.4 sempre; também 1.1 no Caso 6).

   FONTE CANÔNICA DO CONTEÚDO: atividades/_specs/TEXT-planos.md. Este arquivo o
   espelha verbatim (editar o texto = tocar nos dois). Expõe window.PLANOS_DATA.
   ============================================================================= */
(function (global) {
  "use strict";

  /* Caminhos dos capítulos (a partir de docs/atividades/). */
  var CAP_14 = "../capitulos/1.4-intencionalidade-pratica.html";
  var CAP_11 = "../capitulos/1.1-liberdade-coordenacao.html";

  /* ---- A RÉGUA: os 6 pontos de falha. Referência única (opções + painel). ---- */
  var REGUA = [
    { chave: "naoforma",      label: "A intenção não chega a se formar" },
    { chave: "naoarticula",   label: "A intenção geral não vira subplanos executáveis" },
    { chave: "instabilidade", label: "A intenção se forma, mas é abandonada cedo demais" },
    { chave: "rigidez",       label: "O plano não é revisto quando deveria" },
    { chave: "execucao",      label: "A intenção é firme, mas não controla a conduta na hora" },
    { chave: "agente",        label: "Não há sujeito consciente sustentando intenção e plano" }
  ];

  /* Nota fixa no topo de toda revelação (TEXT-planos §5). */
  var NOTA_REVELACAO = "A régua é a do livro e de Bratman; em casos reais, a fronteira entre dois pontos pode ser mais tênue do que num relato de prova.";

  /* Um item por caso. `correta` = chave da RÉGUA. `opcoes` = 4 chaves da RÉGUA
     (a correta + 3 distratores), cada uma com seu comentário. `titulo` é só o
     cabeçalho do cartão do painel (não vai à tela do aluno). */
  var ITENS = [

    /* ---------------- Caso 1 · a intenção nunca nasce ---------------------- */
    {
      id: 1, correta: "naoforma",
      titulo: "A intenção que não se forma",
      vinheta: "Um jovem passa os dias entre uma coisa e outra, sem nada que o organize. Não está triste nem bloqueado; quando perguntam o que pretende fazer da semana, do mês, do ano, não há resposta — não porque esconda, mas porque nenhum projeto chega a se formar. Vive inteiramente no imediato.",
      enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
      fundamento: "livro, cap. 1.4 — A Teoria do Planejamento; Bratman, <i>Intention, Plans, and Practical Reason</i> (1987).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "naoforma",      comentario: "<b>Correta.</b> Para Bratman, a intenção é mais que desejo: é o <b>compromisso futuro</b> que organiza a conduta ao longo do tempo. Aqui esse compromisso <b>não chega a se constituir</b> — não há intenção para estabilizar, articular ou executar." },
        { chave: "execucao",      comentario: "Seria o colapso na execução, em que a intenção existe e falha só na hora; aqui não há intenção para falhar." },
        { chave: "instabilidade", comentario: "Seria instabilidade — a intenção se formaria e seria largada; aqui ela nem se forma." },
        { chave: "naoarticula",   comentario: "Haveria uma intenção geral à espera de passos; aqui não há nem a intenção geral." }
      ]
    },

    /* ---------------- Caso 2 · intenção geral firme, sem passos ------------ */
    {
      id: 2, correta: "naoarticula",
      titulo: "A intenção sem subplanos",
      vinheta: "Uma pessoa diz, com convicção e há meses, que vai \"cuidar da saúde\". Está comprometida — não é desejo vago, ela se vê fazendo. Mas a intenção nunca desce ao concreto: não marca consulta, não escolhe horário, não define um primeiro passo. A intenção geral está intacta; o que não aparece são os passos.",
      enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
      fundamento: "livro, cap. 1.4 — A hierarquia dos planos; Bratman (1987).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "naoarticula",   comentario: "<b>Correta.</b> A intenção geral existe e é estável — o que falta é a <b>articulação em subplanos</b>. Para Bratman, planos são <b>hierárquicos e parciais</b>: a intenção geral (\"cuidar da saúde\") tem de gerar subintenções executáveis (\"marcar a consulta na terça\"). Sem essa descida ao concreto, a intenção não move." },
        { chave: "naoforma",      comentario: "Aqui a intenção geral <b>existe</b> (há compromisso, não mero desejo)." },
        { chave: "execucao",      comentario: "Não houve um momento de execução atropelado; o plano nem chegou a ter passos a executar." },
        { chave: "rigidez",       comentario: "Não há plano antigo mantido contra o contexto; o problema é o plano não se detalhar." }
      ]
    },

    /* ---------------- Caso 3 · forma e larga ao primeiro obstáculo --------- */
    {
      id: 3, correta: "instabilidade",
      titulo: "A intenção abandonada cedo",
      vinheta: "Um estudante começa a semana cheio de intenções: estudar para a prova, treinar, ler um livro. Cada uma dura pouco — ao primeiro tédio, mensagem ou ideia nova, ele troca de rumo. Não falta vontade de começar; falta o que mantém o curso. As intenções se formam e se desmancham quase no mesmo dia.",
      enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
      fundamento: "livro, cap. 1.4 — A estabilidade como variável; Bratman (1987).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "instabilidade", comentario: "<b>Correta.</b> As intenções <b>se formam</b> — o problema é que <b>não se sustentam</b>. A intenção, em Bratman, tem uma \"inércia racional\": resiste a ser reconsiderada por qualquer razão fraca. Aqui o <b>limiar de reconsideração é baixo demais</b> — larga-se o plano por tentações que não deveriam bastar." },
        { chave: "naoforma",      comentario: "As intenções de fato se formam (ele começa cada uma)." },
        { chave: "rigidez",       comentario: "É o <b>oposto</b> — aqui ele revê/larga fácil demais." },
        { chave: "execucao",      comentario: "Não é o impulso vencendo na hora; é a intenção sendo descartada antes." }
      ]
    },

    /* ---------------- Caso 4 · mantém o plano com o contexto mudado -------- */
    {
      id: 4, correta: "rigidez",
      titulo: "O plano não revisto",
      vinheta: "Um homem planejou a viagem nos mínimos detalhes. No caminho, descobre que a estrada principal está interditada e que o evento que motivava a viagem foi cancelado. Ainda assim, segue o roteiro original à risca, como se nada tivesse mudado — recusa-se a reabrir o plano mesmo depois que a própria razão dele desapareceu.",
      enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
      fundamento: "livro, cap. 1.4 — O problema da reconsideração; Bratman (1987).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "rigidez",       comentario: "<b>Correta.</b> A estabilidade da intenção é virtude — até virar <b>rigidez</b>. Bratman insiste: manter um plano de forma rígida demais é tão disfuncional quanto largá-lo fácil demais; o agente racional <b>reconsidera</b> diante de mudança relevante. Aqui o <b>limiar é alto demais</b> — o plano persiste depois que sua premissa caiu." },
        { chave: "instabilidade", comentario: "É o <b>oposto</b> (instabilidade)." },
        { chave: "naoarticula",   comentario: "O plano está plenamente detalhado; o defeito é não revisá-lo." },
        { chave: "agente",        comentario: "Há um sujeito consciente sustentando o plano — sustentando-o até demais." }
      ]
    },

    /* ---------------- Caso 5 · intenção firme, impulso vence na hora ------- */
    {
      id: 5, correta: "execucao",
      titulo: "O impulso na execução",
      vinheta: "Uma pessoa decidiu, com toda a clareza, parar de apostar. Não é ambivalente nem acha que apostar seja bom — a intenção de não apostar é firme e ela a mantém por dias. Mas, ao passar pela casa de apostas, o impulso cresce e ela entra, contra a intenção que continua reconhecendo como sua. Depois, lamenta sinceramente.",
      enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
      fundamento: "livro, cap. 1.4 — A condução da conduta; a distinção fraqueza da vontade × impulsividade; Bratman (1987) e Bratman (1979).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "execucao",      comentario: "<b>Correta.</b> A intenção está <b>formada, estável e reconhecida como sua</b> (ela a mantém por dias). O que falha é a <b>condução da conduta</b>: a intenção deveria produzir a ação — aqui, a abstenção — sem nova deliberação, e não produz. Repare na diferença para a <i>fraqueza da vontade</i> (o caso Sam, que delibera e conclui \"vou beber\" por um raciocínio que ele mesmo sabe defeituoso): aqui não há nova conclusão — a intenção de não apostar permanece, mas o impulso a atropela na hora." },
        { chave: "naoforma",      comentario: "A intenção <b>existe</b>, é firme e ela continua reconhecendo-a como sua — não foi largada no juízo, foi vencida na execução." },
        { chave: "instabilidade", comentario: "A intenção <b>existe</b>, é firme e ela continua reconhecendo-a como sua — não foi largada no juízo, foi vencida na execução." },
        { chave: "naoarticula",   comentario: "Não é falta de plano concreto; é o plano firme não comandando a conduta." }
      ]
    },

    /* ---------------- Caso 6 · ação complexa sem sujeito consciente -------- */
    {
      id: 6, correta: "agente",
      titulo: "A ação sem agente",
      vinheta: "Durante um estado confusional noturno, uma pessoa levanta, percorre a casa, manuseia objetos e realiza uma sequência relativamente complexa de atos. Pela manhã, não guarda nenhuma lembrança e se assusta ao ser informada. Houve movimento dirigido, mas não havia um sujeito consciente conduzindo aquilo.",
      enunciado: "Na arquitetura do planejamento, o ponto que falha aqui é:",
      fundamento: "livro, cap. 1.1 e caso 5.11 (Parks); Bratman (1987).",
      links: [ { href: CAP_14, cap: "1.4" }, { href: CAP_11, cap: "1.1" } ],
      opcoes: [
        { chave: "agente",        comentario: "<b>Correta.</b> Aqui a falha não é numa <b>etapa</b> do planejamento — é a ausência do <b>planejador</b>. A ação intencional, em Bratman, pressupõe três componentes integrados: <b>intenção, plano e o agente</b> que os sustenta no tempo. Houve coordenação motora, mas o terceiro componente não estava presente — é o que o livro discute no caso Parks." },
        { chave: "execucao",      comentario: "No colapso da execução há um sujeito consciente; aqui não há sujeito consciente algum." },
        { chave: "naoforma",      comentario: "Não é que a intenção não nasça ou não se detalhe — é não haver, no episódio, quem sustente intenção ou plano." },
        { chave: "naoarticula",   comentario: "Não é que a intenção não nasça ou não se detalhe — é não haver, no episódio, quem sustente intenção ou plano." }
      ]
    },

    /* ---------------- Caso 7 · CONTRASTE: formou, articulou, desabou ------- */
    {
      id: 7, correta: "execucao",
      titulo: "Contraste — a falha na execução",
      vinheta: "Hoje, uma estudante decidiu estudar a tarde toda. Montou o cronograma por tópicos, separou o material, silenciou o celular e sentou à mesa no horário. Tudo pronto e organizado. Mas, a cada poucos minutos, larga o conteúdo e vai para outra coisa; ao fim da tarde, o plano detalhado continua ali, quase intocado.",
      enunciado: "Tudo no plano estava pronto. Então, o ponto que falha é:",
      fundamento: "livro, cap. 1.4 — localizar a falha na arquitetura; Bratman (1987).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "execucao",      comentario: "<b>Correta.</b> Cuidado com o atalho \"ela não queria de verdade\". Ela <b>formou</b> a intenção (decidiu, sentou no horário) e a <b>articulou</b> (cronograma por tópicos, material separado) — esses pontos estão íntegros. O que desaba é a <b>execução</b>: o plano pronto não comanda a conduta no momento. Localizar exatamente onde quebrou é o exercício." },
        { chave: "naoforma",      comentario: "Tentador, mas ela formou e detalhou a intenção." },
        { chave: "naoarticula",   comentario: "O plano <b>está</b> articulado (cronograma, material, horário)." },
        { chave: "instabilidade", comentario: "Ela não trocou de plano nem reconsiderou — o plano segue ali, intocado." }
      ]
    },

    /* ---------------- Caso 8 · CONTRASTE: instabilidade × rigidez ---------- */
    {
      id: 8, correta: "instabilidade",
      titulo: "Contraste — instabilidade × rigidez",
      vinheta: "Dois colegas tocam projetos. O primeiro muda de ideia a cada reunião: o que combinaram ontem já não vale hoje, ao sabor de cada opinião nova. O segundo faz o oposto — segue o plano inicial mesmo quando os dados mudaram e todos veem que não cabe mais. A pergunta é sobre o <b>primeiro</b>.",
      enunciado: "No caso do primeiro colega, o ponto que falha é:",
      fundamento: "livro, cap. 1.4 — O problema da reconsideração; Bratman (1987).",
      links: [ { href: CAP_14, cap: "1.4" } ],
      opcoes: [
        { chave: "instabilidade", comentario: "<b>Correta.</b> O primeiro colega tem o <b>limiar de reconsideração baixo demais</b>: abandona o combinado por razões que não deveriam bastar — é a <b>instabilidade</b>. O segundo ilustra de propósito o erro <b>oposto</b> (rigidez), para marcar a fronteira: ambos são falhas de <i>reconsideração</i>, em direções contrárias." },
        { chave: "rigidez",       comentario: "É o <b>segundo</b> colega; a pergunta era sobre o primeiro." },
        { chave: "execucao",      comentario: "Não é o impulso vencendo na hora; é a intenção trocada o tempo todo na deliberação." },
        { chave: "naoforma",      comentario: "Ele <b>forma</b> intenções (combina coisas) — só não as sustenta." }
      ]
    }

  ];

  global.PLANOS_DATA = { REGUA: REGUA, ITENS: ITENS, NOTA_REVELACAO: NOTA_REVELACAO };
})(window);
