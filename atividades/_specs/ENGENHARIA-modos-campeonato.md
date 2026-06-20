# Engenharia — modos/campeonato + lições reutilizáveis

Registro de engenharia da feature **hub + dois modos (aula/treino) + campeonato**
(jun/2026). Não é a spec de *o quê* (essa é `SPEC-modos-campeonato.md`): aqui é o
**diário de implementação** — os problemas reais que apareceram, a causa-raiz de
cada um, como resolvemos e o **padrão reutilizável** para os próximos sites do mesmo
autor (mesma arquitetura: Quarto + HTML/JS puro + Supabase + GitHub Pages).

> **Como usar este documento:** ao construir um site parecido, leia a seção
> **§11 (checklist reutilizável)** primeiro. Cada item aponta para a seção que
> explica a armadilha em detalhe. A seção **§7 (áudio no Safari)** e a **§3 (abas
> = ordem dos `<script>`)** são as que mais economizam tempo.

*Stack de referência:* sem framework, sem CDN, vanilla JS; tema editorial (fontes
self-hosted); Supabase via REST/RPC puro; Quarto `output-dir: docs`, Pages nativo.

---

## 1. Navbar com dropdown de N links → **hub de cards** (a melhoria dos "Cards")

**Antes.** O navbar tinha um dropdown "Atividades" com 5 links (um por `.html`).
Cada atividade tinha o próprio login (código + grupo) e nenhuma noção de ordem,
travamento ou ranking.

**Problemas.** Re-login a cada atividade; o aluno se perdia na sequência; não havia
onde mostrar a classificação; o dropdown não comportava "modo de uso" (aula × treino).

