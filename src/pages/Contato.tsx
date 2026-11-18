import { Link } from 'react-router-dom'

function Contato() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Contato e informações
          </span>
          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
            Vamos conversar sobre <span className="text-secondary">acessibilidade?</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            O AcessoBairro é um projeto acadêmico da FIAP que dá visibilidade
            às barreiras de acessibilidade urbana por meio da participação da comunidade.
          </p>
          <p className="mt-5 text-sm font-semibold text-primary">
            Global Solution 2026/2 · Turma 1TDSPF
          </p>
        </div>
      </section>

      <section aria-labelledby="contato-canais" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 id="contato-canais" className="text-3xl font-bold text-primary md:text-4xl">
              Canais de contato
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              Ainda não disponibilizamos um e-mail, telefone ou canal público
              de atendimento do projeto. Esta página não recebe mensagens.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Você pode conhecer os integrantes e as responsabilidades de cada
              pessoa na construção do AcessoBairro.
            </p>
            <Link to="/integrantes" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-primary">
              Conhecer a equipe
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-background p-7 md:p-10">
            <h2 className="text-2xl font-bold text-primary">Sobre a iniciativa</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Nosso objetivo é facilitar a consulta e o acompanhamento de relatos
              sobre calçadas, rampas, travessias e obstáculos à mobilidade.
            </p>
            <Link to="/sobre" className="mt-6 inline-flex min-h-11 items-center rounded-lg py-2 font-semibold text-primary underline underline-offset-4 hover:text-secondary">
              Entender o projeto
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="contato-comunidade" className="bg-primary px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 id="contato-comunidade" className="max-w-2xl text-3xl font-bold md:text-4xl">
            Acompanhe os relatos da comunidade.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-white/90">
            Consulte as ocorrências e seu histórico para conhecer as barreiras relatadas.
          </p>
          <Link to="/ocorrencias" className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-white px-6 py-4 font-semibold text-primary transition hover:bg-background focus-visible:outline-white">
            Explorar ocorrências
          </Link>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/90">
            Os registros são comunitários e demonstrativos. Não representam
            solicitações oficiais à prefeitura nem garantem reparo.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Contato
