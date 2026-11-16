
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { analisarRelatoIA } from './iaClient'
import type { AnaliseRelatoEntradaIA } from '../types/ia'

describe('analisarRelatoIA', () => {
  const fetchMock = vi.fn()

  const entrada: AnaliseRelatoEntradaIA = {
    descricao: 'Falta uma rampa na entrada da escola.',
    impacto: 'ALTO',
    rota_alternativa: 'NAO',
  }

  beforeEach(() => {
    vi.stubEnv('VITE_IA_API_URL', 'http://localhost:5000/')
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('retorna as sugestões da IA em uma resposta 200', async () => {
    const dados = {
      descricao: entrada.descricao,
      categoria_sugerida: 'RAMPA_AUSENTE',
      impacto: 'ALTO',
      rota_alternativa: 'NAO',
      prioridade_sugerida: 'ALTA',
    }

    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(dados), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const resultado = await analisarRelatoIA(entrada)

    expect(resultado).toEqual(dados)
  })

  it('envia o relato corretamente para a API Flask', async () => {
    fetchMock.mockResolvedValue(
      new Response('{}', { status: 200 }),
    )

    await analisarRelatoIA(entrada)

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5000/api/analisar-relato',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(entrada),
      }),
    )
  })

  it('exibe a mensagem de erro enviada pelo Flask', async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({ erro: 'Descrição obrigatória' }),
        {
          status: 400,
          statusText: 'Bad Request',
        },
      ),
    )

    await expect(
      analisarRelatoIA(entrada),
    ).rejects.toThrow('Erro 400: Descrição obrigatória')
  })

  it('trata erros sem resposta JSON', async () => {
    fetchMock.mockResolvedValue(
      new Response('Serviço indisponível', {
        status: 503,
        statusText: 'Service Unavailable',
      }),
    )

    await expect(
      analisarRelatoIA(entrada),
    ).rejects.toThrow('Erro 503: Service Unavailable')
  })

  it('impede requisições sem a URL da IA', async () => {
    vi.stubEnv('VITE_IA_API_URL', '')

    await expect(
      analisarRelatoIA(entrada),
    ).rejects.toThrow('URL da API de IA não configurada')

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('permite enviar um sinal de cancelamento', async () => {
    const controller = new AbortController()

    fetchMock.mockResolvedValue(
      new Response('{}', { status: 200 }),
    )

    await analisarRelatoIA(entrada, controller.signal)

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        signal: controller.signal,
      }),
    )
  })
})
