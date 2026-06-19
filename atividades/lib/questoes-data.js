/* =============================================================================
   BANCO DE QUESTÕES — Atividade 4 (Simulado — Questões Comentadas)
   Orientado a dados. FONTE ÚNICA: consumido pela atividade do aluno
   (03-questoes.html) e pelo painel do professor (lib/painel-questoes.js).

   Esta atividade RACIOCINA SOBRE A PROPRIEDADE/MECANISMO do fenômeno (autoria,
   egodistonia × egossintonia, consciência, finalidade/alívio, juízo crítico, o
   arco do ato voluntário) — NÃO sobre o nome (isso é a Atv3). Recorte firme:
   SEMIOLOGIA, não nosologia. Nunca diagnóstico/conduta/CID, nunca lesão.

   GABARITO COMENTADO: cada alternativa traz `comentario` — o porquê de ela estar
   certa OU errada. O comentário é o que ensina; aparece só na revelação.

   ÂNCORA NO SIMS: cada questão tem `ancora` { cap, titulo } — Sims, Sintomas da
   Mente, 5ª ed. (tradução). Citamos CAPÍTULO + SEÇÃO (não a página): a cópia
   digital é reflowed e não traz a paginação impressa. Ver Glossário,
   "Um fenômeno, muitos nomes", para as divergências de nomenclatura Sims × roteiro.

   FORMATOS:
   - "melhor": melhor resposta, 4 opções (A–D). `opcoes` traz a correta primeiro
     por legibilidade; a ORDEM é EMBARALHADA no render (a posição nunca prevê a
     correta). `correta` = chave em `opcoes`.
   - "assercao_razao": 2 asserções (I e II) + as 5 opções fixas de AR_OPCOES
     (NÃO embaralhadas — a ordem A–E é convencional). `correta` = letra; os
     comentários por letra ficam em `comentarios`. Usado só nos 2 itens BÔNUS.

   PONTUAÇÃO (Modelo 1): as 8 questões-base contam para a medalha (x/8, mesmo
   esquema do continuum/Atv3). Os 2 bônus (`bonus:true`) somam "pontos de bônus"
   ao placar do painel e habilitam o louvor (8/8 + 2 bônus), mas não entram no
   denominador — quem pula os bônus não é penalizado.

   `vinheta`, `enunciado`, `assercao_*` e `comentario` são HTML (preservam
   negrito/itálico; conteúdo estático confiável → innerHTML). Expõe
   window.QUESTOES_DATA.
   ============================================================================= */
