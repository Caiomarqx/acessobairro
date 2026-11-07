
function Home() {
  return (
    <div className="min-h-screen bg-background">

      <main>
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-highlight/15 px-4 py-2 text-sm font-semibold text-secondary">
              Mobilidade urbana e inclusão
            </span>

            <h1 className="mt-7 text-4xl md:text-6xl font-bold tracking-tight leading-tight text-primary">
              Uma cidade mais acessível começa com quem vive nela.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Uma plataforma colaborativa para identificar,
              registrar e acompanhar barreiras de acessibilidade
              urbana, dando mais visibilidade às dificuldades
              enfrentadas por pessoas cadeirantes.
            </p>

            <a
              href="#como-funciona"
              className="mt-9 inline-flex rounded-xl bg-secondary px-7 py-4 font-semibold text-white shadow-md transition hover:bg-primary"
            >
              Conheça nossa proposta
            </a>
          </div>
        </section>

        <section id="como-funciona" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold text-primary">
              Como funciona?
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Identifique",
                  description: "Encontre uma barreira de acessibilidade urbana.",
                },
                {
                  number: "02",
                  title: "Registre",
                  description: "Compartilhe informações sobre o problema.",
                },
                {
                  number: "03",
                  title: "Acompanhe",
                  description: "Consulte as ocorrências registradas na plataforma.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-slate-200 bg-background p-7"
                >
                  <span className="text-3xl font-bold text-secondary">
                    {item.number}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-600 leading-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
