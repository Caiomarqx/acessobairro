
import type { SimNao } from '../types/api'
import type { ImpactoIA, RotaAlternativaIA } from '../types/ia'

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


/**
 * Converte o impacto numérico utilizado pelo Java
 * para o formato esperado pela API Flask.
 *
 * Regra confirmada com a equipe de IA:
 * 1 e 2 → BAIXO
 * 3 → MEDIO
 * 4 e 5 → ALTO
 */
export function impactoParaIA(valor: number): ImpactoIA {
  if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
    throw new RangeError(
      'O impacto deve ser um número inteiro entre 1 e 5.'
    )
  }

  if (valor <= 2) return 'BAIXO'
  if (valor === 3) return 'MEDIO'

  return 'ALTO'
}
