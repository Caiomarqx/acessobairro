import { useSearchParams } from 'react-router-dom'
import { EmptyState, ErrorState, LoadingState } from '../components/FeedbackStates'
import { useConsultaApi } from '../hooks/useConsultaApi'
import OcorrenciaCard from '../components/OcorrenciaCard'
import type { OcorrenciaSaidaDTO } from '../types/api'
import { filtrarOcorrencias, filtros, rotulosStatus, tamanhoPagina } from '../utils/ocorrencias'

const campo = 'w-full min-w-0 rounded-lg border border-slate-500 bg-white px-3 py-2 font-normal text-primary'

export default function Ocorrencias() {
  const [parametros, setParametros] = useSearchParams()
  const { dados, erro, carregando, tentarNovamente } = useConsultaApi<OcorrenciaSaidaDTO[]>('/ocorrencias')
  const lista = dados ?? []
  const resultados = filtrarOcorrencias(lista, parametros)
  const categorias = [...new Map(lista.map((o) => [o.categoria.cdCategoria, o.categoria])).values()].sort((a, b) => a.nmCategoria.localeCompare(b.nmCategoria, 'pt-BR'))
  const bairros = [...new Map(lista.map((o) => [o.bairro.cdBairro, o.bairro])).values()].sort((a, b) => a.nmBairro.localeCompare(b.nmBairro, 'pt-BR'))
  const cidades = [...new Set(lista.map((o) => o.bairro.nmCidade))].sort()
  const ufs = [...new Set(lista.map((o) => o.bairro.sgUf))].sort()
  const totalPaginas = Math.max(1, Math.ceil(resultados.length / tamanhoPagina))
  const paginaPedida = Number(parametros.get('pagina') ?? 1)
  const pagina = Math.min(totalPaginas, Number.isSafeInteger(paginaPedida) && paginaPedida > 0 ? paginaPedida : 1)
  const visiveis = resultados.slice((pagina - 1) * tamanhoPagina, pagina * tamanhoPagina)

  function atualizarFiltro(chave: string, valor: string) {
    const proximos = new URLSearchParams(parametros)
    if (valor) proximos.set(chave, valor)
    else proximos.delete(chave)
    if (chave !== 'pagina') proximos.delete('pagina')
    setParametros(proximos, { replace: true, preventScrollReset: true })
  }
  function limparFiltros() {
    const proximos = new URLSearchParams(parametros)
    filtros.forEach((chave) => proximos.delete(chave))
    setParametros(proximos, { replace: true, preventScrollReset: true })
  }
  function seletor(chave: string, titulo: string, todas: string, opcoes: { valor: string; rotulo: string }[]) {
    return <label className="min-w-0 space-y-1 font-semibold">
      <span>{titulo}</span>
      <select className={campo} value={parametros.get(chave) ?? ''} onChange={(e) => atualizarFiltro(chave, e.target.value)}>
        <option value="">{todas}</option>
        {opcoes.map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
      </select>
    </label>
  }
  return (
    <main className="bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Ocorrências</h1>
          <p className="mt-3 text-slate-700">Consulte barreiras de acessibilidade por descrição, localização ou categoria.</p>
          <p className="mt-3 text-sm text-slate-700">Fonte: API AcessoBairro. Registros comunitários de um projeto acadêmico; podem incluir dados de teste e não representam solicitações oficiais à prefeitura.</p>
        </header>
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-4">
          <legend className="px-2 font-bold text-primary">Pesquisar e filtrar</legend>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="min-w-0 space-y-1 font-semibold"><span>Pesquisar ocorrências</span><input type="search" className={campo} value={parametros.get('busca') ?? ''} onChange={(e) => atualizarFiltro('busca', e.target.value)} /></label>
            {seletor('categoria', 'Categoria', 'Todas as categorias', categorias.map((c) => ({ valor: String(c.cdCategoria), rotulo: c.nmCategoria })))}
            {seletor('status', 'Status', 'Todos os status', Object.entries(rotulosStatus).map(([valor, rotulo]) => ({ valor, rotulo })))}
            {seletor('impacto', 'Impacto', 'Todos os impactos', [1, 2, 3, 4, 5].map((n) => ({ valor: String(n), rotulo: `${n} de 5` })))}
            {seletor('bairro', 'Bairro', 'Todos os bairros', bairros.map((b) => ({ valor: String(b.cdBairro), rotulo: `${b.nmBairro} - ${b.nmCidade}/${b.sgUf}` })))}
            {seletor('cidade', 'Cidade', 'Todas as cidades', cidades.map((c) => ({ valor: c, rotulo: c })))}
            {seletor('uf', 'UF', 'Todas as UFs', ufs.map((u) => ({ valor: u, rotulo: u })))}
            {seletor('passagem', 'Passagem alternativa', 'Qualquer condição', [{ valor: 'S', rotulo: 'Sim' }, { valor: 'N', rotulo: 'Não informada como disponível' }])}
            {seletor('servico', 'Próximo a serviço essencial', 'Qualquer condição', [{ valor: 'S', rotulo: 'Sim' }, { valor: 'N', rotulo: 'Não' }])}
            {seletor('ordem', 'Ordenar por', 'Mais recentes', [{ valor: 'impacto', rotulo: 'Maior impacto' }, { valor: 'prioridade', rotulo: 'Maior prioridade sugerida' }])}
          </div>
          <button type="button" onClick={limparFiltros} className="mt-4 rounded-lg px-2 py-2 font-semibold text-primary underline underline-offset-4">Limpar filtros</button>
        </fieldset>
        {!carregando && !erro && <p role="status" className="text-sm text-slate-700">{resultados.length === 1 ? '1 ocorrência encontrada' : `${resultados.length} ocorrências encontradas`}{totalPaginas > 1 ? ` · Página ${pagina} de ${totalPaginas}` : ''}</p>}
        {carregando ? <LoadingState mensagem="Carregando ocorrências..." /> : erro ? <ErrorState mensagem={erro} aoTentarNovamente={tentarNovamente} /> : resultados.length === 0 ? (
          <EmptyState titulo={lista.length === 0 ? 'Nenhuma ocorrência registrada' : 'Nenhuma ocorrência encontrada'} descricao={lista.length === 0 ? 'Ainda não há relatos para exibir.' : 'Altere a pesquisa ou limpe os filtros para ver outros resultados.'} />
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{visiveis.map((o) => <li key={o.cdOcorrencia} className="min-w-0"><OcorrenciaCard ocorrencia={o} busca={parametros.toString()} /></li>)}</ul>
            {totalPaginas > 1 && <nav aria-label="Paginação de ocorrências" className="flex flex-wrap items-center justify-center gap-4">
              <button type="button" disabled={pagina === 1} onClick={() => atualizarFiltro('pagina', String(pagina - 1))} className="rounded-lg border px-4 py-2 disabled:opacity-40">Anterior</button>
              <span>Página {pagina} de {totalPaginas}</span>
              <button type="button" disabled={pagina === totalPaginas} onClick={() => atualizarFiltro('pagina', String(pagina + 1))} className="rounded-lg border px-4 py-2 disabled:opacity-40">Próxima</button>
            </nav>}
          </>
        )}
      </div>
    </main>
  )
}
