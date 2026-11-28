# Etapa 04: deploy, CI e monitoramento

Leva o produto do aluno para o ar, com um CI básico e monitoramento. Siga as partes em ordem, uma de cada vez.

## Antes de começar

Confira o pré-requisito: a etapa 00, com o projeto rodando.

## Parte 1: onde publicar

- **Pausa do instrutor:** ele apresenta Vercel, Railway, Google Cloud (GCP) e AWS. Não faça deploy antes dessa apresentação.
- **Recomendação da aula:** depois da apresentação, recomende publicar a web e a API na Vercel.
  - São dois projetos da Vercel, ligados ao mesmo repositório do aluno.
  - Um projeto aponta para a pasta `apps/web`, e o outro, para `apps/api`.
- **Variáveis:** as chaves do `.env` que cada app usa no ar vão para as variáveis de ambiente do projeto dele na Vercel, nunca para o código.

## Parte 2: repositório próprio

Antes do CI e do deploy, a cópia do aluno precisa apontar para um repositório dele no GitHub. Os comandos desta parte são iguais no macOS e no Windows.

1. Confira para onde a cópia aponta.

   ```bash
   git remote -v
   ```

   Se aparecer `punkmetrics/aiproductlab`, a cópia ainda aponta para o template, e o aluno não tem permissão para enviar código para lá.
2. Peça ao aluno para criar um repositório vazio no site do GitHub, sem README e sem `.gitignore`, e copiar o endereço dele.
3. Aponte a cópia para o repositório novo, trocando `<endereço>` pelo que o aluno copiou.

   ```bash
   git remote set-url origin <endereço>
   ```

4. Envie o código.

   ```bash
   git push -u origin main
   ```

## Parte 3: CI

- **Pré-requisito:** o repositório próprio, da parte 2.
- **Pedido:** guie o aluno a pedir ao Claude um CI básico no GitHub Actions. Esse CI roda a cada PR para a branch `main`, instala as dependências e roda o build. Sugira um pedido como este: "cria um CI básico no GitHub Actions que rode a cada PR para a main, instalando as dependências e rodando o build".
- **Limite:** fique só nesse CI básico. Testes, lint e deploy pelo CI o instrutor explica na hora.
- **Dica de segurança:** depois do CI, conte em uma ou duas frases que o Claude Code tem routines, que rodam na nuvem em horários marcados ou quando algo acontece no GitHub, e que dá para usá-las numa revisão de segurança do projeto. O CI confere se o build passa, e a routine pode procurar chaves expostas e falhas de acesso. Recomende começar com ela só relatando, sem alterar código. Não configure nada: se o instrutor quiser demonstrar, ele conduz.

## Parte 4: monitoramento

- **Ferramentas:** mostre, em uma frase cada, que existem:
  - Sentry, para erros;
  - Datadog, para infraestrutura e logs;
  - PostHog, para analytics do produto;
  - GA4, o analytics do Google.
- **PostHog:** incentive o aluno a criar uma conta gratuita no PostHog e a instalar o web analytics básico.
  - O próprio aluno cria a conta, no site do PostHog. Você não cria contas.
  - A chave do projeto no PostHog vai para o `.env` e para as variáveis do projeto da web na Vercel.

## Parte 5: enxergar o pipeline

- **Pausa do instrutor:** ele demonstra o [pipeline-board](https://github.com/lucianfialho/pipeline-board), um plugin do Claude Code que desenha o pipeline num quadro interativo. Não instale nem rode o plugin antes da demonstração.
