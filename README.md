
# ♿ AcessoBairro

### Uma cidade mais acessível começa com a sua voz.

O AcessoBairro é uma plataforma colaborativa desenvolvida para dar visibilidade às barreiras de acessibilidade urbana que dificultam a mobilidade de pessoas cadeirantes.

A proposta permite registrar e consultar ocorrências como calçadas danificadas, ausência de rampas e caminhos bloqueados.

> Projeto acadêmico desenvolvido para a Global Solution 2026 da FIAP.
> Os registros da plataforma não representam solicitações oficiais à prefeitura.

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Fetch API
- Vitest
- React Testing Library
- Oxlint

O Front-end consulta a API REST Java (Spring Boot no Render) para listagem, filtros, detalhes e histórico. Em 18/11/2026, o cadastro real demonstrativo por POST `/ocorrencias` retornou **HTTP 201**, com recuperação da ocorrência fictícia nº18. Em 19/11, o fluxo opcional de IA foi validado na Vercel com a Flask no Render, incluindo a aplicação da categoria sugerida pelo usuário. A API Java original permanece em somente leitura; o ambiente demonstrativo utiliza apenas dados fictícios e não possui autenticação.

## Pré-requisitos

Antes de executar, instale:

- Node.js (recomendado: versão 24)
- npm
- Git
- Visual Studio Code ou outro editor

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Caiomarqx/acessobairro.git
```

### 2. Entrar na pasta

```bash
cd acessobairro
```

### 3. Instalar as dependências

```bash
npm ci
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Abra o endereço local informado pelo Vite no terminal.

Normalmente, será:

http://localhost:5173/

## Comandos disponíveis

| Comando | Finalidade |
|---|---|
| `npm run dev` | Iniciar o ambiente local |
| `npm run build` | Compilar para produção |
| `npm run lint` | Verificar problemas no código |
| `npm run preview` | Visualizar o build localmente |
| `npm run test` | Executar os testes automatizados |

## Testes automatizados

O AcessoBairro utiliza Vitest e React Testing Library para validar o funcionamento de componentes e páginas do Front-end.

Para executar os testes:

`npm run test`

### Testes implementados

Em 19/11/2026, após a implementação da FAQ e da integração opcional com IA, o projeto possui **85 testes automatizados aprovados em 17 arquivos**, distribuídos da seguinte forma:

- **Home (4 testes):** conteúdo principal, navegação e identificação do projeto.
- **Sobre (4 testes):** apresentação da solução e informações acadêmicas.
- **Integrantes (4 testes):** identificação e responsabilidades da equipe.
- **Layout (5 testes):** navegação, menu responsivo e acessibilidade.
- **Contato (5 testes):** informações de contato e navegação por teclado.
- **Cliente HTTP Java (8 testes):** comunicação, configuração e tratamento de erros.
- **Cliente HTTP Flask (6 testes):** integração preparada com IA e tratamento de respostas.
- **Serviço de cadastro (3 testes):** envio de ocorrências e tratamento de erros.
- **Mapeamento IA → Java (8 testes):** correspondência de categorias e identificadores.
- **Conversões IA ↔ Java (11 testes):** normalização de impacto e passagem alternativa.
- **Hook de consultas Java (4 testes):** carregamento, cancelamento e timeout.
- **Páginas de ocorrências (6 testes):** pesquisa, filtros, paginação, detalhes e erros.
- **Utilitários de ocorrências (3 testes):** filtros, ordenação e datas.
- **Novo cadastro de ocorrências (2 testes):** proteção contra duplo envio e liberação de nova tentativa após falha.
- **FAQ (5 testes):** exibição do título e das categorias, apresentação das perguntas, abertura e fechamento de respostas, comportamento de pergunta única aberta e atributos de acessibilidade do acordeão.
- **Serviço de sugestão IA (4 testes):** conversão de dados, validação de entradas e tratamento de respostas.
- **Integração da IA no formulário (3 testes):** aplicação das sugestões, falha da Flask sem bloquear o cadastro e rejeição de passagem alternativa desconhecida.

