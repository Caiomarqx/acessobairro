export class ApiError extends Error {
  readonly status: number
  constructor(status: number, mensagem: string) {
    super(`Erro ${status}: ${mensagem}`)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest<T>(
  caminho: string,
  opcoes: RequestInit = {},
): Promise<T> {
  const urlBase = import.meta.env.VITE_API_URL?.trim()

  if (!urlBase) {
    throw new Error(
      'URL da API não configurada. Defina VITE_API_URL no arquivo .env.'
    )
  }

  if (!caminho.startsWith('/') || caminho.startsWith('//')) {
    throw new Error('O caminho da API deve começar com uma única barra (/).')
  }

  const cabecalhos = new Headers(opcoes.headers)

  if (!cabecalhos.has('Accept')) {
    cabecalhos.set('Accept', 'application/json')
  }

  let resposta: Response

  try {
    resposta = await fetch(
      `${urlBase.replace(/\/+$/, '')}${caminho}`,
      {
        ...opcoes,
        headers: cabecalhos,
      }
    )
  } catch (erro) {
    if (erro instanceof DOMException && erro.name === 'AbortError') {
      throw erro
    }

    throw new Error(
      'Não foi possível conectar à API. Ela pode estar iniciando; aguarde alguns segundos e tente novamente.'
    )
  }

  if (!resposta.ok) {
    let mensagem = resposta.statusText || 'Erro desconhecido'

    const dados: unknown = await resposta.json().catch(() => null)

    if (dados && typeof dados === 'object') {
      if ('mensagem' in dados && typeof dados.mensagem === 'string') {
        mensagem = dados.mensagem
      } else if ('message' in dados && typeof dados.message === 'string') {
        mensagem = dados.message
      }
    }

    throw new ApiError(resposta.status, mensagem)
  }

  if (resposta.status === 204) {
    return undefined as T
  }

  return (await resposta.json()) as T
}
