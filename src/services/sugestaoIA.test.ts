
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { analisarRelatoIA } from './iaClient'
import { obterSugestaoIA } from './sugestaoIA'

vi.mock('./iaClient', () => ({
  analisarRelatoIA: vi.fn(),
}))

const respostaSimulada = {
  descricao: 'Rampa ausente na calçada',
  categoria_sugerida: 'RAMPA_AUSENTE' as const,
  impacto: 'MEDIO' as const,
  rota_alternativa: 'SIM' as const,
  prioridade_sugerida: 'ALTA' as const,
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('Sugestão de IA para cadastro', () => {
  it('envia os dados no formato esperado pela Flask', async () => {
    vi.mocked(analisarRelatoIA).mockResolvedValueOnce(respostaSimulada)

    const resultado = await obterSugestaoIA(
      'Rampa ausente na calçada',
      3,
      'S',
    )

    expect(analisarRelatoIA).toHaveBeenCalledWith(
      {
        descricao: 'Rampa ausente na calçada',
        impacto: 'MEDIO',
        rota_alternativa: 'SIM',
      },
      undefined,
    )

    expect(resultado.prioridade_sugerida).toBe('ALTA')
  })

  it('não inventa resposta para passagem desconhecida', async () => {
    await expect(
      obterSugestaoIA('Rampa ausente na calçada', 3, 'NAO_SEI'),
    ).rejects.toThrow(/selecione Sim ou Não/)

    expect(analisarRelatoIA).not.toHaveBeenCalled()
  })

  it('impede descrições curtas', async () => {
    await expect(
      obterSugestaoIA('Buraco', 3, 'S'),
    ).rejects.toThrow(/10 e 1000 caracteres/)

    expect(analisarRelatoIA).not.toHaveBeenCalled()
  })

  it('impede impacto fora da escala', async () => {
    await expect(
      obterSugestaoIA('Rampa ausente na calçada', 7, 'N'),
    ).rejects.toThrow(/entre 1 e 5/)

    expect(analisarRelatoIA).not.toHaveBeenCalled()
  })
})
