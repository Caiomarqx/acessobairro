
# AcessoBairro — Contrato da API de Ocorrências

## Status
PROPOSTA — Pendente de validação com a equipe.

Este documento define uma proposta de comunicação entre
o Front-end React e a API Java Spring Boot.

Os nomes dos campos, tipos e endpoints ainda precisam
ser confirmados antes da implementação definitiva.

## 1. Dados de uma ocorrência

| Campo | Tipo proposto | Finalidade |
|---|---|---|
| id | number | Identificador único |
| titulo | string | Resumo da barreira |
| descricao | string | Detalhes do problema |
| tipoBarreira | string | Categoria da barreira |
| endereco | string | Local informado |
| bairro | string | Bairro da ocorrência |
| status | string | Situação dentro da plataforma |
| criadoEm | string | Data de criação |

Observação: a necessidade de campos adicionais, como
cidade, foto ou coordenadas, será definida com a equipe.

## 2. Operações necessárias

### Listar ocorrências
Método proposto: GET
Caminho proposto: /ocorrencias

Deve retornar as ocorrências cadastradas.

### Consultar ocorrência por ID
Método proposto: GET
Caminho proposto: /ocorrencias/{id}

Deve retornar os detalhes de uma ocorrência.

### Registrar ocorrência
Método proposto: POST
Caminho proposto: /ocorrencias

Deve receber os dados do formulário de cadastro.

O formato exato do corpo JSON precisa ser confirmado.

## 3. Regras de integração

- A comunicação será realizada com Fetch.
- A URL base será definida por VITE_API_URL.
- As respostas de sucesso com dados usarão JSON.
- Os erros HTTP deverão ser tratados pelo Front-end.
- A API deverá permitir requisições da origem do Front-end.
- O registro não equivale a uma solicitação oficial
  de manutenção à prefeitura.

## 4. Pontos pendentes de confirmação

- [ ] Confirmar os caminhos reais dos endpoints.
- [ ] Confirmar nomes e tipos dos campos.
- [ ] Confirmar campos obrigatórios do cadastro.
- [ ] Confirmar categorias permitidas de barreiras.
- [ ] Confirmar os valores possíveis de status.
- [ ] Confirmar formato de datas.
- [ ] Confirmar formato das respostas e dos erros.
- [ ] Confirmar se a API utiliza autenticação.
- [ ] Confirmar URL e configuração de CORS.

## 5. Responsabilidades

Caio: estrutura compartilhada e integração do Front-end.
Gabriel: listagem, detalhes e filtros de ocorrências.
Mariana: formulário de cadastro de ocorrências.
Rodrigo: implementação e validação do contrato da API Java.

## 6. Critério para aprovação

O contrato será considerado aprovado após alinhamento
entre os responsáveis pelo Front-end e pela API Java.

Somente depois disso criaremos os tipos TypeScript
e serviços específicos para os endpoints confirmados.
