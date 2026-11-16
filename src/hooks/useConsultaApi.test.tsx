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
it('aguarda 75 segundos, cancela no limite e permite nova tentativa', async () => {
  vi.useFakeTimers()
  fetchMock.mockImplementation((_url: string, { signal }: RequestInit) => new Promise((_resolve, reject) => {
    signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
  }))
  const { result } = renderHook(() => useConsultaApi('/ocorrencias'))
  const primeiroSignal = fetchMock.mock.calls[0][1].signal as AbortSignal
  await act(async () => { await vi.advanceTimersByTimeAsync(74999) })
  expect(result.current.carregando).toBe(true)
  expect(primeiroSignal.aborted).toBe(false)
  await act(async () => { await vi.advanceTimersByTimeAsync(1) })
  expect(result.current.carregando).toBe(false)
  expect(result.current.erro).toMatch(/demorou mais/)
  expect(primeiroSignal.aborted).toBe(true)
  fetchMock.mockResolvedValueOnce(resposta([{ id: 1 }]))
  await act(async () => { result.current.tentarNovamente() })
  expect(fetchMock).toHaveBeenCalledTimes(2)
  expect(fetchMock.mock.calls[1][1].signal.aborted).toBe(false)
  expect(result.current.erro).toBeNull()
  expect(result.current.dados).toEqual([{ id: 1 }])
})
it('não consulta quando a URL não foi configurada', async () => {
  vi.stubEnv('VITE_API_URL', '')
  const { result } = renderHook(() => useConsultaApi('/ocorrencias'))
  await waitFor(() => expect(result.current.erro).toMatch(/URL da API não configurada/))
  expect(fetchMock).not.toHaveBeenCalled()
})

it('aceita uma resposta após 20 segundos sem cancelar a consulta', async () => {
  vi.useFakeTimers()
  fetchMock.mockImplementation(() => new Promise<Response>((resolve) => {
    window.setTimeout(() => resolve(resposta([{ id: 1 }])), 45000)
  }))
  const { result } = renderHook(() => useConsultaApi('/ocorrencias'))
  await act(async () => { await vi.advanceTimersByTimeAsync(45000) })
  expect(result.current.dados).toEqual([{ id: 1 }])
  expect(result.current.erro).toBeNull()
  expect(result.current.carregando).toBe(false)
  await act(async () => { await vi.advanceTimersByTimeAsync(30000) })
  expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(false)
})
