
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Integrantes from './Integrantes'

function renderizarPagina() {
  render(
    <MemoryRouter>
      <Integrantes />
    </MemoryRouter>
  )
}

describe('Página Integrantes', () => {
  it('exibe o título principal e a identificação acadêmica', () => {
    renderizarPagina()

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /conheça quem está por trás do acessobairro/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/global solution 2026\/2 · turma 1tdspf/i)
    ).toBeInTheDocument()
  })

  it('apresenta os quatro integrantes com seus RMs', () => {
    renderizarPagina()

    const integrantes = [
      ['Caio Marques da Silva', '572760'],
      ['Gabriel Antonio', '573159'],
      ['Mariana Ramos', '573686'],
      ['Rodrigo Terra', '571840'],
    ]

    for (const [nome, rm] of integrantes) {
      expect(screen.getByText(nome)).toBeInTheDocument()
      expect(screen.getByText(`RM ${rm}`)).toBeInTheDocument()
    }
  })

  it('exibe as áreas de atuação da equipe', () => {
    renderizarPagina()

    expect(
      screen.getByText('Front-end e integração')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Banco de dados e Front-end')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Inteligência Artificial e Front-end')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Back-end Java e Python')
    ).toBeInTheDocument()
  })

  it('oferece navegação para a página Sobre', () => {
    renderizarPagina()

    expect(
      screen.getByRole('link', { name: /sobre o projeto/i })
    ).toHaveAttribute('href', '/sobre')
  })
})
