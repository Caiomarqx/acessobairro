
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQ from './FAQ'

describe('Página FAQ', () => {
  it('exibe o título principal e as categorias', () => {
    render(<FAQ />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /perguntas frequentes sobre o acessobairro/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Sobre o AcessoBairro',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Registro e acompanhamento',
      })
    ).toBeInTheDocument()
  })

  it('apresenta as oito perguntas cadastradas', () => {
    render(<FAQ />)

    expect(screen.getAllByRole('button')).toHaveLength(8)

    expect(
      screen.getByRole('button', {
        name: 'O que é o AcessoBairro?',
      })
    ).toBeInTheDocument()
  })

  it('abre e fecha uma resposta ao clicar na pergunta', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const pergunta = screen.getByRole('button', {
      name: 'O que é o AcessoBairro?',
    })

    expect(pergunta).toHaveAttribute('aria-expanded', 'false')

    await user.click(pergunta)

    expect(pergunta).toHaveAttribute('aria-expanded', 'true')

    expect(
      screen.getByRole('region', {
        name: 'O que é o AcessoBairro?',
      })
    ).toBeVisible()

    await user.click(pergunta)

    expect(pergunta).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha a pergunta anterior quando outra é aberta', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const primeiraPergunta = screen.getByRole('button', {
      name: 'O que é o AcessoBairro?',
    })

    const segundaPergunta = screen.getByRole('button', {
      name: 'Quem pode contribuir com a plataforma?',
    })

    await user.click(primeiraPergunta)

    expect(primeiraPergunta).toHaveAttribute('aria-expanded', 'true')

    await user.click(segundaPergunta)

    expect(primeiraPergunta).toHaveAttribute('aria-expanded', 'false')
    expect(segundaPergunta).toHaveAttribute('aria-expanded', 'true')
  })

  it('mantém os atributos de acessibilidade do acordeão', () => {
    render(<FAQ />)

    const pergunta = screen.getByRole('button', {
      name: 'O que é o AcessoBairro?',
    })

    const idResposta = pergunta.getAttribute('aria-controls')
    const resposta = document.getElementById(idResposta!)

    expect(pergunta).toHaveAttribute('aria-expanded', 'false')
    expect(idResposta).toBeTruthy()
    expect(resposta).toHaveAttribute('role', 'region')
    expect(resposta).toHaveAttribute('aria-labelledby', pergunta.id)
    expect(resposta).toHaveAttribute('hidden')
  })
})
