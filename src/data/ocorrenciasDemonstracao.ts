export type StatusOcorrencia = 'ABERTA' | 'EM_ANALISE' | 'ENCERRADA'

export type OcorrenciaDemonstracao = {
  id: number
  tipoBarreira: string
  descricao: string
  bairro: string
  endereco: string
  status: StatusOcorrencia
  prioridade: 'Baixa' | 'Média' | 'Alta' | null
}

export const rotulosStatus: Record<StatusOcorrencia, string> = {
  ABERTA: 'Aberta',
  EM_ANALISE: 'Em análise',
  ENCERRADA: 'Encerrada',
}

export const ocorrenciasDemonstracao: readonly OcorrenciaDemonstracao[] = [
  {
    id: 1,
    tipoBarreira: 'Calçada danificada',
    descricao: 'Calçada com desnível elevado, dificultando a passagem de cadeirantes.',
    bairro: 'Jardim Central',
    endereco: 'Próximo à praça do bairro',
    status: 'ABERTA',
    prioridade: null,
  },
  {
    id: 2,
    tipoBarreira: 'Ausência de rampa',
    descricao: 'A travessia em frente à unidade de saúde não tem rebaixamento na calçada.',
    bairro: 'Vila Esperança',
    endereco: 'Em frente à unidade de saúde',
    status: 'EM_ANALISE',
    prioridade: 'Alta',
  },
  {
    id: 3,
    tipoBarreira: 'Passagem obstruída',
    descricao: 'Um obstáculo ocupa a passagem de pedestres ao lado da biblioteca.',
    bairro: 'Parque Novo',
    endereco: 'Ao lado da biblioteca',
    status: 'ENCERRADA',
    prioridade: 'Média',
  },
]
