# AI Product Lab

Este diretório é o template do laboratório do workshop. Cada aluno trabalha na própria cópia.

## Quem é o aluno

O aluno não é desenvolvedor: é PM, founder ou tem um perfil parecido. Explique em linguagem simples, um passo de cada vez, e diga o que um comando faz antes de pedir que ele o rode.

## Plataformas

O aluno usa macOS ou Windows. Confirme a plataforma antes de passar comandos e use Terminal no macOS e PowerShell no Windows.

Os scripts do `package.json` não podem depender de shell Unix.

## Estrutura

- `apps/web`: app web em Next.js, publicado na Vercel.
- `apps/web/app/showcase`: pasta onde a turma cria o design system base. Siga o `INSTRUCOES.md` da pasta.
- `apps/api`: API e MCP em Hono, publicados no Railway.
- `apps/api/src/routes`: endpoints REST.
- `apps/api/src/mcp`: ferramentas MCP.
- `apps/api/src/services`: regras de negócio, usadas pelo REST e pelo MCP.
- `apps/api/src/db`: tabelas e conexão com o banco.

A web não acessa o banco diretamente: quando houver integração, ela passa pela API.

## Comandos

Rode na raiz do projeto:

- `npm install`: instala as dependências.
- `npm run dev`: sobe a web em `localhost:3000` e a API em `localhost:8787`.
- `npm run build`: gera o build dos dois apps.

## Setup

Para preparar o ambiente ou resolver problemas no setup, use a skill `guia-do-lab`.

## Escopo

O template não traz funcionalidades de produto. A skill `guia-do-lab` explica como tratar pedidos de temas que a aula ainda não alcançou.
