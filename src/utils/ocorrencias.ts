import type { OcorrenciaSaidaDTO, Prioridade, StatusOcorrencia } from '../types/api'

export const rotulosStatus: Record<StatusOcorrencia, string> = {
  ABERTA: 'Aberta', EM_ANALISE: 'Em análise',
  RESOLVIDA: 'Resolvida segundo a comunidade', ARQUIVADA: 'Arquivada',
}
export const rotulosPrioridade: Record<Prioridade, string> = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' }
export const filtros = ['busca', 'categoria', 'status', 'impacto', 'bairro', 'cidade', 'uf', 'passagem', 'servico', 'ordem', 'pagina']
export const tamanhoPagina = 10
export function normalizarBusca(texto: string) {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR').trim()
}
export function formatarData(valor: string) {
  // LocalDateTime não tem fuso: conservar a data e hora informadas pelo servidor.
  const partes = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(valor)
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]} às ${partes[4]}:${partes[5]}` : 'Data não informada'
}
export function filtrarOcorrencias(dados: readonly OcorrenciaSaidaDTO[], parametros: URLSearchParams) {
  const busca = normalizarBusca(parametros.get('busca') ?? '')
  const igual = (chave: string, valor: string | number) => !parametros.get(chave) || parametros.get(chave) === String(valor)
  const filtradas = dados.filter((o) =>
    igual('categoria', o.categoria.cdCategoria) && igual('status', o.stOcorrencia) &&
    igual('impacto', o.nrImpacto) && igual('bairro', o.bairro.cdBairro) &&
    igual('cidade', o.bairro.nmCidade) && igual('uf', o.bairro.sgUf) &&
    igual('passagem', o.flPassagemAlternativa) && igual('servico', o.flServicoEssencial) &&
    [o.dsOcorrencia, o.dsEnderecoAprox, o.categoria.nmCategoria, o.bairro.nmBairro, o.bairro.nmCidade, o.bairro.sgUf]
      .some((s) => normalizarBusca(s).includes(busca)),
  )
  const pesos = { ALTA: 3, MEDIA: 2, BAIXA: 1 }
  return filtradas.sort((a, b) => {
    if (parametros.get('ordem') === 'impacto' && a.nrImpacto !== b.nrImpacto) return b.nrImpacto - a.nrImpacto
    if (parametros.get('ordem') === 'prioridade') {
      const diferenca = (b.tpPrioridadeSugerida ? pesos[b.tpPrioridadeSugerida] : 0) - (a.tpPrioridadeSugerida ? pesos[a.tpPrioridadeSugerida] : 0)
      if (diferenca) return diferenca
    }
    return b.dtRegistro.localeCompare(a.dtRegistro) || b.cdOcorrencia - a.cdOcorrencia
  })
}
