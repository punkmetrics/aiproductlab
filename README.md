# AI Product Lab

Template do laboratório do workshop. Cada aluno copia este diretório e trabalha na própria cópia.

## Pré-requisitos

- **Node.js** (versão LTS)
- **Git**
- **Claude Code**, com um plano pago da Claude (Pro, Max, Ultra, Team ou Enterprise) ou uma conta Console. O plano gratuito não inclui o Claude Code.

## 1. Abra o terminal

- **macOS:** pressione `Cmd + Espaço`, digite `Terminal` e pressione Enter.
- **Windows:** abra o menu Iniciar, digite `PowerShell` e pressione Enter.

Use sempre o bloco de comandos da sua plataforma.

## 2. Instale o que faltar

### macOS

Instale o Node.js LTS pelo instalador em <https://nodejs.org/en/download>.

Depois, instale o Git e o Claude Code. O primeiro comando abre uma janela: clique em Instalar e espere terminar antes de rodar o segundo.

```bash
xcode-select --install
```

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows

```powershell
winget install OpenJS.NodeJS.LTS
```

```powershell
winget install Git.Git
```

```powershell
irm https://claude.ai/install.ps1 | iex
```

Ao terminar, feche o terminal e abra outro, para que os novos comandos sejam reconhecidos.

## 3. Confira as instalações

Os comandos são os mesmos no macOS e no Windows. Cada um deve mostrar uma versão.

```bash
node -v
npm -v
git --version
claude --version
```

## 4. Copie o template

Os comandos são os mesmos no macOS e no Windows. Sua conta do GitHub precisa ter acesso ao repositório.

```bash
git clone https://github.com/punkmetrics/aiproductlab.git
cd aiproductlab
```

## 5. Suba o projeto

Os comandos são os mesmos no macOS e no Windows.

```bash
npm install
npm run dev
```

Com o projeto no ar, abra no navegador:

- **Web:** <http://localhost:3000>
- **API:** <http://localhost:8787/health>, que deve mostrar `{"status":"ok"}`

Para conferir a API pelo terminal, abra uma segunda janela e rode:

**macOS**

```bash
curl http://localhost:8787/health
```

**Windows**

```powershell
Invoke-RestMethod http://localhost:8787/health
```

Para parar o projeto, pressione `Ctrl + C` no terminal em que ele está rodando.

## 6. Abra o Claude Code

Em uma segunda janela do terminal, entre na pasta do projeto e rode:

```bash
claude
```

Se algo não funcionar no setup, peça ajuda ao Claude com suas palavras, por exemplo: "preciso de ajuda para preparar o ambiente do lab".

## Problemas comuns

### Comando não encontrado

Feche o terminal, abra outro e tente de novo. Se continuar, repita a instalação do programa que falta.

### Windows: "a execução de scripts foi desabilitada"

Esse erro bloqueia o `npm` no PowerShell. Para liberar scripts assinados na sua conta, rode:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Porta já em uso

Outro programa está usando a porta `3000` ou `8787`. Descubra qual é e encerre esse programa, trocando `3000` pela porta do erro:

**macOS**

```bash
lsof -i :3000
```

```bash
kill <PID>
```

**Windows**

```powershell
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
```

```powershell
Stop-Process -Id <PID>
```

Troque `<PID>` pelo número que o primeiro comando mostrou.

## Estrutura

```
aiproductlab/
├── .claude/skills/guia-do-lab/   skill que guia o setup e as etapas da aula
├── apps/
│   ├── web/                      app web (Next.js)
│   │   └── app/showcase/         design system base da turma
│   └── api/                      API e MCP (Hono)
│       └── src/
│           ├── routes/           endpoints REST
│           ├── mcp/              ferramentas MCP
│           ├── services/         regras de negócio
│           └── db/               tabelas e conexão
├── docs/                         material do lab
├── .env.example                  chaves, conforme os temas da aula
├── CLAUDE.md                     instruções para o Claude
└── package.json                  comandos do projeto
```
