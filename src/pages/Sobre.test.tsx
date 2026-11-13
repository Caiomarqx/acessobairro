
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sobre from './Sobre'

describe('Página Sobre', () => {
  it('exibe o título principal da página', () => {
    render(
      <MemoryRouter>
        <Sobre />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /a cidade deve ser acessível para todos/i,
      })
    ).toBeInTheDocument()
  })

  it('apresenta os três pilares do projeto', () => {
    render(
      <MemoryRouter>
        <Sobre />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Visibilidade' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Colaboração' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Conscientização' })
    ).toBeInTheDocument()
  })

  it('possui um link para explorar ocorrências', () => {
    render(
      <MemoryRouter>
        <Sobre />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', {
        name: /explorar ocorrências/i,
      })
    ).toHaveAttribute('href', '/ocorrencias')
  })

  it('informa que os registros não são solicitações oficiais', () => {
    render(
      <MemoryRouter>
        <Sobre />
      </MemoryRouter>
    )

    expect(
      screen.getByText(
        /os registros não representam solicitações oficiais à prefeitura/i
      )
    ).toBeInTheDocument()
  })
})
