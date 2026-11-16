
import type { SimNao } from '../types/api'
import type { RotaAlternativaIA } from '../types/ia'

/**
 * Converte a informação de passagem alternativa
 * do formato Java para o formato Flask.
 */
export function passagemAlternativaParaIA(
  valor: SimNao,
): RotaAlternativaIA {
  return valor === 'S' ? 'SIM' : 'NAO'
}

/**
 * Converte a informação de passagem alternativa
 * do formato Flask para o formato Java.
 */
export function passagemAlternativaParaJava(
  valor: RotaAlternativaIA,
): SimNao {
  return valor === 'SIM' ? 'S' : 'N'
}
