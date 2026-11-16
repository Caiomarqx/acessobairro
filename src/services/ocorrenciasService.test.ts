
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cadastrarOcorrencia } from './ocorrenciasService'
import type { OcorrenciaEntradaDTO } from '../types/api'

describe('cadastrarOcorrencia', () => {
  const fetchMock = vi.fn()

  const entrada: OcorrenciaEntradaDTO = {
    cdUsuario: 1,
    cdBairro: 1,
    cdCategoria: 2,
    dsEnderecoAprox: 'Próximo à praça',
    dsOcorrencia: 'Rampa de acesso danificada.',
    nrImpacto: 4,
    flPassagemAlternativa: 'N',
    flServicoEssencial: 'S',
  }

  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:8080/')
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('envia o cadastro em JSON e retorna a ocorrência criada', async () => {
    const retorno = {
      cdOcorrencia: 16,
      dsOcorrencia: entrada.dsOcorrencia,
      stOcorrencia: 'ABERTA',
    }

    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(retorno), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const controller = new AbortController()

    const resultado = await cadastrarOcorrencia(
      entrada,
      controller.signal,
    )

    expect(resultado).toEqual(retorno)

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/ocorrencias',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(entrada),
        signal: controller.signal,
        headers: expect.any(Headers),
      }),
    )

    const opcoes = fetchMock.mock.calls[0][1] as RequestInit
    const headers = opcoes.headers as Headers

    expect(headers.get('Content-Type')).toBe('application/json')
    expect(headers.get('Accept')).toBe('application/json')
  })

  it('apresenta a mensagem da API quando o cadastro é inválido', async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 400,
          mensagem: 'Dados inválidos para cadastro.',
        }),
        {
          status: 400,
          statusText: 'Bad Request',
        },
      ),
    )

    await expect(
      cadastrarOcorrencia(entrada),
    ).rejects.toThrow('Erro 400: Dados inválidos para cadastro.')
  })

  it('não envia cadastro quando a URL da API não está configurada', async () => {
    vi.stubEnv('VITE_API_URL', '')

    await expect(
      cadastrarOcorrencia(entrada),
    ).rejects.toThrow('URL da API não configurada')

    expect(fetchMock).not.toHaveBeenCalled()
  })
})
