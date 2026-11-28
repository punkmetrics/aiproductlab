# Guia do lab por etapas: design

- **Data:** 2026-11-15
- **Status:** aprovada

## Objetivo

A skill `guia-do-lab` hoje só leva o aluno até o ambiente rodando. Este ciclo acrescenta as cinco etapas da aula, ditadas pelo instrutor em 2026-11-15:

1. Definição de arquitetura da aplicação.
2. UI e UX com LLMs para protótipos e MVPs.
3. Autenticação e pagamentos no produto.
4. Deploy, infraestrutura e monitoramento.
5. AI features no produto.

A skill conduz a conversa e as decisões. Quem constrói o produto é o aluno, na própria cópia do template, com o Claude.

## Por que

Os alunos são não-devs (PMs e founders). Sem um roteiro, o Claude tende a decidir por eles, fazer várias perguntas de uma vez ou adiantar o que o instrutor vai mostrar. A skill mantém o ritmo da aula e a mesma condução para todos os alunos, no macOS e no Windows.

## Metas

- Cada etapa segue o conteúdo ditado, na ordem ditada.
- Uma pergunta por mensagem, em linguagem simples.
- A skill para nos pontos que o instrutor conduz e só retoma quando o aluno avisa que pode seguir.
- Comandos que o aluno roda aparecem para macOS (Terminal) e Windows (PowerShell).

## Fora do escopo

- Código de produto no template. O template continua só com o esqueleto, e cada aluno constrói as features na própria cópia durante a aula.
- Comandos fixos de bibliotecas (shadcn, Supabase, Stripe, AI SDK, PostHog e outras). Na hora de construir, o Claude do aluno consulta a documentação atual. A exceção são os comandos que o próprio aluno roda, como o do MCPJam.
- Substituir o instrutor nas partes que ele conduz.
- A definição do produto do aluno e a construção das features dele. O instrutor orienta cada turma na aula.
- Um passo para atualizar a cópia do aluno com correções do template durante o workshop. Se isso for necessário, a skill vira plugin (abordagem B).

## O que seria uma falha, mesmo funcionando

- A skill decidir pelo aluno ou fazer várias perguntas na mesma mensagem.
- A skill avançar sobre uma parte que o instrutor conduz.
- Uma chave ou um segredo sair do `.env`, aparecer no chat ou entrar em um commit.
- A skill inventar etapa, ferramenta ou funcionalidade além do que foi ditado.

## Abordagens

O instrutor deixou a escolha entre skill e plugin para o construtor ("o que funcionar melhor").

- **A. Uma skill no template, com um arquivo por etapa (escolhida).** O `SKILL.md` traz as regras de condução e o índice, e cada etapa fica em um arquivo que o Claude só lê quando o aluno chega nela. A skill vem junto com a cópia, sem instalação, e o Claude Code a encontra sozinho no macOS e no Windows. A desvantagem é que uma correção feita no template durante o workshop só chega ao aluno se ele atualizar a cópia.
- **B. Plugin em um marketplace.** Com o plugin, o instrutor consegue publicar correções durante o workshop. Em troca, o aluno não-dev precisa de um passo a mais de instalação, e o marketplace num repositório privado exige que o Git do aluno esteja autenticado. O template ainda precisaria existir para a estrutura de pastas.
- **C. Uma skill por etapa no template.** Cada etapa vira um comando próprio, mas as regras comuns se repetem em seis arquivos e seis descrições competem para disparar.

A abordagem A foi escolhida porque cada aluno já copia o template, e isso basta para a skill chegar até ele. Se o instrutor quiser corrigir a skill durante o workshop, ela pode virar um plugin depois, sem mudar o conteúdo.

## Estrutura

```
.claude/skills/guia-do-lab/
├── SKILL.md                         regras de condução e índice das etapas
└── etapas/
    ├── 00-ambiente.md               setup atual, movido do SKILL.md
    ├── 01-arquitetura.md
    ├── 02-ui-ux.md
    ├── 03-autenticacao-pagamentos.md
    ├── 04-deploy-monitoramento.md
    └── 05-ai-features.md
```

## SKILL.md

