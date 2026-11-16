
# AcessoBairro — Roteiro de Testes de Integração

## 1. Objetivo

Validar a comunicação entre o Front-end React, a API REST Java e o banco Oracle do AcessoBairro.

Este roteiro complementa os testes automatizados do Front-end e a documentação do contrato da API.

**Estado atual: VALIDAÇÃO PARCIAL CONCLUÍDA — CONSULTAS JAVA VALIDADAS EM PRODUÇÃO.**

Em 16/11/2026, a integração de leitura foi validada inicialmente no ambiente local, utilizando as telas desenvolvidas no PR #11 e a API Java publicada no Render.

Após a integração do PR #11 à `main` (commit `e559a51`), a versão atualizada foi publicada com sucesso na Vercel:

https://acessobairro.vercel.app

Foram verificados:

- Consulta real de categorias na API Java.
- Listagem de 15 ocorrências no ambiente de testes.
- Pesquisa, filtros e paginação.
- Abertura de detalhes e retorno à listagem.
- Consulta da ocorrência 8, incluindo informações e histórico.
- Tratamento de ocorrência inexistente.
- Responsividade mobile no ambiente local.
- Carregamento das páginas de consulta em produção, sem bloqueio CORS observado.

A primeira tentativa de carregamento da ocorrência 8 apresentou um erro temporário, mas a consulta posterior funcionou. A causa não foi confirmada e poderá ser investigada caso se repita.

**Ainda pendente:** validação do cadastro de ocorrências e comunicação real com a API Flask de Inteligência Artificial. Os testes realizados não incluíram operações de escrita no Oracle.

## 2. Referências

- Contrato técnico: `docs/contrato-api-ocorrencias.md`
- Endpoints do Java: `ENDPOINTS.md`, fornecido pelo Rodrigo
- Cliente HTTP: `src/services/apiClient.ts`
- Tipos TypeScript: `src/types/api.ts`
- Site: https://acessobairro.vercel.app

## 3. Ambientes

| Ambiente | Endereço | Situação |
|---|---|---|
| Front-end local | http://localhost:5173 | Disponível para desenvolvimento |
| Front-end Vercel | https://acessobairro.vercel.app | Publicado |
| API Java local | http://localhost:8080 | Execução depende de configuração |
| API Render | A confirmar com Rodrigo | Pendente |
| Oracle | Banco compartilhado com Database | Acesso integrado a validar |

A URL pública da API deve ser configurada no Front por meio de `VITE_API_URL`.

Variáveis `VITE_` são expostas no navegador. Nunca inserir nelas senhas, credenciais ou tokens secretos.

Após configurar a variável na Vercel, verificar se é necessário realizar novo deploy.

## 4. Pré-condições

Antes dos testes integrados:

- [ ] Rodrigo confirmar a publicação da API e sua URL.
- [ ] Rodrigo confirmar que a API está acessando o Oracle.
- [ ] Gabriel confirmar a estrutura do banco utilizada pela API.
- [ ] Gabriel disponibilizar a versão revisável das telas de ocorrências.
- [ ] Front configurar `VITE_API_URL`.
- [ ] Confirmar um identificador de ocorrência existente, sem alterar dados.
- [ ] Definir responsáveis pela execução e registro dos resultados.

A primeira rodada deve usar apenas operações GET.

## 5. Casos de teste da API

### API-01 — Consultar categorias

Endpoint: `GET /categorias`

Resultado esperado:
- Resposta HTTP 200.
- Corpo JSON contendo uma lista.
- Cada categoria possui `cdCategoria`, `nmCategoria` e `dsCategoria`.

Situação: NÃO EXECUTADO.

### API-02 — Consultar bairros

Endpoint: `GET /bairros`

Resultado esperado:
- Resposta HTTP 200.
- Lista de bairros em JSON.
- Campos compatíveis com o contrato Java.

Situação: NÃO EXECUTADO.

### API-03 — Listar ocorrências

Endpoint: `GET /ocorrencias`

Resultado esperado:
- Resposta HTTP 200.
- Corpo JSON contendo um array, mesmo quando vazio.
- Registros ordenados dos mais recentes para os mais antigos, conforme contrato.
- Campos compatíveis com `OcorrenciaSaidaDTO`.

Situação: NÃO EXECUTADO.

### API-04 — Validar dados relacionados

Endpoint: `GET /ocorrencias`

Resultado esperado:
- Cada ocorrência possui `cdOcorrencia`, `dsOcorrencia`, `stOcorrencia` e demais campos documentados.
- `usuario`, `bairro` e `categoria` aparecem como objetos.
- Status e prioridades seguem os valores definidos no contrato.
- Campos opcionais ou anuláveis são tratados corretamente.

Situação: NÃO EXECUTADO.

### API-05 — Consultar ocorrência existente

Endpoint: `GET /ocorrencias/{id}`

Pré-condição: utilizar um ID existente obtido da listagem.

Resultado esperado:
- Resposta HTTP 200.
- Os detalhes correspondem ao registro selecionado.
- O identificador retornado corresponde ao solicitado.

Situação: NÃO EXECUTADO.

### API-06 — Consultar ocorrência inexistente

Endpoint: `GET /ocorrencias/{id}`

Pré-condição: utilizar um ID confirmado como inexistente.

Resultado esperado:
- Resposta HTTP 404.
- Erro JSON com `status` e `mensagem`.
- O Front apresenta feedback compreensível.

Situação: NÃO EXECUTADO.

## 6. Casos de teste do Front-end

### FRONT-01 — Carregamento inicial

Ação: abrir `/ocorrencias`.