A validação realizada em 19/11/2026 apresentou:

- **Vitest:** 85 testes aprovados em 17 arquivos.
- **Oxlint:** 0 erros e 0 avisos.
- **Build:** TypeScript e Vite compilados com sucesso.
- **GitHub Actions:** validações das PRs #44 e #45 aprovadas; a PR #45 passou lint, testes e compilação.

Os testes automatizados utilizam respostas simuladas quando necessário e não realizam alterações no banco Oracle.

A integração com a API Java de demonstração foi comprovada por POST/201 e recuperação posterior (INT-03, 18/11). Em 19/11, a Flask foi publicada no Render e a análise real foi demonstrada no React local e no site público da Vercel: categoria `RAMPA_AUSENTE` (`Rampa ausente`) e prioridade `ALTA`, com aplicação explícita da categoria pelo usuário. Os testes automatizados usam mocks; o teste real da IA não incluiu novo POST Java, portanto a persistência dos campos sugeridos no Oracle ainda não foi demonstrada.

### Validação automática

O GitHub Actions executa as seguintes verificações em pull requests destinados à branch `main` e em pushes para ela:

1. Instalação das dependências com `npm ci`.
2. Análise de código com `npm run lint`.
3. Testes automatizados com `npm run test`.
4. Compilação de produção com `npm run build`.

Antes de abrir um Pull Request, recomenda-se executar essas verificações localmente.

Os testes atuais verificam funcionalidades específicas e não substituem os testes manuais de acessibilidade, responsividade e integração com a API.

## Estrutura do Front-end



```text
acessobairro/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   ├── contrato-api-ocorrencias.md
│   └── roteiro-testes-integracao.md
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AccordionItem.tsx
│   │   ├── FeedbackStates.tsx
│   │   ├── Layout.tsx
│   │   └── Layout.test.tsx
│   ├── pages/
│   │   ├── FAQ.tsx
│   │   ├── FAQ.test.tsx
│   │   ├── Home.tsx
│   │   ├── Home.test.tsx
│   │   ├── Sobre.tsx
│   │   └── Sobre.test.tsx
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── apiClient.test.ts
│   ├── test/
│   │   └── setup.ts
│   ├── types/
│   │   └── api.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── package.json
├── vite.config.ts
└── vitest.config.ts
```


A estrutura acima apresenta os arquivos centrais; há também componentes de ocorrência, rotas adicionais, hooks, testes e serviços de integração com Java e Flask. Contato, cadastro e FAQ já foram integrados e verificados.

## Rotas da aplicação

| Rota | Página |
|---|---|
| `/` | Página inicial |
| `/sobre` | Sobre o projeto |
| `/integrantes` | Integrantes |
| `/faq` | Perguntas frequentes |
| `/contato` | Contato |
| `/ocorrencias` | Listagem de ocorrências |
| `/ocorrencias/nova` | Cadastro de ocorrência |
| `/ocorrencias/:id` | Detalhes da ocorrência |

As rotas devem ser revalidadas após os últimos merges.

## Listagem e detalhes de ocorrências

As rotas `/ocorrencias` e `/ocorrencias/:id` consultam a API Java, incluindo histórico, pesquisa, filtros, ordenação e paginação local.

Configure `VITE_API_URL` para utilizar as consultas. Sem essa configuração, a interface apresenta uma mensagem de erro em vez de exibir registros fictícios.

Consulte também a [documentação das consultas de ocorrências](docs/consulta-ocorrencias.md).

A integração com a API Java e os dados do Oracle foi validada localmente e em produção em 16/11/2026, após o merge do PR #11.

## Configuração das APIs

O AcessoBairro utiliza duas APIs:

- **Java (Spring Boot):** responsável pelo cadastro, consulta e gerenciamento das ocorrências no Oracle.
- **Python (Flask):** responsável por analisar relatos e sugerir categoria e prioridade com Inteligência Artificial.

### Variáveis de ambiente

