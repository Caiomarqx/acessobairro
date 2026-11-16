
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
| Front-end local | http://localhost:5173 | Consultas Java validadas |
| Front-end Vercel | https://acessobairro.vercel.app | Publicado; consultas validadas em produção |
| API Java local | http://localhost:8080 | Não utilizada nesta validação |
| API Java Render | https://acessobairro-api.onrender.com | Publicada; endpoints GET verificados |
| Oracle | Banco compartilhado com Database | Consultado pela API Java, sem alterações |
| API Flask | URL pública pendente | Publicação e integração pendentes |

A URL pública da API deve ser configurada no Front por meio de `VITE_API_URL`.

Variáveis `VITE_` são expostas no navegador. Nunca inserir nelas senhas, credenciais ou tokens secretos.

Após configurar a variável na Vercel, verificar se é necessário realizar novo deploy.

## 4. Pré-condições

Antes dos testes integrados:

- [x] API Java publicada no Render e endereço confirmado.
- [x] Comunicação de leitura entre API Java e Oracle verificada.
- [x] Telas de listagem e detalhes integradas à `main` pelo PR #11.
- [x] `VITE_API_URL` configurada no ambiente de produção.
- [x] Ocorrência 8 utilizada para validar detalhes e histórico.
- [x] Testes de consulta realizados em ambiente local e produção em 16/11/2026.
- [ ] Confirmar eventuais ajustes finais do modelo de dados com a equipe.
- [ ] Validar o fluxo de cadastro e as permissões dos endpoints de escrita.
- [ ] Publicar a API Flask e configurar `VITE_IA_API_URL` em produção.

A primeira rodada deve usar apenas operações GET.

## 5. Casos de teste da API

### API-01 — Consultar categorias

Endpoint: `GET /categorias`

Resultado esperado:
- Resposta HTTP 200.
- Corpo JSON contendo uma lista.
- Cada categoria possui `cdCategoria`, `nmCategoria` e `dsCategoria`.

Situação: APROVADO — GET /categorias consultado na API Java publicada no Render em 16/11/2026, com retorno das categorias cadastradas no Oracle.

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

Situação: APROVADO — GET /ocorrencias consultado na API Java publicada no Render em 16/11/2026, com retorno de 15 ocorrências reais.

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

Situação: APROVADO — GET /ocorrencias/8 validado em 16/11/2026, com carregamento dos dados reais da ocorrência e de seu histórico no Front-end publicado na Vercel.

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

Situação: PARCIALMENTE VALIDADO — A listagem de ocorrências carregou dados reais da API Java no Front-end publicado em 16/11/2026. O indicador visual de carregamento foi coberto por testes automatizados, mas ainda não foi confirmado especificamente na validação manual em produção.

### FRONT-02 — Pesquisa e filtros

Ação: pesquisar por texto e selecionar categoria e status.

Resultado esperado:
- Resultados correspondem aos filtros.
- Contagem de ocorrências é atualizada.
- Filtros podem ser limpos.
- A pesquisa trata diferenças de acentuação conforme implementação.

Situação: APROVADO — Pesquisa e filtros verificados no Front-end publicado em https://acessobairro.vercel.app em 16/11/2026, utilizando ocorrências reais retornadas pela API Java.

### FRONT-03 — Navegação para detalhes

Ação: selecionar uma ocorrência e clicar em "Ver detalhes".

Resultado esperado:
- URL contém o ID correto.
- Informações correspondem à ocorrência selecionada.
- O retorno para a listagem preserva os filtros, quando aplicável.

Situação: APROVADO — Navegação entre listagem e detalhes validada no Front-end publicado em 16/11/2026. A ocorrência 8 foi aberta com seus dados reais e histórico, e o retorno à listagem funcionou normalmente.

### FRONT-04 — Nenhum resultado

Ação: aplicar uma pesquisa que não corresponda a nenhum registro.

Resultado esperado:
- Mensagem de lista filtrada sem resultados.
- Orientação para alterar ou limpar os filtros.
- Nenhuma tela em branco sem explicação.

Situação: PARCIALMENTE VALIDADO — O estado de lista sem resultados foi verificado nos testes automatizados do Front-end, aprovados em 16/11/2026. Ainda falta confirmar manualmente esse cenário na versão publicada na Vercel.

### FRONT-05 — Falha de comunicação

Ação: simular uma falha HTTP ou de rede em ambiente controlado.

Resultado esperado:
- Mensagem de erro compreensível.
- Opção de tentar novamente.
- A interface não trava.

Usar mocks ou ambiente isolado. Não provocar falhas no Oracle compartilhado.

