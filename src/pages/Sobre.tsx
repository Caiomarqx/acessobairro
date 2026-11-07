
import { Link } from 'react-router-dom'

function Sobre() {
  const pilares = [
    {
      numero: '01',
      titulo: 'Visibilidade',
      descricao:
        'Dar espaço às dificuldades de mobilidade que muitas vezes passam despercebidas no cotidiano.',
    },
    {
      numero: '02',
      titulo: 'Colaboração',
      descricao:
        'Incentivar a comunidade a compartilhar informações sobre barreiras de acessibilidade urbana.',
    },
    {
      numero: '03',
      titulo: 'Conscientização',
      descricao:
        'Estimular a discussão sobre a importância de ambientes urbanos mais inclusivos.',
    },
  ]

  return (
    <main>
      <section className="bg-background px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Conheça nossa iniciativa
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
            A cidade deve ser acessível
            <span className="text-secondary"> para todos.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            O AcessoBairro nasceu como uma proposta acadêmica
            para dar mais visibilidade aos desafios enfrentados
            por pessoas cadeirantes nos espaços urbanos.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="titulo-problema"
        className="bg-white px-6 py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-secondary">
              O problema
            </span>

            <h2
              id="titulo-problema"
              className="mt-4 text-3xl font-bold text-primary md:text-4xl"
            >
              Pequenas barreiras podem causar grandes dificuldades.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Calçadas danificadas, ausência de rampas e caminhos
              bloqueados podem dificultar a mobilidade e a
              autonomia de pessoas que utilizam cadeira de rodas.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Nosso projeto busca tornar esses obstáculos
              mais visíveis por meio da participação da comunidade.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-background p-8 md:p-10">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-3xl text-secondary"
            >
              ♿
            </div>

            <h3 className="mt-7 text-2xl font-bold text-primary">
              Acessibilidade importa.
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              Uma cidade inclusiva considera diferentes
              necessidades de mobilidade e oferece condições
              para que mais pessoas possam circular com autonomia.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="titulo-pilares"
        className="bg-background px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <span className="text-sm font-bold uppercase tracking-widest text-secondary">
            Nossa proposta
          </span>

          <h2
            id="titulo-pilares"
            className="mt-4 text-3xl font-bold text-primary md:text-4xl"
          >
            Três pilares para uma comunidade mais consciente.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pilares.map((pilar) => (
              <div
                key={pilar.numero}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <span className="text-3xl font-bold text-secondary">
                  {pilar.numero}
                </span>

                <h3 className="mt-6 text-xl font-bold text-primary">
                  {pilar.titulo}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {pilar.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            Sua participação pode dar mais visibilidade
            à acessibilidade urbana.
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-white/80">
            Conheça as ocorrências da comunidade e saiba como
            colaborar com a iniciativa.
          </p>

          <Link
            to="/ocorrencias"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-primary transition hover:bg-background"
          >
            Explorar ocorrências
            <span className="ml-3" aria-hidden="true">→</span>
          </Link>

          <p className="mt-6 text-sm text-white/70">
            Projeto acadêmico FIAP. Os registros não representam
            solicitações oficiais à prefeitura.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Sobre
