/* Dados do canvas do AI Product Lab. Este é o único arquivo do canvas que se
   edita: index.html monta a página a partir dele.

   Modelo de partida: o estado do template no fim da etapa 00. Ao copiar para
   a cópia do aluno, troque atualizadoEm pela data de hoje. As regras de
   atualização estão em .claude/skills/guia-do-lab/canvas/como-atualizar.md.

   status das peças: ativo (no ar), decidido, estrutura (pasta pronta, vazia),
   pendente (falta decidir), futuro (entra numa etapa mais adiante).
   status das etapas: concluida, andamento, afazer.
   Textos em português simples, sem travessão. */
window.LAB = {
	projeto: {
		nome: 'AI Product Lab',
		atualizadoEm: 'DD/MM/AAAA',
		momento: 'no fim da etapa 00',
		etapaAtual: '01'
	},

	etapas: [
		{ id: '00', tema: 'Ambiente', curto: 'Ambiente', status: 'concluida',
		  resumo: 'Node, Git e Claude Code conferidos, projeto copiado do template, dependências instaladas. A web abre em localhost:3000 e a API responde ok em localhost:8787.',
		  pecas: ['usuario', 'web', 'paginas', 'api', 'rotas'] },
		{ id: '01', tema: 'Arquitetura da aplicação', curto: 'Arquitetura', status: 'afazer',
		  resumo: 'Onze decisões sobre como o projeto se organiza, registradas em docs/arquitetura.md no fim da etapa. Nenhum código muda.',
		  pecas: ['monorepo', 'config', 'banco', 'services', 'db'] },
		{ id: '02', tema: 'UI e UX: biblioteca de UI, motion e design system', curto: 'UI e UX', status: 'afazer',
		  resumo: 'A turma escolhe a biblioteca de interface e cria o design system base na pasta showcase.',
		  pecas: ['showcase'] },
		{ id: '03', tema: 'Login, orgs e pagamentos', curto: 'Login', status: 'afazer',
		  resumo: 'Contas de usuário, organizações e cobrança, com serviços externos ligados pela API.',
		  pecas: ['externos'] },
		{ id: '04', tema: 'Deploy, CI e monitoramento', curto: 'Deploy', status: 'afazer',
		  resumo: 'Web e API publicadas na Vercel, com testes automáticos a cada mudança e alertas quando algo quebra.',
		  pecas: ['deploy'] },
		{ id: '05', tema: 'AI features: MCP, chat e Generative UI', curto: 'IA', status: 'afazer',
		  resumo: 'Ferramentas MCP na API para agentes de IA e um chat na web que monta telas a partir das respostas.',
		  pecas: ['agentes', 'mcp', 'chat'] }
	],

	/* As peças do mapa. area diz onde a peça fica no quadro: usuario,
	   agentes, mono (dentro da moldura), lado ou deploy. */
	pecas: [
		{ id: 'usuario', area: 'usuario', nome: 'Quem usa', status: 'ativo', etapa: '00',
		  tec: 'Navegador',
		  descricao: 'A pessoa abre o produto no navegador. Ela conversa só com a web.' },

		{ id: 'agentes', area: 'agentes', nome: 'Agentes de IA', status: 'futuro', etapa: '05',
		  tec: 'Claude e outros, via MCP',
		  descricao: 'Agentes de IA usam o produto pela API, através das ferramentas MCP. Entra na etapa 05.' },

		{ id: 'monorepo', area: 'mono', tipo: 'moldura', nome: 'Monorepo aiproductlab', status: 'ativo', etapa: '01',
		  tec: 'Web e API no mesmo repositório',
		  descricao: 'O template traz web e API no mesmo repositório: um npm install instala tudo e um npm run dev sobe as duas partes. A etapa 01 confirma ou muda essa organização.',
		  filhos: [
			{ id: 'config', nome: 'CLAUDE.md', status: 'pendente', etapa: '01', pasta: 'CLAUDE.md',
			  descricao: 'A configuração do projeto: as regras que o Claude segue sempre que mexe no código. Recebe as decisões 5, 6 e 8, e no fim da etapa 01 passa a apontar para docs/arquitetura.md.' }
		  ] },

		{ id: 'web', area: 'mono', nome: 'Web', status: 'ativo', etapa: '00',
		  tec: 'Next.js · React · Tailwind CSS', pasta: 'apps/web', endereco: 'localhost:3000',
		  regra: 'Não acessa o banco: tudo passa pela API.',
		  descricao: 'A parte que a pessoa vê no navegador. No template, ela é independente da API e só conversa com ela.',
		  filhos: [
			{ id: 'paginas', nome: 'Páginas', status: 'ativo', etapa: '00', pasta: 'apps/web/app',
			  descricao: 'As telas do produto. No template existe só a página inicial padrão do Next.js.' },
			{ id: 'showcase', nome: 'Design system', status: 'futuro', etapa: '02', pasta: 'apps/web/app/showcase',
			  descricao: 'Onde a turma cria o design system base: cores, tipografia e componentes que as telas reaproveitam.' },
			{ id: 'chat', nome: 'Chat e Generative UI', status: 'futuro', etapa: '05', pasta: 'apps/web/app',
			  descricao: 'Uma conversa com IA dentro do produto, que monta telas a partir das respostas.' }
		  ] },

		{ id: 'api', area: 'mono', nome: 'API', status: 'ativo', etapa: '00',
		  tec: 'Hono · Node.js', pasta: 'apps/api', endereco: 'localhost:8787',
		  regra: 'A única peça que fala com o banco e com serviços de fora.',
		  descricao: 'O balcão do produto: recebe os pedidos da web e dos agentes, aplica as regras e cuida dos dados.',
		  filhos: [
			{ id: 'rotas', nome: 'Rotas REST', status: 'ativo', etapa: '00', pasta: 'apps/api/src/routes',
			  descricao: 'Os endereços que a web chama. No template existe só o /health, que responde {"status":"ok"}.' },
			{ id: 'services', nome: 'Services', status: 'estrutura', etapa: '01', pasta: 'apps/api/src/services',
			  descricao: 'As regras de negócio, usadas tanto pelas rotas REST quanto pelo MCP. A pasta existe e ainda está vazia.' },
			{ id: 'mcp', nome: 'Ferramentas MCP', status: 'futuro', etapa: '05', pasta: 'apps/api/src/mcp',
			  descricao: 'Ferramentas que o Claude e outros agentes usam para operar o produto. Usam os mesmos services das rotas.' },
			{ id: 'db', nome: 'Conexão com o banco', status: 'estrutura', etapa: '01', pasta: 'apps/api/src/db',
			  descricao: 'Tabelas e conexão com o banco de dados. A pasta existe e ainda está vazia.' }
		  ] },

		{ id: 'banco', area: 'lado', nome: 'Banco de dados', status: 'pendente', etapa: '01',
		  tec: 'A decidir na etapa 01',
		  descricao: 'Onde os dados do produto vão ficar guardados. A escolha sai da decisão 4 da etapa 01.' },

		{ id: 'externos', area: 'lado', nome: 'Login e pagamentos', status: 'futuro', etapa: '03',
		  tec: 'Serviços de fora, definidos na etapa 03',
		  descricao: 'Serviços externos para login, organizações e cobrança. Entram pela API, através de um service.' },

		{ id: 'deploy', area: 'deploy', nome: 'Publicação', status: 'futuro', etapa: '04',
		  tec: 'Vercel · CI · Monitoramento',
		  descricao: 'Coloca a web e a API no ar, roda os testes a cada mudança e avisa quando algo quebra.' }
	],

	/* As ligações entre as peças. futura: a conversa ainda não existe.
	   soDesktop: no telefone a linha cruzaria outra peça. */
	ligacoes: [
		{ de: 'usuario', para: 'web', rotulo: 'navegador', etapa: '00' },
		{ de: 'agentes', para: 'api', rotulo: 'MCP', etapa: '05', futura: true, soDesktop: true },
		{ de: 'web', para: 'api', rotulo: 'HTTP, só pela API', etapa: '00' },
		{ de: 'api', para: 'banco', rotulo: 'só a API acessa', etapa: '01', futura: true },
		{ de: 'api', para: 'externos', rotulo: 'via service', etapa: '03', futura: true },
		{ de: 'deploy', para: 'monorepo', rotulo: 'publica', etapa: '04', futura: true, soDesktop: true }
	],

	stack: [
		{ nome: 'TypeScript', papel: 'A linguagem do template, na web e na API.', tags: ['Template'] },
		{ nome: 'Next.js', papel: 'O framework da web. Monta as páginas e roda em localhost:3000.', tags: ['Template', 'apps/web'] },
		{ nome: 'Hono', papel: 'O framework da API. Leve, roda em Node.js e na Vercel, em localhost:8787.', tags: ['Template', 'apps/api'] },
		{ nome: 'Tailwind CSS', papel: 'Os estilos da web, escritos como classes direto no HTML.', tags: ['Template', 'apps/web'] },
		{ nome: 'Banco de dados', papel: 'A escolher na decisão 4 da etapa 01.', tags: ['Etapa 01'] },
		{ nome: 'Vercel', papel: 'Onde a web e a API serão publicadas, com testes e monitoramento.', tags: ['Etapa 04'] }
	],

	/* As 11 perguntas da etapa 01, iguais às de etapas/01-arquitetura.md.
	   escolha vazia: ainda sem resposta. difere: só quando a escolha difere
	   do template, com a mesma frase do docs/arquitetura.md. */
	decisoes: [
		{ n: 1, secao: 'Linguagem e framework',
		  pergunta: 'Qual linguagem e qual framework você prefere?',
		  recomendacao: 'TypeScript, com Next.js na web e Hono na API, que é o que o template já traz.',
		  escolha: '', difere: '', pecas: ['web', 'api'] },
		{ n: 2, secao: 'Organização',
		  pergunta: 'A aplicação fica num monorepo, com web e API no mesmo repositório, ou em aplicações separadas?',
		  recomendacao: 'Monorepo, como o template.',
		  escolha: '', difere: '', pecas: ['monorepo'] },
		{ n: 3, secao: 'Front-end e API',
		  pergunta: 'O front-end vive independente da API?',
		  recomendacao: 'Sim. A web só fala com a API.',
		  escolha: '', difere: '', pecas: ['web', 'api', 'rotas'] },
		{ n: 4, secao: 'Banco de dados e integrações',
		  pergunta: 'Qual banco de dados você vai usar: SQLite, Supabase ou Neon?',
		  recomendacao: 'Supabase, para facilitar.',
		  escolha: '', difere: '', pecas: ['banco', 'db'] },
		{ n: 5, secao: 'Declarações na configuração do projeto',
		  pergunta: 'O que deve ficar declarado na configuração do projeto, para o Claude seguir sempre?',
		  recomendacao: '', escolha: '', difere: '', pecas: ['config'] },
		{ n: 6, secao: 'Rotinas obrigatórias',
		  pergunta: 'Que rotinas precisam acontecer sempre?',
		  recomendacao: '', escolha: '', difere: '', pecas: ['config'] },
		{ n: 7, secao: 'Padrão visual',
		  pergunta: 'De onde o projeto consome os padrões visuais?',
		  recomendacao: 'Do design system do showcase, criado na etapa 02.',
		  escolha: '', difere: '', pecas: ['showcase'] },
		{ n: 8, secao: 'Dos e don\'ts',
		  pergunta: 'O que o projeto deve sempre fazer e o que deve evitar?',
		  recomendacao: '', escolha: '', difere: '', pecas: ['config'] },
		{ n: 9, secao: 'Acesso ao banco de dados',
		  pergunta: 'Quais são as regras de acesso ao banco de dados?',
		  recomendacao: 'Só a API acessa o banco.',
		  escolha: '', difere: '', pecas: ['api', 'db', 'banco'] },
		{ n: 10, secao: 'Integrações via API',
		  pergunta: 'Quais são as regras para criar as integrações via API?',
		  recomendacao: '', escolha: '', difere: '', pecas: ['services', 'externos'] },
		{ n: 11, secao: 'Comportamento da interface',
		  pergunta: 'Como a interface deve se comportar?',
		  recomendacao: '', escolha: '', difere: '', pecas: ['web', 'paginas'] }
	],

	/* Pastas do projeto. peca liga a linha a uma peça do mapa. */
	arvore: [
		{ nome: 'aiproductlab/', nivel: 0, papel: 'A raiz do projeto', peca: 'monorepo' },
		{ nome: 'apps/web/', nivel: 1, papel: 'A web em Next.js', peca: 'web', etapa: '00' },
		{ nome: 'app/', nivel: 2, papel: 'As páginas do produto', peca: 'paginas', etapa: '00' },
		{ nome: 'showcase/', nivel: 3, papel: 'O design system base', peca: 'showcase', etapa: '02' },
		{ nome: 'apps/api/', nivel: 1, papel: 'A API em Hono', peca: 'api', etapa: '00' },
		{ nome: 'src/routes/', nivel: 2, papel: 'Endpoints REST', peca: 'rotas', etapa: '00' },
		{ nome: 'src/services/', nivel: 2, papel: 'Regras de negócio', peca: 'services', etapa: '01' },
		{ nome: 'src/mcp/', nivel: 2, papel: 'Ferramentas MCP', peca: 'mcp', etapa: '05' },
		{ nome: 'src/db/', nivel: 2, papel: 'Tabelas e conexão com o banco', peca: 'db', etapa: '01' },
		{ nome: 'docs/', nivel: 1, papel: 'arquitetura.md, no fim da etapa 01', etapa: '01' },
		{ nome: 'CLAUDE.md', nivel: 1, papel: 'As regras que o Claude segue', peca: 'config', etapa: '01' },
		{ nome: '.env.example', nivel: 1, papel: 'Modelo das chaves, que entram por tema', etapa: '03' }
	]
};
