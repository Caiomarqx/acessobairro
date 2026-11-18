
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NovaOcorrencia from './NovaOcorrencia'
import { cadastrarOcorrencia } from '../services/ocorrenciasService'

vi.mock('../hooks/useConsultaApi', () => ({
  useConsultaApi: (rota: string) => ({
    dados:
      rota === '/usuarios'
        ? [{ cdUsuario: 1, nmUsuario: 'Ana Teste' }]
        : rota === '/bairros'
          ? [{ cdBairro: 1, nmBairro: 'Jardim Central', nmCidade: 'São Paulo', sgUf: 'SP' }]
          : [{ cdCategoria: 1, nmCategoria: 'Rampa ausente' }],
    carregando: false,
    erro: null,
    tentarNovamente: () => {},
  }),
}))

vi.mock('../services/ocorrenciasService', () => ({
  cadastrarOcorrencia: vi.fn(),
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('RNF-07 — Proteção contra duplo envio', () => {
  it('realiza somente um cadastro quando o formulário é enviado duas vezes', () => {
    vi.mocked(cadastrarOcorrencia).mockImplementation(
      () => new Promise(() => {})
    )

    render(
      <MemoryRouter>
        <NovaOcorrencia />
      </MemoryRouter>
    )

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
      target: { value: 'Rua das Flores, 100' },
    })

    fireEvent.change(screen.getByLabelText('Descrição da barreira'), {
      target: { value: 'Calçada com rampa ausente para cadeirantes.' },
    })

    fireEvent.change(screen.getByLabelText(/Impacto na mobilidade/), {
      target: { value: '3' },
    })

    fireEvent.click(
      within(
        screen.getByRole('group', { name: 'Existe passagem alternativa?' })
      ).getByRole('radio', { name: 'Sim' })
    )

    fireEvent.click(
      within(
        screen.getByRole('group', {
          name: 'Fica perto de saúde, escola ou serviço público?',
        })
      ).getByRole('radio', { name: 'Não' })
    )

    const formulario = screen
      .getByRole('button', { name: 'Registrar barreira' })
      .closest('form')

    if (!formulario) {
      throw new Error('Formulário não encontrado')
    }

    fireEvent.submit(formulario)
    fireEvent.submit(formulario)

    expect(cadastrarOcorrencia).toHaveBeenCalledTimes(1)

    expect(
      screen.getByRole('button', { name: 'Enviando...' })
    ).toBeDisabled()
  })
  
  it('libera uma nova tentativa após falha no cadastro', async () => {
    vi.mocked(cadastrarOcorrencia)
      .mockRejectedValueOnce(new Error('Falha simulada'))
      .mockImplementationOnce(() => new Promise(() => {}))

    render(
      <MemoryRouter>
        <NovaOcorrencia />
      </MemoryRouter>
    )

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
      target: { value: 'Rua das Flores, 100' },
    })
    fireEvent.change(screen.getByLabelText('Descrição da barreira'), {
      target: { value: 'Calçada com rampa ausente para cadeirantes.' },
    })
    fireEvent.change(screen.getByLabelText(/Impacto na mobilidade/), {
      target: { value: '3' },
    })

    fireEvent.click(
      within(
        screen.getByRole('group', { name: 'Existe passagem alternativa?' })
      ).getByRole('radio', { name: 'Sim' })
    )
    fireEvent.click(
      within(
        screen.getByRole('group', {
          name: 'Fica perto de saúde, escola ou serviço público?',
        })
      ).getByRole('radio', { name: 'Não' })
    )

    const formulario = screen
      .getByRole('button', { name: 'Registrar barreira' })
      .closest('form')

    if (!formulario) throw new Error('Formulário não encontrado')

    fireEvent.submit(formulario)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Falha simulada'
    )
    expect(cadastrarOcorrencia).toHaveBeenCalledTimes(1)

    const botao = screen.getByRole('button', {
      name: 'Registrar barreira',
    })
    expect(botao).toBeEnabled()

    fireEvent.submit(formulario)

    expect(cadastrarOcorrencia).toHaveBeenCalledTimes(2)
    expect(
      screen.getByRole('button', { name: 'Enviando...' })
    ).toBeDisabled()
  })
})
