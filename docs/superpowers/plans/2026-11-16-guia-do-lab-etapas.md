# Guia do lab por etapas: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Objetivo:** levar a skill `guia-do-lab` além do setup, cobrindo as cinco etapas da aula, com um arquivo por etapa.

**Arquitetura:**
- O `SKILL.md` vira o ponto de entrada, com as regras comuns e o índice das etapas.
- O setup atual vai para `etapas/00-ambiente.md`.
- Cada etapa da aula ganha um arquivo em `etapas/`.
- Nenhum código de produto entra no template.

**Stack:** skill de projeto do Claude Code, em Markdown com frontmatter YAML. Os testes usam subagentes que fazem o papel do Claude diante de um aluno simulado, seguindo o TDD de skills.

**Spec:** `docs/superpowers/specs/2026-11-15-guia-do-lab-etapas-design.md`

## Restrições globais

- **Linguagem:** todo o texto é em português do Brasil, em linguagem simples para não-devs. O estilo é o do resto do repositório: frases curtas e títulos com só a primeira letra maiúscula.
- **Plataformas:** todo comando que o aluno roda aparece para macOS (Terminal, bloco `bash`) e para Windows (PowerShell, bloco `powershell`). Quando o comando é igual nos dois, o texto diz isso.
- **Template:** nenhum código de produto e nenhuma dependência nova.
- **Segredos:** chaves e segredos ficam só no `.env`. Nunca aparecem no chat, no código ou em commits.
- **Nomes exatos:**
  - `.claude/skills/guia-do-lab/SKILL.md`
  - `.claude/skills/guia-do-lab/etapas/00-ambiente.md`
  - `.claude/skills/guia-do-lab/etapas/01-arquitetura.md`
  - `.claude/skills/guia-do-lab/etapas/02-ui-ux.md`
  - `.claude/skills/guia-do-lab/etapas/03-autenticacao-pagamentos.md`
  - `.claude/skills/guia-do-lab/etapas/04-deploy-monitoramento.md`
  - `.claude/skills/guia-do-lab/etapas/05-ai-features.md`
  - `docs/arquitetura.md`
  - `docs/design-system.md`
- **Comandos de bibliotecas:** não ficam fixos na skill, porque o Claude do aluno consulta a documentação atual. A exceção são os comandos que o próprio aluno roda, como os do Git e do MCPJam.
- **Commits:** sem atribuição ao Claude, ou seja, sem `Co-Authored-By` e sem "Generated with". O único autor é huxdias@gmail.com.
- **Escrita da skill:** use a skill superpowers:writing-skills ao escrever cada arquivo.

## Como testar

Cada rodada de testes é um subagente `general-purpose` com o prompt abaixo. Só a lista de cenários muda de uma rodada para outra.

```
You are Claude Code running in /Users/punkmetrics/Sites/aiproductlab, talking to a workshop student who is not a developer. Read CLAUDE.md first. The project skill `guia-do-lab` is available: when the student's message matches its description in .claude/skills/guia-do-lab/SKILL.md, read that file and follow it, reading other files only when it tells you to. Do not modify files or run commands; where you would, write [AÇÃO: what you would do].

Each scenario is an independent session. For each one, write exactly the next reply you would send, in Portuguese, then one line "ARQUIVOS LIDOS:" listing the files you read for that scenario.

<cenários>
```

- Os resultados ficam no scratchpad da sessão, em `testes-guia/`, fora do repositório.
- Um cenário passa quando todas as verificações dele são verdadeiras.
- Para cada falha, ajuste o arquivo da etapa e rode o cenário de novo até ele passar.

## Foco de revisão

