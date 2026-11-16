import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Ocorrencias from './Ocorrencias'
import DetalhesOcorrencia from './DetalhesOcorrencia'
import { ocorrencia, resposta } from '../test/ocorrenciasFixture'

const fetchMock = vi.fn()
beforeEach(() => { vi.stubEnv('VITE_API_URL', 'http://localhost:8080'); vi.stubGlobal('fetch', fetchMock); fetchMock.mockReset() })
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.unstubAllGlobals() })
function abrir(url = '/ocorrencias') {
  render(<MemoryRouter initialEntries={[url]}><Routes><Route path="/ocorrencias" element={<Ocorrencias />} /><Route path="/ocorrencias/:id" element={<DetalhesOcorrencia />} /></Routes></MemoryRouter>)
}
describe('consulta de ocorrências', () => {
  it('consome o GET, pesquisa sem acentos, filtra e preserva a pesquisa ao voltar', async () => {
    fetchMock.mockImplementation((url: string) => Promise.resolve(resposta(url.endsWith('/atualizacoes') ? [] : url.endsWith('/1') ? ocorrencia : [ocorrencia])))
    abrir()
    expect(screen.getByText('Carregando ocorrências...')).toBeInTheDocument()
    await screen.findByRole('link', { name: /Ver detalhes/ })
    fireEvent.change(screen.getByLabelText('Pesquisar ocorrências'), { target: { value: 'calcada' } })
    expect(screen.getByText('1 ocorrência encontrada')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'ARQUIVADA' } })
    expect(screen.getByText('Nenhuma ocorrência encontrada')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: '' } })
    fireEvent.click(screen.getByRole('link', { name: /Ver detalhes/ }))
    await screen.findByText('Ana Teste')
    expect(screen.getByText('Ainda não definida')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: /Voltar para ocorrências/ }))
    await screen.findByRole('link', { name: /Ver detalhes/ })
    expect(screen.getByLabelText('Pesquisar ocorrências')).toHaveValue('calcada')
    expect(fetchMock.mock.calls.every(([url, options]) => url.startsWith('http://localhost:8080/ocorrencias') && !options.method)).toBe(true)
  })
  it('pagina dez resultados e retorna à primeira página ao filtrar', async () => {
    fetchMock.mockResolvedValue(resposta(Array.from({ length: 15 }, (_, i) => ({ ...ocorrencia, cdOcorrencia: i + 1 }))))
    abrir()
    await screen.findByText('15 ocorrências encontradas · Página 1 de 2')
    expect(screen.getAllByRole('article')).toHaveLength(10)
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }))
    expect(screen.getAllByRole('article')).toHaveLength(5)
    fireEvent.change(screen.getByLabelText('Impacto'), { target: { value: '4' } })
    expect(screen.getAllByRole('article')).toHaveLength(10)
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
  })
  it('distingue lista vazia de falha e permite nova tentativa', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch')).mockResolvedValueOnce(resposta([]))
    abrir()
    await screen.findByRole('alert')
    expect(screen.queryByText('Nenhuma ocorrência registrada')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    await screen.findByText('Nenhuma ocorrência registrada')
  })
  it('trata 404 e não solicita histórico de ocorrência inexistente', async () => {
    fetchMock.mockResolvedValue(resposta({ mensagem: 'Ocorrencia nao encontrada' }, 404))
    abrir('/ocorrencias/999')
    await screen.findByText('Ocorrência não encontrada')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
  it('recusa ID inválido sem requisição', () => {
    abrir('/ocorrencias/invalida')
    expect(screen.getByText('Ocorrência não encontrada')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('mantém os detalhes quando o histórico falha e permite recuperá-lo', async () => {
    fetchMock.mockResolvedValueOnce(resposta({ ...ocorrencia, stOcorrencia: 'RESOLVIDA' }))
      .mockResolvedValueOnce(resposta({ mensagem: 'Falha interna' }, 500))
      .mockResolvedValueOnce(resposta([{ cdAtualizacao: 9, cdOcorrencia: 1, usuario: ocorrencia.usuario, stNovo: 'RESOLVIDA', dtAtualizacao: '2026-11-12T16:00:00', dsAtualizacao: 'Relato revisado.' }]))
    abrir('/ocorrencias/1')
    await screen.findByText('Não foi possível carregar o histórico')
    expect(screen.getByText('Ana Teste')).toBeInTheDocument()
    expect(screen.getByText('Resolvida segundo informação da comunidade. Não é confirmação oficial de reparo.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(await screen.findByText('Relato revisado.')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Histórico' })).getByText(/12\/11\/2026 às 16:00/)).toBeDefined()
  })
})
