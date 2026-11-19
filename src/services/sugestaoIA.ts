
import { analisarRelatoIA } from './iaClient'
import {
  impactoParaIA,
  passagemAlternativaParaIA,
} from '../utils/conversaoDadosIA'
import type { AnaliseRelatoSaidaIA } from '../types/ia'

type PassagemFormulario = '' | 'S' | 'N' | 'NAO_SEI'

const categoriasValidas = [
  'CALCADA_DANIFICADA',
  'RAMPA_AUSENTE',
  'RAMPA_INADEQUADA',
  'PASSAGEM_OBSTRUIDA',
  'TRAVESSIA_INADEQUADA',
]

const prioridadesValidas = ['BAIXA', 'MEDIA', 'ALTA']

export async function obterSugestaoIA(
  descricao: string,
  impacto: number,
  passagem: PassagemFormulario,
  sinal?: AbortSignal,
): Promise<AnaliseRelatoSaidaIA> {
  const texto = descricao.trim()

  if (texto.length < 10 || texto.length > 1000) {
    throw new Error(
      'Descreva a barreira usando entre 10 e 1000 caracteres.',
    )
  }

  if (passagem !== 'S' && passagem !== 'N') {
    throw new Error(
      'Para usar a IA, selecione Sim ou Não para passagem alternativa.',
    )
  }

  const resposta = await analisarRelatoIA(
    {
      descricao: texto,
      impacto: impactoParaIA(impacto),
      rota_alternativa: passagemAlternativaParaIA(passagem),
    },
    sinal,
  )

  if (
    !resposta ||
    !categoriasValidas.includes(resposta.categoria_sugerida) ||
    !prioridadesValidas.includes(resposta.prioridade_sugerida)
  ) {
    throw new Error('A IA retornou sugestões inválidas.')
  }

  return resposta
}