1. **Comando só de macOS para um aluno no Windows**, como `cp .env.example .env`: todo comando precisa ter a versão para PowerShell. O teste é a varredura da tarefa 8.
2. **Aluno volta numa sessão nova com a etapa 01 já feita**, ou seja, `docs/arquitetura.md` já existe: a skill pergunta se ele quer revisar ou seguir, sem reescrever o doc. O teste é o cenário A5, na tarefa 3.
3. **Aluno responde várias perguntas da etapa 01 numa mensagem só:** a skill registra todas e faz só a próxima pergunta em aberto. O teste é o cenário A4, na tarefa 3.
4. **Primeira chave sem `.env`**, quando só existe o `.env.example`: a skill guia a criação do `.env` a partir do `.env.example`, com o comando da plataforma do aluno. O teste é o cenário P3, na tarefa 5.
5. **Aluno pula para a etapa 05 sem login nem admin:** a skill diz que falta a etapa 03 e oferece fazê-la antes. O teste é o cenário M5, na tarefa 7.

---

### Task 1: linha de base

**Arquivos:**
- Criar: `testes-guia/baseline.md`, no scratchpad
- Commit: a spec e este plano

- [ ] **Passo 1:** confirme que `.claude/` e `CLAUDE.md` estão iguais ao commit `cbe08e7`.
  - Rode: `git diff --stat cbe08e7 -- .claude CLAUDE.md`
  - Esperado: nenhuma linha de saída.
- [ ] **Passo 2:** rode um subagente com os cenários R4, A1, U2, U3, P2, D2, M1 e M2, definidos nas tarefas seguintes.
- [ ] **Passo 3:** registre em `baseline.md` as verificações que falharam em cada cenário e as frases que mostram a justificativa do subagente.
  - Esperado: a maioria falha, porque a skill atual só cobre o setup.
- [ ] **Passo 4:** faça o commit da spec e do plano.
  - Rode: `git add docs/superpowers && git commit -m "docs: adiciona design e plano das etapas do guia do lab"`

### Task 2: ponto de entrada e etapa 00

**Arquivos:**
- Modificar: `.claude/skills/guia-do-lab/SKILL.md` (reescrita)
- Criar: `.claude/skills/guia-do-lab/etapas/00-ambiente.md`

**Interfaces:**
- Produz o índice do `SKILL.md`, com o número, o tema, o arquivo e os pré-requisitos de cada etapa:
  - 00: nenhum pré-requisito;
  - 01: 00;
  - 02: 01;
  - 03: 00 e 01;
  - 04: 00;
  - 05: 03.
- Produz também as regras comuns. Os arquivos de etapa não as repetem.

- [ ] **Passo 1:** confirme na documentação do Claude Code, com um subagente `claude-code-guide`:
  - se skills de projeto aceitam `argument-hint` no frontmatter;
  - se o argumento chega em `$ARGUMENTS`;
  - como uma skill cita arquivos da própria pasta.

  Use o que a documentação disser.
- [ ] **Passo 2:** mova o setup do `SKILL.md` atual para `etapas/00-ambiente.md`, sem mudar o comportamento.
  - Entram as regras de setup de "Como conduzir", as seções "Etapa 1" a "Etapa 5" e "Problemas comuns".
  - As seções "Etapa 1" a "Etapa 5" passam a se chamar "Passo 1" a "Passo 5", para não confundir com as etapas da aula.
- [ ] **Passo 3:** reescreva o `SKILL.md`.
  - **Frontmatter:**
    - `name: guia-do-lab`;
    - `description: Use quando um aluno do AI Product Lab quer preparar ou reproduzir o ambiente, quando npm install ou npm run dev falha no macOS ou no Windows, ou quando ele quer começar ou continuar uma etapa da aula: arquitetura, UI e design system, login e pagamentos, deploy e monitoramento, ou AI features.`;
    - `argument-hint`, conforme o passo 1.
  - **Seções:**
    - "Como escolher a etapa";
    - o índice;
    - "Regras de todas as etapas", com as regras da seção "SKILL.md" da spec, incluindo a da feature que ainda não existe e a da divergência do template;
    - "Temas que a aula ainda não alcançou", com a regra atual.
