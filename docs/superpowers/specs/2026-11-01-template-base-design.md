# Template base do AI Product Lab: design

- **Data:** 2026-11-01
- **Status:** aprovada

## Objetivo

Criar um diretório template que cada aluno do lab copia e usa individualmente. Ele traz apenas a estrutura que facilita a participação no lab. O conteúdo é ditado pelo instrutor, item a item.

Os alunos são não-devs (PMs e founders) e trabalham na própria máquina.

## Escopo deste ciclo

Este ciclo cobre a estrutura base, um esqueleto que roda, o guia de setup e a skill `guia-do-lab` com a parte de setup do ambiente.

Os temas da aula entram na skill depois, quando o instrutor os ditar.

## Plataformas

Os alunos usam macOS ou Windows.

- O guia de setup e a skill trazem comandos e snippets para as duas plataformas: Terminal no macOS e PowerShell no Windows.
- Os scripts do `package.json` não dependem de shell Unix.

## Repositório

- O repositório é privado: `punkmetrics/aiproductlab`, criado com o GitHub CLI.
- Os commits não têm atribuição ao Claude, e apenas huxdias@gmail.com aparece como autor.

## Fora do escopo

- Funcionalidades de produto: telas próprias, registro de projetos, CRUD e painel de status.
- Implementação de login, banco de dados, IA, pagamentos e MCP. As pastas existem, mas nada é implementado até ser ditado.
- Dependências desses temas, como os SDKs de MCP, Supabase, Anthropic e Stripe.
- Configuração de deploy na Vercel e no Railway.
- Forma de distribuir o template aos alunos.
- Suíte de testes automatizados, já que o esqueleto não tem regra de negócio.

## Estrutura

```
aiproductlab/
├── .claude/
│   └── skills/
│       └── guia-do-lab/
│           └── SKILL.md
├── apps/
│   ├── web/
│   │   └── app/
│   │       └── showcase/
│   │           └── INSTRUCOES.md
│   └── api/
│       └── src/
│           ├── routes/
│           ├── mcp/
│           ├── services/
│           └── db/
├── docs/
├── .env.example
├── .gitignore
├── CLAUDE.md
├── README.md
└── package.json
```

## Arquitetura

- **Repositório único com npm workspaces:** um `npm install` e um `npm run dev` na raiz cuidam dos dois apps.
- **`apps/web`:** Next.js com App Router, TypeScript e Tailwind. O destino de publicação é a Vercel.
- **`apps/api`:** Hono com TypeScript. O destino de publicação é o Railway.
- **Separação:** a web não acessa o banco diretamente. Quando houver integração, ela passa pela API.
- **Pastas da API:** `routes/` guarda os endpoints REST, `mcp/` as ferramentas MCP, `services/` as regras de negócio usadas pelo REST e pelo MCP, e `db/` as tabelas e a conexão.

## Comportamento do esqueleto

- `npm run dev` sobe os dois apps ao mesmo tempo, sem nenhuma chave configurada.
- A web responde em `localhost:3000` com a página inicial padrão do Next.js.
- A API responde em `localhost:8787` com um único endpoint, `GET /health`, que devolve `{"status":"ok"}`.
- A API usa a variável `PORT` quando ela existir e `8787` caso contrário.
- A web ainda não chama a API.

## Conteúdo dos arquivos e pastas

- **`apps/web/app/showcase/INSTRUCOES.md`:** é o único arquivo da pasta e fica vazio até o instrutor passar o conteúdo. A turma cria ali o design system base. O arquivo não gera rota, e a primeira `page.tsx` criada na pasta abre em `localhost:3000/showcase`.
- **`.claude/skills/guia-do-lab/SKILL.md`:** conduz o aluno pelo setup, com comandos para macOS e Windows. O Claude Code a encontra automaticamente ao abrir o projeto.
- **`README.md`:** guia de setup com pré-requisitos (Node LTS, Git e Claude Code), comandos para subir e os endereços da web e da API, para macOS e Windows.
- **`CLAUDE.md`:** perfil do aluno, estrutura do repositório e comandos. Instruções de condução entram quando forem ditadas.
- **`.env.example`:** apenas um comentário em português avisando que as chaves entram conforme os temas da aula.
- **`.gitignore`:** ignora `node_modules`, `.next`, a saída de build e `.env`.
- **`docs/` e as pastas de `apps/api/src/`, exceto a do endpoint:** ficam vazias, com um `.gitkeep` para continuarem existindo após a cópia. O endpoint `GET /health` fica em `routes/`.
- **`docs/superpowers/`:** guarda os documentos de construção do template e é removida antes da distribuição aos alunos.

## Verificação

A partir de uma cópia limpa:

1. `npm install` termina sem erros.
2. `npm run dev` sobe os dois apps.
3. `localhost:3000` responde com a página inicial.
4. `localhost:8787/health` responde `{"status":"ok"}`.
5. `localhost:3000/showcase` responde 404, confirmando que o `.md` não gera rota.
6. `npm run build` termina sem erros nos dois apps.

**Limitação conhecida:** a construção e a verificação acontecem em um Mac. Os comandos de Windows do guia e da skill vêm da documentação oficial, mas não foram executados.
