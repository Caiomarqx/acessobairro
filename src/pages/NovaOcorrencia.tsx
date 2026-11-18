import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ErrorState, LoadingState } from '../components/FeedbackStates'
import { useConsultaApi } from '../hooks/useConsultaApi'
import { cadastrarOcorrencia } from '../services/ocorrenciasService'
import type {
  BairroSaidaDTO,
  CategoriaSaidaDTO,
  OcorrenciaEntradaDTO,
  OcorrenciaSaidaDTO,
  UsuarioSaidaDTO,
} from '../types/api'

const campo = 'w-full min-w-0 rounded-lg border border-slate-500 bg-white px-3 py-2 font-normal text-primary aria-[invalid=true]:border-red-700'

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

type ErrosFormulario = Partial<Record<keyof FormularioOcorrencia, string>>

type ResultadoEnvio =
  | { tipo: 'sucesso'; ocorrencia: OcorrenciaSaidaDTO }
  | { tipo: 'erro'; mensagem: string }

const TEMPO_LIMITE_MS = 75000

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

const ordemDosCampos: (keyof FormularioOcorrencia)[] = [
  'cdUsuario',
  'cdBairro',
  'cdCategoria',
  'dsEnderecoAprox',
  'dsOcorrencia',
  'nrImpacto',
  'flPassagemAlternativa',
  'flServicoEssencial',
]

const opcoesPassagem = [
  { valor: 'S', rotulo: 'Sim' },
  { valor: 'N', rotulo: 'Não' },
  { valor: 'NAO_SEI', rotulo: 'Não sei' },
] as const

const opcoesServico = [
  { valor: 'S', rotulo: 'Sim' },
  { valor: 'N', rotulo: 'Não' },
] as const

function validar(dados: FormularioOcorrencia): ErrosFormulario {
  const erros: ErrosFormulario = {}
  const endereco = dados.dsEnderecoAprox.trim()
  const descricao = dados.dsOcorrencia.trim()

  if (!dados.cdUsuario) erros.cdUsuario = 'Selecione quem está registrando.'
  if (!dados.cdBairro) erros.cdBairro = 'Selecione o bairro.'
  if (!dados.cdCategoria) erros.cdCategoria = 'Selecione a categoria da barreira.'

  if (!endereco) erros.dsEnderecoAprox = 'Informe um endereço aproximado.'
  else if (endereco.length < 5) erros.dsEnderecoAprox = 'O endereço deve ter pelo menos 5 caracteres.'
  else if (endereco.length > 200) erros.dsEnderecoAprox = 'O endereço deve ter no máximo 200 caracteres.'

  if (!descricao) erros.dsOcorrencia = 'Descreva a barreira.'
  else if (descricao.length < 10) erros.dsOcorrencia = 'A descrição deve ter pelo menos 10 caracteres.'
  else if (descricao.length > 1000) erros.dsOcorrencia = 'A descrição deve ter no máximo 1000 caracteres.'

  const impacto = Number(dados.nrImpacto)
  if (!Number.isInteger(impacto) || impacto < 1 || impacto > 5) erros.nrImpacto = 'Escolha um impacto de 1 a 5.'

  if (!dados.flPassagemAlternativa) erros.flPassagemAlternativa = 'Informe se existe passagem alternativa.'
  if (!dados.flServicoEssencial) erros.flServicoEssencial = 'Informe se fica perto de um serviço essencial.'

  return erros
}

function montarEntrada(dados: FormularioOcorrencia): OcorrenciaEntradaDTO {
  return {
    cdUsuario: Number(dados.cdUsuario),
    cdBairro: Number(dados.cdBairro),
    cdCategoria: Number(dados.cdCategoria),
    dsEnderecoAprox: dados.dsEnderecoAprox.trim(),
    dsOcorrencia: dados.dsOcorrencia.trim(),
    nrImpacto: Number(dados.nrImpacto),
    flPassagemAlternativa: dados.flPassagemAlternativa === 'S' ? 'S' : 'N',
    flServicoEssencial: dados.flServicoEssencial === 'S' ? 'S' : 'N',
  }
}

