import { useSearchParams } from 'react-router-dom'
import { EmptyState, ErrorState, LoadingState } from '../components/FeedbackStates'
import { useOcorrenciasDemonstracao } from '../hooks/useOcorrenciasDemonstracao'
import OcorrenciaCard from '../components/OcorrenciaCard'
import { ocorrenciasDemonstracao, rotulosStatus } from '../data/ocorrenciasDemonstracao'

const categorias = [...new Set(ocorrenciasDemonstracao.map((item) => item.tipoBarreira))]
const campo = 'w-full rounded-lg border border-slate-500 bg-white px-3 py-2 font-normal text-primary'

function normalizarBusca(texto: string) {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR').trim()
}

export default function Ocorrencias() {
  const [parametros, setParametros] = useSearchParams()
  const { dados, erro, carregando, tentarNovamente } = useOcorrenciasDemonstracao()
  const busca = parametros.get('busca') ?? ''
  const categoria = parametros.get('categoria') ?? ''
  const status = parametros.get('status') ?? ''
  const buscaNormalizada = normalizarBusca(busca)

  const resultados = dados.filter((item) =>
    (!categoria || item.tipoBarreira === categoria) &&
    (!status || item.status === status) &&
    [item.descricao, item.bairro, item.endereco, item.tipoBarreira].some(
      (valor) => normalizarBusca(valor).includes(buscaNormalizada),
    ),
  )

  function atualizarFiltro(chave: string, valor: string) {
    const proximos = new URLSearchParams(parametros)
    if (valor) proximos.set(chave, valor)
    else proximos.delete(chave)
    setParametros(proximos, { replace: true, preventScrollReset: true })
  }

  function limparFiltros() {
    const proximos = new URLSearchParams(parametros)
    for (const chaveFiltro of ['busca', 'categoria', 'status']) proximos.delete(chaveFiltro)
    setParametros(proximos, { replace: true, preventScrollReset: true })
  }

  return (
    <main className="bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Ocorrências</h1>
          <p className="mt-3 text-slate-700">Consulte barreiras de acessibilidade por descrição, localização ou categoria.</p>
          <p className="mt-3 text-sm font-semibold text-slate-700">Demonstração com registros fictícios.</p>
        </header>
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-4">
          <legend className="px-2 font-bold text-primary">Pesquisar e filtrar</legend>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-1 font-semibold">
              <span>Pesquisar ocorrências</span>
              <input type="search" className={campo} value={busca} onChange={(e) => atualizarFiltro('busca', e.target.value)} />
            </label>
            <label className="space-y-1 font-semibold">
              <span>Categoria</span>
              <select className={campo} value={categoria} onChange={(e) => atualizarFiltro('categoria', e.target.value)}>
                <option value="">Todas as categorias</option>
                {categorias.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="space-y-1 font-semibold">
              <span>Status</span>
              <select className={campo} value={status} onChange={(e) => atualizarFiltro('status', e.target.value)}>
                <option value="">Todos os status</option>
                {Object.entries(rotulosStatus).map(([valor, rotulo]) => <option key={valor} value={valor}>{rotulo}</option>)}
              </select>
            </label>
          </div>
          <button type="button" onClick={limparFiltros} className="mt-4 rounded-lg px-2 py-2 font-semibold text-primary underline underline-offset-4">
            Limpar filtros
          </button>
        </fieldset>
        {!carregando && !erro && (
          <p role="status" className="text-sm text-slate-700">
            {resultados.length === 1 ? '1 ocorrência encontrada' : `${resultados.length} ocorrências encontradas`}
          </p>
        )}
        {carregando ? (
          <LoadingState mensagem="Carregando ocorrências..." />
        ) : erro ? (
          <ErrorState mensagem={erro} aoTentarNovamente={tentarNovamente} />
        ) : resultados.length === 0 ? (
          <EmptyState
            titulo={dados.length === 0 ? 'Nenhuma ocorrência registrada' : 'Nenhuma ocorrência encontrada'}
            descricao={dados.length === 0 ? 'Ainda não há relatos para exibir nesta demonstração.' : 'Altere a pesquisa ou limpe os filtros para ver outros resultados.'}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((item) => (
              <li key={item.id} className="min-w-0">
                <OcorrenciaCard ocorrencia={item} busca={parametros.toString()} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
