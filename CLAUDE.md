# Notas para o agente Claude

Este arquivo é lido automaticamente por agentes Claude que trabalham nesse repositório (via Claude Code, Cowork ou similares). Contém preferências do autor e contexto do projeto que devem orientar qualquer modificação futura.

## Princípios do autor (não negociáveis)

1. **Best practices acima de soluções rápidas.** Antes de propor um fix, perguntar: "isso é a solução certa ou é uma gambiarra que vou acumular?" Se for gambiarra, oferecer a alternativa limpa.

2. **Navalha de Ockham.** A solução mais simples que resolve o problema é a melhor. Não empilhar seletores defensivos, não criar abstrações antecipadamente, não codar pra "talvez precise".

3. **Tratar causa-raiz, não sintomas.** Se um bug força um patch local, parar e perguntar: existe uma causa estrutural? Vale corrigir a estrutura, não o sintoma.

4. **Evitar `!important`, `!force`, override pesado.** Resolver via especificidade CSS e ordem de cascade. `!important` só quando não há outro caminho — e nesse caso, documentar com comentário explicando *por quê*.

5. **Inspecionar antes de escrever.** Em CSS especialmente: olhar o HTML real renderizado antes de criar seletores.

6. **Documentar hacks com comentário no código.** Se uma gambiarra for inevitável, explicar no comentário: *por quê* está aqui, *quando* pode sair, qual a causa raiz.

7. **Pensar no futuro.** Antes de aceitar uma estrutura, perguntar: "como isso envelhece em 6 meses? Em 2 anos? Alguém entrando no projeto vai entender por quê está assim?"

## Contexto do projeto

- **O que é:** atividades interativas de sala de aula e apresentações que acompanham o livro
  *Intencionalidade, Vontade, Impulsividade e Livre Arbítrio*
  (<https://henriquealvarenga.com/intencionalidade/>, repositório `intencionalidade`).
- **Origem:** separado do repositório do livro em setembro de 2026, com histórico preservado
  (`git filter-repo`), quando o livro virou Quarto Book — livros do Quarto não renderizam
  revealjs nem páginas fora dos capítulos.
- **Publicação:** `https://henriquealvarenga.com/intencionalidade-atividades/` via GitHub Actions
  (`.github/workflows/publish.yml`), Pages nativo. `docs/` não é versionado.
- **Estrutura:**
  - `atividades/` — HTML/JS puro (hub, 5 atividades, painel do professor), publicado como
    resource. `atividades/_specs/` = documentação de design (versionada, **não** publicada).
  - `apresentacao/` — decks revealjs (`keynote1.qmd`, `keynote2.qmd`), únicos arquivos
    renderizados pelo Quarto.
  - `supabase/` — schema + RLS (infra, não publicado).
  - `fonts/` — WOFF2 self-hosted, usadas pelas atividades e pelos slides.
  - `index.html` — só redireciona para `atividades/index.html`.
- **Links para o livro** são URLs absolutas (`https://henriquealvarenga.com/intencionalidade/...`),
  pois o livro é outro site. Âncoras usadas: `#sec-parks`, `#sec-whitman`, `#sec-evr`,
  `#sec-nomes-do-fenomeno` — se o livro renomear, atualizar `atividades/lib/*-data.js`.
- **Supabase Auth:** o painel usa `location.origin + location.pathname` como redirect do magic
  link — a URL do painel precisa estar nas *Redirect URLs* do projeto no Supabase.

## Lições de engenharia (reutilizáveis — valem para os outros sites do autor)

Diário detalhado em `atividades/_specs/ENGENHARIA-modos-campeonato.md`. Antes de mexer
em áudio, painel ou deploy, leia o checklist (§11) de lá. Armadilhas que já custaram tempo:

- **Web Audio mudo no Safari:** nunca use `exponentialRampToValueAtTime` no ganho (o
  WebKit não aplica → som inaudível, mas o indicador de áudio da aba acende). Use
  **rampas lineares**; espere o `resume()` (assíncrono) resolver antes de agendar;
  destrave o `AudioContext` no 1º gesto. (ENGENHARIA §7)
- **Ordem das abas do painel = ordem dos `<script>`** em `painel.html` (auto-registro
  via `registrarPainel`). Reordenar UI = reordenar `<script>`, não mexer no JS. (§3)
- **Uma tela, uma responsabilidade:** não repita o mesmo dado (ex.: placar) numa tela
  de gabarito *e* numa tela de pódio dedicada. (§4)
- **Cache de deploy:** no Safari o hard refresh é `Cmd+Option+R` (`Cmd+Shift+R` é Modo
  Leitura!). Valide deploy com cache-bust (`?cb=`) e conferindo o `headSha` do run. (§8)
- **Renomear arquivo:** `git mv` + `grep -rn`; atualize referência viva (`rota:`, `href`),
  preserve registro histórico nas specs. A ordem do fluxo mora num registry, não no nome. (§2)
- **Identidade compartilhada:** uma chave única de `localStorage` + boot-guard; sem
  re-login por página. (§5)
- **Agregar escalas diferentes:** normalize /100 + **clamp**; confira `maxPontos` contra
  a constante de score real. **Placar revelado rodada a rodada = acumulado progressivo**
  (corte pela posição no fluxo, não "tudo no banco"). (§6)
- **Login do painel (Supabase magic link):** o email embutido tem cota baixíssima
  (`429 over_email_send_rate_limit`) → **custom SMTP** antes de usar com a turma. Login
  quebrou? Cheque o status do `/auth/v1/otp` (429 = cota, não bug). (§12)

---

*Última atualização: setembro de 2026.*
