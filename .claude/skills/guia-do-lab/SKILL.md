---
name: guia-do-lab
description: Use quando um aluno do AI Product Lab quer começar o lab, preparar ou reproduzir o ambiente, instalar Node, Git ou Claude Code, ou quando `npm install` ou `npm run dev` falha no macOS ou no Windows.
---

# Guia do lab

Leva um aluno não-dev até o projeto rodando na própria máquina, no macOS ou no Windows.

## Como conduzir

- Se a plataforma ainda não foi dita, pergunte antes de passar qualquer comando.
- Mostre apenas os comandos da plataforma do aluno: Terminal no macOS, PowerShell no Windows.
- Siga as etapas em ordem, uma por mensagem: diga o que o comando faz, peça o resultado e só então avance.
- Pule a etapa que já estiver resolvida.

## Etapa 1: ver o que já está instalado

Os comandos são iguais nas duas plataformas.

```bash
node -v
npm -v
git --version
claude --version
```

Cada um deve mostrar uma versão, e o Node precisa ser 20.9 ou mais recente. O Claude Code exige um plano pago da Claude ou uma conta Console.

## Etapa 2: instalar o que faltar

Depois de instalar, peça ao aluno para fechar o terminal, abrir outro e repetir a etapa 1.

| Programa | macOS | Windows |
|---|---|---|
| Node.js | Instalador LTS em <https://nodejs.org/en/download> | `winget install OpenJS.NodeJS.LTS` |
| Git | `xcode-select --install` (abre uma janela: clicar em Instalar) | `winget install Git.Git` |
| Claude Code | `curl -fsSL https://claude.ai/install.sh \| bash` | `irm https://claude.ai/install.ps1 \| iex` |

## Etapa 3: entrar na pasta do projeto

Se o `package.json` do projeto não estiver na pasta atual, copie o template. Os comandos são iguais nas duas plataformas, e a conta do GitHub precisa ter acesso ao repositório.

```bash
git clone https://github.com/punkmetrics/aiproductlab.git
cd aiproductlab
```

## Etapa 4: subir o projeto

Os comandos são iguais nas duas plataformas.

```bash
npm install
npm run dev
```

## Etapa 5: confirmar

Com o projeto no ar, abra uma segunda janela do terminal.

**macOS**

```bash
curl http://localhost:8787/health
```

**Windows**

```powershell
Invoke-RestMethod http://localhost:8787/health
```

O ambiente está pronto quando as duas condições forem verdadeiras:

1. A API responde com status `ok`.
2. O aluno confirma que <http://localhost:3000> abre a página inicial no navegador.

Só então diga que o ambiente está pronto.

## Problemas comuns

**Comando não encontrado:** feche o terminal, abra outro e repita o comando. Se continuar, volte à etapa 2.

**Windows, "a execução de scripts foi desabilitada":** explique que é uma configuração de segurança da conta do aluno e, com a concordância dele, rode:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Porta 3000 ou 8787 já em uso:** descubra qual programa usa a porta e confirme com o aluno antes de encerrá-lo.

| | macOS | Windows |
|---|---|---|
| Descobrir | `lsof -i :3000` | `Get-NetTCPConnection -LocalPort 3000 \| Select-Object OwningProcess` |
| Encerrar | `kill <PID>` | `Stop-Process -Id <PID>` |

## Temas da aula

Login, banco de dados, IA, pagamentos, MCP, deploy e design system são temas da aula.

Quando o aluno pedir um tema antes da aula chegar nele, diga que ele será construído com a turma e retome o setup. Se ele insistir depois disso, atenda, porque a cópia é dele.