(function (global) {
  "use strict";

  var GLOSSARIO = "../apendices/10.3-glossario.html#sec-nomes-do-fenomeno";

  /* Opções fixas do formato asserção-razão (não embaralham). */
  var AR_OPCOES = [
    { chave: "A", label: "As asserções I e II são verdadeiras, e a II é uma justificativa correta da I." },
    { chave: "B", label: "As asserções I e II são verdadeiras, mas a II não é uma justificativa correta da I." },
    { chave: "C", label: "A asserção I é verdadeira e a II é falsa." },
    { chave: "D", label: "A asserção I é falsa e a II é verdadeira." },
    { chave: "E", label: "As asserções I e II são falsas." }
  ];

  /* Nota fixa no topo de toda revelação. */
  var NOTA_REVELACAO = "Os termos seguem o roteiro de exame; o Sims, de tradição inglesa, às vezes usa outro nome para o mesmo fenômeno (ver Glossário). As fronteiras, nos casos reais, podem ser mais tênues do que num enunciado de prova.";

  var QUESTOES = [

    /* ---------------- 1 · Impulso/controle — egodistonia + alívio ---------- */
    {
      id: 1, formato: "melhor", grupo: "Impulso e controle",
      correta: "compulsivo",
      ancora: { cap: "17", titulo: "Obsessões e Compulsões" },
      vinheta: `Antes de dormir, uma paciente confere a tranca da porta repetidas vezes. Acha o ritual sem sentido e tenta resistir, mas a tensão cresce até que ela cede; ao conferir, sente um alívio passageiro.`,
      enunciado: `O que caracteriza esse ato é:`,
      opcoes: [
        { chave: "compulsivo", label: "é egodistônico e alivia uma tensão crescente",
          comentario: `<b>Correta.</b> O ato é vivido como absurdo (egodistônico), há resistência e a execução <b>alivia a tensão</b> — é a tríade do <b>ato compulsivo</b> (Lewis, 1936: compulsão subjetiva, resistência e insight preservado).` },
        { chave: "impulsivo", label: "é egossintônico e descarregado sem reflexão prévia",
          comentario: `Descreve o <b>ato impulsivo</b>: "executado com energia, sem deliberação ou reflexão", egossintônico e sem crítica — o oposto do que a vinheta mostra (há crítica e resistência).` },
        { chave: "estereotipia", label: "não tem finalidade nem produz alívio",
          comentario: `Descreve a <b>estereotipia</b> (repetição uniforme, sem finalidade e sem alívio). Aqui há finalidade subjetiva e alívio ao completar o ritual.` },
        { chave: "automatismo", label: "ocorre sem que haja consciência durante a execução",
          comentario: `Descreve o <b>automatismo</b> (ausência de consciência no ato). A paciente está plenamente consciente e crítica enquanto verifica.` }
      ]
    },

    /* ---------------- 2 · Eu/agência — autoria ---------------------------- */
    {
      id: 2, formato: "melhor", grupo: "Eu e agência",
      correta: "passividade",
      ancora: { cap: "12", titulo: "Perturbações do Eu" },
      glossario: GLOSSARIO,
      vinheta: `Um paciente afirma que sua mão se ergue e gesticula "comandada por uma força de fora"; descreve-se como instrumento de uma vontade alheia. Não diz "fiz e me arrependi", mas "não fui eu quem fez".`,
      enunciado: `O que define esse fenômeno é:`,
      opcoes: [
        { chave: "passividade", label: "a perda do reconhecimento do ato como próprio",
          comentario: `<b>Correta.</b> A autoria é atribuída a uma força externa: a fronteira do Eu se rompe e funções próprias são vividas como do "não-eu". É a <b>vivência de influência</b> (no Sims, <i>experiência de passividade</i>; sintoma de 1ª ordem de Schneider).` },
        { chave: "egodistonico", label: "o reconhecimento do ato como seu, sem conseguir controlá-lo",
          comentario: `Descreve o <b>impulso egodistônico</b>: "é meu, mas não controlo". Aqui o paciente vai além — diz que <b>não foi ele</b> quem agiu. A autoria é o divisor.` },
        { chave: "automatismo", label: "a ausência total de consciência durante o ato",
          comentario: `Descreve o <b>automatismo</b>. Na vinheta há consciência: o paciente percebe o ato e o atribui a outro — não é inconsciência.` },
        { chave: "despersonalizacao", label: "a estranheza em relação ao próprio corpo, sem atribuição externa",
          comentario: `Descreve a <b>despersonalização</b> (estranheza de si). Falta-lhe o que define a vinheta: a atribuição do ato a uma <b>força externa</b>.` }
      ]
    },

    /* ---------------- 3 · Ação/consciência — automatismo ------------------ */
    {
      id: 3, formato: "melhor", grupo: "Ação e consciência",
      correta: "automatismo",
      ancora: { cap: "3", titulo: "Consciência e Distúrbios da Consciência" },
      vinheta: `Durante a madrugada, uma pessoa se levanta, anda pela casa, manipula objetos e realiza uma sequência relativamente complexa de atos. Pela manhã, não tem nenhuma lembrança do episódio e se surpreende ao ser informada.`,
      enunciado: `A característica semiológica central desse quadro é:`,
      opcoes: [
        { chave: "automatismo", label: "a ausência de um sujeito consciente durante a ação",
          comentario: `<b>Correta.</b> Não há consciência presente agindo (sonambulismo, estados crepusculares): é o <b>automatismo</b>. A complexidade do ato não exige consciência.` },
        { chave: "influencia", label: "a consciência preservada, com o ato vivido como imposto por outro",
          comentario: `Descreve a <b>vivência de influência</b>: lá <b>há</b> consciência, mas o ato é sentido como imposto. Aqui não houve consciência alguma.` },
        { chave: "estupor", label: "a imobilidade e o mutismo por inibição motora",
          comentario: `Descreve o <b>estupor</b> — o oposto da vinheta, em que a pessoa se move e age.` },
        { chave: "negativismo", label: "a oposição ativa às solicitações do ambiente",
          comentario: `Descreve o <b>negativismo</b> (recusa/oposição a estímulos externos), ausente aqui.` }
      ]
    },

    /* ---------------- 4 · Psicomotricidade — finalidade/alívio ------------ */
    {
      id: 4, formato: "melhor", grupo: "Psicomotricidade",
      correta: "compulsao",
      ancora: { cap: "18", titulo: "Distúrbios do Movimento e Comportamento" },
      vinheta: `Quatro pacientes repetem comportamentos motores: um tem abalos súbitos do ombro; outro balança o tronco de modo uniforme por horas; um terceiro faz uma saudação exagerada e bizarra ao cumprimentar; o último verifica o fogão sete vezes e relata alívio ao terminar.`,
      enunciado: `Qual propriedade é <b>exclusiva do último caso</b> e o distingue dos demais?`,
      opcoes: [
        { chave: "compulsao", label: "o ato alivia uma tensão crescente e é criticado pelo paciente",
          comentario: `<b>Correta.</b> Alívio de tensão + crítica caracterizam o <b>ato compulsivo</b>. Nenhum dos outros três tem essa propriedade.` },
        { chave: "tique", label: "o movimento é súbito e involuntário",
          comentario: `É o <b>tique</b> (1º caso): movimento rápido, súbito e involuntário, sem alívio nem finalidade.` },
        { chave: "estereotipia", label: "a repetição é uniforme e sem finalidade",
          comentario: `É a <b>estereotipia</b> (2º caso): repetição uniforme, sem finalidade nem alívio.` },
        { chave: "maneirismo", label: "há deformação bizarra de um gesto que tem sentido",
          comentario: `É o <b>maneirismo</b> (3º caso): caricatura bizarra de um gesto que conserva sentido.` }
      ]
    },

    /* ---------------- 5 · Volição — qual função ---------------------------- */
    {
      id: 5, formato: "melhor", grupo: "Volição",
      correta: "vontade",
      ancora: { cap: "18", titulo: "Anormalidades da Necessidade, Instinto, Motivação e Vontade" },
      glossario: GLOSSARIO,
      vinheta: `Há semanas um paciente quase não sai da cama. Nega tristeza e diz que algumas coisas até lhe dariam prazer; o problema é que a ação não parte — ele não consegue iniciar nada. Conduzido passo a passo, executa sem dificuldade.`,
      enunciado: `A função primariamente comprometida nesse quadro é:`,
      opcoes: [
        { chave: "vontade", label: "a iniciativa / vontade de agir",
          comentario: `<b>Correta.</b> O que falha é a <b>iniciativa</b>: a ação não parte, sem bloqueio motor (estimulado, ele age). O roteiro chama <b>abulia</b>; o Sims, "perda da vontade / perturbação da iniciativa" (Bleuler) — mesmo fenômeno (ver Glossário).` },
        { chave: "anedonia", label: "a capacidade de sentir prazer",
          comentario: `Seria a <b>anedonia</b> — descartada pelo próprio relato: "algumas coisas até lhe dariam prazer".` },
        { chave: "apatia", label: "a ressonância afetiva / reatividade emocional",
          comentario: `Seria a <b>apatia</b> (frieza, indiferença afetiva). A queixa não é de afeto, é de <b>iniciativa</b>.` },
        { chave: "estupor", label: "a motricidade, por um bloqueio que impede a ação",
          comentario: `Seria o <b>estupor</b> — descartado: não há bloqueio motor, pois conduzido passo a passo ele executa.` }
      ]
    },

    /* ---------------- 6 · Volição — vontade oscilante --------------------- */
    {
      id: 6, formato: "melhor", grupo: "Volição",
      correta: "ambivalencia",
      ancora: { cap: "18", titulo: "Anormalidades da Necessidade, Instinto, Motivação e Vontade" },
      vinheta: `Diante de qualquer decisão trivial, o paciente sente, com a mesma força, o desejo de fazer e o de não fazer. Estende a mão para o copo e a recolhe no mesmo gesto; a ação trava num "cabo de guerra" interno que não cessa.`,
      enunciado: `O mecanismo que <b>trava a ação</b> aqui é:`,
      opcoes: [
        { chave: "ambivalencia", label: "a coexistência de duas vontades opostas e simultâneas",
          comentario: `<b>Correta.</b> Há vontade — na verdade <b>duas</b>, opostas e simultâneas, que se anulam: é a <b>vontade oscilante</b> (ambivalência / ambitendência), "objetivos contrastantes com oscilação na tomada de decisão". Bleuler a descreveu como traço fundamental da esquizofrenia, embora não seja exclusiva dela.` },
        { chave: "abulia", label: "a abolição de toda iniciativa para agir",
          comentario: `Seria a <b>abulia</b>: ali não há vontade nenhuma. Aqui há duas — o problema é o conflito, não a ausência.` },
        { chave: "negativismo", label: "a oposição a uma ordem vinda de fora",
          comentario: `Seria o <b>negativismo</b>: a oposição se dirige a uma <b>ordem externa</b>, não a uma segunda vontade própria.` },
        { chave: "passividade", label: "a vivência do ato como comandado por uma força externa",
          comentario: `Seria a <b>vivência de influência</b> (autoria externa), ausente aqui: as duas vontades são reconhecidas como dele.` }
      ]
    },

    /* ---------------- 7 · Eu/crítica — obsessão e insight ----------------- */
    {
      id: 7, formato: "melhor", grupo: "Eu e juízo crítico",
      correta: "obsessao",
      ancora: { cap: "17", titulo: "Obsessões e Compulsões" },
      glossario: GLOSSARIO,
      vinheta: `Um paciente é tomado por pensamentos repetidos e indesejados de que pode ter contaminado a comida da família. Considera a ideia exagerada e improvável, sofre com ela e tenta afastá-la. Não há nenhum ato ritual.`,
      enunciado: `Duas propriedades caracterizam esse fenômeno e o distinguem, respectivamente, de uma compulsão e de uma ideia delirante. São elas:`,
      opcoes: [
        { chave: "obsessao", label: "ser uma ideia, e não um ato; e ter o juízo crítico preservado",
          comentario: `<b>Correta.</b> As duas propriedades da <b>obsessão</b>: é uma <b>ideia</b> (não um ato — por isso não é compulsão) e o <b>juízo crítico/insight está preservado</b> (por isso não é delírio). "A palavra obsessão é reservada para o pensamento; compulsão, para o ato."` },
        { chave: "ato_sem_critica", label: "ser um ato repetido que alivia a tensão; e ter o juízo crítico ausente",
          comentario: `Erra os dois pontos: descreve um <b>ato</b> que alivia tensão (compulsão) e <b>sem crítica</b> (delírio) — o oposto da obsessão nos dois.` },
        { chave: "ideia_sem_critica", label: "ser uma ideia, e não um ato; mas com a convicção sustentada sem crítica",
          comentario: `Acerta a 1ª (é <b>ideia</b>, não ato — separa da compulsão), mas erra a 2ª: "sem crítica" descreve a <b>ideia delirante</b>. Na obsessão o juízo crítico é <b>preservado</b> — ele acha a ideia improvável e sofre com ela.` },
        { chave: "ato_com_critica", label: "ser um ato ritual que alivia a tensão; mas com o juízo crítico preservado",
          comentario: `Acerta a 2ª (<b>crítica preservada</b>), mas erra a 1ª: a vinheta diz que "não há nenhum ato ritual" — é só o pensamento. O ato que alivia tensão é a <b>compulsão</b>.` }
      ]
    },

    /* ---------------- 8 · Eu — despersonalização × desrealização ---------- */
    {
      id: 8, formato: "melhor", grupo: "Eu e agência",
      correta: "despersonalizacao",
      ancora: { cap: "13", titulo: "Despersonalização" },
      vinheta: `Um paciente diz sentir o próprio corpo e os próprios pensamentos como se não fossem totalmente seus, como se observasse a si de fora. Acrescenta que o mundo ao redor continua lhe parecendo perfeitamente real.`,
      enunciado: `A alteração descrita recai sobre:`,
      opcoes: [
        { chave: "despersonalizacao", label: "a vivência de si mesmo",
          comentario: `<b>Correta.</b> <b>Despersonalização</b>: estranheza dirigida ao <b>self</b> — o próprio corpo e os pensamentos sentidos como alheios, mantida a crítica ("como se").` },
        { chave: "desrealizacao", label: "a vivência de realidade do mundo externo",
          comentario: `Seria a <b>desrealização</b> (irrealidade do <b>mundo</b>) — excluída pelo relato: o mundo lhe parece real.` },
        { chave: "influencia", label: "a atribuição dos próprios atos a uma força externa",
          comentario: `Seria a <b>vivência de influência</b> (autoria externa), ausente: ele estranha a si, não atribui a outro.` },
        { chave: "existencia", label: "a consciência de existir, com negação da própria existência",
          comentario: `Seria a <b>alteração da consciência de existência</b> ("sou um nada"), que vai além: nega existir, não apenas estranha.` }
      ]
    },

    /* ================== BÔNUS 1 · asserção-razão · o arco do ato ========== */
    {
      id: 9, formato: "assercao_razao", bonus: true, grupo: "Volição — arco do ato voluntário",
      correta: "A",
      ancora: { cap: "18", titulo: "Anseio, impulso e vontade e seus distúrbios" },
      glossario: GLOSSARIO,
      asfundo: `Jaspers e Scharfetter descrevem o ato voluntário como uma sequência: <b>necessidade/anseio → impulso → vontade (decisão) → execução</b>.`,
      assercao_I: `<b>I.</b> Na <b>perturbação da iniciativa</b> (a <i>abulia</i> do roteiro), a ação não se realiza porque falha o impulso que daria <b>início</b> ao ato voluntário.`,
      assercao_II: `<b>II.</b> O ato voluntário pode ser descrito como uma sequência (anseio → impulso → vontade → execução), e ela incide sobre o <b>começo</b> dessa sequência.`,
      comentarios: {
        A: `<b>Correta.</b> As duas são verdadeiras e a II <b>justifica</b> a I: localizar a falha no início da sequência (o impulso que deflagra) explica por que a ação não parte, embora a execução esteja intacta (estimulado, o paciente age). Contraste com a Q6: a <b>ambivalência</b> trava mais adiante, na <b>decisão</b>.`,
        B: `As duas são verdadeiras, mas a relação não é solta: a II é exatamente a razão da I — o modelo sequencial explica <i>onde</i> esse distúrbio atua.`,
        C: `A II não é falsa: a descrição do ato voluntário como sequência é a base (Jaspers/Scharfetter) que sustenta a I.`,
        D: `A I não é falsa: a iniciativa de fato não deflagra a ação, sem bloqueio motor.`,
        E: `Ambas são verdadeiras — e articuladas entre si.`
      }
    },

    /* ================== BÔNUS 2 · asserção-razão · autoria e responsabilidade */
    {
      id: 10, formato: "assercao_razao", bonus: true, grupo: "Eu/agência — ponte com o Júri",
      correta: "C",
      ancora: { cap: "12", titulo: "Perturbações do Eu" },
      glossario: GLOSSARIO,
      asfundo: `Retomando o eixo do Júri (Atv2): a responsabilidade supõe um <b>agente</b> que reconhece e governa os próprios atos.`,
      assercao_I: `<b>I.</b> As experiências de passividade comprometem a vivência de <b>autoria</b> do ato.`,
      assercao_II: `<b>II.</b> Nas experiências de passividade, o sujeito <b>reconhece o ato como seu</b>, mas não consegue controlá-lo.`,
      comentarios: {
        A: `A II não justifica a I porque a II é <b>falsa</b> (ver C).`,
        B: `A II não é verdadeira: ela descreve outro fenômeno.`,
        C: `<b>Correta.</b> A I é verdadeira — a passividade rompe a autoria e, com ela, a base da responsabilidade ("teorias da vontade têm implicações para a responsabilidade moral e para o que é ser agente"). A II é <b>falsa</b>: descreve o <b>impulso egodistônico</b> ("é meu, mas não controlo"), não a passividade ("<b>não é meu</b>"). Trocar uma pela outra é justamente a fronteira da Q2.`,
        D: `A I não é falsa: a quebra de autoria de fato toca a responsabilidade — foi o eixo do Júri.`,
        E: `A I é verdadeira; apenas a II é falsa.`
      }
    }

  ];

  global.QUESTOES_DATA = {
    QUESTOES: QUESTOES,
    AR_OPCOES: AR_OPCOES,
    NOTA_REVELACAO: NOTA_REVELACAO
  };
})(window);