- [ ] **Passo 4:** teste com estes cenários.
  - **R2:** o aluno diz "quero começar o lab".
    - ARQUIVOS LIDOS tem só `SKILL.md` e `00-ambiente.md`.
    - A resposta pergunta a plataforma antes de qualquer comando e faz uma pergunta só.
  - **R3:** o aluno já disse que usa Windows e manda: "rodei npm install e deu 'a execução de scripts foi desabilitada neste sistema'".
    - A resposta explica que é uma configuração de segurança da conta.
    - Ela pede a concordância do aluno antes de `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
    - Ela não mostra nenhum comando de macOS.
  - **R4:** o aluno manda "bora pra próxima etapa", sem outro contexto.
    - A resposta pergunta em qual etapa a turma está.
    - Nenhum arquivo de etapa é lido.
- [ ] **Passo 5:** faça o commit.
  - Rode: `git add .claude && git commit -m "feat: separa o setup em etapas no guia do lab"`

### Task 3: etapa 01, arquitetura

**Arquivos:**
- Criar: `.claude/skills/guia-do-lab/etapas/01-arquitetura.md`

**Interfaces:**
- Produz o formato de `docs/arquitetura.md`:
  - uma seção por pergunta, com os mesmos títulos da tabela da spec, e a escolha do aluno;
  - quando a escolha difere do template, uma linha "Difere do template: ...".
- Produz a seção `## Decisões do projeto` no fim do `CLAUDE.md`, criada se ainda não existir. A etapa 01 acrescenta a ela a linha exata: `Siga as decisões de arquitetura em docs/arquitetura.md.`

- [ ] **Passo 1:** escreva o arquivo com:
  - as 11 perguntas e as recomendações exatamente como na tabela da spec, uma pergunta por mensagem;
  - a regra das perguntas abertas: um exemplo só se o aluno travar;
  - a regra da escolha diferente: ela é registrada e nenhum código muda;
  - o fechamento: resumo, confirmação do aluno, `docs/arquitetura.md` e a linha no `CLAUDE.md`;
  - o caso do doc que já existe: perguntar se o aluno quer revisar ou seguir.
- [ ] **Passo 2:** teste com estes cenários.
  - **A1:** o aluno manda "/guia-do-lab 1".
    - A resposta faz só a pergunta 1, recomendando TypeScript, Next.js na web e Hono na API.
    - Ela não traz nenhum [AÇÃO] que escreva código.
  - **A2:** depois da pergunta 1, o aluno responde "prefiro Python".
    - A resposta diz que isso difere do template e que nada muda no código agora.
    - Ela faz só a pergunta 2.
  - **A3:** o histórico tem as 11 respostas.
    - A resposta mostra o resumo dos 11 itens, pede confirmação e ainda não escreve nada.
    - Depois de "pode salvar", vem um [AÇÃO] que cria `docs/arquitetura.md` e acrescenta a linha exata ao `CLAUDE.md`.
  - **A4:** depois da pergunta 1, o aluno responde "TypeScript, monorepo, front separado da API e Supabase".
    - A resposta registra as quatro respostas e faz só a pergunta 5.
  - **A5:** `docs/arquitetura.md` já existe com as 11 decisões, e o aluno manda "/guia-do-lab 1".
    - A resposta pergunta se o aluno quer revisar ou seguir.
    - Ela não traz nenhum [AÇÃO] que reescreva o doc.
  - **A6:** no meio da etapa, o aluno diz "decide tudo por mim".
    - A resposta mostra a recomendação da pergunta atual e pede que o aluno confirme.
    - Ela não registra várias decisões de uma vez.
- [ ] **Passo 3:** faça o commit.
  - Rode: `git add .claude && git commit -m "feat: adiciona a etapa de arquitetura ao guia do lab"`

### Task 4: etapa 02, UI e UX

**Arquivos:**
- Criar: `.claude/skills/guia-do-lab/etapas/02-ui-ux.md`

**Interfaces:**
- Consome a seção `## Decisões do projeto` da tarefa 3.
- Produz a linha exata `Siga o design system descrito em docs/design-system.md.` nessa seção.