Resultado esperado:
- Indicador de carregamento durante a consulta.
- Exibição dos dados após sucesso.
- Ausência de informações fictícias apresentadas como registros reais.

Situação: NÃO EXECUTADO.

### FRONT-02 — Pesquisa e filtros

Ação: pesquisar por texto e selecionar categoria e status.

Resultado esperado:
- Resultados correspondem aos filtros.
- Contagem de ocorrências é atualizada.
- Filtros podem ser limpos.
- A pesquisa trata diferenças de acentuação conforme implementação.

Situação: NÃO EXECUTADO.

### FRONT-03 — Navegação para detalhes

Ação: selecionar uma ocorrência e clicar em "Ver detalhes".

Resultado esperado:
- URL contém o ID correto.
- Informações correspondem à ocorrência selecionada.
- O retorno para a listagem preserva os filtros, quando aplicável.

Situação: NÃO EXECUTADO.

### FRONT-04 — Nenhum resultado

Ação: aplicar uma pesquisa que não corresponda a nenhum registro.

Resultado esperado:
- Mensagem de lista filtrada sem resultados.
- Orientação para alterar ou limpar os filtros.
- Nenhuma tela em branco sem explicação.

Situação: NÃO EXECUTADO.

### FRONT-05 — Falha de comunicação

Ação: simular uma falha HTTP ou de rede em ambiente controlado.

Resultado esperado:
- Mensagem de erro compreensível.
- Opção de tentar novamente.
- A interface não trava.

Usar mocks ou ambiente isolado. Não provocar falhas no Oracle compartilhado.

Situação: NÃO EXECUTADO.

### FRONT-06 — Responsividade e acessibilidade

Ação: testar a listagem e os detalhes em desktop e celular.

Resultado esperado:
- Conteúdo sem cortes ou rolagem horizontal indevida.
- Navegação por teclado.
- Foco visível.
- Campos com rótulos compreensíveis.
- Mensagens de estado perceptíveis.

Situação: NÃO EXECUTADO.

## 7. Integração Vercel × Render

### INT-01 — Comunicação entre origens

Ação: acessar a versão publicada do Front e consultar a API.

Resultado esperado:
- Requisição chega ao Render.
- A resposta pode ser lida pelo navegador.
- Ausência de bloqueio CORS.
- Nenhuma credencial do Oracle aparece no Front.

Situação: NÃO EXECUTADO.

### INT-02 — Consulta ao Oracle

Ação: comparar uma ocorrência retornada pela API com seu registro no banco, com auxílio do responsável.

Resultado esperado:
- Identificadores e dados correspondentes.
- O Front apresenta valores retornados pelo Java.
- Nenhuma alteração é realizada no banco durante a verificação.

Situação: NÃO EXECUTADO.

### INT-03 — Acesso direto às rotas

Ação: abrir e atualizar `/ocorrencias` e `/ocorrencias/{id}` no navegador.

Resultado esperado:
- O React Router carrega corretamente.
- O deploy não devolve 404 indevido ao atualizar a página.
- Os dados são consultados normalmente.

Situação: NÃO EXECUTADO.

## 8. Segurança e restrições

O Oracle é compartilhado com a entrega acadêmica de Database.

Nesta rodada:

- Não executar scripts de exclusão ou recriação de tabelas.
- Não realizar POST, PUT, PATCH ou DELETE no banco compartilhado.
- Não publicar credenciais em código, logs ou capturas.
- Não tratar `cdUsuario` como autenticação real.
- Não considerar CORS uma proteção de acesso.
- Validar a proteção dos endpoints de escrita antes de disponibilizá-los publicamente.

Testes de cadastro e alterações deverão ser planejados em ambiente controlado ou com autorização explícita da equipe.

## 9. Registro de evidências

Para cada teste executado, registrar:

| Campo | Informação |
|---|---|
| ID do teste | API-01, FRONT-01 etc. |
| Data | Data da execução |
| Responsável | Integrante que executou |
| Ambiente | Local, Render ou Vercel |
| Versão | Commit ou PR testado |
| Resultado | APROVADO, REPROVADO ou BLOQUEADO |
| Evidência | Print, log ou link |
| Observações | Erro encontrado ou limitação |

Não marcar casos como aprovados sem executar o procedimento.

Evidências recomendadas:
- Resposta JSON de `GET /ocorrencias`.
- Listagem carregando dados reais.
- Tela de detalhes correspondente.
- Pesquisa e filtros.
- Tratamento de erros.
- Requisições no navegador sem erro CORS.
- Resultado do GitHub Actions.

## 10. Validações automatizadas existentes

O Front-end possui 18 testes automatizados com Vitest:

- Home: 4 testes.
- Sobre: 4 testes.
- Layout: 4 testes.
- Cliente HTTP: 6 testes.

Os testes do cliente HTTP utilizam respostas simuladas.

As últimas verificações locais de testes, lint e build foram aprovadas antes da criação deste roteiro.

Esses resultados não equivalem à aprovação dos casos de integração acima.

## 11. Critérios para conclusão

Considerar a integração validada somente quando:

- [ ] A API Java estiver acessível.
- [ ] As consultas ao Oracle estiverem funcionando.
- [ ] O Front consumir respostas reais.
- [ ] Listagem e detalhes forem aprovados.
- [ ] Os estados de carregamento, vazio e erro forem testados.
- [ ] CORS e acesso direto às rotas forem verificados.
- [ ] Testes, lint e build estiverem aprovados após os merges.
- [ ] As evidências forem registradas.
- [ ] Os riscos de segurança da publicação estiverem documentados e tratados.

**Documento preparado em 12/11/2026.**
**Execução integrada: pendente.**
