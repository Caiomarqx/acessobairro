
# AcessoBairro — Contrato da API REST

## Status

**Contrato baseado na implementação Java recebida em 12/11/2026.**

Fonte: `acessobairro-api.zip`, especialmente `ENDPOINTS.md`, controllers e DTOs.

Os caminhos e formatos descritos correspondem à implementação recebida. O funcionamento integrado com o Oracle e o deploy no Render ainda precisam ser validados.

## 1. Endereços e configuração

- Ambiente local: `http://localhost:8080`
- Ambiente Render: URL pendente de publicação pelo responsável pelo Java.
- Front-end React: variável `VITE_API_URL`.
- Comunicação: HTTP com JSON.
- Paginação: não implementada na listagem de ocorrências.

O Front deve utilizar o cliente HTTP compartilhado em `src/services/apiClient.ts`.

As credenciais do Oracle pertencem exclusivamente ao ambiente do back-end e nunca devem ser inseridas em variáveis `VITE_`.

## 2. Endpoints disponíveis

### Categorias

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/categorias` | Listar categorias |
| GET | `/categorias/{id}` | Consultar categoria |
| POST | `/categorias` | Cadastrar categoria |
| PUT | `/categorias/{id}` | Atualizar categoria |
| DELETE | `/categorias/{id}` | Excluir categoria |

### Bairros

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/bairros` | Listar bairros |
| GET | `/bairros/{id}` | Consultar bairro |
| POST | `/bairros` | Cadastrar bairro |
| PUT | `/bairros/{id}` | Atualizar bairro |
| DELETE | `/bairros/{id}` | Excluir bairro |

### Usuários

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/usuarios` | Listar usuários |
| GET | `/usuarios/{id}` | Consultar usuário |
| POST | `/usuarios` | Cadastrar usuário |
| PUT | `/usuarios/{id}` | Atualizar usuário |
| DELETE | `/usuarios/{id}` | Excluir usuário |

### Ocorrências

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/ocorrencias` | Listar ocorrências, mais recentes primeiro |
| GET | `/ocorrencias/{id}` | Consultar detalhes |
| POST | `/ocorrencias` | Registrar ocorrência |
| PUT | `/ocorrencias/{id}` | Atualizar dados permitidos |
| PATCH | `/ocorrencias/{id}/prioridade` | Definir prioridade final |
| DELETE | `/ocorrencias/{id}` | Excluir ocorrência |

### Atualizações e histórico

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/ocorrencias/{id}/atualizacoes` | Consultar histórico da ocorrência |
| POST | `/ocorrencias/{id}/atualizacoes` | Adicionar atualização |
| GET | `/atualizacoes` | Listar todas as atualizações |
| GET | `/atualizacoes/{id}` | Consultar atualização |
| PUT | `/atualizacoes/{id}` | Corrigir texto da atualização |
| DELETE | `/atualizacoes/{id}` | Excluir atualização |

### Confirmações comunitárias

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/ocorrencias/{id}/confirmacoes` | Listar confirmações |
| POST | `/ocorrencias/{id}/confirmacoes` | Confirmar ocorrência |

## 3. Estrutura dos dados

### Categoria

Campos de resposta:

- `cdCategoria`: identificador numérico.
- `nmCategoria`: nome da categoria.
- `dsCategoria`: descrição.

### Bairro

Campos de resposta:

- `cdBairro`: identificador numérico.
- `nmBairro`: nome.
- `nmCidade`: cidade.
- `sgUf`: sigla do estado.

### Usuário

Campos de resposta:

- `cdUsuario`: identificador numérico.
- `nmUsuario`: nome.
- `tpPerfil`: `CIDADAO` ou `MODERADOR`.
- `dtCadastro`: data de cadastro.

O e-mail não é retornado pela API.

### Ocorrência

A resposta de `GET /ocorrencias/{id}` possui os seguintes campos principais:

| Campo | Significado |
|---|---|
| `cdOcorrencia` | Identificador |
| `usuario` | Objeto com os dados públicos do usuário |
| `bairro` | Objeto com os dados do bairro |
| `categoria` | Objeto com os dados da categoria |
| `dsEnderecoAprox` | Endereço aproximado |
| `dsOcorrencia` | Descrição da barreira |
| `nrImpacto` | Impacto de 1 a 5 |
| `flPassagemAlternativa` | `S` ou `N` |
| `flServicoEssencial` | `S` ou `N` |
| `stOcorrencia` | Status |
| `nmCategoriaSugerida` | Categoria sugerida pela IA, quando disponível |
| `tpPrioridadeSugerida` | Prioridade sugerida, quando disponível |
| `tpPrioridadeFinal` | Prioridade definida pela moderação, quando disponível |
| `dtRegistro` | Data de registro |

Os objetos `usuario`, `bairro` e `categoria` são retornados dentro da ocorrência.

Exemplo ilustrativo de resposta:

```json
{
  "cdOcorrencia": 16,
  "usuario": {
    "cdUsuario": 1,
    "nmUsuario": "Ana Souza",
    "tpPerfil": "CIDADAO",
    "dtCadastro": "2026-11-06T10:00:00"
  },
  "bairro": {
    "cdBairro": 1,
    "nmBairro": "Jardim Central",
    "nmCidade": "São Paulo",
    "sgUf": "SP"
  },
  "categoria": {
    "cdCategoria": 2,
    "nmCategoria": "Rampa ausente",
    "dsCategoria": "Travessia sem rampa."
  },
  "dsEnderecoAprox": "Esquina da UBS Modelo",
  "dsOcorrencia": "Falta rampa no lado sul da travessia.",
  "nrImpacto": 4,
  "flPassagemAlternativa": "N",
  "flServicoEssencial": "S",
  "stOcorrencia": "ABERTA",
  "nmCategoriaSugerida": null,
  "tpPrioridadeSugerida": null,
  "tpPrioridadeFinal": null,
  "dtRegistro": "2026-11-12T15:20:00"
}
```

Os valores desse exemplo são demonstrativos, não registros confirmados do Oracle.

## 4. Cadastro de ocorrências

Endpoint: `POST /ocorrencias`.

Exemplo de corpo:

```json
{
  "cdUsuario": 1,
  "cdBairro": 1,
  "cdCategoria": 2,
  "dsEnderecoAprox": "Esquina da UBS Modelo",
  "dsOcorrencia": "Falta rampa no lado sul da travessia.",
  "nrImpacto": 4,
  "flPassagemAlternativa": "N",
  "flServicoEssencial": "S"
}
```

A API define automaticamente:

- Status inicial: `ABERTA`.
- Prioridade final: `null`.
- Data de registro: data e hora do servidor.

Os campos opcionais `nmCategoriaSugerida` e `tpPrioridadeSugerida` podem vir da API de IA em Flask.

Caso o serviço de IA esteja indisponível, esses campos podem ser omitidos sem impedir o cadastro.

O cadastro bem-sucedido retorna HTTP `201` e cabeçalho `Location`.

## 5. Valores fixos e regras de negócio

### Status das ocorrências

- `ABERTA`
- `EM_ANALISE`
- `RESOLVIDA`
- `ARQUIVADA`

A mudança de status ocorre pelo histórico de atualizações, respeitando as regras do back-end.

O status `RESOLVIDA` representa informação comunitária, não confirmação oficial de reparo.

### Prioridades

- `BAIXA`
- `MEDIA`
- `ALTA`

O endpoint `PATCH /ocorrencias/{id}/prioridade` exige usuário com perfil `MODERADOR`.

### Perfis

- `CIDADAO`
- `MODERADOR`

### Flags

- `S`: sim.
- `N`: não.

### Impacto

Número inteiro de `1` a `5`.

### Atualizações

- Ocorrências `RESOLVIDA` ou `ARQUIVADA` não recebem novas atualizações.
- Alterações de status exigem perfil moderador.
- Caminho previsto: `ABERTA` → `EM_ANALISE` → `RESOLVIDA` ou `ARQUIVADA`.
- Comentários sem mudança de status podem ser enviados por cidadãos.

### Confirmações

- O autor não pode confirmar sua própria ocorrência.
- Um usuário não pode confirmar a mesma ocorrência duas vezes.