- [ ] **Passo 1:** escreva o arquivo com os seis itens da spec, na ordem.
  - **Motion:** pausa do instrutor, e a skill não recomenda nenhuma biblioteca.
  - **Showcase:** pausa do instrutor, seguindo `apps/web/app/showcase/INSTRUCOES.md`. A skill retoma só quando o aluno disser que o showcase está pronto.
  - **Doc:** `docs/design-system.md`, com resumo e confirmação, escrito depois do item 5 e antes do item 6.
  - **Demo:** uma tela de uma feature, feita só com os componentes do showcase.
- [ ] **Passo 2:** teste com estes cenários.
  - **U1:** `docs/arquitetura.md` existe, e o aluno manda "/guia-do-lab 2".
    - A resposta explica em poucas linhas o que é uma biblioteca de UI.
    - Ela pergunta entre shadcn, Base UI, Radix ou outra e recomenda shadcn.
    - Ela faz uma pergunta só.
  - **U2:** o aluno responde "shadcn".
    - A resposta faz a pergunta de motion e diz que o instrutor vai indicar a biblioteca.
    - Ela não recomenda nenhuma biblioteca de motion.
  - **U3:** o aluno pede "pula essa parte do showcase e cria você os componentes".
    - A resposta diz que o instrutor conduz o showcase e espera o aviso do aluno.
    - Ela não traz nenhum [AÇÃO] que crie componentes.
  - **U4:** o histórico tem as respostas dos itens 1, 2, 4 e 5.
    - A resposta mostra o resumo e pede confirmação.
    - Depois de "pode salvar", vem um [AÇÃO] que cria `docs/design-system.md` e acrescenta a linha exata.
- [ ] **Passo 3:** faça o commit.
  - Rode: `git add .claude && git commit -m "feat: adiciona a etapa de UI e UX ao guia do lab"`

### Task 5: etapa 03, autenticação e pagamentos

**Arquivos:**
- Criar: `.claude/skills/guia-do-lab/etapas/03-autenticacao-pagamentos.md`

**Interfaces:**
- Produz o trecho "Criar o `.env`", que as etapas 04 e 05 citam em vez de repetir:
  - macOS: `cp .env.example .env`
  - Windows: `Copy-Item .env.example .env`

- [ ] **Passo 1:** escreva o arquivo com os três blocos da spec, mais o trecho "Criar o `.env`".
  - **Login:** Supabase Auth com Google.
    - Pausa do instrutor para o projeto do Google.
    - O login acontece na web, a API confere a sessão e os dados passam só pela API.
  - **Orgs, usuários e workspaces:** o modelo é definido com o superpowers.
    - Pausa do instrutor se o superpowers não estiver instalado.
  - **Pagamentos:** assinatura de teste pelo Stripe Checkout, com webhook para a API.
    - Pausa do instrutor para os dados da conta de teste.
    - O aluno nunca usa um cartão real.
- [ ] **Passo 2:** teste com estes cenários.
  - **R1:** o aluno manda "/guia-do-lab 3".
    - ARQUIVOS LIDOS tem o `SKILL.md` e só o arquivo da etapa 03 entre os arquivos de etapa.
    - A resposta confere os pré-requisitos (etapas 00 e 01) e não faz perguntas da etapa 01.
  - **P1:** os pré-requisitos estão feitos, e o aluno começa o login.
    - A resposta fala de Supabase Auth com Google.
    - Ela pausa para as instruções do instrutor sobre o projeto do Google.
    - Ela não inventa passos no Google Cloud.
  - **P2:** o aluno manda "minha chave do stripe é sk_test_51Habc123".
    - A resposta pede para não colar chaves no chat e guia o aluno a colocar a chave no `.env`.
    - Ela não repete o valor da chave.
  - **P3:** o aluno usa Windows, ainda não existe `.env`, e a primeira chave aparece.
    - A resposta guia `Copy-Item .env.example .env`.
    - Ela não mostra `cp`.
  - **P4:** o aluno pergunta "como eu modelo orgs, usuários e workspaces?".
    - A resposta sugere definir com o brainstorming do superpowers e não propõe um modelo.
  - **P5:** `docs/arquitetura.md` diz Neon.
    - A resposta mantém o login pelo Supabase Auth.
    - Ela aponta a divergência e pergunta como seguir.
  - **P6:** o aluno chega aos pagamentos.
    - A resposta fala de assinatura de teste pelo Stripe Checkout, com webhook para a API.
    - Ela pausa para os dados da conta de teste.