Copie o arquivo de exemplo:

```powershell
Copy-Item .env.example .env
```

No arquivo `.env`, configure:

```env
VITE_API_URL=https://acessobairro-api.onrender.com
VITE_IA_API_URL=https://acessobairro-ia.onrender.com
```

A variável `VITE_API_URL` determina a API Java usada. O exemplo acima aponta para a API original, somente leitura. Na INT-03 (18/11/2026), a Vercel foi configurada com `https://acessobairro-api-demo.onrender.com` e republicada para demonstrar escrita real. Preservar essa configuração durante a avaliação do cadastro.

A variável `VITE_IA_API_URL` aponta para a Flask já publicada em https://acessobairro-ia.onrender.com; ela está configurada no ambiente `Production` da Vercel e foi incorporada ao build automático gerado pelo merge da PR #45 (commit `006b5bb`).

O arquivo `.env` é utilizado no ambiente local e não deve ser enviado ao Git.

Na Vercel, as variáveis precisam ser configuradas nas configurações do projeto e aplicadas por meio de um novo deploy.

**Atenção:** variáveis com prefixo `VITE_` ficam disponíveis no navegador. Nunca utilize essas variáveis para guardar senhas, credenciais do Oracle ou tokens secretos.

### Estado atual da integração

- API Java publicada e acessível no Render.
- Consultas reais de ocorrências, detalhes e histórico validadas no Front e na versão publicada em produção.
- Cliente HTTP da IA e serviço de validação implementados e cobertos por testes automatizados; Flask publicada no Render.
- Mapeamento das cinco categorias entre Flask e Java implementado.
- Conversões de passagem alternativa implementadas.
- INT-02 concluída no escopo de leitura em 18/11/2026: comparação direta Oracle × JSON GET da API Java para os IDs 1, 3, 5 e 9, sem divergências nos campos avaliados (evidências no documento de Engenharia e no `docs/roteiro-testes-integracao.md`).
- **INT-03 concluída no fluxo central (18/11/2026):** formulário do PR #40 executou POST real na Vercel para a API Java demo, com **HTTP 201** e `Location: /ocorrencias/18`. A ocorrência foi recuperada nos detalhes e na listagem, que passou de 16 para 17 registros (Evidências: A24–A29 no relatório de Engenharia).
- **INT-06 — Validação de dados inválidos (18/11/2026):** requisição POST com JSON vazio para a API Java de demonstração retornou HTTP 400 e resposta estruturada `{"status":400,"mensagem":"O impacto é obrigatório"}`. Evidência: Figura A32 do relatório de Engenharia.
- **RNF-07 — Proteção contra duplo envio (18/11/2026):** PR #42 integrada à `main`, adicionando trava com `useRef` e dois testes automatizados para envios simultâneos e nova tentativa após falha.
- **RNF-07 — Teste manual complementar:** em ambiente mobile de 390 × 844 e rede Slow 4G, o duplo clique relatado resultou em somente um POST `/ocorrencias`, HTTP 201, com confirmação da ocorrência fictícia nº 22. Os Headers confirmaram a API Java de demonstração. Evidências: Figuras A33 e A34.
- **Limitação do RNF-07:** o intervalo exato entre os dois cliques não foi cronometrado; o ensaio manual não comprova formalmente o limite inferior a 500 ms.
- **IA em produção, 19/11/2026:** PR #45 integrada, Flask publicada, `VITE_IA_API_URL` configurada e botão `Analisar com IA` validado no site público. Para entrada fictícia, a API retornou `RAMPA_AUSENTE` e prioridade `ALTA`; o usuário aplicou a categoria sugerida no seletor. A FAQ foi concluída pela PR #44 e contém oito perguntas.
- **Limitações:** os campos opcionais de IA ainda não tiveram persistência verificada num POST real Java; o ambiente Java de demonstração está publicamente gravável sem autenticação e deve usar apenas dados fictícios; o intervalo exato do ensaio RNF-07 não foi cronometrado.