- **Descrição:** dispara quando o aluno quer preparar o ambiente, quando o setup falha, ou quando ele quer começar ou continuar uma etapa da aula (arquitetura, UI e design system, login e pagamentos, deploy e monitoramento, AI features).
- **Chamada direta:** o aluno pode chamar `/guia-do-lab` seguido do número da etapa, por exemplo `/guia-do-lab 3`.
- **Escolha da etapa:** pelo número recebido ou pelo que o aluno disser. Se não estiver claro, a skill pergunta em qual etapa a turma está. Ela lê só o arquivo daquela etapa.
- **Regras comuns a todas as etapas:**
  - Perguntar a plataforma antes do primeiro comando e mostrar só os comandos dela.
  - Fazer uma pergunta por mensagem e dizer o que um comando faz antes de pedir que o aluno o rode.
  - Nunca escolher pelo aluno. Quando houver recomendação, apresentar como recomendação.
  - Chaves e segredos ficam só no `.env`. Se o aluno colar uma chave no chat, avisar e pedir para colocá-la no `.env`.
  - Nas pausas do instrutor, dizer que essa parte será conduzida por ele e esperar o aluno avisar que pode seguir.
  - Antes de começar uma etapa, conferir os pré-requisitos dela. Se faltar algum, dizer o que falta e oferecer fazer antes.
  - Quando a etapa precisa de uma feature do produto que ainda não existe, dizer que o instrutor orienta essa parte e esperar o aluno avisar que pode seguir.
  - As etapas partem do template. Quando o `docs/arquitetura.md` do aluno diverge do template num ponto que a etapa usa, a skill avisa o que muda e pergunta ao aluno como seguir.
- **Temas que a aula ainda não alcançou:** a regra atual continua valendo. Se o aluno pedir um tema antes da aula chegar nele, a skill diz que ele será construído com a turma. Se o aluno insistir, ela atende, porque a cópia é dele.

## Etapa 00: ambiente

É o conteúdo atual do `SKILL.md`, sem mudança de comportamento: versões, instalação, clone, `npm install`, `npm run dev`, confirmação e problemas comuns.

## Etapa 01: arquitetura

A etapa usa descoberta guiada: cada pergunta recomenda o que o template já tem. Quando o aluno escolhe outra coisa, o doc registra a escolha e em que ela difere do template, e nenhum código muda nesta etapa.

As perguntas vêm uma por mensagem, nesta ordem. Os tópicos que o instrutor ditou juntos viram uma pergunta para cada item, porque o ditado pede "cada uma em uma pergunta por vez".

| # | Pergunta | Recomendação |
|---|---|---|
| 1 | Linguagem e framework preferidos (Next, React, TypeScript, Python e outros) | TypeScript, Next.js na web e Hono na API |
| 2 | Como a aplicação se organiza: monorepo ou aplicações separadas | Monorepo |
| 3 | O front-end vive independente da API? | Sim, a web só fala com a API |
| 4 | Banco de dados e integrações: SQLite, Supabase ou Neon | Supabase |
| 5 | Declarações explícitas na configuração do projeto | Textos da interface em português, comandos do projeto e chaves só no `.env` |
| 6 | Rotinas obrigatórias | Antes de cada commit, rodar o build e conferir que nenhuma chave vai junto |
| 7 | Padrão visual: de onde consumir os padrões | O design system do `showcase`, criado na etapa 02 |
| 8 | Dos e don'ts | Focar no que evitar, com regras específicas e o motivo de cada uma |
| 9 | Regras de acesso ao banco de dados | Só a API acessa o banco |
| 10 | Regras para criar as integrações via API | Nenhuma; pergunta aberta |
| 11 | Comportamento da interface | Nenhuma; pergunta aberta |

Nas perguntas abertas, a skill dá um exemplo curto só se o aluno travar.

Ao final, a skill mostra um resumo de tudo o que foi definido e pede a confirmação do aluno. Com a confirmação, ela escreve `docs/arquitetura.md` e acrescenta ao `CLAUDE.md` uma linha pedindo para seguir esse doc.

## Etapa 02: UI e UX

As perguntas vêm uma por mensagem:

