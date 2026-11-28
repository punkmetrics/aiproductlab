# Canvas do projeto: como criar e atualizar

O canvas é o mapa visual das decisões do aluno: as peças do projeto, as tecnologias, as 11 decisões da etapa 01, as pastas e as etapas da aula. Ele acompanha a aula e muda a cada decisão e a cada etapa.

## Regras do canvas

- **HTML, CSS e JavaScript puros, sem dependência.** Nada de framework, biblioteca, CDN, fonte da internet, imagem externa ou pacote npm. A página abre direto do disco, com dois cliques, sem servidor e sem internet.
- **Fora do projeto.** O canvas mora em `canvas/`, na raiz da cópia do aluno, e essa pasta está no `.gitignore`. Ele não entra em commit, build nem deploy, e nenhum arquivo de `apps/` importa nada dele. Não mova o canvas para `apps/`, `docs/` ou outra pasta versionada.
- **Dois arquivos.** `index.html` é o motor e o visual, no estilo do punkmetrics-ds, e não se edita na cópia do aluno. `dados.js` guarda os dados e é o único arquivo que se edita.
- **Texto.** Português simples, frases curtas, sem travessão. Chaves, senhas e valores do `.env` nunca aparecem no canvas.

## Criar

Crie o canvas no passo 6 da etapa 00 ou, se a pasta `canvas/` não existir, no começo de qualquer etapa.

1. Copie `.claude/skills/guia-do-lab/canvas/index.html` e `.claude/skills/guia-do-lab/canvas/dados.js` para `canvas/`, na raiz do projeto.
2. Em `canvas/dados.js`, troque `atualizadoEm` pela data de hoje, no formato DD/MM/AAAA.
3. Se o canvas for criado depois da etapa 00, acerte o `dados.js` com o que já aconteceu: as etapas concluídas, as decisões já registradas em `docs/arquitetura.md` e as peças já construídas.
4. Confira o arquivo, como em **Conferir**, abaixo.
5. Diga ao aluno onde o canvas está e como abrir, com o comando da plataforma dele. O comando abre o arquivo no navegador padrão.

**macOS**

```bash
open canvas/index.html
```

**Windows**

```powershell
Start-Process canvas\index.html
```

## Atualizar

Edite só `canvas/dados.js`. Em toda atualização, troque `projeto.atualizadoEm` pela data de hoje e `projeto.momento` pelo ponto da aula, por exemplo "na decisão 4 da etapa 01" ou "no fim da etapa 02".

| Quando | O que muda em `dados.js` |
|---|---|
| O aluno responde uma pergunta da etapa 01 | Em `decisoes`, preencha `escolha` com a resposta, na mesma frase que vai para o `docs/arquitetura.md`. Se a escolha difere do template, preencha `difere` com a frase "Difere do template" do doc. Atualize as peças, as ligações e o `stack` que a resposta afeta, como na tabela abaixo. |
| Uma etapa começa | Em `etapas`, mude o `status` dela para `andamento` e `projeto.etapaAtual` para o número dela. |
| Uma etapa termina | Mude o `status` dela para `concluida`. Mude para `ativo` as peças que a etapa colocou no ar, para `estrutura` as pastas que ela criou vazias e para `false` o `futura` das ligações que passaram a existir. |
| O aluno muda uma decisão já tomada | Atualize a `escolha`, o `difere` e as peças, como na primeira linha. |

Como cada decisão da etapa 01 afeta o mapa:

| Decisão | O que atualizar além de `escolha` |
|---|---|
| 1, linguagem e framework | O `tec` de `web` e `api` e os itens de `stack`. Se a escolha difere, a tag `"Difere do template"` no item do `stack` que mudou. |
| 2, organização | O `nome`, o `tec` e o `status` (`decidido`) da moldura `monorepo`. Com aplicações separadas, o nome passa a ser "Repositórios separados". |
| 3, front-end e API | A `regra` de `web`. Se a web também falar com o banco, a regra diz isso e o `difere` explica. |
| 4, banco de dados | Em `banco`: `tec` com o banco de agora, `depois` com o banco futuro quando houver migração planejada, e `status` `decidido`. O item de banco no `stack` ganha o nome do banco. |
| 5, 6 e 8, configuração, rotinas e dos e don'ts | O `status` do filho `config` passa a `decidido` quando as três tiverem resposta. |
| 7, padrão visual | A `descricao` do filho `showcase`, se o padrão vier de outro lugar. |
| 9, acesso ao banco | A `regra` de `api` e o `rotulo` da ligação de `api` para `banco`. |
| 10, integrações | O `rotulo` da ligação de `api` para `externos` e a `descricao` de `services`. |
| 11, comportamento da interface | A `descricao` de `paginas`. |

O formato de cada campo está nos comentários do próprio `dados.js`. Não crie campos novos: o `index.html` só lê os que já existem.

## Conferir

Depois de criar ou atualizar, confira que o `dados.js` continua válido. O comando é igual nas duas plataformas e não mostra nada quando está tudo certo:

```bash
node --check canvas/dados.js
```

Se aparecer um erro, corrija o `dados.js` antes de seguir. Não peça ao aluno para rodar este comando: ele é seu.

## Quando o motor muda

Se a skill trouxer um `canvas/index.html` novo, copie-o por cima do `canvas/index.html` do aluno. O `dados.js` do aluno fica como está.
