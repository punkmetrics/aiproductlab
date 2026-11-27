# Etapa 00: ambiente

Leva o aluno até o projeto rodando na própria máquina, no macOS ou no Windows.

## Como conduzir

- Siga os passos em ordem, um por mensagem: diga o que o comando faz, peça o resultado e só então avance.
- Pule o passo que já estiver resolvido.

## Passo 1: ver o que já está instalado

Os comandos são iguais nas duas plataformas.

```bash
node -v
npm -v
git --version
claude --version
```

Cada um deve mostrar uma versão, e o Node precisa ser 20.9 ou mais recente. O Claude Code exige um plano pago da Claude ou uma conta Console.

## Passo 2: instalar o que faltar

Depois de instalar, peça ao aluno para fechar o terminal, abrir outro e repetir o passo 1.

| Programa | macOS | Windows |
|---|---|---|
| Node.js | Instalador LTS em <https://nodejs.org/en/download> | `winget install OpenJS.NodeJS.LTS` |
| Git | `xcode-select --install` (abre uma janela: clicar em Instalar) | `winget install Git.Git` |
| Claude Code | `curl -fsSL https://claude.ai/install.sh \| bash` | `irm https://claude.ai/install.ps1 \| iex` |

## Passo 3: entrar na pasta do projeto

Se o `package.json` do projeto não estiver na pasta atual, copie o template. Os comandos são iguais nas duas plataformas, e a conta do GitHub precisa ter acesso ao repositório.

```bash
git clone https://github.com/punkmetrics/aiproductlab.git
cd aiproductlab
```

## Passo 4: subir o projeto

Os comandos são iguais nas duas plataformas.

```bash
npm install
npm run dev
```

## Passo 5: confirmar

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

## Passo 6: criar o canvas

Crie o canvas do projeto seguindo [../canvas/como-atualizar.md](../canvas/como-atualizar.md), na seção **Criar**. Você mesmo copia os arquivos: o aluno não roda nada para isso.

Explique ao aluno, em duas frases, que o canvas é um mapa das escolhas dele, que muda a cada etapa e que fica fora do projeto. Depois mostre como abrir, com o comando da plataforma dele, e peça que ele confirme que a página abriu.

## Problemas comuns

**Comando não encontrado:** feche o terminal, abra outro e repita o comando. Se continuar, volte ao passo 2.

**Windows, "a execução de scripts foi desabilitada":** explique que é uma configuração de segurança da conta do aluno e, com a concordância dele, rode:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Porta 3000 ou 8787 já em uso:** descubra qual programa usa a porta e confirme com o aluno antes de encerrá-lo.

| | macOS | Windows |
|---|---|---|
| Descobrir | `lsof -i :3000` | `Get-NetTCPConnection -LocalPort 3000 \| Select-Object OwningProcess` |
| Encerrar | `kill <PID>` | `Stop-Process -Id <PID>` |
