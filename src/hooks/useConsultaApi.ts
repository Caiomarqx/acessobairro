import { useEffect, useState } from 'react'
import { apiRequest, ApiError } from '../services/apiClient'

type Resultado<T> = { chave: string; dados: T | null; erro: string | null; status?: number }

// Uma resposta de uma navegação anterior nunca substitui os dados da página atual.
export function useConsultaApi<T>(caminho: string | null) {
  const [tentativa, setTentativa] = useState(0)
  const [resultado, setResultado] = useState<Resultado<T>>({ chave: '', dados: null, erro: null })
  const chave = JSON.stringify([caminho, tentativa])

  useEffect(() => {
    if (!caminho) return
    const controller = new AbortController()
    let ativo = true
    let expirou = false
    const temporizador = window.setTimeout(() => {
      expirou = true
      controller.abort()
    }, 75000)

    apiRequest<T>(caminho, { signal: controller.signal })
      .then((dados) => {
        if (ativo) setResultado({ chave, dados, erro: null })
      })
      .catch((erro: unknown) => {
        if (!ativo) return
        const mensagem = expirou
          ? 'A consulta demorou mais que o esperado. Tente novamente.'
          : erro instanceof TypeError
            ? 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.'
            : erro instanceof Error ? erro.message : 'Não foi possível consultar a API.'
        setResultado({ chave, dados: null, erro: mensagem, status: erro instanceof ApiError ? erro.status : undefined })
      })
      .finally(() => window.clearTimeout(temporizador))

    return () => {
      ativo = false
      window.clearTimeout(temporizador)
      controller.abort()
    }
  }, [chave, caminho])

  const carregando = caminho !== null && resultado.chave !== chave
  const atual = caminho !== null && !carregando
  return {
    dados: atual ? resultado.dados : null,
    erro: atual ? resultado.erro : null,
    status: atual ? resultado.status : undefined,
    carregando,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
  }
}
