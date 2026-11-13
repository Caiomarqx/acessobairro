import { Link, useLocation, useParams } from 'react-router-dom'
import { EmptyState, ErrorState, LoadingState } from '../components/FeedbackStates'
import { useConsultaApi } from '../hooks/useConsultaApi'
import type { AtualizacaoSaidaDTO, OcorrenciaSaidaDTO } from '../types/api'
import { formatarData, rotulosPrioridade, rotulosStatus } from '../utils/ocorrencias'

function Historico({ id }: { id: number }) {
  const { dados, erro, carregando, tentarNovamente } = useConsultaApi<AtualizacaoSaidaDTO[]>(`/ocorrencias/${id}/atualizacoes`)
  return <section aria-labelledby="historico-ocorrencia" className="space-y-4">
    <h2 id="historico-ocorrencia" className="text-2xl font-bold text-primary">Histórico</h2>
    {carregando ? <LoadingState mensagem="Carregando histórico..." /> : erro ? <ErrorState titulo="Não foi possível carregar o histórico" mensagem={erro} aoTentarNovamente={tentarNovamente} /> : !dados?.length ? <p>Nenhuma atualização registrada.</p> : <ol className="space-y-3">
      {dados.map((a) => <li key={a.cdAtualizacao} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="font-semibold">{rotulosStatus[a.stNovo]}</p>
        <p className="text-sm text-slate-700">{formatarData(a.dtAtualizacao)} · {a.usuario.nmUsuario}</p>
        <p className="break-words whitespace-pre-wrap text-slate-700">{a.dsAtualizacao}</p>
      </li>)}
    </ol>}
  </section>
}

export default function DetalhesOcorrencia() {
  const { id } = useParams()
  const { search } = useLocation()
  const idValido = !!id && /^[1-9]\d*$/.test(id) && Number.isSafeInteger(Number(id))
  const { dados: o, erro, status, carregando, tentarNovamente } = useConsultaApi<OcorrenciaSaidaDTO>(idValido ? `/ocorrencias/${id}` : null)
  const naoEncontrada = !idValido || status === 404
  return (
    <main className="bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link to={{ pathname: '/ocorrencias', search }} className="inline-block rounded-lg px-1 py-2 font-semibold text-primary underline underline-offset-4">Voltar para ocorrências</Link>
        <header>
          <h1 className="break-words text-3xl font-bold text-primary sm:text-4xl">{o?.categoria.nmCategoria ?? 'Detalhes da ocorrência'}</h1>
          <p className="mt-3 text-sm text-slate-700">Fonte: API AcessoBairro. Relatos comunitários; não representam solicitações oficiais nem garantem reparo. O projeto acadêmico pode conter dados de teste.</p>
        </header>
        {carregando ? <LoadingState mensagem="Carregando detalhes da ocorrência..." /> : naoEncontrada ? <EmptyState titulo="Ocorrência não encontrada" descricao="Confira o endereço da página ou volte para a lista de ocorrências." /> : erro ? <ErrorState mensagem={erro} aoTentarNovamente={tentarNovamente} /> : o ? (
          <>
            <section aria-labelledby="informacoes-ocorrencia" className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
              <h2 id="informacoes-ocorrencia" className="text-xl font-bold">Informações da ocorrência</h2>
              <p className="break-words whitespace-pre-wrap leading-7 text-slate-700">{o.dsOcorrencia}</p>
              {o.stOcorrencia === 'RESOLVIDA' && <p className="font-semibold">Resolvida segundo informação da comunidade. Não é confirmação oficial de reparo.</p>}
              <dl className="grid gap-4 break-words text-slate-700 sm:grid-cols-2">
                <div><dt className="font-semibold">Bairro</dt><dd>{o.bairro.nmBairro}</dd></div>
                <div><dt className="font-semibold">Cidade e UF</dt><dd>{o.bairro.nmCidade}/{o.bairro.sgUf}</dd></div>
                <div><dt className="font-semibold">Endereço aproximado</dt><dd>{o.dsEnderecoAprox}</dd></div>
                <div><dt className="font-semibold">Status</dt><dd>{rotulosStatus[o.stOcorrencia]}</dd></div>
                <div><dt className="font-semibold">Impacto na mobilidade</dt><dd>{o.nrImpacto} de 5</dd></div>
                <div><dt className="font-semibold">Passagem alternativa</dt><dd>{o.flPassagemAlternativa === 'S' ? 'Sim' : 'Não informada como disponível'}</dd></div>
                <div><dt className="font-semibold">Próximo a serviço essencial</dt><dd>{o.flServicoEssencial === 'S' ? 'Sim' : 'Não'}</dd></div>
                <div><dt className="font-semibold">Prioridade sugerida</dt><dd>{o.tpPrioridadeSugerida ? rotulosPrioridade[o.tpPrioridadeSugerida] : 'Ainda não analisada'}</dd></div>
                <div><dt className="font-semibold">Prioridade final</dt><dd>{o.tpPrioridadeFinal ? rotulosPrioridade[o.tpPrioridadeFinal] : 'Ainda não definida'}</dd></div>
                <div><dt className="font-semibold">Categoria sugerida</dt><dd>{o.nmCategoriaSugerida ?? 'Ainda não analisada'}</dd></div>
                <div><dt className="font-semibold">Autor</dt><dd>{o.usuario.nmUsuario}</dd></div>
                <div><dt className="font-semibold">Data de registro</dt><dd>{formatarData(o.dtRegistro)}</dd></div>
              </dl>
            </section>
            <Historico key={o.cdOcorrencia} id={o.cdOcorrencia} />
          </>
        ) : <EmptyState titulo="Ocorrência não encontrada" descricao="Volte para a lista de ocorrências." />}
      </div>
    </main>
  )
}