## 6. Formato de erros

A API utiliza respostas JSON com os campos `status` e `mensagem`.

Exemplo:

```json
{
  "status": 404,
  "mensagem": "Ocorrencia nao encontrada"
}
```

| HTTP | Significado |
|---|---|
| 400 | Dados inválidos ou ausentes |
| 404 | Registro ou rota inexistente |
| 405 | Método HTTP não permitido |
| 409 | Conflito de regra de negócio |
| 500 | Falha interna |

O Front deve apresentar mensagens compreensíveis e oferecer uma próxima ação quando apropriado.

O `apiClient.ts` já contém tratamento básico para erros HTTP e leitura do campo `mensagem`.

Respostas `204` não possuem corpo JSON.

## 7. Adaptação para o Front-end

Os dados demonstrativos atualmente usados pelo Gabriel possuem uma estrutura mais simples.

Mapeamento inicial proposto:

| Campo da interface | Origem na API |
|---|---|
| `id` | `cdOcorrencia` |
| `tipoBarreira` | `categoria.nmCategoria` |
| `descricao` | `dsOcorrencia` |
| `bairro` | `bairro.nmBairro` |
| `endereco` | `dsEnderecoAprox` |
| `status` | `stOcorrencia` |
| `prioridade` | `tpPrioridadeFinal` ou `tpPrioridadeSugerida` |

A escolha entre prioridade final e sugerida deve ser definida conforme a regra de apresentação da interface.

Os filtros atuais da listagem podem ser aplicados no Front após consultar `GET /ocorrencias`.

A integração deverá contemplar:

- Estado de carregamento.
- Lista vazia.
- Falha de comunicação.
- Registro não encontrado.
- Preservação dos filtros durante a navegação.
- Exibição de dados reais somente após validação com a API.

As páginas devem informar que os registros são comunitários e não equivalem a solicitações oficiais à prefeitura.

## 8. Segurança e cuidados com o Oracle

A implementação recebida não possui autenticação real.

O usuário é escolhido na interface, e o código `cdUsuario` é enviado nas operações correspondentes. Isso não constitui um mecanismo seguro de autenticação.

Antes de disponibilizar publicamente operações de escrita, a equipe deverá definir proteção adequada ou utilizar um ambiente de demonstração isolado.

O Oracle é compartilhado com a entrega de Database. Evitar cadastros, exclusões e alterações desnecessárias.

Para a primeira integração, priorizar consultas GET, sem modificar registros.

Credenciais e senhas nunca devem ser publicadas no GitHub ou incorporadas ao Front-end.

## 9. Validações pendentes

- [x] Receber o código Java.
- [x] Receber a documentação dos endpoints.
- [x] Identificar os campos e formatos de resposta.
- [x] Comparar o DDL recebido com a modelagem de Database.
- [ ] Confirmar que a estrutura está aplicada no Oracle acessado pela API.
- [ ] Confirmar os GETs em execução com dados reais.
- [ ] Receber e verificar a URL pública do Render.
- [ ] Validar a comunicação do Front com o Render e o CORS.
- [ ] Definir proteção para endpoints de escrita.
- [ ] Integrar listagem e detalhes de ocorrências.
- [ ] Integrar o formulário de cadastro.
- [ ] Testar fluxos de sucesso, vazio e erro.
- [ ] Executar lint, testes automatizados e build após a integração.

## 10. Responsabilidades

- **Caio:** estrutura compartilhada, documentação técnica, testes e apoio à integração Front-end.
- **Gabriel:** listagem, filtros, detalhes e compatibilidade do Database.
- **Mariana:** formulário de cadastro e interface relacionada.
- **Rodrigo:** implementação Java, configuração Oracle e publicação da API no Render.

## 11. Critério de conclusão

O contrato está documentado com base no código recebido, mas a integração não pode ser considerada concluída até que:

1. A API esteja acessível no ambiente acordado.
2. As consultas funcionem com o Oracle.
3. O Front consuma e apresente as respostas reais.
4. Os testes sejam executados com sucesso.
5. Os riscos de operações de escrita estejam tratados.

**Última revisão documental: 12/11/2026.**
