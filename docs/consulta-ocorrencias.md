# Consulta de ocorrências — integração do front-end

A listagem e os detalhes utilizam os DTOs Java recebidos em `acessobairro-api.zip` (ENDPOINTS.md, controllers e DTOs). Não há fallback automático para registros fictícios.

## Preparar o ambiente

Com a API Java funcionando e conectada ao Oracle, configure `.env`:

```dotenv
VITE_API_URL=http://localhost:8080
```

Esse endereço funciona somente quando o navegador consegue acessar a API na própria máquina. Para o site publicado, use a URL HTTPS do backend, quando fornecida pelo Rodrigo. Reinicie o Vite após alterar `.env`; em produção, gere um novo build com a variável configurada.

```sh
npm ci
npm run dev
```

## Fluxos implementados

- `GET /ocorrencias`: lista completa; filtros, ordenação e paginação de dez registros executados no navegador.
- `GET /ocorrencias/{id}`: detalhes com autor, localização, impacto, condições, data e prioridades sugerida e final separadas.
- `GET /ocorrencias/{id}/atualizacoes`: histórico com responsável, situação, texto e data. Uma falha do histórico não esconde o detalhe.
- Busca sem acentos; filtros por categoria, status, impacto, bairro, cidade, UF, passagem alternativa e serviço essencial.
- Ordenação por mais recentes, maior impacto ou maior prioridade sugerida. Prioridades nulas ficam depois das preenchidas.
- Filtros e página ficam na URL e são preservados ao retornar do detalhe. Alterar um filtro retorna à primeira página.
- Carregamento, vazio, erro com nova tentativa e 404. Consultas excedendo 75 segundos apresentam opção de nova tentativa; a navegação cancela requisições anteriores.
- Flags N de passagem alternativa são exibidas como “Não informada como disponível”, pois o cadastro também pode converter “Não sei” em N.
- Nenhum POST, PUT, PATCH ou DELETE foi acrescentado nesta integração.

As datas LocalDateTime são apresentadas sem conversão de fuso. Os registros continuam identificados como comunitários de projeto acadêmico, podendo incluir dados de teste.

## Verificação

```sh
npm run lint
npm test
npm run build
```

Os testes de consulta usam respostas HTTP simuladas compatíveis com o contrato. Cobrem pesquisa, filtros, paginação, retorno do detalhe, prioridades nulas, erro de rede e recuperação, 404, ID inválido, histórico com falha e recuperação, timeout, cancelamento e resposta atrasada de outra navegação.

## Validação integrada informada pela equipe — 16/11/2026

A equipe informou aprovação com a API Java no Render: listagem de 15 ocorrências, detalhes e histórico, pesquisa sem acentuação, filtro por status, preservação dos filtros, paginação 10/5, 404 e tela de 390 px sem overflow horizontal. Esses testes foram realizados pela equipe; não são uma nova execução automatizada.

O primeiro acesso apresentou timeout durante a inicialização da API. O limite foi ampliado de 20 para 75 segundos, preservando cancelamento ao navegar e nova tentativa. A configuração de VITE_API_URL em Production na Vercel foi informada pela equipe.

Após o deploy, conferir novamente o primeiro acesso com a API inativa. A revisão por teclado e em desktop não foi confirmada neste relato.

Não executar os scripts de criação/carga novamente na conta já populada. Esta alteração não exige mudança no banco.