**Depois.** O dropdown virou **um único link** para uma **página-hub**
(`atividades/index.html`) com **dois cards grandes** ("Entrar na aula" / "Treinar
sozinho"). O hub é o **portão de identidade**: grava quem é o grupo/modo uma vez e
dirige o fluxo (mapa do campeonato ou grade livre).

**Padrão reutilizável.**
- Quando há **mais de ~3 destinos correlatos** que compartilham **estado/fluxo**
  (identidade, sequência, ranking), troque o **dropdown por uma página-hub**.
- **Cards > dropdown** para escolhas com peso (modo de uso, perfil, sessão): o card
  carrega título + subtítulo + ícone e cabe lógica (validação, lista de opções).
- No navbar, deixe **um link** para o hub. O hub centraliza a complexidade; o navbar
  fica minimalista. Itens "à parte" (ex.: painel do professor) ficam como link
  separado, não dentro do hub do aluno.

---

## 2. A ordem do fluxo mora num **registry**, não no nome do arquivo

**Decisão.** A ordem do campeonato passou a viver num array
(`lib/hub-config.js → HUB_ATIVIDADES`) e na ordem de auto-registro do painel — **não**
no número do arquivo. Ainda assim, **renomeamos os arquivos** para casar com o fluxo
(preferência do autor por arquivos legíveis), via `git mv`.

**Como renomear sem quebrar nada.**
1. `git mv` (preserva histórico), **na ordem certa** para não colidir (ex.: mover o
   `02-juri` para `05-juri` **antes** de liberar o `02` para outro).
2. `grep -rn` pelos nomes antigos.
3. **Distinguir dois tipos de referência:**
   - **Referência viva** (resolve para um arquivo): `rota:` dos painéis, `href` de
     navbar/keynotes, comentários de cabeçalho dos data-files → **atualizar todas**.
   - **Registro histórico** (descreve a ordem em que algo *foi desenhado*): specs
     antigas em `_specs/` → **manter como está** (é memória do projeto, não link).
4. Conferir **zero link morto** nas referências vivas.

**Padrão reutilizável.** A ordem de um fluxo deve ter **uma fonte da verdade** (um
array/registry). Nome de arquivo é cosmético. Se renomear, `git mv` + `grep` +
separar *link vivo* (atualiza) de *registro histórico* (preserva).

---

## 3. **Abas do painel = ordem dos `<script>`** (bug do Júri em 2º)

**Bug.** No painel, o Júri aparecia em 2ª posição (devia ser a última).

**Causa-raiz.** O shell do painel (`painel-core.js`) monta as abas a partir de um
**registry em memória**, populado quando cada módulo chama `registrarPainel({...})`
ao carregar. Ou seja: **a ordem das abas é a ordem dos `<script src="lib/painel-*.js">`
no HTML** — decisão deliberada (sem auto-discovery, navalha de Ockham). A ordem dos
`<script>` estava antiga.

**Correção.** Reordenar os `<script>` no `painel.html` (Júri por último), casando com
`HUB_ATIVIDADES`. Comentário no HTML explicando que **a ordem dos `<script>` É a fonte
da verdade**.

**Padrão reutilizável.** Quando a UI deriva de **auto-registro por `<script>`**, a
**ordem de inclusão é semântica** — trate-a como configuração e **documente no
arquivo** que reordenar `<script>` reordena a UI. Não procure o bug no JS; está no HTML.

---

## 4. **Uma tela, uma responsabilidade** — placar redundante na tela de REVELAR

**Problema.** Ao clicar **REVELAR**, o painel mostrava o gabarito/tally das respostas
**e**, logo abaixo, o "Placar dos grupos" — o mesmo dado que a tela dedicada
**"Resultado da rodada"** já exibe (e de forma mais bonita).

**Correção.** Separar responsabilidades:
- **REVELAR / gabarito** → mostra **só as respostas** (o tally para discutir no telão).
- **Pontos e classificação** → vivem **só** nas telas dedicadas: *Resultado da rodada*
  (acertos) e *Classificação geral* (pódio acumulado).

No código: `renderGabarito()` deixou de renderizar o placar genérico
(`scoreboardWrap` sempre oculto nessa fase).

**Padrão reutilizável.** **Não repita o mesmo dado em duas telas.** Se existe uma
tela "caprichada" dedicada a um dado (placar/pódio), **remova a versão embutida**
mais simples. No telão, menos elementos = menos ruído cognitivo. Cada fase do fluxo
tem **um** propósito visual.

**Status nas abas (vocabulário visual único).** As abas do painel ganharam um sinal
de **atividade concluída por todos os N grupos** (fundo verde + ✓) — **a mesma
linguagem do mapa do hub** (etapa feita = verde + ✓). Reaproveitar o vocabulário
visual entre telas faz o sistema "falar a mesma língua". Implementação fiel à
separação de concerns: **cada módulo declara o seu limiar** (`itensParaCompletar`;
no Simulado, as 8 base, bônus opcional) e o **shell continua genérico** (só conta
"grupos com progresso ≥ limiar ≥ N"). A aba ATIVA mantém o destaque (laranja) via
`:not(.ativa)`; o ✓ vale para as duas. *Padrão:* **indicadores de status por item
= módulo declara o critério, shell desenha genérico; reaproveite cores/ícones já
usados em outras telas.**

---

## 5. Identidade compartilhada — **fim do re-login**

**Padrão.** Uma chave de `localStorage` **única** (`aula:identidade`) gravada **uma
vez** pelo hub; cada página lê no **boot**. Helper `lib/aula.js`:
- `AULA.exigir()` → devolve o contexto `{modo, sessao, grupo}` **ou** redireciona ao
  hub (`location.replace("index.html")`) se não houver identidade. É o **boot-guard**.
- `AULA.marcarConcluida()` / `AULA.concluidas()` → progresso do campeonato (para o
  mapa ✓/▶/🔒), numa chave separada por sessão+grupo.

Cada atividade perdeu o login próprio: lê a identidade, retoma o que houver, e **só**
mostra a abertura instrucional num começo do zero. Guard de modo no envio:
`if (MODO !== "aula") return;` — em treino **nada** vai ao backend.

**Padrão reutilizável.** Fluxo multi-página que compartilha contexto (sessão/usuário):
**centralize a identidade numa chave única + um boot-guard**, em vez de reperguntar em
cada página. O "modo" (com/sem backend) sai de um discriminador simples (existe código?),
sem flag nova no servidor.

---

## 6. Agregar escalas diferentes — **normalização + clamp**

**Problema.** Quatro etapas pontuadas com escalas diferentes (Continuum vale 80;
as outras, 8) precisavam somar num ranking único.

**Solução.** Cada etapa vale **100**: `nota = pontuacao / maxPontos × 100`, **com
clamp a [0,100]**. Soma por grupo; máximo dinâmico = `100 × (nº de etapas pontuadas
jogadas)`; mostra **"etapas N/M"** (transparente: quem faltou conta 0). Etapas sem
`maxPontos` (o Júri) ficam **fora** do placar.

**Decisão de denominador (importante).** O Simulado tem 8 questões-base + 2 bônus
opcionais. Usamos `maxPontos = 8` (a base) **+ clamp**: acertar as 8 = 100; os bônus
viram "seguro" (passam de 100, mas a nota é limitada a 100) → **não penaliza** quem
para antes. A spec dizia "9" (número solto); conferimos contra a **constante real de
score** e decidimos pela **intenção pedagógica**.

**Padrão reutilizável.** Para agregar jogos de escalas distintas: **normalize para
uma base comum (100) e SEMPRE faça clamp**. Escolha o denominador pela **intenção**
(opcional não penaliza), não por um número avulso. **Sempre confira `maxPontos`
contra a constante de score real** da atividade.

**Bug do acumulado "chapado" (corrigido depois).** A 1ª versão somava **todas** as
etapas com dados na sessão, sem olhar qual o professor estava revelando. Sintoma: com
o campeonato todo jogado, o "geral" dava **o mesmo total em qualquer aba** — impossível
ver "a classificação **após a 2ª** etapa". Causa: faltava cortar pela **posição da
etapa no fluxo**. Correção: o acumulado é **progressivo** — revelar a Nª etapa soma só
as etapas pontuadas de índice ≤ N no registry (`pontuadasAte(idAtual, incluir)`); as
setas ↑↓ comparam "até a atual" × "até a anterior".

> **Padrão reutilizável (revelação progressiva).** Num placar que é revelado **rodada
> a rodada**, o acumulado de cada rodada é **cumulativo até ali**, não o total final.
> Corte sempre pela **posição no fluxo** (o registry), não por "tudo que existe no
> banco" — senão, com os dados completos, todas as rodadas mostram o mesmo número e o
> drama do campeonato some.

---

## 7. **Áudio no Safari** — três camadas (a lição mais cara)

O som sintetizado (Web Audio, `lib/sfx.js`) funcionava no Chrome e **ficava mudo no
Safari**. Foram **três problemas empilhados**; cada conserto revelou o próximo. O
sintoma mudava, o que torna o diagnóstico traiçoeiro.

**Camada 1 — `AudioContext` suspenso + `resume()` assíncrono.**
O contexto nasce `suspended`; `resume()` retorna uma **Promise**. Se você agenda o som
em `currentTime` enquanto ainda está suspenso, o relógio do contexto não andou e o
envelope passa "no vazio". → Helper `comCtx(cb)`: **espera o `resume()` resolver** e
só então agenda.

**Camada 2 — gesto do usuário.** O Safari só cria/retoma o contexto **dentro de um
gesto**. → Destravar no **1º toque/clique/tecla em qualquer lugar** da página
(listener `once`), além dos botões específicos.

**Camada 3 (raiz final) — `exponentialRampToValueAtTime` no ganho não funciona no
WebKit.** Bug antigo do Safari: a **rampa exponencial de ganho não é aplicada** — o
ganho fica preso no **piso** (`0.0001`, piso que a rampa exponencial *exige*, porque
ela não pode partir de 0). O oscilador roda (o Safari até **acende o indicador de
áudio na aba**), mas em volume ~0 → **silêncio**. O Chrome aplica a rampa, por isso lá
funcionava. → Trocar por **`linearRampToValueAtTime`** (parte de 0, portável).

> **Pista de ouro do diagnóstico:** *indicador de áudio da aba acende + silêncio* =
> o grafo roda e está conectado à saída, mas o **ganho está ~0**. Suspeite da
> **automação de ganho** (rampa exponencial), não do disparo nem do mute.

**Padrão reutilizável (snippet canônico). Nunca use `exponentialRamp` para envelope
de ganho em Web Audio se quiser portabilidade (Safari/iOS).**

```js
// 1) destrava no 1º gesto (qualquer lugar)
["pointerdown","touchstart","mousedown","keydown"].forEach(ev =>
  document.addEventListener(ev, () => { if (ctx && ctx.state!=="running") ctx.resume(); },
                            { once:true, capture:true, passive:true }));

// 2) só agenda com o contexto RODANDO
function comCtx(cb){
  const c = ac(); if (!c || mudo) return;
  if (c.state === "running") return cb(c);
  if (c.resume) c.resume().then(() => { if (!mudo && c.state==="running") cb(c); }).catch(()=>{});
}

// 3) envelope com rampas LINEARES (partem de 0; funcionam em todo navegador)
function nota(freq, dur, vol){
  comCtx(c => {
    const t = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.frequency.value = freq; o.connect(g); g.connect(c.destination);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);  // ataque
    g.gain.linearRampToValueAtTime(0,   t + dur);    // decaimento
    o.start(t); o.stop(t + dur + 0.03);
  });
}
```

---

## 8. **Cache** — GitHub Pages + Safari (o falso "não funcionou")

Depois de um deploy, **Safari e o CDN do Pages servem JS/HTML antigos**. Isso gerou
vários falsos negativos ("subi o conserto, mas não mudou nada").

- No **Safari**, `Cmd+Shift+R` é **Modo de Leitura**, **não** hard refresh. O hard
  refresh é **`Cmd+Option+R`** (recarregar da origem). Ou **janela privada**.
- No Chrome/Edge, `Cmd+Shift+R` é o hard reload.
- Ao **validar um deploy via terminal**, sempre **cache-bust**:
  `curl ".../arquivo.js?cb=$RANDOM" | grep <coisa-nova>`.
- O deploy **só dispara em push na `main`** (não em branch). E **o último run pode ser
  do commit anterior** — confira o `headSha` do run, não só "completed".

**Padrão reutilizável.** Ao iterar em produção: cache-bust no `curl`, confirme o
`headSha` do run, e **instrua o hard-refresh certo por navegador**. Metade dos "bugs"
de deploy são cache.

---

## 9. **Quarto + Pages** — separação app/estático

- `render: ["*.qmd","**/*.qmd"]` → renderiza **só `.qmd`**. As atividades `.html`
  entram como **`resources`** (copiadas, não renderizadas). Assim specs `.md` largadas
  em pastas do app **não vazam** para o site.
- `output-dir: docs` é **gitignored** (gerado no CI). Não versione o output.
- `resources` cobre `atividades/*.html` + `atividades/lib/` → arquivos novos em `lib/`
  e o `index.html` do hub são publicados sem mexer na config. `supabase/` fica **fora**.

**Padrão reutilizável.** Separe **app estático** (vai em `resources`) de **conteúdo
renderizado** (`.qmd`). Não versione o build. Publique só da `main`.

---

## 10. Como **testamos** (metodologia reutilizável, sem dependências novas)

- **E2E no site publicado, sem puppeteer.** Node 24 tem `WebSocket` global → dá para
  dirigir o **Chrome via DevTools Protocol (CDP)**: subir Chrome com
  `--remote-debugging-port`, conectar por WebSocket, usar `Page.navigate` +
  `Runtime.evaluate` (roda JS na página → clica, preenche, lê `localStorage`). Zero
  `npm install`. Percorremos hub → identidade → atividade → síntese e conferimos cada
  estado.
- **Verificação de servidor via `psql` direto** (libpq), com credenciais do `.env`
  (a senha vai por `PGPASSWORD`, **nunca** impressa no output). Confirma que a resposta
  chegou e permite limpar sessões de teste (a chave anon não tem DELETE).
- **Semear dados realistas pela MESMA RPC do cliente** (`enviar_resposta`), montando os
  payloads a partir dos **data-files reais** (carregados em Node via `new Function`).
  Popular uma sessão deixa o painel/pódio prontos para demo sem clicar 100 vezes.
- **Syntax check barato:** `node --check` nos `.js`; `new Function(scriptInline)` para
  validar os `<script>` embutidos nos `.html`.
- **Sempre limpar** dados de teste (sessões throwaway) e harness temporário.

---

## 11. Checklist reutilizável (leia isto ao começar um site parecido)

- [ ] **Ordem de fluxo num registry** (array), não em nome de arquivo. A UI deriva dele. (§2,§3)
- [ ] **UI por auto-registro `<script>`?** A ordem dos `<script>` é a fonte da verdade — documente no HTML. (§3)
- [ ] **Hub de cards** no lugar de dropdown quando há fluxo/identidade/estado compartilhado. (§1)
- [ ] **Identidade única + boot-guard**; sem re-login por página; "modo" por discriminador, sem flag de servidor. (§5)
- [ ] **Uma tela, uma responsabilidade**; nunca o mesmo dado em duas telas (placar embutido × tela dedicada). (§4)
- [ ] **Agregar escalas diferentes:** normalizar /100 + **clamp**; denominador pela intenção; conferir contra a constante de score real. (§6)
- [ ] **Web Audio:** rampas **lineares** (nunca exponenciais no ganho); `comCtx` (resume assíncrono); destravar no 1º gesto. (§7)
- [ ] **Renomear arquivo:** `git mv` + `grep` + separar link vivo (atualiza) de registro histórico (preserva). (§2)
- [ ] **Deploy:** só da `main`; cache-bust ao validar; confira `headSha` do run; hard-refresh certo por navegador (Safari = `Cmd+Option+R`). (§8)
- [ ] **Quarto:** app estático em `resources`, conteúdo em `.qmd`, `docs/` gitignored, segredos/infra fora dos resources. (§9)
- [ ] **Testar:** E2E via CDP (sem puppeteer), servidor via `psql`, semear via RPC real; limpar tudo depois. (§10)

---

*Criado: junho de 2026. Complementa `SPEC-modos-campeonato.md` (o quê), `DESIGN.md`
(pedagogia) e `CLAUDE.md` (princípios do autor).*
