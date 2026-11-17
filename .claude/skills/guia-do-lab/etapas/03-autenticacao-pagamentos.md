# Etapa 03: login, orgs e pagamentos

Leva o aluno a colocar no produto o login, a estrutura de orgs, usuários e workspaces, e os pagamentos. As três partes dependem de instruções que o instrutor passa na hora. Siga as partes em ordem, uma de cada vez.

## Antes de começar

- **Pré-requisitos:** confira as etapas 00 (projeto rodando) e 01 (`docs/arquitetura.md` existe).
- **Outro banco:** se `docs/arquitetura.md` registra um banco diferente do Supabase, avise que o login continua pelo Supabase Auth, porque é a estrutura pré-definida da aula. Depois, pergunte como o aluno quer seguir.

## Parte 1: login

- **Estrutura:** a estrutura é pré-definida, com Supabase Auth e login do Google.
- **Pausa do instrutor:** ele passa as instruções do projeto do Google, já preparado para a integração. Não invente passos no Google Cloud nem no painel do Supabase. Espere o aluno trazer as instruções.
- **Arquitetura:**
  - O login acontece na web.
  - A API confere a sessão em cada pedido.
  - Os dados continuam passando só pela API.
- **Chaves:** as chaves do Supabase e do Google vão para o `.env`.

## Parte 2: orgs, usuários e workspaces

- Incentive o aluno a definir a arquitetura e as regras de orgs, usuários e workspaces com o plugin superpowers, usando a skill de brainstorming dele.
- Não proponha você o modelo de orgs, usuários e workspaces. Quem define é o aluno, com o brainstorming.
- **Pausa do instrutor:** se o superpowers não estiver instalado, espere a instrução de instalação do instrutor.

## Parte 3: pagamentos

- **Assinatura:** a integração é uma assinatura no Stripe, em modo de teste.
  - O aluno assina um plano de teste pelo Stripe Checkout.
  - O Stripe avisa a API, por webhook, e a API marca o plano no produto.
- **Pausa do instrutor:** ele fornece os dados da conta de teste do Stripe.
- **Chaves:** as chaves do Stripe vão para o `.env`.
- **Cartões:** o aluno usa só os cartões de teste do Stripe, nunca um cartão real.
