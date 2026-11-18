
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiRequest } from './apiClient'

describe('apiRequest', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:8080/')
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('retorna os dados JSON em uma resposta 200', async () => {
    const dados = [
      {
        cdOcorrencia: 1,
        dsOcorrencia: 'Calçada danificada',
      },
    ]

    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(dados), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const resultado = await apiRequest<typeof dados>('/ocorrencias')

    expect(resultado).toEqual(dados)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/ocorrencias',
      expect.objectContaining({
        headers: expect.any(Headers),
      }),
    )
  })

  it('retorna undefined em uma resposta 204', async () => {
    fetchMock.mockResolvedValue(
      new Response(null, { status: 204 }),
    )

    const resultado = await apiRequest<void>('/ocorrencias/1')

    expect(resultado).toBeUndefined()
  })

  it('exibe a mensagem da API em um erro 404', async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 404,
          mensagem: 'Ocorrencia nao encontrada',
        }),
        {
          status: 404,
          statusText: 'Not Found',
        },
      ),
    )

    await expect(
      apiRequest('/ocorrencias/999'),
    ).rejects.toThrow('Erro 404: Ocorrencia nao encontrada')
  })

  it('trata uma falha interna 500', async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 500,
          mensagem: 'Falha interna',
        }),
        {
          status: 500,
          statusText: 'Internal Server Error',
        },
      ),
    )

    await expect(
      apiRequest('/ocorrencias'),
    ).rejects.toThrow('Erro 500: Falha interna')
  })

  it('impede requisições sem URL da API', async () => {
    vi.stubEnv('VITE_API_URL', '')

    await expect(
      apiRequest('/ocorrencias'),
    ).rejects.toThrow('URL da API não configurada')

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejeita caminhos de endpoint inválidos', async () => {
    await expect(
      apiRequest('ocorrencias'),
    ).rejects.toThrow(
      'O caminho da API deve começar com uma única barra (/)',
    )

    await expect(
      apiRequest('//ocorrencias'),
    ).rejects.toThrow(
      'O caminho da API deve começar com uma única barra (/)',
    )

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('mostra mensagem em português quando a API não responde', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(
      apiRequest('/ocorrencias'),
    ).rejects.toThrow('Não foi possível conectar à API')
  })

  it('repassa o cancelamento da requisição sem trocar a mensagem', async () => {
    fetchMock.mockRejectedValue(
      new DOMException('Requisição cancelada', 'AbortError'),
    )

    await expect(
      apiRequest('/ocorrencias'),
    ).rejects.toMatchObject({ name: 'AbortError' })
  })
})
