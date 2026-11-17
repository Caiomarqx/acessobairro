
import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'

function renderLayout() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<h1>Conteúdo de teste</h1>}
          />
          <Route
            path="faq"
            element={<h1>FAQ de teste</h1>}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Layout e navegação', () => {
  it('exibe o link de acessibilidade', () => {
    renderLayout()

    expect(
      screen.getByRole('link', {
        name: /pular para o conteúdo principal/i,
      })
    ).toHaveAttribute('href', '#conteudo-principal')

    expect(
      document.getElementById('conteudo-principal')
    ).toBeInTheDocument()
  })

  it('exibe Integrantes nos menus desktop e mobile', async () => {
    const usuario = userEvent.setup()
    renderLayout()

    const menuPrincipal = screen.getByRole('navigation', {
      name: /navegação principal/i,
    })

    expect(
      within(menuPrincipal).getByRole('link', {
        name: 'Integrantes',
      })
    ).toHaveAttribute('href', '/integrantes')

    await usuario.click(
      screen.getByRole('button', { name: /abrir menu/i })
    )

    const menuMobile = screen.getByRole('navigation', {
      name: /navegação para dispositivos móveis/i,
    })

    expect(
      within(menuMobile).getByRole('link', {
        name: 'Integrantes',
      })
    ).toHaveAttribute('href', '/integrantes')
  })

  it('possui link para registrar uma barreira', () => {
    renderLayout()

    expect(
      screen.getByRole('link', {
        name: /registrar barreira/i,
      })
    ).toHaveAttribute('href', '/ocorrencias/nova')
  })

  it('abre e fecha o menu mobile', async () => {
    const usuario = userEvent.setup()
    renderLayout()

    const botao = screen.getByRole('button', {
      name: /abrir menu/i,
    })

    expect(botao).toHaveAttribute('aria-expanded', 'false')

    await usuario.click(botao)

    expect(
      screen.getByRole('navigation', {
        name: /navegação para dispositivos móveis/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /fechar menu/i,
      })
    ).toHaveAttribute('aria-expanded', 'true')

    await usuario.click(
      screen.getByRole('button', {
        name: /fechar menu/i,
      })
    )

    expect(
      screen.queryByRole('navigation', {
        name: /navegação para dispositivos móveis/i,
      })
    ).not.toBeInTheDocument()
  })

  it('navega pelo menu mobile e fecha o menu', async () => {
    const usuario = userEvent.setup()
    renderLayout()

    await usuario.click(
      screen.getByRole('button', {
        name: /abrir menu/i,
      })
    )

    const menu = screen.getByRole('navigation', {
      name: /navegação para dispositivos móveis/i,
    })

    await usuario.click(
      within(menu).getByRole('link', {
        name: 'FAQ',
      })
    )

    expect(
      screen.getByRole('heading', {
        name: 'FAQ de teste',
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('navigation', {
        name: /navegação para dispositivos móveis/i,
      })
    ).not.toBeInTheDocument()
  })
})
