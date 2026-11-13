import { Link } from 'react-router-dom'
import type { OcorrenciaSaidaDTO } from '../types/api'
import { formatarData, rotulosPrioridade, rotulosStatus } from '../utils/ocorrencias'

type Props = { ocorrencia: OcorrenciaSaidaDTO; busca: string }
export default function OcorrenciaCard({ ocorrencia: o, busca }: Props) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="break-words text-xl font-bold text-primary">{o.categoria.nmCategoria}</h2>
      <p className="break-words text-sm font-semibold text-slate-700">{o.bairro.nmBairro} · {o.bairro.nmCidade}/{o.bairro.sgUf}</p>
      <p className="line-clamp-3 break-words leading-6 text-slate-700">{o.dsOcorrencia}</p>
      <dl className="space-y-1 text-sm text-slate-700">
        <div><dt className="inline font-semibold">Status: </dt><dd className="inline">{rotulosStatus[o.stOcorrencia]}</dd></div>
        <div><dt className="inline font-semibold">Impacto: </dt><dd className="inline">{o.nrImpacto} de 5</dd></div>
        <div><dt className="inline font-semibold">Prioridade sugerida: </dt><dd className="inline">{o.tpPrioridadeSugerida ? rotulosPrioridade[o.tpPrioridadeSugerida] : 'Ainda não analisada'}</dd></div>
        <div><dt className="inline font-semibold">Registro: </dt><dd className="inline">{formatarData(o.dtRegistro)}</dd></div>
      </dl>
      <Link to={{ pathname: `/ocorrencias/${o.cdOcorrencia}`, search: busca }} className="mt-auto self-start rounded-lg px-1 py-2 font-semibold text-primary underline underline-offset-4">
        Ver detalhes<span className="sr-only"> de {o.categoria.nmCategoria} em {o.bairro.nmBairro}</span>
      </Link>
    </article>
  )
}
