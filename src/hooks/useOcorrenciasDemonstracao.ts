import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ocorrenciasDemonstracao, type OcorrenciaDemonstracao } from '../data/ocorrenciasDemonstracao'

type Resultado = {
  chave: string
  dados: readonly OcorrenciaDemonstracao[]
  erro: string | null
}

// Os cenários pela URL estão disponíveis somente no servidor de desenvolvimento.
export function useOcorrenciasDemonstracao(id?: string) {
  const [parametros] = useSearchParams()
  const cenario = import.meta.env.DEV ? parametros.get('cenario') : null
  const [tentativa, setTentativa] = useState(0)
  const [resultado, setResultado] = useState<Resultado>({
    chave: '',
    dados: [],
    erro: null,
  })
  const chave = JSON.stringify([id, cenario, tentativa])

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      if (cenario === 'erro') {
        setResultado({ chave, dados: [], erro: 'Falha simulada ao consultar as ocorrências. Tente novamente.' })
        return
      }
      setResultado({
        chave,
        dados: cenario === 'vazio' ? [] : ocorrenciasDemonstracao,
        erro: null,
      })
    }, cenario === 'carregando' ? 2500 : 300)

    return () => window.clearTimeout(temporizador)
  }, [chave, cenario])

  const carregando = resultado.chave !== chave

  return {
    dados: carregando ? [] : resultado.dados,
    erro: carregando ? null : resultado.erro,
    carregando,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
  }
}
