export type StatusOcorrencia = 'ABERTA' | 'EM_ANALISE' | 'RESOLVIDA' | 'ARQUIVADA'

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
  RESOLVIDA: 'Resolvida segundo a comunidade',
  ARQUIVADA: 'Arquivada',
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
    tipoBarreira: 'Rampa ausente',
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
    status: 'ARQUIVADA',
    prioridade: 'Média',
  },
  {
    id: 4,
    tipoBarreira: 'Rampa inadequada',
    descricao: 'A comunidade informou que o desnível da rampa deixou de ser observado. O registro comunitário não equivale a uma confirmação oficial de reparo.',
    bairro: 'Jardim Central',
    endereco: 'Entrada lateral do centro comunitário',
    status: 'RESOLVIDA',
    prioridade: 'Média',
  },
  {
    id: 5,
    tipoBarreira: 'Travessia insegura',
    descricao: 'A faixa de pedestres está desgastada na travessia próxima ao ponto de ônibus.',
    bairro: 'Vila Esperança',
    endereco: 'Travessia ao lado do ponto de ônibus',
    status: 'ABERTA',
    prioridade: null,
  },
]
