import type { OcorrenciaSaidaDTO } from '../types/api'

export const ocorrencia: OcorrenciaSaidaDTO = {
  cdOcorrencia: 1,
  usuario: { cdUsuario: 1, nmUsuario: 'Ana Teste', tpPerfil: 'CIDADAO', dtCadastro: '2026-11-06T10:00:00' },
  bairro: { cdBairro: 1, nmBairro: 'Centro', nmCidade: 'São Paulo', sgUf: 'SP' },
  categoria: { cdCategoria: 1, nmCategoria: 'Calçada danificada', dsCategoria: null },
  dsEnderecoAprox: 'Perto da praça', dsOcorrencia: 'Desnível na calçada', nrImpacto: 4,
  flPassagemAlternativa: 'N', flServicoEssencial: 'S', stOcorrencia: 'ABERTA',
  nmCategoriaSugerida: null, tpPrioridadeSugerida: null, tpPrioridadeFinal: null,
  dtRegistro: '2026-11-12T15:20:00',
}
export function resposta(dados: unknown, status = 200) {
  return new Response(JSON.stringify(dados), { status, headers: { 'Content-Type': 'application/json' } })
}
