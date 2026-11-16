
import { apiRequest } from './apiClient'
import type {
  OcorrenciaEntradaDTO,
  OcorrenciaSaidaDTO,
} from '../types/api'

/**
 * Cadastra uma ocorrência na API Java.
 *
 * Utiliza o cliente HTTP compartilhado para
 * enviar os dados e tratar possíveis erros.
 */
export async function cadastrarOcorrencia(
  entrada: OcorrenciaEntradaDTO,
  sinal?: AbortSignal,
): Promise<OcorrenciaSaidaDTO> {
  return apiRequest<OcorrenciaSaidaDTO>('/ocorrencias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entrada),
    signal: sinal,
  })
}
