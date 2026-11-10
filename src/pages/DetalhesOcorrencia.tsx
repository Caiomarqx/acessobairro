import { Link, useLocation, useParams } from 'react-router-dom'
import { EmptyState } from '../components/FeedbackStates'
import { ocorrenciasDemonstracao, rotulosStatus } from '../data/ocorrenciasDemonstracao'

export default function DetalhesOcorrencia() {
  const { id } = useParams()
  const { search } = useLocation()
  const ocorrencia = ocorrenciasDemonstracao.find((item) => String(item.id) === id)

  return (
    <main className="bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link to={{ pathname: '/ocorrencias', search }} className="inline-block rounded-lg px-1 py-2 font-semibold text-primary underline underline-offset-4">
          Voltar para ocorrências
        </Link>
        <header>
          <h1 className="break-words text-3xl font-bold text-primary sm:text-4xl">
            {ocorrencia?.tipoBarreira ?? 'Detalhes da ocorrência'}
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-700">Demonstração com registros fictícios.</p>
        </header>
        {ocorrencia ? (
          <section aria-labelledby="informacoes-ocorrencia" className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
            <h2 id="informacoes-ocorrencia" className="text-xl font-bold">Informações da ocorrência</h2>
            <p className="break-words leading-7 text-slate-700">{ocorrencia.descricao}</p>
            <dl className="grid gap-4 text-slate-700 sm:grid-cols-2">
              <div><dt className="font-semibold">Bairro</dt><dd>{ocorrencia.bairro}</dd></div>
              <div><dt className="font-semibold">Localização</dt><dd>{ocorrencia.endereco}</dd></div>
              <div><dt className="font-semibold">Status</dt><dd>{rotulosStatus[ocorrencia.status]}</dd></div>
              <div><dt className="font-semibold">Prioridade sugerida</dt><dd>{ocorrencia.prioridade ?? 'Ainda não analisada'}</dd></div>
            </dl>
          </section>
        ) : (
          <EmptyState titulo="Ocorrência não encontrada" descricao="Confira o endereço da página ou volte para a lista de ocorrências." />
        )}
      </div>
    </main>
  )
}