- [ ] **Passo 3:** faça o commit.
  - Rode: `git add .claude && git commit -m "feat: adiciona a etapa de login e pagamentos ao guia do lab"`

### Task 6: etapa 04, deploy, infraestrutura e monitoramento

**Arquivos:**
- Criar: `.claude/skills/guia-do-lab/etapas/04-deploy-monitoramento.md`

**Interfaces:**
- Consome o trecho "Criar o `.env`" da tarefa 5.

- [ ] **Passo 1:** escreva o arquivo com os blocos da spec.
  - **Opções de deploy:** Vercel, Railway, GCP e AWS, apresentadas pelo instrutor (pausa do instrutor).
    - A recomendação são dois projetos da Vercel, um por pasta de app.
  - **Repositório próprio:** os comandos são iguais nas duas plataformas.
    1. `git remote -v` para conferir para onde a cópia aponta.
    2. Criar um repositório vazio no site do GitHub.
    3. `git remote set-url origin <URL>`.
    4. `git push -u origin main`.
  - **CI:** o aluno pede ao Claude um CI básico no GitHub Actions, em cada PR para `main`, com instalação e build.
  - **Monitoramento:**
    - a skill mostra Sentry, Datadog, PostHog e GA4;
    - ela incentiva o aluno a criar uma conta gratuita no PostHog, e o próprio aluno cria a conta;
    - o web analytics é o básico;
    - a chave vai para o `.env` e para as variáveis do projeto na Vercel.
- [ ] **Passo 2:** teste com estes cenários.
  - **D1:** o aluno manda "/guia-do-lab 4".
    - A resposta traz a pausa do instrutor ou a recomendação de dois projetos da Vercel.
    - Ela não traz nenhum [AÇÃO] de deploy antes da pausa.
  - **D2:** o aluno diz "quero criar o CI", e o histórico mostra `git remote -v` apontando para `punkmetrics/aiproductlab`.
    - A resposta guia a criação do repositório próprio antes do CI, com `git remote set-url origin`.
  - **D3:** o aluno pede "faz um CI completo com testes, lint e deploy automático".
    - A resposta fica no CI básico, com instalação e build em PRs para `main`.
    - Ela diz que o instrutor explica o resto.
  - **D4:** o aluno chega ao monitoramento.
    - A resposta cita as quatro ferramentas e incentiva o PostHog gratuito.
    - Ela não cria a conta pelo aluno.
    - A chave vai para o `.env` e para as variáveis da Vercel.
- [ ] **Passo 3:** faça o commit.
  - Rode: `git add .claude && git commit -m "feat: adiciona a etapa de deploy e monitoramento ao guia do lab"`

### Task 7: etapa 05, AI features

**Arquivos:**
- Criar: `.claude/skills/guia-do-lab/etapas/05-ai-features.md`

**Interfaces:**
- Consome o trecho "Criar o `.env`" da tarefa 5.
- Produz a variável `MCP_ABERTO=true`, que liga o MCP aberto. Ela fica só no `.env` local e nunca nas variáveis da Vercel.

- [ ] **Passo 1:** confirme na documentação do MCPJam o comando atual para rodar o inspector localmente e se ele é igual no macOS e no Windows.
- [ ] **Passo 2:** escreva o arquivo com os três blocos da spec.
  - **MCP:**
    - as ferramentas são de uma feature só e chamam os mesmos `services/` do REST;
    - o MCP só liga com `MCP_ABERTO=true`;
    - a skill traz o aviso do risco de publicá-lo aberto;
    - o MCPJam entra com o comando do passo 1.
  - **Chat:**
    - usa o Vercel AI SDK, com o endpoint na API;
    - o admin escolhe o provider e o modelo, no padrão OpenAI ou no OpenRouter;
    - tem system prompt, tool calling e o campo de contexto no admin;
    - as chaves ficam no `.env`;
    - o acesso ao admin usa os papéis da etapa 03.
  - **Generative UI:** pausa do instrutor.
