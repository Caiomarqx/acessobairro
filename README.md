
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

O Front-end será integrado a uma API REST desenvolvida em Java.

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

A suíte de testes possui 64 testes automatizados, distribuídos em 12 arquivos:

- **Home (4 testes):** título principal, navegação e identificação de conteúdo demonstrativo.
- **Sobre (4 testes):** apresentação do projeto, navegação e aviso sobre o caráter acadêmico.
- **Integrantes (4 testes):** identificação acadêmica, nomes e RMs da equipe, áreas de atuação e navegação para a página Sobre.
- **Layout (5 testes):** acessibilidade, navegação, menu responsivo e link para Integrantes nos menus desktop e mobile.
- **Cliente HTTP Java (6 testes):** respostas JSON, erros HTTP, configuração da API e validação de caminhos.
- **Cliente HTTP Flask (6 testes):** comunicação com a IA, envio de JSON, tratamento de erros, configuração e cancelamento.
- **Serviço de cadastro de ocorrências (3 testes):** envio de cadastro via POST com JSON, tratamento de erros de validação e ausência de configuração da API.
- **Mapeamento IA → Java (8 testes):** correspondência das cinco categorias, normalização de nomes e utilização de IDs retornados pela API.
- **Conversões IA ↔ Java (11 testes):** conversão de passagem alternativa entre S/N e SIM/NAO, conversão de impacto numérico (1 a 5) para BAIXO/MEDIO/ALTO e rejeição de valores inválidos.
- **Hook de consultas Java (4 testes):** cancelamento de requisições antigas, timeout de 75 segundos, ausência de configuração e respostas demoradas.
- **Páginas de ocorrências (6 testes):** pesquisa, filtros, navegação, paginação, lista vazia, erros HTTP e recuperação do histórico.
- **Utilitários de ocorrências (3 testes):** combinação de filtros, ordenação e formatação de datas.

Os testes automatizados utilizam respostas simuladas quando necessário e não realizam alterações no banco Oracle.

A integração com a API Java foi validada localmente e em produção após o merge do PR #11. A comunicação completa com a API Flask ainda depende de sua publicação e integração ao formulário.

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
│   │   ├── FeedbackStates.tsx
│   │   ├── Layout.tsx
│   │   └── Layout.test.tsx
│   ├── pages/
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


Outras páginas e componentes serão adicionados conforme o desenvolvimento.

## Rotas previstas

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

Algumas rotas ainda exibem páginas provisórias.

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
VITE_IA_API_URL=
```

A variável `VITE_API_URL` aponta para a API Java publicada no Render.

A variável `VITE_IA_API_URL` deverá receber a URL pública do Flask quando a equipe concluir sua publicação.

O arquivo `.env` é utilizado no ambiente local e não deve ser enviado ao Git.

Na Vercel, as variáveis precisam ser configuradas nas configurações do projeto e aplicadas por meio de um novo deploy.

**Atenção:** variáveis com prefixo `VITE_` ficam disponíveis no navegador. Nunca utilize essas variáveis para guardar senhas, credenciais do Oracle ou tokens secretos.

### Estado atual da integração

- API Java publicada e acessível no Render.
- Consultas reais de ocorrências, detalhes e histórico validadas no Front local do PR #11.
- Cliente HTTP da IA implementado com testes automatizados.
- Mapeamento das cinco categorias entre Flask e Java implementado.
- Conversões de passagem alternativa implementadas.
- Publicação do Flask e integração completa do formulário ainda pendentes.

O PR #11 foi integrado à `main` no commit `e559a51`, e as páginas de consulta estão publicadas em https://acessobairro.vercel.app.

## Organização da equipe

| Integrante | Responsabilidade principal |
|---|---|
| Caio | Estrutura, Home, acessibilidade e integração Front-end |
| Gabriel | Listagem, detalhes e filtros de ocorrências |
| Mariana | Formulário de cadastro e FAQ |
| Rodrigo | Back-end Java e páginas institucionais, conforme disponibilidade |

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

### Integração com a API Java

O PR #11 foi integrado à `main` no commit `e559a51`. A listagem, os filtros e os detalhes já foram validados em produção.

Foram testados:

- Listagem de 15 ocorrências.
- Consulta de detalhes e histórico.
- Pesquisa, filtros e paginação.
- Tratamento de ocorrência inexistente.
- Responsividade em dispositivos móveis.
- Comunicação com a API publicada no Render.

### API Flask — Inteligência Artificial

O Front-end também possui uma camada preparada para consumir o endpoint `POST /api/analisar-relato`.

Foram implementados:

- `src/services/iaClient.ts`: cliente HTTP da IA.
- `src/types/ia.ts`: contratos TypeScript do Flask.
- `src/utils/mapeamentoIAJava.ts`: correspondência das categorias entre IA e Java.
- `src/utils/conversaoDadosIA.ts`: conversão de passagem alternativa.

Essas funcionalidades possuem testes automatizados.

A publicação da API Flask, a confirmação da regra de impacto e a conexão com o formulário de cadastro ainda estão pendentes.

### Cuidados de segurança

O Oracle é compartilhado com o projeto acadêmico da equipe.

As validações realizadas nesta etapa utilizaram operações de leitura, sem modificar registros do banco.

Antes de disponibilizar funcionalidades de escrita, a equipe deverá revisar os controles de acesso da API Java.

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

