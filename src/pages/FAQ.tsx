
function FAQ() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Central de dúvidas
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
            Perguntas frequentes sobre o{' '}
            <span className="text-secondary">AcessoBairro.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Encontre respostas sobre a plataforma, o registro de
            barreiras de acessibilidade e o acompanhamento das
            ocorrências compartilhadas pela comunidade.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="titulo-faq"
        className="bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="titulo-faq"
            className="text-3xl font-bold text-primary md:text-4xl"
          >
            Como podemos ajudar?
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            Nesta seção você encontrará informações para
            entender melhor o funcionamento do AcessoBairro.
          </p>
        </div>
      </section>
    </main>
  )
}

export default FAQ