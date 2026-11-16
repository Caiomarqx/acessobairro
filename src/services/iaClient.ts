
import type {
  AnaliseRelatoEntradaIA,
  AnaliseRelatoSaidaIA,
} from '../types/ia'

/**
 * Envia um relato para os modelos de IA do AcessoBairro.
 *
 * A URL da API Flask é configurada por VITE_IA_API_URL.
 */
export async function analisarRelatoIA(
  entrada: AnaliseRelatoEntradaIA,
  sinal?: AbortSignal,
): Promise<AnaliseRelatoSaidaIA> {
  const urlBase = import.meta.env.VITE_IA_API_URL?.trim()

  if (!urlBase) {
    throw new Error(
      'URL da API de IA não configurada. Defina VITE_IA_API_URL.'
    )
  }

  const resposta = await fetch(
    `${urlBase.replace(/\/+$/, '')}/api/analisar-relato`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(entrada),
      signal: sinal,
    }
  )

  if (!resposta.ok) {
    const dados: unknown = await resposta.json().catch(() => null)

    const mensagem =
      dados &&
      typeof dados === 'object' &&
      'erro' in dados &&
      typeof dados.erro === 'string'
        ? dados.erro
        : resposta.statusText || 'Erro ao consultar a IA.'

    throw new Error(`Erro ${resposta.status}: ${mensagem}`)
  }

  return (await resposta.json()) as AnaliseRelatoSaidaIA
}