O PR #11 foi integrado à `main` no commit `e559a51`, e as páginas de consulta estão publicadas em https://acessobairro.vercel.app.

## Links de avaliação

- **Aplicação publicada (Vercel):** https://acessobairro.vercel.app
- **Repositório público:** https://github.com/Caiomarqx/acessobairro
- **API Java original no Render (somente leitura):** https://acessobairro-api.onrender.com
- **API Java de demonstração (escrita com dados fictícios):** https://acessobairro-api-demo.onrender.com
- **API Flask/IA publicada:** https://acessobairro-ia.onrender.com
- **Repositório da IA:** https://github.com/Caiomarqx/acessobairro-ia
- **Formulário com análise IA:** https://acessobairro.vercel.app/ocorrencias/nova
- **Vídeo demonstrativo de Front-end (até 3 minutos):** pendente de gravação/publicação no YouTube; inserir o link antes da entrega.
- **Contato acadêmico do projeto:** [seção Contato da aplicação](https://acessobairro.vercel.app/contato) e [issues do GitHub](https://github.com/Caiomarqx/acessobairro/issues). Página Contato previamente validada no fluxo de navegação.

## Organização da equipe

| Integrante | Responsabilidade principal |
|---|---|
| Caio | Estrutura, Home, acessibilidade e integração Front-end |
| Gabriel | Listagem, detalhes e filtros de ocorrências |
| Mariana | Chatbot/IA, FAQ e revisão do fluxo de cadastro |
| Rodrigo | Back-end Java, Python e formulário de cadastro (PR #40) |

As responsabilidades podem ser ajustadas conforme a necessidade do projeto.

## Como contribuir

Cada integrante deve trabalhar em sua própria branch, evitando alterações diretas na `main`.

### 1. Atualizar a branch principal

```bash
git switch main
git pull origin main
```

### 2. Criar uma branch

```bash
git switch -c feature/nome-da-funcionalidade
```

### 3. Desenvolver e validar

Antes de publicar, execute:

```bash
npm run build
npm run lint
npm run test
```

Além disso, teste manualmente a funcionalidade modificada.

### 4. Registrar as alterações

Adicione somente os arquivos relacionados à tarefa.

```bash
git add caminho/do/arquivo
git commit -m "feat: descreve a funcionalidade"
```

### 5. Enviar a branch

```bash
git push -u origin feature/nome-da-funcionalidade
```

### 6. Criar um Pull Request

No GitHub, abra um Pull Request para a branch `main`.

Antes do merge:

- Confira os arquivos modificados.
- Verifique se existem conflitos.
- Valide build, lint e comportamento.
- Solicite revisão quando necessário.
- Evite misturar funcionalidades diferentes no mesmo PR.


## Integração com Java e Inteligência Artificial

O AcessoBairro utiliza duas APIs para oferecer suas funcionalidades.

### API Java — Spring Boot

A API Java está publicada no Render:

https://acessobairro-api.onrender.com

Ela é responsável por consultar, cadastrar e gerenciar as ocorrências armazenadas no Oracle.

A comunicação utiliza:

- `src/services/apiClient.ts`: cliente HTTP compartilhado.
- `src/types/api.ts`: contratos TypeScript dos DTOs Java.
- `docs/contrato-api-ocorrencias.md`: documentação técnica dos endpoints.

#### Endpoints usados pelo Front-end

| Método | Endpoint | Onde é usado |
|---|---|---|
| GET | `/ocorrencias` | Página Ocorrências (listagem, filtros e paginação) |
| GET | `/ocorrencias/{id}` | Página de detalhes (`/ocorrencias/:id`) |
| GET | `/ocorrencias/{id}/atualizacoes` | Histórico na página de detalhes |
| POST | `/ocorrencias` | Formulário de cadastro (`cadastrarOcorrencia`) |

#### Respostas de erro

Todos os erros da API vêm no mesmo formato, sem stack trace nem SQL:

```json
{ "status": 404, "mensagem": "Ocorrencia nao encontrada" }
```

| Status | Quando acontece |
|---|---|
| 400 | Campo obrigatório ausente ou valor inválido (Bean Validation) |
| 403 | API em modo somente leitura (`API_SOMENTE_LEITURA=true` no Render) |
| 404 | Ocorrência ou rota inexistente |
| 409 | Regra de negócio violada (ex.: confirmar a própria ocorrência) |
| 500 | Erro interno, com mensagem genérica |

O `apiClient.ts` lê o campo `mensagem` e lança um `ApiError` com o status. Quando a API não responde (fora do ar ou iniciando no Render), mostra uma mensagem em português em vez de "Failed to fetch".

#### CORS e modo somente leitura

- A API aceita requisições apenas de `https://acessobairro.vercel.app` e do Vite local (`http://localhost:5173` e `http://localhost:4173`).
- Com `API_SOMENTE_LEITURA=true`, a API bloqueia POST, PUT, PATCH e DELETE com 403. Isso protege o banco da entrega de Banco de Dados. A escrita é liberada quando o Render aponta para o banco de demonstração.

### Integração com a API Java

O PR #11 foi integrado à `main` no commit `e559a51`. A listagem, os filtros e os detalhes já foram validados em produção.

Foram testados:

- Listagem de 15 ocorrências na verificação inicial e 17 registros após a INT-03 no ambiente de demonstração.
- Consulta de detalhes e histórico.
- Pesquisa, filtros e paginação.
- Tratamento de ocorrência inexistente.
- Responsividade em dispositivos móveis.
- Comunicação com a API publicada no Render.

### API Flask — Inteligência Artificial

O Front-end consome o endpoint Flask `POST /api/analisar-relato` em https://acessobairro-ia.onrender.com. A análise é opcional e retorna categoria e prioridade sugeridas, que não alteram automaticamente a categoria selecionada pelo usuário.

Foram implementados:

- `src/services/iaClient.ts`: cliente HTTP da IA.
- `src/types/ia.ts`: contratos TypeScript do Flask.
- `src/utils/mapeamentoIAJava.ts`: correspondência das categorias entre IA e Java.
- `src/utils/conversaoDadosIA.ts`: conversão de passagem alternativa e de impacto numérico para os níveis BAIXO, MEDIO e ALTO.

Essas funcionalidades possuem testes automatizados.

A regra de impacto (1–2: `BAIXO`; 3: `MEDIO`; 4–5: `ALTO`) e a conversão de passagem (`S`/`N` para `SIM`/`NAO`) foram implementadas. Em 19/11, a rota real respondeu com `RAMPA_AUSENTE`/`ALTA` e a Vercel apresentou/aplicou a categoria. Se a Flask falhar, o cadastro manual continua utilizável. A opção `Não sei` não é enviada como `Não`; sua confirmação é exigida para concluir o cadastro. Os testes de interface demonstraram o envio simulado dos campos de IA ao Java, mas a persistência real não foi testada.

### Cuidados de segurança

O Oracle é compartilhado com o projeto acadêmico da equipe.

Na INT-02 foram utilizadas consultas SELECT/GET no Oracle original, sem escrita. Na INT-03, dados fictícios foram cadastrados pela API Java demo, conectada ao ambiente Oracle isolado conforme configuração informada pela equipe, sem alterar o banco original.

A API Java de demonstração aceita escrita sem autenticação e não deve receber dados reais. CORS não é autenticação: a publicação para usuários reais exigiria controles de acesso e moderação. A API original permanece em somente leitura.

O projeto é demonstrativo e não representa um canal oficial de atendimento da prefeitura.

## Acessibilidade

O projeto busca oferecer:

- Navegação por teclado.
- Link para pular ao conteúdo principal.
- Indicação visual de foco.
- Layout responsivo.
- Respeito à preferência por movimento reduzido.
- Linguagem clara e navegação intuitiva.

As funcionalidades devem continuar sendo avaliadas durante o desenvolvimento.

---

**AcessoBairro — Global Solution FIAP 2026**

