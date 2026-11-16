
/**
 * Contratos da API Flask de Inteligência Artificial
 * do AcessoBairro.
 *
 * Baseados no endpoint POST /api/analisar-relato.
 */

export type CategoriaBarreiraIA =
  | 'CALCADA_DANIFICADA'
  | 'RAMPA_AUSENTE'
  | 'RAMPA_INADEQUADA'
  | 'PASSAGEM_OBSTRUIDA'
  | 'TRAVESSIA_INADEQUADA'

export type ImpactoIA = 'BAIXO' | 'MEDIO' | 'ALTO'

export type RotaAlternativaIA = 'SIM' | 'NAO'

export type PrioridadeIA = 'BAIXA' | 'MEDIA' | 'ALTA'

export interface AnaliseRelatoEntradaIA {
  descricao: string
  impacto: ImpactoIA
  rota_alternativa: RotaAlternativaIA
}

export interface AnaliseRelatoSaidaIA {
  descricao: string
  categoria_sugerida: CategoriaBarreiraIA
  impacto: ImpactoIA
  rota_alternativa: RotaAlternativaIA
  prioridade_sugerida: PrioridadeIA
}

export interface ErroRespostaIA {
  erro: string
}