- [ ] **Passo 3:** teste com estes cenários.
  - **M1:** a feature e o login existem, e o aluno manda "/guia-do-lab 5".
    - A resposta começa pelo MCP, com as ferramentas de uma feature chamando os mesmos `services/`.
    - Ela diz que o MCP aberto só liga com `MCP_ABERTO` no `.env` local.
  - **M2:** o aluno pede "quero publicar o MCP aberto na Vercel".
    - A resposta explica o risco e diz que é preciso protegê-lo antes.
    - Ela não traz nenhum [AÇÃO] que configure `MCP_ABERTO` na Vercel.
  - **M3:** o aluno pergunta "onde coloco a chave da OpenRouter? no admin?".
    - A resposta diz que a chave vai no `.env` e que o admin só escolhe o provider e o modelo.
  - **M4:** o aluno diz "vamos fazer a Generative UI no MCP".
    - A resposta traz a pausa do instrutor.
  - **M5:** o histórico não tem a etapa 03 feita.
    - A resposta diz que o admin depende do login da etapa 03 e oferece fazê-lo antes.
  - **M6:** o aluno usa Windows, a primeira versão do MCP está pronta, e ele pergunta "como eu testo?".
    - A resposta traz o comando do MCPJam do passo 1 e diz que ele roda localmente.
  - **M7:** o produto ainda não tem nenhuma feature.
    - A resposta diz que o instrutor orienta essa parte e espera.
- [ ] **Passo 4:** faça o commit.
  - Rode: `git add .claude && git commit -m "feat: adiciona a etapa de AI features ao guia do lab"`

### Task 8: ajustes fora da skill e varredura final

**Arquivos:**
- Modificar `CLAUDE.md`:
  - na linha de `apps/api`, troque "publicados no Railway" por "publicados na Vercel";
  - na seção Setup, troque a frase por "Para preparar o ambiente, resolver problemas no setup ou seguir uma etapa da aula, use a skill `guia-do-lab`.".
- Modificar `README.md`: na linha da estrutura, troque "skill que guia o setup" por "skill que guia o setup e as etapas da aula".
- Modificar `docs/superpowers/specs/2026-11-01-template-base-design.md`:
  - em Arquitetura, troque "O destino de publicação é o Railway." por "O destino de publicação é a Vercel.";
  - em Fora do escopo, troque "Configuração de deploy na Vercel e no Railway." por "Configuração de deploy na Vercel.".

- [ ] **Passo 1:** aplique as trocas.
  - Rode: `grep -rn "Railway" CLAUDE.md README.md docs/superpowers/specs/2026-11-01-template-base-design.md .claude`
  - Esperado: o Railway aparece só na etapa 04, entre as opções apresentadas pelo instrutor.
- [ ] **Passo 2:** faça a varredura das plataformas. Um subagente lê todos os arquivos de `etapas/` e lista cada comando que o aluno roda sem a versão de macOS e de Windows e sem a frase de que é igual nas duas plataformas.
  - Esperado: a lista sai vazia.
- [ ] **Passo 3:** faça a revisão final. Um revisor novo lê a spec e todos os arquivos da skill e lista cada requisito da spec sem um trecho correspondente na skill.
  - Esperado: a lista sai vazia.
- [ ] **Passo 4:** faça o commit.
  - Rode: `git add CLAUDE.md README.md docs .claude && git commit -m "docs: atualiza deploy e referências ao guia do lab"`

### Task 9: publicação

- [ ] **Passo 1:** confira o autor.
  - Rode: `git config user.email`
  - Esperado: `huxdias@gmail.com`
- [ ] **Passo 2:** confira que nenhum commit novo tem atribuição.
  - Rode: `git log origin/main..HEAD --format=%B | grep -ciE "co-authored|generated with"`
  - Esperado: `0`
- [ ] **Passo 3:** publique.
  - Rode: `git push origin main` e depois `git status -sb`
  - Esperado: `main...origin/main`, sem commits à frente.
