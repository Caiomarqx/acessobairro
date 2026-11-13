
/**
 * Contratos TypeScript baseados nos DTOs da API Java
 * do AcessoBairro, recebidos em 12/11/2026.
 *
 * Estes tipos descrevem os dados esperados.
 * A integração real com Oracle/Render ainda precisa
 * ser validada.
 */

export type PerfilUsuario = 'CIDADAO' | 'MODERADOR'

export type StatusOcorrencia =
  | 'ABERTA'
  | 'EM_ANALISE'
  | 'RESOLVIDA'
  | 'ARQUIVADA'

export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA'

export type SimNao = 'S' | 'N'

// LocalDateTime do Java é serializado como string JSON.
export type DataHoraApi = string

// -------------------------
// Categorias
// -------------------------

export interface CategoriaEntradaDTO {
  nmCategoria: string
  dsCategoria?: string | null
}

export interface CategoriaSaidaDTO {
  cdCategoria: number
  nmCategoria: string
  dsCategoria: string | null
}

// -------------------------
// Bairros
// -------------------------

export interface BairroEntradaDTO {
  nmBairro: string
  nmCidade: string
  sgUf: string
}

export interface BairroSaidaDTO {
  cdBairro: number
  nmBairro: string
  nmCidade: string
  sgUf: string
}

// -------------------------
// Usuários
// -------------------------

export interface UsuarioEntradaDTO {
  nmUsuario: string
  dsEmail: string
  tpPerfil: PerfilUsuario
}

export interface UsuarioSaidaDTO {
  cdUsuario: number
  nmUsuario: string
  tpPerfil: PerfilUsuario
  dtCadastro: DataHoraApi
}

// -------------------------
// Ocorrências
// -------------------------

export interface OcorrenciaEntradaDTO {
  cdUsuario: number
  cdBairro: number
  cdCategoria: number
  dsEnderecoAprox: string
  dsOcorrencia: string
  nrImpacto: number
  flPassagemAlternativa: SimNao
  flServicoEssencial: SimNao
  nmCategoriaSugerida?: string | null
  tpPrioridadeSugerida?: Prioridade | null
}

export interface OcorrenciaSaidaDTO {
  cdOcorrencia: number
  usuario: UsuarioSaidaDTO
  bairro: BairroSaidaDTO
  categoria: CategoriaSaidaDTO
  dsEnderecoAprox: string
  dsOcorrencia: string
  nrImpacto: number
  flPassagemAlternativa: SimNao
  flServicoEssencial: SimNao
  stOcorrencia: StatusOcorrencia
  nmCategoriaSugerida: string | null
  tpPrioridadeSugerida: Prioridade | null
  tpPrioridadeFinal: Prioridade | null
  dtRegistro: DataHoraApi
}

export interface PrioridadeEntradaDTO {
  cdUsuario: number
  tpPrioridadeFinal: Prioridade
}

// -------------------------
// Atualizações
// -------------------------

export interface AtualizacaoEntradaDTO {
  cdUsuario: number
  dsAtualizacao: string
  stNovo: StatusOcorrencia
}

export interface AtualizacaoEdicaoDTO {
  dsAtualizacao: string
}

export interface AtualizacaoSaidaDTO {
  cdAtualizacao: number
  cdOcorrencia: number
  usuario: UsuarioSaidaDTO
  dsAtualizacao: string
  stNovo: StatusOcorrencia
  dtAtualizacao: DataHoraApi
}

// -------------------------
// Confirmações
// -------------------------

export interface ConfirmacaoEntradaDTO {
  cdUsuario: number
}

export interface ConfirmacaoSaidaDTO {
  cdOcorrencia: number
  usuario: UsuarioSaidaDTO
  dtConfirmacao: DataHoraApi
}

// -------------------------
// Erros
// -------------------------

export interface ErroRespostaDTO {
  status: number
  mensagem: string
}
