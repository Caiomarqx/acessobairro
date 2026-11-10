import { Link } from 'react-router-dom'
import { rotulosStatus, type OcorrenciaDemonstracao } from '../data/ocorrenciasDemonstracao'

type Props = {
  ocorrencia: OcorrenciaDemonstracao
  busca: string
}

export default function OcorrenciaCard({ ocorrencia, busca }: Props) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="break-words text-xl font-bold text-primary">{ocorrencia.tipoBarreira}</h2>
      <p className="text-sm font-semibold text-slate-700">{ocorrencia.bairro}</p>
      <p className="line-clamp-3 break-words leading-6 text-slate-700">{ocorrencia.descricao}</p>
      <dl className="space-y-1 text-sm text-slate-700">
        <div>
          <dt className="inline font-semibold">Status: </dt>
          <dd className="inline">{rotulosStatus[ocorrencia.status]}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Prioridade sugerida: </dt>
          <dd className="inline">{ocorrencia.prioridade ?? 'Ainda não analisada'}</dd>
        </div>
      </dl>
      <Link
        to={{ pathname: `/ocorrencias/${ocorrencia.id}`, search: busca }}
        className="mt-auto self-start rounded-lg px-1 py-2 font-semibold text-primary underline underline-offset-4"
      >
        Ver detalhes
        <span className="sr-only"> de {ocorrencia.tipoBarreira} em {ocorrencia.bairro}</span>
      </Link>
    </article>
  )
}