Situação: PARCIALMENTE VALIDADO — Os testes automatizados aprovados em 16/11/2026 verificaram o tratamento de falhas de comunicação e a opção de tentar novamente. Na versão publicada, a ocorrência 8 apresentou um erro temporário na primeira tentativa, mas carregou normalmente depois. A causa do erro não foi identificada, e ainda falta realizar uma validação manual controlada desse cenário em produção.

### FRONT-06 — Responsividade e acessibilidade

Ação: testar a listagem e os detalhes em desktop e celular.

Resultado esperado:
- Conteúdo sem cortes ou rolagem horizontal indevida.
- Navegação por teclado.
- Foco visível.
- Campos com rótulos compreensíveis.
- Mensagens de estado perceptíveis.

Situação: PARCIALMENTE VALIDADO — O layout da listagem e dos detalhes foi verificado em ambiente local com largura mobile de 390 px em 16/11/2026, sem problemas visuais identificados. Os testes automatizados também cobrem funcionalidades de navegação. Ainda falta concluir uma avaliação manual específica de acessibilidade por teclado e tecnologias assistivas.

## 7. Integração Vercel × Render

### INT-01 — Comunicação entre origens

Ação: acessar a versão publicada do Front e consultar a API.

Resultado esperado:
- Requisição chega ao Render.
- A resposta pode ser lida pelo navegador.
- Ausência de bloqueio CORS.
- Nenhuma credencial do Oracle aparece no Front.

Situação: PARCIALMENTE VALIDADO — Em 16/11/2026, o Front-end publicado na Vercel consultou a API Java hospedada no Render e exibiu dados reais das ocorrências, sem bloqueio CORS observado. Ainda falta uma verificação específica para confirmar que nenhuma credencial sensível está exposta no navegador.

### INT-02 — Consulta ao Oracle

Ação: comparar uma ocorrência retornada pela API com seu registro no banco, com auxílio do responsável.

Resultado esperado:
- Identificadores e dados correspondentes.
- O Front apresenta valores retornados pelo Java.
- Nenhuma alteração é realizada no banco durante a verificação.

Situação: PARCIALMENTE VALIDADO — Em 16/11/2026, o Front-end consumiu dados reais de ocorrências disponibilizados pela API Java integrada ao Oracle. Entretanto, ainda não foi realizada a comparação direta entre uma ocorrência retornada pela API e seu registro correspondente no banco, com auxílio do responsável por Database. Nenhuma operação de escrita foi executada nesta validação.

### INT-03 — Acesso direto às rotas

Ação: abrir e atualizar `/ocorrencias` e `/ocorrencias/{id}` no navegador.

Resultado esperado:
- O React Router carrega corretamente.
- O deploy não devolve 404 indevido ao atualizar a página.
- Os dados são consultados normalmente.

Situação: APROVADO — Em 16/11/2026, as rotas /ocorrencias e /ocorrencias/8 foram abertas diretamente e atualizadas com F5 na versão publicada em https://acessobairro.vercel.app, sem erros 404. A listagem e os detalhes carregaram normalmente após a atualização.

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

O Front-end possui 50 testes automatizados em 10 arquivos, incluindo:

- Home: 4 testes.
- Sobre: 4 testes.
- Layout: 4 testes.
- Cliente HTTP Java: 6 testes.
- Cliente HTTP Flask: 6 testes.
- Mapeamento IA → Java: 8 testes.
- Conversões IA ↔ Java: 5 testes.
- Hook de consultas Java: 4 testes.
- Páginas de ocorrências: 6 testes.
- Utilitários de ocorrências: 3 testes.

Em 16/11/2026, os 50 testes passaram, o lint apresentou zero erros e avisos, e o build de produção foi concluído com sucesso.

Os testes automatizados utilizam respostas simuladas quando necessário e não substituem a validação com as APIs reais.

## 11. Critérios para conclusão

Considerar a integração validada somente quando:

- [x] A API Java está acessível no Render.
- [x] As consultas de leitura ao Oracle estão funcionando pela API Java.
- [x] O Front-end consome respostas reais da API Java.
- [x] Listagem e detalhes foram validados em produção.
- [ ] Concluir a validação dos estados de carregamento, vazio e erro em integração real; os cenários automatizados já foram aprovados.
- [x] CORS e acesso direto às rotas de consulta foram verificados.
- [x] Testes, lint e build foram aprovados após o merge do PR #11.
- [ ] Consolidar prints e registros das evidências de integração.
- [ ] Concluir a revisão de segurança dos endpoints de escrita.
- [ ] Validar o cadastro de ocorrências integrado ao Java e à IA Flask.

**Documento preparado em 12/11/2026.**
**Execução integrada: pendente.**
