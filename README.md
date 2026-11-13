
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

Atualmente, o projeto possui 30 testes automatizados:

- **Home (4 testes):** título principal, navegação para cadastro e listagem de ocorrências e identificação de conteúdo demonstrativo.
- **Sobre (4 testes):** título principal, pilares do projeto, navegação e aviso sobre o caráter acadêmico da plataforma.
- **Layout (4 testes):** link de acessibilidade, navegação para cadastro, abertura e fechamento do menu mobile e navegação entre páginas.
- **Cliente HTTP (6 testes):** leitura de respostas JSON (200), tratamento de respostas sem conteúdo (204), erros HTTP (404 e 500), ausência de `VITE_API_URL` e rejeição de caminhos inválidos.

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

As rotas `/ocorrencias` e `/ocorrencias/:id` consultam a API Java, incluindo histórico, pesquisa, filtros, ordenação e paginação local. Configure `VITE_API_URL` para utilizá-las; sem configuração, a página informa o erro e não exibe mocks.

Veja [configuração e validação das consultas](docs/consulta-ocorrencias.md). Os testes automatizados utilizam respostas simuladas; a validação com Oracle e o endereço publicado da API ainda estão pendentes.

## Configuração da API

O projeto utiliza a variável `VITE_API_URL` para configurar o endereço da API Java.

Para preparar o ambiente no PowerShell:

```powershell
Copy-Item .env.example .env
```

Depois, preencha `VITE_API_URL` no arquivo `.env` com o endereço confirmado do back-end.

A API ainda depende da integração com o desenvolvimento Java.

**Atenção:** nunca coloque senhas, credenciais do Oracle ou tokens secretos em variáveis `VITE_`, pois elas ficam disponíveis no navegador.

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

## Integração com o back-end


O Front-end foi preparado para consumir a API REST desenvolvida em Java pela equipe.

A estrutura de integração inclui:

- **Cliente HTTP:** `src/services/apiClient.ts`, responsável pelas requisições e pelo tratamento básico de respostas e erros.
- **Tipos TypeScript:** `src/types/api.ts`, com interfaces baseadas nos DTOs recebidos da API Java.
- **Contrato de integração:** `docs/contrato-api-ocorrencias.md`, com endpoints, campos e regras documentados.
- **Roteiro de testes:** `docs/roteiro-testes-integracao.md`, com cenários para validar React, Java, Render e Oracle.

Os contratos foram preparados com base no código Java disponibilizado pela equipe.

**Situação atual:** a comunicação real entre o Front-end, a API que será publicada no Render e o banco Oracle ainda precisa ser validada.

Os testes automatizados do cliente HTTP utilizam respostas simuladas e não comprovam a conectividade com o banco de dados.

Antes da publicação definitiva, a equipe também deverá revisar a proteção dos endpoints de escrita e evitar a exposição de credenciais.


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

