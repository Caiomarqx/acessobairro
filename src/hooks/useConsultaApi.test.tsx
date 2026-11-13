import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useConsultaApi } from './useConsultaApi'
import { resposta } from '../test/ocorrenciasFixture'
const fetchMock = vi.fn()
beforeEach(() => { vi.stubEnv('VITE_API_URL', 'http://localhost:8080'); vi.stubGlobal('fetch', fetchMock); fetchMock.mockReset() })
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs() })
it('ignora resposta antiga após trocar o ID e cancela a requisição anterior', async () => {
  let concluirPrimeira!: (resposta: Response) => void
  fetchMock.mockImplementationOnce(() => new Promise<Response>((resolve) => { concluirPrimeira = resolve }))
    .mockResolvedValueOnce(resposta({ id: 2 }))
  const { result, rerender } = renderHook(({ path }) => useConsultaApi<{ id: number }>(path), { initialProps: { path: '/ocorrencias/1' } })
  const signal = fetchMock.mock.calls[0][1].signal as AbortSignal
  rerender({ path: '/ocorrencias/2' })
  await waitFor(() => expect(result.current.dados).toEqual({ id: 2 }))
  await act(async () => { concluirPrimeira(resposta({ id: 1 })) })
  expect(signal.aborted).toBe(true)
  expect(result.current.dados).toEqual({ id: 2 })
})
it('encerra uma consulta que excedeu o tempo limite', async () => {
  vi.useFakeTimers()
  fetchMock.mockImplementation((_url: string, { signal }: RequestInit) => new Promise((_resolve, reject) => {
    signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
  }))
  const { result } = renderHook(() => useConsultaApi('/ocorrencias'))
  await act(async () => { await vi.advanceTimersByTimeAsync(20000) })
  expect(result.current.carregando).toBe(false)
  expect(result.current.erro).toMatch(/demorou mais/)
})
it('não consulta quando a URL não foi configurada', async () => {
  vi.stubEnv('VITE_API_URL', '')
  const { result } = renderHook(() => useConsultaApi('/ocorrencias'))
  await waitFor(() => expect(result.current.erro).toMatch(/URL da API não configurada/))
  expect(fetchMock).not.toHaveBeenCalled()
})
