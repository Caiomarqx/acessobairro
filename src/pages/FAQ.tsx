import { useState } from "react";
import AccordionItem from "../components/AccordionItem";

const categoriasFAQ = [
  {
    titulo: "Sobre o AcessoBairro",
    descricao: "Entenda a proposta e o objetivo da plataforma.",
    perguntas: [
      {
        pergunta: "O que é o AcessoBairro?",
        resposta:
          "O AcessoBairro é uma plataforma de participação cidadã que permite registrar e consultar barreiras de acessibilidade urbana. A proposta é dar visibilidade às dificuldades encontradas nos espaços públicos, especialmente por pessoas cadeirantes.",
      },
      {
        pergunta: "Quem pode contribuir com a plataforma?",
        resposta:
          "Qualquer cidadão interessado em acessibilidade pode contribuir compartilhando informações sobre barreiras encontradas na cidade. Pessoas com mobilidade reduzida, familiares, cuidadores e outros membros da comunidade também fazem parte do público que a iniciativa pretende atender.",
      },
      {
        pergunta: "O AcessoBairro é um canal oficial da prefeitura?",
        resposta:
          "Não. O AcessoBairro é um projeto acadêmico e não representa um sistema oficial de solicitações à prefeitura. Os registros são organizados e acompanhados dentro da própria plataforma.",
      },
    ],
  },
  {
    titulo: "Registro e acompanhamento",
    descricao: "Saiba como compartilhar e consultar ocorrências.",
    perguntas: [
      {
        pergunta: "Que tipo de problema posso registrar?",
        resposta:
          "Você pode relatar barreiras que dificultam a acessibilidade urbana, como calçadas danificadas, ausência de rampas e passagens obstruídas. O foco principal são os obstáculos que prejudicam a mobilidade de pessoas cadeirantes.",
      },
      {
        pergunta:
          "Quais informações são necessárias para registrar uma ocorrência?",
        resposta:
          "O registro pode incluir o bairro, um endereço ou ponto de referência aproximado, a descrição do problema, sua categoria e o impacto observado. Também podem ser informadas a existência de uma passagem alternativa e a proximidade de serviços essenciais.",
      },
      {
        pergunta: "Como posso consultar as ocorrências registradas?",
        resposta:
          "A plataforma disponibiliza uma listagem de ocorrências para consulta. Os registros podem ser organizados por critérios como bairro, categoria do problema e situação atual.",
      },
      {
        pergunta: "O que significam os status das ocorrências?",
        resposta:
          "ABERTA indica que a ocorrência foi registrada na plataforma. EM_ANALISE significa que o registro está sendo avaliado pelos responsáveis pelo sistema. ENCERRADA indica que o registro foi encerrado administrativamente.",
      },
      {
        pergunta:
          "Uma ocorrência encerrada significa que o problema foi resolvido?",
        resposta:
          "Não necessariamente. O encerramento representa uma atualização administrativa dentro da plataforma e não comprova que a barreira física foi removida ou que houve algum reparo no local.",
      },
    ],
  },
];
function FAQ() {
  const [perguntaAberta, setPerguntaAberta] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Central de dúvidas
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
            Perguntas frequentes sobre o{" "}
            <span className="text-secondary">AcessoBairro.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Encontre respostas sobre a plataforma, o registro de barreiras de
            acessibilidade e o acompanhamento das ocorrências compartilhadas
            pela comunidade.
          </p>
        </div>
      </section>

      <section aria-labelledby="titulo-faq" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            id="titulo-faq"
            className="text-3xl font-bold text-primary md:text-4xl"
          >
            Como podemos ajudar?
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            Nesta seção você encontrará informações para entender melhor o
            funcionamento do AcessoBairro.
          </p>
          <div className="mt-12 space-y-16">
            {categoriasFAQ.map((categoria, indice) => (
              <section
                key={categoria.titulo}
                aria-labelledby={`categoria-faq-${indice}`}
              >
                <div>
                  <h3
                    id={`categoria-faq-${indice}`}
                    className="text-2xl font-bold text-primary"
                  >
                    {categoria.titulo}
                  </h3>

                  <p className="mt-2 text-slate-600">{categoria.descricao}</p>
                </div>

                <div className="mt-6 grid gap-5">
                  {categoria.perguntas.map((item, indicePergunta) => {
                    const id = `${indice}-${indicePergunta}`;
                    const aberto = perguntaAberta === id;
                    return (
                      <AccordionItem
                        key={item.pergunta}
                        id={id}
                        pergunta={item.pergunta}
                        resposta={item.resposta}
                        aberto={aberto}
                        aoAlternar={() => setPerguntaAberta(aberto ? null : id)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
