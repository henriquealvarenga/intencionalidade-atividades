/* =============================================================================
   BANCO DE CASOS — Atividade 1 (Continuum: Flexibilidade ↔ Determinação)
   Orientado a dados. FONTE ÚNICA: consumido tanto pela atividade do aluno
   (01-continuum.html) quanto pelo painel do professor (painel-continuum.html).
   Mantê-lo aqui evita duplicar os 8 casos / metadados nos dois arquivos.

   Para adicionar um caso no futuro: acrescentar um objeto a CASOS.
   eixo (min/max): faixa de referência PROPOSTA p/ provocar o debate — não é
   consenso de especialistas; é deliberadamente contestável.
   Escala 0 (flexibilidade) … 100 (determinação).
   Expõe window.CONTINUUM_DATA = { CATEGORIAS, ADJ, CASOS }.
   ============================================================================= */
(function (global) {
  "use strict";

  var CATEGORIAS = {
    abulia:        {label:"Abulia", desc:"vontade/iniciativa abolida"},
    impulso:       {label:"Impulso egodistônico", desc:"reconhece como errado, não controla"},
    compulsao:     {label:"Compulsão", desc:"ritual que alivia tensão"},
    alienada:      {label:"Agência alienada", desc:"não reconhece o ato como seu"},
    automatismo:   {label:"Ação sem consciência", desc:"automatismo, sem sujeito"},
    decisao:       {label:"Decisão empobrecida", desc:"escolhe mal, sem impulso anômalo"}
  };

  /* pares "quase" — categorias conceitualmente vizinhas (crédito parcial) */
  var ADJ = {
    abulia:["decisao"], decisao:["abulia"],
    impulso:["compulsao"], compulsao:["impulso"],
    alienada:["automatismo"], automatismo:["alienada"]
  };

  var CASOS = [
    {
      id:1, correta:"abulia", min:85, max:97,
      vinheta:"Mulher de 23 anos, com limitações intelectuais desde a infância, mas descrita como sociável e afetuosa — escrevia cartas e participava da vida social da família. No fim da adolescência passou a apresentar oscilações de humor, episódios de agitação e agressividade e fugas noturnas, que preocupavam a família. Numa época em que a psiquiatria dispunha de pouquíssimos recursos para quadros assim, optou-se por um procedimento neurocirúrgico então em voga, que prometia conter a agitação. O resultado foi devastador: perdeu a fala articulada e toda a iniciativa, passou a depender de cuidados para tarefas básicas e permaneceu institucionalizada, sem recuperação, pelas décadas seguintes.",
      explica:"Abulia: o que se perde é a capacidade de iniciar a ação e gerar desejos próprios — não há impulso anômalo, há ausência de impulso.",
      reversibilidade:"Irreversível — a lesão é estrutural e definitiva.",
      contra:"A abolição da iniciativa é a abolição da vontade — ou apenas da sua expressão? Resta um sujeito que ainda sente afeto?",
      quem:"Rosemary Kennedy", onde:"Lobotomia pré-frontal (1941)."
    },
    {
      id:2, correta:"alienada", min:50, max:75,
      vinheta:"Homem de 24 anos, sem lesão cerebral detectável, relata que alguns de seus impulsos e movimentos não lhe pertencem. Descreve a sensação de que uma força ou agência externa 'coloca' nele a vontade de agir — como se certos gestos e decisões fossem inseridos de fora, teleguiados por outra pessoa. Reconhece o próprio corpo como seu, mas não se experimenta como o autor daqueles impulsos. O quadro vem acompanhado de outras vivências de que seus pensamentos e afetos são manipulados do exterior, e ele constrói explicações elaboradas para dar sentido a isso.",
      explica:"Agência alienada: o impulso existe e é executado, mas o paciente não se reconhece como seu autor — a perturbação é do senso de autoria da vontade.",
      reversibilidade:"Parcialmente reversível — costuma responder a antipsicóticos.",
      contra:"A determinação aqui é vivida, não necessariamente efetiva: o ato pode ser gerado pelo próprio paciente, que apenas não o reconhece. É determinação ou distúrbio do senso de autoria?",
      quem:"Sintomas de primeira ordem de Kurt Schneider", onde:"Impulsos feitos / vivências de passividade na esquizofrenia."
    },
    {
      id:3, correta:"abulia", min:45, max:65,
      vinheta:"Paciente em tratamento psiquiátrico de longa data apresenta perda marcante de iniciativa: fala pouco espontaneamente, mostra-se indiferente, não consegue dar início às atividades do dia e permanece horas sem fazer nada. A família tem dificuldade de saber quanto disso vem da própria doença de base — que já cursava com retraimento e empobrecimento afetivo — e quanto surgiu ou piorou depois que a medicação foi ajustada. Com a troca da medicação e um programa de reabilitação, parte da iniciativa retorna, ainda que de forma incompleta.",
      explica:"Abulia: a mesma ausência de iniciativa do caso estrutural, porém de origem funcional/medicamentosa — a fenomenologia é a mesma, a reversibilidade não.",
      reversibilidade:"Reversível — melhora com a troca da medicação e reabilitação.",
      contra:"Se melhora com a troca da medicação, a vontade estava determinada ou apenas suprimida? E quanto é doença, quanto é remédio?",
      quem:"Avolição + apatia medicamentosa", onde:"Sintoma negativo da esquizofrenia somado à apatia induzida por neurolépticos."
    },
    {
      id:4, correta:"compulsao", min:45, max:65,
      vinheta:"Pessoa adulta passa várias horas por dia presa a rituais de verificação e limpeza: confere repetidamente se trancou as portas, lava as mãos dezenas de vezes, refaz sequências até 'ficar certo'. Reconhece que os rituais são excessivos e absurdos e tem plena consciência de que não fazem sentido. Se tenta resistir, a angústia cresce até ficar insuportável; ao ceder, sente um alívio momentâneo, e logo o ciclo recomeça. O sofrimento é intenso e o tempo perdido compromete o trabalho e as relações.",
      explica:"Compulsão: ato repetitivo executado para aliviar tensão/ansiedade, reconhecido como absurdo (egodistônico) e com juízo crítico preservado.",
      reversibilidade:"Tratável, porém crônico-recidivante — responde a ISRS e terapia.",
      contra:"O insight preservado significa que resta liberdade — ou só torna o aprisionamento mais cruel?",
      quem:"Transtorno Obsessivo-Compulsivo", onde:"TOC primário."
    },
    {
      id:5, correta:"impulso", min:75, max:90,
      vinheta:"Homem de 40 anos, casado, professor, sem qualquer antecedente psiquiátrico ou criminal, desenvolve em poucos meses um interesse sexual crescente e intrusivo por crianças. Considera esses impulsos abomináveis e tenta o tempo todo evitá-los, mas descreve uma 'força interna estranha' que parece decidir por ele, levando-o a atos que o afastam da família e o conduzem à Justiça. A investigação revela uma causa orgânica tratável; removida essa causa, os impulsos desaparecem por completo e ele retoma o autocontrole. Meses depois, porém, os sintomas voltam idênticos — e descobre-se que a lesão havia recidivado, voltando a crescer. Um novo tratamento elimina os impulsos outra vez.",
      explica:"Impulso egodistônico: o desejo é incontrolável e repugnante ao próprio sujeito, que condena o ato e mesmo assim é levado a ele.",
      reversibilidade:"Dramaticamente reversível — some com o tratamento da lesão e retorna com a recidiva.",
      contra:"A reversibilidade total prova determinação biológica — ou prova que, removida a causa, a liberdade volta (e logo nunca foi 'ele')?",
      quem:"Tumor orbitofrontal direito", onde:"Burns & Swerdlow (2003)."
    },
    {
      id:6, correta:"decisao", min:55, max:75,
      vinheta:"Profissional bem-sucedido, casado e pai de família, remove um tumor cerebral e se recupera sem sequelas aparentes: inteligência, memória e linguagem permanecem intactas, e nos testes seu raciocínio é normal. Na vida real, porém, tornou-se incapaz de decidir bem. Gasta horas em detalhes triviais, não consegue estabelecer prioridades, embarca em negócios ruinosos e não sustenta um plano. Não há impulso anômalo, compulsão nem agressividade — nada de dramático. Ele apenas decide mal, repetidamente, até perder emprego, patrimônio e casamento.",
      explica:"Decisão empobrecida: não há impulso nem compulsão; o que falha é a própria capacidade de escolher bem, apesar da cognição preservada.",
      reversibilidade:"Irreversível — sequela estável da lesão.",
      contra:"Sem impulso irresistível e com cognição intacta, ele 'poderia' decidir melhor? Onde fica a fronteira entre não conseguir e não fazer?",
      quem:"Paciente EVR / 'Elliott'", onde:"Eslinger & Damasio — hipótese do marcador somático."
    },
    {
      id:7, correta:"impulso", min:45, max:70,
      vinheta:"Homem de 25 anos, ex-militar e estudante, sem antecedentes, passa meses atormentado por cefaleias intensas e por 'pensamentos violentos e irracionais' que não consegue controlar e que ele próprio estranha — a ponto de procurar ajuda médica e de pedir, por escrito, que examinem seu cérebro após a morte para entender o que havia de errado com ele. Pouco depois, de forma planejada e organizada — reunindo armas e suprimentos, escolhendo um ponto elevado e estratégico —, comete um massacre, depois de matar os familiares mais próximos. A autópsia que ele mesmo solicitara revela um tumor cerebral.",
      explica:"Impulso egodistônico: pensamentos violentos estranhos ao sujeito e fora de controle — aqui complicados pela premeditação, que tensiona a leitura.",
      reversibilidade:"Não se aplica — o paciente faleceu; e o próprio papel causal do tumor é controverso.",
      contra:"Ele planejou tudo. Premeditação convive com determinação biológica — ou a exclui?",
      quem:"Charles Whitman (1966)", onde:"Tumor próximo à amígdala."
    },
    {
      id:8, correta:"automatismo", min:88, max:100,
      vinheta:"Homem de 23 anos, sob forte estresse e privação de sono, adormece no sofá de casa. Durante a noite levanta-se, dirige cerca de vinte quilômetros até a casa dos sogros, com quem tinha excelente relação, e mata a sogra, ferindo gravemente o sogro. Em seguida vai à delegacia, confuso e sangrando das próprias mãos, dizendo não compreender o que havia feito. Não havia motivo, conflito prévio nem ganho possível. Exames do sono revelam um padrão muito anômalo, e há história familiar densa de distúrbios do sono.",
      explica:"Ação sem consciência: não há sujeito consciente agindo — o ato ocorre em automatismo, sem experiência nem intenção.",
      reversibilidade:"Episódico — ocorre em estados de transição do sono; fora deles, não há quadro.",
      contra:"O ato foi complexo demais (dirigir, usar chave, atacar pessoas específicas) para ser 'automático'? Pode haver agência sem consciência?",
      quem:"Kenneth Parks (1987)", onde:"Sonambulismo homicida — absolvido."
    }
  ];

  global.CONTINUUM_DATA = { CATEGORIAS: CATEGORIAS, ADJ: ADJ, CASOS: CASOS };
})(window);
