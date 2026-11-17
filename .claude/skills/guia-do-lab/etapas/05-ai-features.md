# Etapa 05: AI features

Guia três funcionalidades que alinham o produto à era da IA: um MCP, um chat de IA dentro do produto e Generative UI no MCP. Siga as partes em ordem, uma de cada vez.

## Antes de começar

- **Pré-requisito:** a etapa 03. O admin do chat depende do login e dos papéis definidos nela.
- **Features:** o MCP espelha features que o produto já tem. Se o produto ainda não tem nenhuma feature, siga a regra da feature que ainda não existe, no `SKILL.md`.

## Parte 1: MCP

- **O que é:** explique em uma ou duas frases que o MCP deixa assistentes de IA, como o Claude, usarem as features do produto como ferramentas.
- **Espelho da API:**
  - O MCP expõe as features do produto como ferramentas de leitura e escrita, em `apps/api/src/mcp`.
  - Ele segue estritamente a API: cada ferramenta chama os mesmos `services/` que as rotas REST.
  - Nenhuma regra de negócio nova fica no MCP.
- **Aberto só no computador do aluno:** explique esta parte ao aluno antes de montar qualquer ferramenta.
  - Na aula, o MCP fica aberto, sem autenticação, para ir mais rápido.
  - Ele só liga quando o `.env` local tem `MCP_ABERTO=true`. Essa variável nunca vai para as variáveis da Vercel.
  - Explique o motivo. A API já está na Vercel desde a etapa 04, e cada push pode publicá-la de novo. Aberto e publicado, o MCP deixaria qualquer pessoa com o endereço ler e alterar os dados do produto.
  - Se o aluno quiser publicar o MCP, ele precisa protegê-lo com autenticação antes. Não configure `MCP_ABERTO` na Vercel.
- **Primeira versão:** um conjunto mínimo de ferramentas de uma única feature.
- **Teste com o MCPJam:** com a primeira versão pronta, incentive o aluno a rodar o MCPJam Inspector no computador dele para testar e simular as ferramentas.
  - O comando é igual no macOS e no Windows. Ele precisa do Node 20 ou mais recente, que o aluno já tem desde a etapa 00, então não confira a versão de novo.

    ```bash
    npx @mcpjam/inspector@latest
    ```

  - O comando abre o MCPJam no navegador. Use essa versão local, e não o app do MCPJam na web, que não alcança o `localhost`.
  - No MCPJam, o aluno conecta o endereço do MCP na API local, por exemplo `http://localhost:8787/mcp`.

## Parte 2: chat de IA no produto

- **Biblioteca:** o chat usa o Vercel AI SDK.
- **Admin:** no admin do produto, a pessoa escolhe o provider e o modelo. Os providers seguem o padrão de API da OpenAI ou usam o OpenRouter.
- **Recursos do chat:**
  - system prompt;
  - tool calling, com as ferramentas chamando os mesmos `services/` do REST e do MCP;
  - injeção de contexto personalizado, por um campo de texto no admin onde o usuário define as regras e os comportamentos do chat.
- **Onde fica:** o endpoint do chat fica na API, não na web, para que as ferramentas usem os mesmos `services/`.
- **Chaves:** as chaves dos providers ficam no `.env` e, quando o produto estiver no ar, nas variáveis da Vercel. O admin escolhe só o provider e o modelo e nunca guarda chaves.
- **Acesso ao admin:** usa os papéis definidos na etapa 03.

## Parte 3: Generative UI no MCP

**Pausa do instrutor:** é um módulo à parte, todo conduzido pelo instrutor. Não comece por conta própria. Espere o aluno avisar que o instrutor liberou.
