import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Contato from './Contato'

afterEach(cleanup)

function abrir() {
  return render(<MemoryRouter initialEntries={['/contato']}><Routes>
    <Route path="/contato" element={<Contato />} />
    <Route path="/integrantes" element={<h1>Equipe do projeto</h1>} />
    <Route path="/sobre" element={<h1>Sobre o projeto</h1>} />
    <Route path="/ocorrencias" element={<h1>Ocorrências da comunidade</h1>} />
  </Routes></MemoryRouter>)
}

describe('Página Contato', () => {
  it('identifica o projeto e informa que não recebe mensagens, sem oferecer envio fictício', () => {
    const { container } = abrir()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /vamos conversar sobre acessibilidade/i })).toBeInTheDocument()
    expect(screen.getByText(/Global Solution 2026\/2 · Turma 1TDSPF/)).toBeInTheDocument()
    expect(screen.getByText(/Esta página não recebe mensagens/)).toBeInTheDocument()
    expect(container.querySelector('form, input, textarea, a[href^="mailto:"], a[href^="tel:"]')).toBeNull()
    expect(screen.getByRole('link', { name: 'Contatar pelo GitHub' })).toHaveAttribute('href', 'https://github.com/Caiomarqx/acessobairro/issues')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText(/não representam solicitações oficiais à prefeitura nem garantem reparo/i)).toBeInTheDocument()
  })

  it.each([
    ['Conhecer a equipe', 'Equipe do projeto'],
    ['Entender o projeto', 'Sobre o projeto'],
    ['Explorar ocorrências', 'Ocorrências da comunidade'],
  ])('navega pelo link %s', async (link, destino) => {
    const user = userEvent.setup()
    abrir()
    await user.click(screen.getByRole('link', { name: link }))
    expect(screen.getByRole('heading', { name: destino })).toBeInTheDocument()
  })

  it('permite percorrer os links e ativar a navegação pelo teclado', async () => {
    const user = userEvent.setup()
    abrir()
    for (const nome of ['Contatar pelo GitHub', 'Conhecer a equipe', 'Entender o projeto', 'Explorar ocorrências']) {
      await user.tab()
      expect(screen.getByRole('link', { name: nome })).toHaveFocus()
    }
    await user.keyboard('{Enter}')
    expect(screen.getByRole('heading', { name: 'Ocorrências da comunidade' })).toBeInTheDocument()
  })
})
