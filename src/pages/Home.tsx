import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-background">

      <main>
        
<section className="relative overflow-hidden px-6 py-20 md:py-28">
  <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
        <span className="h-2 w-2 rounded-full bg-highlight" />
        Mobilidade urbana e inclusão
      </span>


<h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl xl:text-6xl">
  A acessibilidade começa com a{' '}
  <span className="text-secondary">sua voz.</span>
</h1>


      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Calçadas danificadas, rampas ausentes e caminhos
        bloqueados não podem passar despercebidos.
        No AcessoBairro, sua comunidade ajuda a dar
        visibilidade às barreiras urbanas.
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Link
          to="/ocorrencias/nova"
          className="inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-4 font-semibold text-white shadow-lg shadow-secondary/15 transition hover:bg-primary"
        >
          Registrar uma barreira
          <span className="ml-3" aria-hidden="true">→</span>
        </Link>

        <Link
          to="/ocorrencias"
          className="inline-flex items-center justify-center rounded-xl border border-secondary/25 bg-white px-6 py-4 font-semibold text-primary transition hover:border-secondary hover:bg-secondary/5"
        >
          Explorar ocorrências
        </Link>
      </div>

      <p className="mt-7 text-sm text-slate-500">
        Uma iniciativa colaborativa por cidades mais acessíveis.
      </p>
    </div>

    <div className="relative">
      <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-highlight/15 blur-3xl" />

      <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-primary/10 md:p-7">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              AcessoBairro
            </p>
            <h2 className="mt-1 text-xl font-bold text-primary">
              Ocorrências da comunidade
            </h2>
          </div>

          <span className="rounded-xl bg-secondary/10 px-3 py-2 text-xs font-semibold text-secondary">
            Prévia
          </span>
        </div>

        <div className="mt-6 rounded-2xl bg-background p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-primary">
              Barreira de acessibilidade
            </span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-primary">
              Em análise
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-2xl">
                <span role="img" aria-label="Pessoa em cadeira de rodas">♿</span>
              </div>
              <div>
                <h3 className="font-bold text-primary">
                  Ausência de rampa de acesso
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Exemplo de ocorrência que pode ser registrada
                  pela comunidade.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-secondary">
            <span className="h-2 w-2 rounded-full bg-highlight" />
            Informação colaborativa
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Demonstração ilustrativa da plataforma
        </p>
      </div>
    </div>
  </div>
</section>


        
<section
  id="como-funciona"
  aria-labelledby="titulo-como-funciona"
  className="bg-white px-6 py-24"
>
  <div className="mx-auto max-w-6xl">
    <div className="max-w-2xl">
      <span className="text-sm font-bold uppercase tracking-widest text-secondary">
        Simples e colaborativo
      </span>

      <h2
        id="titulo-como-funciona"
        className="mt-4 text-3xl font-bold tracking-tight text-primary md:text-4xl"
      >
        Sua participação faz a diferença.
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-600">
        Tornar os obstáculos urbanos mais visíveis é o primeiro
        passo para construir uma comunidade mais consciente
        sobre acessibilidade.
      </p>
    </div>

    <ol className="mt-12 grid gap-6 md:grid-cols-3">
      {[
        {
          numero: '01',
          titulo: 'Identifique',
          descricao:
            'Encontrou uma calçada danificada, uma rampa ausente ou um caminho bloqueado? Identifique a barreira.',
        },
        {
          numero: '02',
          titulo: 'Registre',
          descricao:
            'Compartilhe informações sobre o problema para dar mais visibilidade às dificuldades de mobilidade.',
        },
        {
          numero: '03',
          titulo: 'Consulte',
          descricao:
            'Explore as ocorrências cadastradas pela comunidade e acompanhe seus status dentro da plataforma.',
        },
      ].map((passo) => (
        <li
          key={passo.numero}
          className="group rounded-2xl border border-slate-200 bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lg"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-xl font-bold text-secondary">
            {passo.numero}
          </div>

          <h3 className="mt-7 text-xl font-bold text-primary">
            {passo.titulo}
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            {passo.descricao}
          </p>
        </li>
      ))}
    </ol>

    <div className="mt-12 flex flex-wrap items-center gap-5">
      <Link
        to="/ocorrencias/nova"
        className="inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-4 font-semibold text-white transition hover:bg-primary"
      >
        Quero contribuir
        <span className="ml-3" aria-hidden="true">→</span>
      </Link>

      <p className="max-w-lg text-sm leading-6 text-slate-500">
        O AcessoBairro é uma iniciativa acadêmica colaborativa.
        Os registros não representam solicitações oficiais à prefeitura.
      </p>
    </div>
  </div>
</section>

      </main>
    </div>
  );
}

export default Home;