1. **Biblioteca de UI:** a skill explica em poucas linhas como se usa uma biblioteca de UI e pergunta qual o aluno quer: shadcn, Base UI, Radix ou outra. A recomendação é shadcn, que monta os componentes sobre Radix ou Base UI e combina com o Tailwind do template.
2. **Skills de motion:** pergunta quais bibliotecas de skills de motion o aluno vai usar e espera a indicação do instrutor (pausa do instrutor). A skill não recomenda nenhuma.
3. **Pausa do instrutor: showcase.** O instrutor conduz a criação do showcase do tema ou do design system do aluno, seguindo `apps/web/app/showcase/INSTRUCOES.md`. A skill só retoma quando o aluno avisar que o showcase está pronto.
4. **Regras de expansão:** quais são as regras para a biblioteca crescer e como elas funcionam. Pergunta aberta.
5. **Leitura pelo LLM:** como o LLM deve ler a biblioteca e quais providers mantêm a consistência. Pergunta aberta.
6. **Demo de protótipo:** depois da demonstração do instrutor, a skill ajuda o aluno a prototipar a tela de uma feature do produto dele usando só os componentes do showcase.

Ao final das perguntas 1, 2, 4 e 5, a skill mostra um resumo, pede confirmação, escreve `docs/design-system.md` e acrescenta ao `CLAUDE.md` uma linha pedindo para seguir esse doc.

## Etapa 03: autenticação e pagamentos

- **Pré-requisitos:** etapas 00 e 01.
- **Login:** a estrutura é pré-definida: Supabase Auth com login do Google, mesmo que o aluno tenha escolhido outro banco na etapa 01.
  - **Pausa do instrutor:** ele passa as instruções do projeto do Google já preparado para a integração.
  - O login acontece na web, a API confere a sessão, e os dados continuam passando só pela API.
- **Orgs, usuários e workspaces:** a skill incentiva o aluno a definir a arquitetura e as regras com o plugin superpowers (skill de brainstorming).
  - Ela não define esse modelo pelo aluno.
  - **Pausa do instrutor:** se o superpowers não estiver instalado, a skill espera a instrução de instalação do instrutor.
- **Pagamentos:** assinatura com o Stripe em modo de teste.
  - O aluno assina um plano de teste pelo Stripe Checkout, e o Stripe avisa a API, por webhook, para marcar o plano no produto.
  - **Pausa do instrutor:** ele fornece os dados da conta de teste.
  - As chaves vão para o `.env`, e o aluno nunca usa um cartão real.

## Etapa 04: deploy, infraestrutura e monitoramento

- **Opções de deploy:** o instrutor apresenta Vercel, Railway, Google Cloud (GCP) e AWS (pausa do instrutor).
  - A recomendação é publicar a web e a API na Vercel, como dois projetos da Vercel ligados ao mesmo repositório, cada um apontando para a pasta do seu app.
- **Repositório próprio:** a cópia do aluno ainda aponta para o template. Antes do CI e do deploy, a skill guia o aluno a criar o próprio repositório no GitHub e a apontar a cópia para ele, com comandos para macOS e Windows.
- **CI:** a skill guia o aluno a pedir ao Claude um CI básico no GitHub Actions, que roda a cada PR para a branch `main` com instalação e build.
  - A skill fica só no básico. O resto o instrutor explica na hora.
  - Depois do CI, a skill dá uma dica sobre usar routines do Claude Code numa revisão de segurança, sem configurar nada.
- **Monitoramento:** a skill mostra que existem Sentry, Datadog, PostHog e GA4.
  - Ela incentiva o aluno a criar uma conta gratuita no PostHog e a instalar o web analytics básico.
  - O próprio aluno cria a conta. A chave vai para o `.env` e para as variáveis do projeto na Vercel.
- **Enxergar o pipeline:** o instrutor demonstra o plugin pipeline-board (pausa do instrutor). A skill não instala nem roda o plugin antes da demonstração.

## Etapa 05: AI features

A etapa guia três funcionalidades.

### MCP

- O MCP espelha as features do produto como ferramentas de leitura e escrita e segue estritamente a API: ele chama os mesmos `services/` que o REST.
- Na aula, o MCP fica aberto, sem autenticação, para ir mais rápido.
- A primeira versão tem um conjunto mínimo de ferramentas de uma única feature.
- Com essa versão pronta, a skill incentiva o aluno a instalar e rodar o MCPJam localmente para testar e simular. O comando é o mesmo no macOS e no Windows e deve ser conferido na documentação na hora de escrever a skill.
- O MCP aberto roda só no computador do aluno. Como a API já está na Vercel desde a etapa 04, e cada push pode publicar de novo, o MCP só é ligado quando uma variável do `.env` local pede, e essa variável não é configurada na Vercel. A skill explica o motivo: aberto e publicado, qualquer pessoa com o endereço poderia ler e alterar os dados. Para publicá-lo, o aluno precisa protegê-lo antes.

