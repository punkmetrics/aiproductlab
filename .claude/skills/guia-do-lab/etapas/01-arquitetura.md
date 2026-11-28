# Etapa 01: arquitetura

Define com o aluno as características do projeto dele, uma pergunta por mensagem, e registra tudo em `docs/arquitetura.md`. Nenhum código muda nesta etapa.

## Antes de começar

Se `docs/arquitetura.md` já existe, a etapa já foi feita. Mostre um resumo curto do que está nele e pergunte se o aluno quer revisar alguma decisão ou seguir para a próxima etapa. Só mude o doc se ele pedir.

## Como perguntar

- **Ordem:** siga a tabela, uma pergunta por mensagem.
- **Recomendação:** quando houver, apresente-a com o motivo em uma frase e espere a resposta.
- **Perguntas abertas:** quando não houver recomendação, pergunte de forma aberta. Dê o exemplo da tabela só se o aluno travar.
- **Várias respostas de uma vez:** registre todas e faça só a próxima pergunta que ainda não tem resposta.
- **"Decide por mim":** mostre a recomendação da pergunta atual e peça que o aluno confirme. Continue uma pergunta por vez.
- **Escolha diferente da recomendação:** aceite a escolha e diga, em uma frase, em que ela difere do template. Explique que nada muda no código agora e que a escolha fica registrada no doc.
- **Canvas:** a cada resposta, registre a escolha no canvas, como em [../canvas/como-atualizar.md](../canvas/como-atualizar.md), e avise numa frase curta junto com a próxima pergunta. Na primeira pergunta, marque a etapa 01 como `andamento` no canvas.

## Perguntas

| # | Seção no doc | Pergunta | Recomendação ou exemplo |
|---|---|---|---|
| 1 | Linguagem e framework | Qual linguagem e qual framework você prefere? Por exemplo Next, React, TypeScript ou Python. | Recomendação: TypeScript, com Next.js na web e Hono na API, que é o que o template já traz. |
| 2 | Organização | A aplicação fica num monorepo, com web e API no mesmo repositório, ou em aplicações separadas? | Recomendação: monorepo, como o template. |
| 3 | Front-end e API | O front-end vive independente da API? | Recomendação: sim. A web só fala com a API. |
| 4 | Banco de dados e integrações | Qual banco de dados você vai usar: SQLite, Supabase ou Neon? | Recomendação: Supabase, para facilitar. |
| 5 | Declarações na configuração do projeto | O que deve ficar declarado na configuração do projeto, para o Claude seguir sempre? | Recomendação: declarar que os textos da interface são em português, quais são os comandos do projeto e que as chaves ficam só no `.env`. |
| 6 | Rotinas obrigatórias | Que rotinas precisam acontecer sempre? | Recomendação: antes de cada commit, rodar o build e conferir que nenhuma chave vai junto. |
| 7 | Padrão visual | De onde o projeto consome os padrões visuais? | Recomendação: do design system do `showcase`, criado na etapa 02. |
| 8 | Dos e don'ts | O que o projeto deve sempre fazer e o que deve evitar? | Recomendação: focar no que evitar, com regras específicas e o motivo de cada uma. Por exemplo: "não mexer em código fora do pedido, para não quebrar o que já funciona", "não instalar biblioteca nova sem perguntar" e "não colocar chave no código nem no chat". |
| 9 | Acesso ao banco de dados | Quais são as regras de acesso ao banco de dados? | Recomendação: só a API acessa o banco. |
| 10 | Integrações via API | Quais são as regras para criar as integrações via API? | Exemplo: "toda integração externa passa por um service da API". |
| 11 | Comportamento da interface | Como a interface deve se comportar? | Exemplo: "mostrar um aviso claro quando algo der errado". |

## Fechamento

1. Mostre um resumo das 11 decisões, marcando as que diferem do template.
2. Peça a confirmação do aluno. Só escreva depois do sim.
3. Escreva `docs/arquitetura.md` no formato abaixo.
4. No fim do `CLAUDE.md`, na seção `## Decisões do projeto`, acrescente esta linha. Crie a seção se ela ainda não existir.

   ```
   Siga as decisões de arquitetura em docs/arquitetura.md.
   ```

5. No canvas, marque a etapa 01 como `concluida` e confira que as 11 decisões estão iguais às do `docs/arquitetura.md`.
6. Diga ao aluno que a etapa 01 terminou.

### Formato de `docs/arquitetura.md`

Uma seção para cada linha da tabela, na mesma ordem, com o título da coluna "Seção no doc". A linha "Difere do template" só aparece quando a escolha difere.

```markdown
# Arquitetura

## Linguagem e framework

Python, com FastAPI na API.

Difere do template: o template traz TypeScript, com Hono na API.

## Organização

Monorepo.
```
