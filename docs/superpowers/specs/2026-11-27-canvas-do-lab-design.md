# Canvas do lab: design

- **Data:** 2026-11-27
- **Status:** aprovada

## Objetivo

Dar ao aluno um mapa visual das escolhas do projeto dele, que acompanha a aula: as peças (web, API, banco, serviços externos, publicação, agentes de IA), as tecnologias, as 11 decisões da etapa 01, as pastas e as etapas. A skill `guia-do-lab` cria o canvas no fim da etapa 00 e o atualiza a cada decisão e a cada etapa.

## Por que

O aluno não é desenvolvedor. As decisões da etapa 01 só viram documento no fim da etapa, e a estrutura do monorepo é abstrata para quem não lê código. Um mapa que muda junto com a conversa mostra o que cada escolha afeta e o que ainda falta.

## Metas

- O canvas faz parte do fluxo: a skill cria, atualiza e confere, sem o aluno rodar nada além de abrir a página.
- HTML, CSS e JavaScript puros, sem nenhuma dependência: nada de framework, biblioteca, CDN, fonte da internet ou npm. Abre direto do disco, sem servidor e sem internet, no macOS e no Windows.
- Fora do projeto: não entra em commit, build nem deploy, e o código do produto não depende dele.
- Visual do punkmetrics-ds.

## Fora do escopo

- Editar o canvas pela própria página. Quem edita é o Claude, pelo `dados.js`.
- Gerar o canvas a partir do `docs/arquitetura.md`. O doc só existe no fim da etapa 01, e o canvas muda antes disso.

## Abordagens

| Abordagem | Como é | Por que não |
|---|---|---|
| A. Página dentro do app web | Uma rota no Next.js | Faz parte do produto e do deploy, e depende do projeto rodando. |
| B. Página com o kit do punkmetrics-ds e GSAP | As dez folhas do DS copiadas, motion pelo CDN | Depende de arquivos de fora e de internet para o motion. Foi o protótipo. |
| **C. Página única autocontida (escolhida)** | `index.html` com CSS, JS, fonte e logo embutidos, mais um `dados.js` | |

## Como funciona

- **Modelo na skill:** `.claude/skills/guia-do-lab/canvas/` tem o `index.html` (motor e visual), o `dados.js` de partida (o template no fim da etapa 00) e o `como-atualizar.md` (as regras de criar, atualizar e conferir).
- **Cópia do aluno:** `canvas/` na raiz, ignorada pelo Git. O Claude copia os dois arquivos do modelo e, dali em diante, edita só o `dados.js`.
- **Visual:** os tokens, a tipografia e os componentes do punkmetrics-ds refeitos em CSS próprio, sem o kit. A Zalando Sans (licença OFL) vai embutida em base64. O motion (entrada do herói, listas que abrem, luz no card, números contando, assinatura do rodapé) é JavaScript puro e respeita o movimento reduzido.
- **Mapa:** peças em caixas ligadas por linhas calculadas a partir da posição de cada caixa, refeitas quando a tela muda. Clicar numa peça abre um painel com pasta, endereço, regra e decisões ligadas. Filtros por etapa e a vista "Só o que existe" apagam o resto.
- **Fluxo:** passo 6 da etapa 00 cria; a etapa 01 registra cada resposta e, no fechamento, confere as 11 decisões contra o doc; toda etapa marca início e fim. A conferência é `node --check canvas/dados.js`, rodada pelo Claude.

## Riscos

- O `dados.js` sai de sincronia com o `docs/arquitetura.md`. O fechamento da etapa 01 confere os dois.
- Um `dados.js` com erro de sintaxe deixa a página em branco. O `node --check` pega isso antes de o aluno abrir, e a página mostra um aviso quando o `dados.js` não carrega.
