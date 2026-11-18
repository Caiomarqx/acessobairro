import { useState } from 'react'
import { ErrorState, LoadingState } from '../components/FeedbackStates'
import { useConsultaApi } from '../hooks/useConsultaApi'
import type { BairroSaidaDTO, CategoriaSaidaDTO, UsuarioSaidaDTO } from '../types/api'

const campo = 'w-full min-w-0 rounded-lg border border-slate-500 bg-white px-3 py-2 font-normal text-primary'

interface FormularioOcorrencia {
  cdUsuario: string
  cdBairro: string
  cdCategoria: string
  dsEnderecoAprox: string
  dsOcorrencia: string
  nrImpacto: string
  flPassagemAlternativa: '' | 'S' | 'N' | 'NAO_SEI'
  flServicoEssencial: '' | 'S' | 'N'
}

const formularioVazio: FormularioOcorrencia = {
  cdUsuario: '',
  cdBairro: '',
  cdCategoria: '',
  dsEnderecoAprox: '',
  dsOcorrencia: '',
  nrImpacto: '',
  flPassagemAlternativa: '',
  flServicoEssencial: '',
}

const opcoesPassagem = [
  { valor: 'S', rotulo: 'Sim' },
  { valor: 'N', rotulo: 'Não' },
  { valor: 'NAO_SEI', rotulo: 'Não sei' },
] as const

const opcoesServico = [
  { valor: 'S', rotulo: 'Sim' },
  { valor: 'N', rotulo: 'Não' },
] as const

function NovaOcorrencia() {
  const usuarios = useConsultaApi<UsuarioSaidaDTO[]>('/usuarios')
  const bairros = useConsultaApi<BairroSaidaDTO[]>('/bairros')
  const categorias = useConsultaApi<CategoriaSaidaDTO[]>('/categorias')

  const [dados, setDados] = useState<FormularioOcorrencia>(formularioVazio)

  function alterar<K extends keyof FormularioOcorrencia>(nome: K, valor: FormularioOcorrencia[K]) {
    setDados((anterior) => ({ ...anterior, [nome]: valor }))
  }

  const carregando = usuarios.carregando || bairros.carregando || categorias.carregando
  const erro = usuarios.erro || bairros.erro || categorias.erro

  return (
    <main className="bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Registrar barreira</h1>
        <p className="text-slate-700">
          Registro comunitário e demonstrativo: não é uma solicitação oficial à prefeitura e não garante reparo.
        </p>

        {carregando && <LoadingState mensagem="Carregando usuários, bairros e categorias..." />}

        {!carregando && erro && (
          <ErrorState
            mensagem={erro}
            aoTentarNovamente={() => {
              usuarios.tentarNovamente()
              bairros.tentarNovamente()
              categorias.tentarNovamente()
            }}
          />
        )}

        {!carregando && !erro && (
          <form noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <label className="block space-y-1 font-semibold">
              <span>Usuário</span>
              <select className={campo} value={dados.cdUsuario} onChange={(e) => alterar('cdUsuario', e.target.value)}>
                <option value="">Selecione</option>
                {usuarios.dados?.map((u) => (
                  <option key={u.cdUsuario} value={u.cdUsuario}>{u.nmUsuario}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Bairro</span>
              <select className={campo} value={dados.cdBairro} onChange={(e) => alterar('cdBairro', e.target.value)}>
                <option value="">Selecione</option>
                {bairros.dados?.map((b) => (
                  <option key={b.cdBairro} value={b.cdBairro}>{b.nmBairro} – {b.nmCidade}/{b.sgUf}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Categoria</span>
              <select className={campo} value={dados.cdCategoria} onChange={(e) => alterar('cdCategoria', e.target.value)}>
                <option value="">Selecione</option>
                {categorias.dados?.map((c) => (
                  <option key={c.cdCategoria} value={c.cdCategoria}>{c.nmCategoria}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Endereço aproximado</span>
              <input
                type="text"
                className={campo}
                placeholder="Ex.: Rua das Flores, perto do nº 100"
                value={dados.dsEnderecoAprox}
                onChange={(e) => alterar('dsEnderecoAprox', e.target.value)}
              />
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Descrição da barreira</span>
              <textarea
                rows={4}
                className={campo}
                placeholder="Ex.: Calçada com buraco grande, a cadeira de rodas não passa."
                value={dados.dsOcorrencia}
                onChange={(e) => alterar('dsOcorrencia', e.target.value)}
              />
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Impacto na mobilidade (1 = baixo, 5 = impede a passagem)</span>
              <select className={campo} value={dados.nrImpacto} onChange={(e) => alterar('nrImpacto', e.target.value)}>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>

            <fieldset className="space-y-2">
              <legend className="font-semibold">Existe passagem alternativa?</legend>
              <div className="flex flex-wrap gap-4">
                {opcoesPassagem.map((opcao) => (
                  <label key={opcao.valor} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="flPassagemAlternativa"
                      value={opcao.valor}
                      checked={dados.flPassagemAlternativa === opcao.valor}
                      onChange={() => alterar('flPassagemAlternativa', opcao.valor)}
                    />
                    {opcao.rotulo}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="font-semibold">Fica perto de saúde, escola ou serviço público?</legend>
              <div className="flex flex-wrap gap-4">
                {opcoesServico.map((opcao) => (
                  <label key={opcao.valor} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="flServicoEssencial"
                      value={opcao.valor}
                      checked={dados.flServicoEssencial === opcao.valor}
                      onChange={() => alterar('flServicoEssencial', opcao.valor)}
                    />
                    {opcao.rotulo}
                  </label>
                ))}
              </div>
            </fieldset>
          </form>
        )}
      </div>
    </main>
  )
}

export default NovaOcorrencia