### Chat AI

- O chat dentro do produto usa o Vercel AI SDK.
- No admin do produto, a pessoa escolhe o provider e o modelo, no padrão de API da OpenAI e no OpenRouter.
- O chat tem system prompt, tool calling e injeção de contexto personalizado. O contexto vem de um campo de texto no admin, onde o usuário define regras e comportamentos do chat.
- O endpoint do chat fica na API, para que o tool calling use os mesmos `services/` do REST e do MCP.
- As chaves dos providers ficam no `.env`. O admin escolhe só o provider e o modelo.
- O acesso ao admin usa os papéis definidos na etapa 03.
- Ainda falta uma parte do ditado sobre uma skill do chat (ver Pendências).

### Generative UI no MCP

É um módulo à parte, todo conduzido pelo instrutor. A skill só marca a pausa.

## Mudanças fora da skill

- **`CLAUDE.md`:** "API e MCP em Hono, publicados no Railway" passa a dizer Vercel, seguindo a recomendação da etapa 04.
- **Spec do template (`2026-11-01-template-base-design.md`):** o destino da API passa de Railway para Vercel.
- **`README.md`:** a linha da estrutura passa a dizer que a skill guia o setup e as etapas da aula.

## Verificação

A verificação segue o TDD de skills:

1. **Linha de base:** para cada etapa, um subagente faz o papel de aluno, sem a skill, nestes cenários:
   - começar a etapa;
   - escolher algo diferente da recomendação;
   - tentar passar por uma pausa do instrutor;
   - pedir um tema de etapa futura;
   - colar uma chave no chat.
2. **Com a skill:** os mesmos cenários. Em cada um, conferir que:
   - a skill faz uma pergunta por mensagem e pergunta a plataforma;
   - ela respeita as pausas;
   - as chaves vão para o `.env`;
   - na etapa 01, ela escreve o doc.
3. **Setup:** a etapa 00 continua passando nos cenários do ciclo anterior.
4. **Chamada direta:** `/guia-do-lab 3` lê o arquivo da etapa 03.

## Pendências do instrutor

- **Frase incompleta da etapa 05:** o ditado termina em "habilitando um skill que inicialmente vamos fazer deixando que." A parte que falta entra na skill quando for completada.
- **Conteúdo do `INSTRUCOES.md` do showcase.**
- **Fora desta skill:** como os alunos recebem acesso ao repositório privado, e a remoção de `docs/superpowers/` antes da distribuição.
- **Limitação conhecida:** os comandos de Windows vêm da documentação oficial, mas não foram executados.

## Escolhas feitas na escrita do design

Estes pontos não foram ditados. Eles foram decididos na escrita e podem ser corrigidos pelo instrutor:

- Uma skill no template, com um arquivo por etapa, em vez de plugin.
- Web e API na Vercel como dois projetos do mesmo repositório, e Railway substituído por Vercel no `CLAUDE.md` e na spec do template.
- Na etapa 01, uma pergunta para cada item ditado, o doc em `docs/arquitetura.md` e uma linha no `CLAUDE.md` apontando para ele.
- Na etapa 02:
  - shadcn como recomendação;
  - o doc em `docs/design-system.md`;
  - a demo como o aluno prototipando uma tela só com os componentes do showcase.
- Na etapa 03, o login na web, a sessão conferida pela API e os dados passando só pela API.
- Na etapa 04, o aluno cria o próprio repositório no GitHub antes do CI e do deploy.
- Na etapa 05:
  - o MCP aberto ligado só no computador do aluno;
  - o endpoint do chat na API;
  - as chaves dos providers no `.env`;
  - o acesso ao admin pelos papéis da etapa 03.
- Quando o aluno diverge do template na etapa 01, as etapas seguintes avisam e perguntam como seguir.
- Nenhum passo de atualização do template durante o workshop.

## Deixado ao construtor

- A redação exata das perguntas e dos exemplos.
- O formato interno de cada arquivo de etapa.
