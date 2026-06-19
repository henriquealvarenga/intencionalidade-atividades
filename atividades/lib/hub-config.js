/* =============================================================================
   REGISTRY DO HUB — ordem do fluxo do campeonato (SPEC §2)
   A ordem do campeonato vive AQUI, não no número do arquivo: este array é a
   fonte única da sequência (o hub desenha o mapa nesta ordem; as atividades
   pontuadas vêm primeiro, o Júri por último, sem placar).

   Carregado pelo hub (index.html). Cada entrada:
     id      → discriminador da atividade (casa com a coluna `atividade`)
     arquivo → página .html da atividade
     titulo  → rótulo exibido no hub
     pontua  → entra na classificação acumulada? (Júri = false)
   Sem CDN, sem framework. Expõe window.HUB_ATIVIDADES.
   ============================================================================= */
window.HUB_ATIVIDADES = [
  { id:"continuum", arquivo:"01-continuum.html", titulo:"Continuum",           pontua:true  },
  { id:"fenomenos", arquivo:"02-fenomenos.html", titulo:"Nomear o fenômeno",   pontua:true  },
  { id:"questoes",  arquivo:"03-questoes.html",  titulo:"Simulado comentado",  pontua:true  },
  { id:"planos",    arquivo:"04-planos.html",    titulo:"Arquitetura da ação", pontua:true  },
  { id:"juri",      arquivo:"05-juri.html",      titulo:"Júri simulado",       pontua:false }, // último, sem placar
];
