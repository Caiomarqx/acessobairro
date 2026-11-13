import { describe, expect, it } from 'vitest'
import { ocorrencia } from '../test/ocorrenciasFixture'
import { filtrarOcorrencias, formatarData } from './ocorrencias'

describe('filtros e ordenação', () => {
  it('combina localização, categoria, impacto, status e flags', () => {
    const dados = [ocorrencia, { ...ocorrencia, cdOcorrencia: 2, flServicoEssencial: 'N' as const }]
    const p = new URLSearchParams('busca=sao+paulo&categoria=1&status=ABERTA&impacto=4&bairro=1&cidade=São+Paulo&uf=SP&passagem=N&servico=S')
    expect(filtrarOcorrencias(dados, p).map((o) => o.cdOcorrencia)).toEqual([1])
  })
  it('ordena por impacto e prioridade sugerida, deixando nulos por último', () => {
    const dados = [ocorrencia, { ...ocorrencia, cdOcorrencia: 2, nrImpacto: 5, tpPrioridadeSugerida: 'ALTA' as const }]
    expect(filtrarOcorrencias(dados, new URLSearchParams('ordem=impacto'))[0].cdOcorrencia).toBe(2)
    expect(filtrarOcorrencias(dados, new URLSearchParams('ordem=prioridade'))[0].cdOcorrencia).toBe(2)
    expect(dados[0].cdOcorrencia).toBe(1)
  })
  it('conserva a data sem aplicar conversão de fuso', () => {
    expect(formatarData('2026-11-12T00:10:00')).toBe('12/11/2026 às 00:10')
  })
})
