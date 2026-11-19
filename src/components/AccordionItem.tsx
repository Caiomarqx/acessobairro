
type AccordionItemProps = {
  id: string
  pergunta: string
  resposta: string
  aberto: boolean
  aoAlternar: () => void
}

export default function AccordionItem({
  id,
  pergunta,
  resposta,
  aberto,
  aoAlternar,
}: AccordionItemProps) {
  const idResposta = `resposta-${id}`
  const idPergunta = `pergunta-${id}`

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-background">
      <h4>
        <button
          id={idPergunta}
          type="button"
          aria-expanded={aberto}
          aria-controls={idResposta}
          onClick={aoAlternar}
          className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-bold leading-7 text-primary transition hover:bg-secondary/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary"
        >
          <span>{pergunta}</span>

          <span
            aria-hidden="true"
            className="shrink-0 text-2xl text-secondary"
          >
            {aberto ? '−' : '+'}
          </span>
        </button>
      </h4>

      <div
        id={idResposta}
        role="region"
        aria-labelledby={idPergunta}
        hidden={!aberto}
        className="px-6 pb-6"
      >
        <p className="leading-7 text-slate-600">
          {resposta}
        </p>
      </div>
    </article>
  )
}