
import { Link } from 'react-router-dom'

const integrantes = [
  {
    nome: 'Caio Marques da Silva',
    rm: '572760',
    iniciais: 'CM',
    area: 'Front-end e integração',
    descricao:
      'Responsável pela estrutura do Front-end, página inicial, acessibilidade, integrações e revisão geral da aplicação.',
  },
  {
    nome: 'Gabriel Antonio',
    rm: '573159',
    iniciais: 'GA',
    area: 'Banco de dados e Front-end',
    descricao:
      'Atua na modelagem do banco Oracle e no desenvolvimento da listagem, filtros e detalhes das ocorrências.',
  },
  {
    nome: 'Mariana Ramos',
    rm: '573686',
    iniciais: 'MR',
    area: 'Inteligência Artificial e Front-end',
    descricao:
      'Responsável pelos modelos de Inteligência Artificial, API de análise de relatos, formulário de cadastro e FAQ.',
  },
  {
    nome: 'Rodrigo Terra',
    rm: '571840',
    iniciais: 'RT',
    area: 'Back-end Java e Python',
    descricao:
      'Responsável pelo desenvolvimento da API Java, integração com o banco Oracle e solução em Python.',
  },
]

function Integrantes() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Nossa equipe
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
            Conheça quem está por trás do{' '}
            <span className="text-secondary">AcessoBairro.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Somos estudantes de Análise e Desenvolvimento de
            Sistemas da FIAP, unidos pelo propósito de desenvolver
            uma solução tecnológica voltada à acessibilidade urbana.
          </p>

          <p className="mt-5 text-sm font-semibold text-secondary">
            Global Solution 2026/2 · Turma 1TDSPF
          </p>
        </div>
      </section>

      <section
        aria-labelledby="titulo-equipe"
        className="bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="titulo-equipe"
            className="text-3xl font-bold text-primary md:text-4xl"
          >
            Nosso time
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            Cada integrante contribui com conhecimentos e
            responsabilidades que fazem parte da construção
            colaborativa do projeto.
          </p>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {integrantes.map((integrante) => (
              <li
                key={integrante.rm}
                className="rounded-3xl border border-slate-200 bg-background p-7 transition-shadow hover:shadow-lg md:p-9"
              >
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-xl font-bold text-secondary"
                  >
                    {integrante.iniciais}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-primary">
                      {integrante.nome}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      RM {integrante.rm}
                    </p>
                  </div>
                </div>

                <p className="mt-7 font-semibold text-secondary">
                  {integrante.area}
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  {integrante.descricao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Conheça nossa iniciativa.
            </h2>

            <p className="mt-4 max-w-xl leading-8 text-white/80">
              Descubra como o AcessoBairro busca dar mais
              visibilidade às barreiras de acessibilidade urbana.
            </p>
          </div>

          <Link
            to="/sobre"
            className="inline-flex shrink-0 rounded-xl bg-white px-6 py-4 font-semibold text-primary transition hover:bg-background"
          >
            Sobre o projeto
            <span className="ml-3" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Integrantes
