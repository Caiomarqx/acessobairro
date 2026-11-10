
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Página Home', () => {
  it('exibe o título principal do AcessoBairro', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /a acessibilidade começa com a sua voz/i,
      })
    ).toBeInTheDocument()
  })

  it('possui um link para registrar uma barreira', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', {
        name: /registrar uma barreira/i,
      })
    ).toHaveAttribute('href', '/ocorrencias/nova')
  })

  it('possui um link para consultar ocorrências', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', {
        name: /explorar ocorrências/i,
      })
    ).toHaveAttribute('href', '/ocorrencias')
  })

  it('identifica a prévia como demonstração', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/demonstração ilustrativa da plataforma/i)
    ).toBeInTheDocument()
  })
})