function MensagemErro({ id, mensagem }: { id: string; mensagem?: string }) {
  if (!mensagem) return null
  return <p id={id} className="text-sm font-semibold text-red-700">{mensagem}</p>
}

function NovaOcorrencia() {
  const usuarios = useConsultaApi<UsuarioSaidaDTO[]>('/usuarios')
  const bairros = useConsultaApi<BairroSaidaDTO[]>('/bairros')
  const categorias = useConsultaApi<CategoriaSaidaDTO[]>('/categorias')

  const [dados, setDados] = useState<FormularioOcorrencia>(formularioVazio)
  const [erros, setErros] = useState<ErrosFormulario>({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<ResultadoEnvio | null>(null)

  function alterar<K extends keyof FormularioOcorrencia>(nome: K, valor: FormularioOcorrencia[K]) {
    setDados((anterior) => ({ ...anterior, [nome]: valor }))
    setErros((anteriores) => ({ ...anteriores, [nome]: undefined }))
  }

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setResultado(null)
    const novosErros = validar(dados)
    setErros(novosErros)

    const primeiroComErro = ordemDosCampos.find((nome) => novosErros[nome])
    if (primeiroComErro) {
      document.getElementById(primeiroComErro)?.focus()
      return
    }

    setEnviando(true)
    try {
      const ocorrencia = await cadastrarOcorrencia(montarEntrada(dados), AbortSignal.timeout(TEMPO_LIMITE_MS))
      setResultado({ tipo: 'sucesso', ocorrencia })
      setDados(formularioVazio)
    } catch (falha) {
      const mensagem = falha instanceof Error ? falha.message : 'Não foi possível registrar a barreira.'
      setResultado({ tipo: 'erro', mensagem })
    } finally {
      setEnviando(false)
    }
  }

  function propsDoCampo(nome: keyof FormularioOcorrencia) {
    return {
      id: nome,
      'aria-invalid': erros[nome] ? true : undefined,
      'aria-describedby': erros[nome] ? `erro-${nome}` : undefined,
    }
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
          <form noValidate onSubmit={aoEnviar} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <p className="text-sm text-slate-700">Todos os campos são obrigatórios.</p>

            <div className="space-y-1">
              <label htmlFor="cdUsuario" className="block font-semibold">Usuário</label>
              <select {...propsDoCampo('cdUsuario')} className={campo} value={dados.cdUsuario} onChange={(e) => alterar('cdUsuario', e.target.value)}>
                <option value="">Selecione</option>
                {usuarios.dados?.map((u) => (
                  <option key={u.cdUsuario} value={u.cdUsuario}>{u.nmUsuario}</option>
                ))}
              </select>
              <MensagemErro id="erro-cdUsuario" mensagem={erros.cdUsuario} />
            </div>

            <div className="space-y-1">
              <label htmlFor="cdBairro" className="block font-semibold">Bairro</label>
              <select {...propsDoCampo('cdBairro')} className={campo} value={dados.cdBairro} onChange={(e) => alterar('cdBairro', e.target.value)}>
                <option value="">Selecione</option>
                {bairros.dados?.map((b) => (
                  <option key={b.cdBairro} value={b.cdBairro}>{b.nmBairro} – {b.nmCidade}/{b.sgUf}</option>
                ))}
              </select>
              <MensagemErro id="erro-cdBairro" mensagem={erros.cdBairro} />
            </div>

            <div className="space-y-1">
              <label htmlFor="cdCategoria" className="block font-semibold">Categoria</label>
              <select {...propsDoCampo('cdCategoria')} className={campo} value={dados.cdCategoria} onChange={(e) => alterar('cdCategoria', e.target.value)}>
                <option value="">Selecione</option>
                {categorias.dados?.map((c) => (
                  <option key={c.cdCategoria} value={c.cdCategoria}>{c.nmCategoria}</option>
                ))}
              </select>
              <MensagemErro id="erro-cdCategoria" mensagem={erros.cdCategoria} />
            </div>

            <div className="space-y-1">
              <label htmlFor="dsEnderecoAprox" className="block font-semibold">Endereço aproximado</label>
              <input
                {...propsDoCampo('dsEnderecoAprox')}
                type="text"
                maxLength={200}
                className={campo}
                placeholder="Ex.: Rua das Flores, perto do nº 100"
                value={dados.dsEnderecoAprox}
                onChange={(e) => alterar('dsEnderecoAprox', e.target.value)}
              />
              <MensagemErro id="erro-dsEnderecoAprox" mensagem={erros.dsEnderecoAprox} />
            </div>

            <div className="space-y-1">
              <label htmlFor="dsOcorrencia" className="block font-semibold">Descrição da barreira</label>
              <textarea
                {...propsDoCampo('dsOcorrencia')}
                rows={4}
                maxLength={1000}
                className={campo}
                placeholder="Ex.: Calçada com buraco grande, a cadeira de rodas não passa."
                value={dados.dsOcorrencia}
                onChange={(e) => alterar('dsOcorrencia', e.target.value)}
              />
              <MensagemErro id="erro-dsOcorrencia" mensagem={erros.dsOcorrencia} />
            </div>

            <div className="space-y-1">
              <label htmlFor="nrImpacto" className="block font-semibold">Impacto na mobilidade (1 = baixo, 5 = impede a passagem)</label>
              <select {...propsDoCampo('nrImpacto')} className={campo} value={dados.nrImpacto} onChange={(e) => alterar('nrImpacto', e.target.value)}>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <MensagemErro id="erro-nrImpacto" mensagem={erros.nrImpacto} />
            </div>

            <fieldset
              className="space-y-2"
              aria-invalid={erros.flPassagemAlternativa ? true : undefined}
              aria-describedby={erros.flPassagemAlternativa ? 'erro-flPassagemAlternativa' : undefined}
            >
              <legend className="font-semibold">Existe passagem alternativa?</legend>
              <div className="flex flex-wrap gap-4">
                {opcoesPassagem.map((opcao, indice) => (
                  <label key={opcao.valor} className="flex items-center gap-2">
                    <input
                      id={indice === 0 ? 'flPassagemAlternativa' : undefined}
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
              <MensagemErro id="erro-flPassagemAlternativa" mensagem={erros.flPassagemAlternativa} />
            </fieldset>

            <fieldset
              className="space-y-2"
              aria-invalid={erros.flServicoEssencial ? true : undefined}
              aria-describedby={erros.flServicoEssencial ? 'erro-flServicoEssencial' : undefined}
            >
              <legend className="font-semibold">Fica perto de saúde, escola ou serviço público?</legend>
              <div className="flex flex-wrap gap-4">
                {opcoesServico.map((opcao, indice) => (
                  <label key={opcao.valor} className="flex items-center gap-2">
                    <input
                      id={indice === 0 ? 'flServicoEssencial' : undefined}
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
              <MensagemErro id="erro-flServicoEssencial" mensagem={erros.flServicoEssencial} />
            </fieldset>

            <div aria-live="polite">
              {resultado?.tipo === 'sucesso' && (
                <div role="status" className="rounded-lg border border-green-700 bg-green-50 p-4 text-green-900">
                  <p className="font-bold">Barreira registrada com sucesso.</p>
                  <p className="mt-1">
                    Ocorrência nº {resultado.ocorrencia.cdOcorrencia}.{' '}
                    <Link to={`/ocorrencias/${resultado.ocorrencia.cdOcorrencia}`} className="font-semibold underline">
                      Ver ocorrência
                    </Link>
                  </p>
                </div>
              )}
              {resultado?.tipo === 'erro' && (
                <div role="alert" className="rounded-lg border border-red-700 bg-red-50 p-4 text-red-900">
                  <p className="font-bold">Não foi possível registrar a barreira.</p>
                  <p className="mt-1">{resultado.mensagem}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-white disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {enviando ? 'Enviando...' : 'Registrar barreira'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default NovaOcorrencia
