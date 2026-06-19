/* =============================================================================
   BANCO DE ITENS — Atividade 3 (Reconhecer e nomear fenômenos)
   Orientado a dados. FONTE ÚNICA: consumido pela atividade do aluno
   (02-fenomenos.html) e pelo painel do professor (lib/painel-fenomenos.js).

   Guarda METADADOS e REVELAÇÃO — nunca o que o grupo digita. Texto de tela é
   verbatim do _specs/TEXT-fenomenos.md; metadados (distratores, âncoras) da
   _specs/SPEC-fenomenos.md §4. Todo item tem a MESMA forma: 4 opções, 1 correta.

   `vinheta` e `fronteira` são HTML (preservam o negrito/itálico do texto-fonte;
   conteúdo estático confiável → renderizados via innerHTML na atividade). As
   `opcoes` listam o termo certo primeiro por legibilidade; a ORDEM é EMBARALHADA
   no render (a posição nunca prevê a correta). Expõe window.FENOMENOS_DATA.
   ============================================================================= */
(function (global) {
  "use strict";

  var ROTEIRO = "https://henriquealvarenga.com/entrevista/02-roteiro_eem.html";

  /* Nota fixa no topo de toda revelação — verbatim §5. */
  var NOTA_REVELACAO = "Os termos seguem o roteiro de exame; nos casos reais, as fronteiras podem ser mais tênues do que num relato de prova.";

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
      vinheta: `Há semanas, um paciente passa quase o dia todo deitado. Não relata tristeza, e diz que algumas coisas até lhe dariam prazer se as fizesse — o problema é outro: não consegue <b>dar início</b> a nada, nem escovar os dentes, nem abrir a cortina. A vontade de agir simplesmente não parte. Quando alguém o conduz passo a passo, ele executa sem dificuldade.`,
      fronteira: `<b>A fronteira.</b> O que está abolido aqui é a <b>vontade/iniciativa</b>: a ação não parte do sujeito — isso é <b>abulia</b>. Não é <b>anedonia</b> (ele até teria prazer), nem <b>apatia</b> (não há frieza emocional, ele não está "sem se comover"). E não é só <b>hipobulia</b>: a iniciativa não está <i>diminuída</i>, está <i>ausente</i> — estimulado de fora, ele age.`
    },
    {
      id: 2, grupo_eem: "Volição (§12)", correta: "ambivalencia",
      roteiro: ROTEIRO + "#volição",
      opcoes: [
        { chave: "ambivalencia", label: "Ambivalência volitiva" },
        { chave: "abulia",       label: "Abulia" },
        { chave: "negativismo",  label: "Negativismo" },
        { chave: "hipobulia",    label: "Hipobulia" }
      ],
      vinheta: `Diante de qualquer decisão, mesmo a mais trivial, o paciente sente ao mesmo tempo o desejo de fazer e o desejo de não fazer, com a mesma força. Quer levantar e quer ficar; estende a mão para o copo e a recolhe no mesmo gesto. As duas vontades opostas convivem e a ação trava — ele descreve um "cabo de guerra" interno que não cessa.`,
      fronteira: `<b>A fronteira.</b> Há vontade — na verdade, <b>duas</b>, opostas e simultâneas, que se anulam (quer e contraquer ao mesmo tempo): isso é <b>ambivalência volitiva</b>. Na <b>abulia</b> não haveria vontade nenhuma. E não é <b>negativismo</b>: ali a oposição é a uma <i>ordem externa</i>, não um conflito entre duas vontades próprias.`
    },
    {
      id: 3, grupo_eem: "Controle de impulsos (§14)", correta: "compulsivo",
      roteiro: ROTEIRO + "#controle-de-impulsos",
      opcoes: [
        { chave: "compulsivo",  label: "Ato compulsivo" },
        { chave: "impulsivo",   label: "Ato impulsivo" },
        { chave: "obsessao",    label: "Obsessão" },
        { chave: "estereotipia", label: "Estereotipia" }
      ],
      vinheta: `Antes de sair de casa, um paciente precisa verificar o fogão exatamente sete vezes. Ele acha o ritual absurdo e tenta resistir, mas a tensão vai crescendo até que ele cede; ao completar a sétima checagem, sente um alívio momentâneo. Sabe perfeitamente, o tempo todo, que o gás já está fechado.`,
      fronteira: `<b>A fronteira.</b> O ato é <b>egodistônico</b> (ele acha absurdo e resiste) e <b>alivia a tensão</b> ao ser realizado: isso é <b>ato compulsivo</b>. O <b>ato impulsivo</b> seria egossintônico, uma descarga imediata, <b>sem crítica</b>. A <b>obsessão</b> é a <i>ideia</i> intrusiva (o medo), não o ato de verificar. A <b>estereotipia</b> repete sem finalidade e sem esse alívio.`
    },
    {
      id: 4, grupo_eem: "Consciência do Eu (§15)", correta: "influencia",
      roteiro: ROTEIRO + "#consciência-e-valoração-do-eu",
      opcoes: [
        { chave: "influencia",    label: "Vivência de influência (ação controlada)" },
        { chave: "egodistonico",  label: "Impulso egodistônico" },
        { chave: "despersonalizacao", label: "Despersonalização" },
        { chave: "automatismo",   label: "Automatismo" }
      ],
      vinheta: `Um paciente relata que, em certos momentos, os próprios movimentos não são comandados por ele: "uma força de fora" moveria sua mão e o faria gesticular. Ele <b>não reconhece</b> esses atos como seus — descreve-se como um instrumento manobrado por uma vontade alheia, e não como alguém que agiu e se arrependeu.`,
      fronteira: `<b>A fronteira.</b> O ponto decisivo é a <b>autoria</b>: ele <b>não reconhece</b> o ato como seu, vivido como imposto por uma força externa — isso é <b>vivência de influência / ação controlada</b>. No <b>impulso egodistônico</b>, ao contrário, o ato é reconhecido como <b>dele</b> — ele só não consegue controlá-lo. Não é <b>automatismo</b> (lá não há consciência agindo) nem <b>despersonalização</b> (estranheza de si, mas sem atribuição a uma força de fora).`
    },
    {
      id: 5, grupo_eem: "Psicomotricidade (§13)", correta: "automatismo",
      roteiro: ROTEIRO + "#psicomotricidade",
      opcoes: [
        { chave: "automatismo",     label: "Automatismo" },
        { chave: "acao_controlada", label: "Ação controlada" },
        { chave: "estupor",         label: "Estupor" },
        { chave: "obediencia",      label: "Obediência automática" }
      ],
      vinheta: `Durante a madrugada, uma pessoa se levanta, caminha pela casa, manuseia objetos e executa uma sequência relativamente complexa de atos. Pela manhã, não guarda <b>nenhuma</b> lembrança do episódio e reage com perplexidade ao ser informada. Não havia consciência presente durante a ação.`,
      fronteira: `<b>A fronteira.</b> Não havia <b>sujeito consciente</b> agindo — sonambulismo, estados crepusculares: isso é <b>automatismo</b>. Difere da <b>ação controlada</b>, em que há consciência, mas o ato é sentido como imposto por outro. O <b>estupor</b> seria imobilidade, o oposto disto. E a <b>obediência automática</b> executa <i>ordens externas</i>, com a consciência presente.`
    },
    {
      id: 6, grupo_eem: "Psicomotricidade (§13)", correta: "estereotipia",
      roteiro: ROTEIRO + "#psicomotricidade",
      opcoes: [
        { chave: "estereotipia", label: "Estereotipia" },
        { chave: "maneirismo",   label: "Maneirismo" },
        { chave: "tique",        label: "Tique" },
        { chave: "compulsivo",   label: "Ato compulsivo" }
      ],
      vinheta: `Por horas, um paciente repete o mesmo movimento de balançar o tronco para a frente e para trás. O movimento é uniforme e <b>sem qualquer finalidade aparente</b>; não corresponde a nenhum gesto reconhecível, não é súbito, e ele não relata uma tensão que o ato venha aliviar.`,
      fronteira: `<b>A fronteira.</b> Repetição <b>uniforme e sem finalidade</b>: isso é <b>estereotipia</b>. O <b>maneirismo</b> seria uma caricatura <i>bizarra de um gesto que tem sentido</i>. O <b>tique</b> é <i>súbito e involuntário</i>, não sustentado por horas. E o <b>ato compulsivo</b> <i>alivia uma tensão</i> e tem crítica. Todos repetem — o que muda é o mecanismo.`
    },
    {
      id: 7, grupo_eem: "Psicomotricidade (§13)", correta: "estupor",
      roteiro: ROTEIRO + "#psicomotricidade",
      opcoes: [
        { chave: "estupor",            label: "Estupor" },
        { chave: "abulia",             label: "Abulia" },
        { chave: "negativismo_passivo", label: "Negativismo passivo" },
        { chave: "catalepsia",         label: "Catalepsia" }
      ],
      vinheta: `Um paciente permanece imóvel e mudo por longos períodos, sem responder a perguntas nem reagir ao que acontece à sua volta. Há sinais de que percebe o ambiente. Não é o caso de alguém que "não quer" agir: parece haver um <b>bloqueio motor global</b>, e não uma vontade que se apagou.`,
      fronteira: `<b>A fronteira.</b> Imobilidade e mutismo por <b>inibição motora</b>, com a consciência possivelmente preservada: isso é <b>estupor</b>. Na <b>abulia</b>, o que falta é a <i>vontade</i>, sem esse bloqueio motor global. O <b>negativismo passivo</b> seria <i>recusa</i> (não fazer o que se pede), não inibição. A <b>catalepsia</b> seria manter <i>posturas que lhe são impostas</i>.`
    },
    {
      id: 8, grupo_eem: "Consciência do Eu (§15)", correta: "despersonalizacao",
      roteiro: ROTEIRO + "#consciência-e-valoração-do-eu",
      opcoes: [
        { chave: "despersonalizacao",     label: "Despersonalização" },
        { chave: "desrealizacao",         label: "Desrealização" },
        { chave: "consciencia_existencia", label: "Alteração da consciência de existência" },
        { chave: "influencia",            label: "Vivência de influência" }
      ],
      vinheta: `Um paciente queixa-se de uma estranheza persistente em relação a <b>si mesmo</b>: sente o próprio corpo e os próprios pensamentos como se não fossem inteiramente seus, como se observasse a si de fora. O mundo ao redor continua lhe parecendo real — é de si que ele se sente estranho.`,
      fronteira: `<b>A fronteira.</b> A estranheza é de <b>si mesmo</b> — o próprio corpo e os pensamentos sentidos como alheios: isso é <b>despersonalização</b>. A <b>desrealização</b> seria a sensação de irrealidade do <b>mundo</b>. A <b>alteração da consciência de existência</b> vai além ("sou uma máquina", "sou um nada"): nega a própria existência, não só estranha. E a <b>vivência de influência</b> atribuiria os atos a uma <i>força externa</i>, o que não aparece aqui.`
    }
  ];

  global.FENOMENOS_DATA = { ITENS: ITENS, NOTA_REVELACAO: NOTA_REVELACAO };
})(window);
