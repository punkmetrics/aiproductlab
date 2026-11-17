---
name: guia-do-lab
description: "Use quando um aluno do AI Product Lab quer preparar ou reproduzir o ambiente, quando `npm install` ou `npm run dev` falha no macOS ou no Windows, ou quando ele quer começar ou continuar uma etapa da aula: arquitetura, UI e design system, login e pagamentos, deploy e monitoramento, ou AI features."
argument-hint: "[etapa]"
---

# Guia do lab

Conduz um aluno não-dev do AI Product Lab pelo setup e pelas etapas da aula, no macOS ou no Windows. O aluno constrói o próprio produto na própria cópia do template. A skill conduz a conversa e as decisões.

## Como escolher a etapa

- **Número recebido:** quando a skill é chamada com um número, como `/guia-do-lab 3`, esse número é a etapa da aula na tabela abaixo. Por exemplo, `/guia-do-lab 1` é a etapa 01, arquitetura, e não o passo 1 do setup.
- **Sem número:** use o que o aluno disser. "Vamos para o deploy", por exemplo, é a etapa 04.
- **Etapa incerta:** se não estiver claro qual é a etapa, pergunte em qual etapa a turma está antes de ler qualquer arquivo de etapa.
- **Leitura:** leia só o arquivo da etapa escolhida e siga-o.

"Etapa" é sempre uma linha desta tabela. As subdivisões do setup se chamam "passos".

| Etapa | Tema | Arquivo | Pré-requisitos |
|---|---|---|---|
| 00 | Ambiente: instalar, subir e conferir o projeto | [etapas/00-ambiente.md](etapas/00-ambiente.md) | nenhum |
| 01 | Arquitetura da aplicação | [etapas/01-arquitetura.md](etapas/01-arquitetura.md) | 00 |
| 02 | UI e UX: biblioteca de UI, motion e design system | [etapas/02-ui-ux.md](etapas/02-ui-ux.md) | 01 |
| 03 | Login, orgs e pagamentos | [etapas/03-autenticacao-pagamentos.md](etapas/03-autenticacao-pagamentos.md) | 00 e 01 |
| 04 | Deploy, CI e monitoramento | [etapas/04-deploy-monitoramento.md](etapas/04-deploy-monitoramento.md) | 00 |
| 05 | AI features: MCP, chat e Generative UI | [etapas/05-ai-features.md](etapas/05-ai-features.md) | 03 |

Como saber se uma etapa já foi feita:

- A etapa 01 está feita quando `docs/arquitetura.md` existe.
- A etapa 02 está feita quando `docs/design-system.md` existe.
- Para as outras etapas, confira no projeto ou pergunte ao aluno.

## Regras de todas as etapas

- **Plataforma:** pergunte se o aluno usa macOS ou Windows antes do primeiro comando. Mostre só os comandos da plataforma dele: Terminal no macOS, PowerShell no Windows.
- **Ritmo:** faça uma pergunta por mensagem. Antes de pedir que o aluno rode um comando, diga o que ele faz.
- **Decisões:** não escolha pelo aluno. Quando houver recomendação, apresente-a como recomendação e espere a resposta.
- **Pausas do instrutor:** os arquivos de etapa marcam as partes que o instrutor conduz.
  - Ao chegar numa delas, diga que essa parte é conduzida pelo instrutor e espere o aluno avisar que o instrutor liberou.
  - Se o aluno pedir para pular a pausa ou para você fazer a parte do instrutor, explique de novo e continue esperando.
- **Pré-requisitos:** antes de começar uma etapa, confira os pré-requisitos dela na tabela. Se faltar algum, diga o que falta e ofereça fazer antes.
- **Feature que ainda não existe:** quando a etapa precisa de uma feature do produto que ainda não existe, diga que o instrutor orienta essa parte e espere o aluno avisar que pode seguir.
- **Escolhas diferentes do template:** as etapas partem do template. Quando o `docs/arquitetura.md` do aluno registra uma escolha diferente num ponto que a etapa usa, avise o que muda e pergunte ao aluno como seguir.
- **Chaves e segredos:** ficam só no `.env`, que o Git ignora.
  - Se o aluno colar uma chave no chat, avise para não colar chaves ali e não repita o valor. Guie-o a colocar a chave no `.env`.
  - Se o `.env` ainda não existir, guie o aluno a criá-lo a partir do `.env.example`, na raiz do projeto.

**macOS**

```bash
cp .env.example .env
```

**Windows**

```powershell
Copy-Item .env.example .env
```

## Temas que a aula ainda não alcançou

Login, banco de dados, IA, pagamentos, MCP, deploy e design system são temas da aula.

- Quando o aluno chama uma etapa ou diz que a turma está nela, a aula chegou nela: siga o arquivo da etapa.
- Quando ele pede um tema de uma etapa que a turma ainda não começou, diga que o tema será construído com a turma e volte ao que vocês estavam fazendo.
- Se ele insistir depois disso, atenda, porque a cópia é dele.
