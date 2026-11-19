
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NovaOcorrencia from './NovaOcorrencia'
import { obterSugestaoIA } from '../services/sugestaoIA'
import { cadastrarOcorrencia } from '../services/ocorrenciasService'
import type { AnaliseRelatoSaidaIA } from '../types/ia'

vi.mock('../hooks/useConsultaApi', () => ({
  useConsultaApi: (rota: string) => ({
    dados:
      rota === '/usuarios'
        ? [{ cdUsuario: 1, nmUsuario: 'Ana Teste' }]
        : rota === '/bairros'
          ? [{ cdBairro: 1, nmBairro: 'Centro', nmCidade: 'São Paulo', sgUf: 'SP' }]
          : [{ cdCategoria: 1, nmCategoria: 'Rampa ausente' }],
    carregando: false,
    erro: null,
    tentarNovamente: () => {},
  }),
}))

vi.mock('../services/sugestaoIA', () => ({
  obterSugestaoIA: vi.fn(),
}))

vi.mock('../services/ocorrenciasService', () => ({
  cadastrarOcorrencia: vi.fn(),
}))

const respostaIA: AnaliseRelatoSaidaIA = {
  descricao: 'Existe um degrau sem rampa no ponto de ônibus.',
  categoria_sugerida: 'RAMPA_AUSENTE',
  impacto: 'MEDIO',
  rota_alternativa: 'SIM',
  prioridade_sugerida: 'ALTA',
}

function abrirFormulario() {
  render(
    <MemoryRouter>
      <NovaOcorrencia />
    </MemoryRouter>,
  )
}

function preencherFormulario(passagem: 'Sim' | 'Não' | 'Não sei' = 'Sim') {
  fireEvent.change(screen.getByLabelText('Usuário'), {
    target: { value: '1' },
  })
  fireEvent.change(screen.getByLabelText('Bairro'), {
    target: { value: '1' },
  })
  fireEvent.change(screen.getByLabelText('Categoria'), {
    target: { value: '1' },
  })
  fireEvent.change(screen.getByLabelText('Endereço aproximado'), {
    target: { value: 'Rua Central, 100' },
  })
  fireEvent.change(screen.getByLabelText('Descrição da barreira'), {
    target: { value: respostaIA.descricao },
  })
  fireEvent.change(screen.getByLabelText(/Impacto na mobilidade/), {
    target: { value: '3' },
  })

  fireEvent.click(
    within(
      screen.getByRole('group', { name: 'Existe passagem alternativa?' }),
    ).getByRole('radio', { name: passagem }),
  )

  fireEvent.click(
    within(
      screen.getByRole('group', {
        name: 'Fica perto de saúde, escola ou serviço público?',
      }),
    ).getByRole('radio', { name: 'Não' }),
  )
}

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('Integração da IA no formulário', () => {
  it('exibe a sugestão e envia categoria e prioridade ao Java', async () => {
    vi.mocked(obterSugestaoIA).mockResolvedValueOnce(respostaIA)
    vi.mocked(cadastrarOcorrencia).mockImplementation(
      () => new Promise(() => {}),
    )

    abrirFormulario()
    preencherFormulario()

    fireEvent.click(screen.getByRole('button', { name: 'Analisar com IA' }))

    const botaoCategoria = await screen.findByRole('button', {
      name: 'Usar categoria sugerida',
    })

    expect(screen.getByText('ALTA')).toBeInTheDocument()

    fireEvent.click(botaoCategoria)

    expect(screen.getByLabelText('Categoria')).toHaveValue('1')

    fireEvent.click(screen.getByRole('button', { name: 'Registrar barreira' }))

    expect(cadastrarOcorrencia).toHaveBeenCalledTimes(1)
    expect(cadastrarOcorrencia).toHaveBeenCalledWith(
      expect.objectContaining({
        cdCategoria: 1,
        nmCategoriaSugerida: 'RAMPA_AUSENTE',
        tpPrioridadeSugerida: 'ALTA',
      }),
      expect.anything(),
    )
  })

  it('permite cadastrar normalmente quando a Flask falha', async () => {
    vi.mocked(obterSugestaoIA).mockRejectedValueOnce(
      new Error('Flask indisponível'),
    )
    vi.mocked(cadastrarOcorrencia).mockImplementation(
      () => new Promise(() => {}),
    )

    abrirFormulario()
    preencherFormulario()

    fireEvent.click(screen.getByRole('button', { name: 'Analisar com IA' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Flask indisponível',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Registrar barreira' }))

    expect(cadastrarOcorrencia).toHaveBeenCalledWith(
      expect.objectContaining({
        nmCategoriaSugerida: null,
        tpPrioridadeSugerida: null,
      }),
      expect.anything(),
    )
  })

  it('não transforma a resposta Não sei em Não no Java', () => {
    abrirFormulario()
    preencherFormulario('Não sei')

    fireEvent.click(screen.getByRole('button', { name: 'Registrar barreira' }))

    expect(screen.getByText(/O cadastro ainda não aceita/)).toBeInTheDocument()
    expect(cadastrarOcorrencia).not.toHaveBeenCalled()
  })
})
