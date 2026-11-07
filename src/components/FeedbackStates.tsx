
import type { ReactNode } from 'react'

type LoadingStateProps = {
  mensagem?: string
}

type EmptyStateProps = {
  titulo: string
  descricao: string
  acao?: ReactNode
}

type ErrorStateProps = {
  titulo?: string
  mensagem?: string
  aoTentarNovamente?: () => void
}

export function LoadingState({
  mensagem = 'Carregando informações...',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center"
    >
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-secondary/20 border-t-secondary"
      />

      <p className="mt-5 font-medium text-primary">
        {mensagem}
      </p>
    </div>
  )
}

export function EmptyState({
  titulo,
  descricao,
  acao,
}: EmptyStateProps) {
  return (
    <section
      aria-label={titulo}
      className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center"
    >
      <div
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-3xl"
      >
        📍
      </div>

      <h2 className="mt-6 text-2xl font-bold text-primary">
        {titulo}
      </h2>

      <p className="mt-3 max-w-md leading-7 text-slate-600">
        {descricao}
      </p>

      {acao && (
        <div className="mt-7">
          {acao}
        </div>
      )}
    </section>
  )
}

export function ErrorState({
  titulo = 'Não foi possível carregar as informações',
  mensagem = 'Ocorreu um problema. Tente novamente mais tarde.',
  aoTentarNovamente,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="flex flex-col items-center rounded-2xl border border-red-200 bg-white px-6 py-14 text-center"
    >
      <div
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl"
      >
        ⚠️
      </div>

      <h2 className="mt-6 text-2xl font-bold text-primary">
        {titulo}
      </h2>

      <p className="mt-3 max-w-md leading-7 text-slate-600">
        {mensagem}
      </p>

      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-7 rounded-xl bg-secondary px-6 py-3 font-semibold text-white transition hover:bg-primary"
        >
          Tentar novamente
        </button>
      )}
    </section>
  )
}
