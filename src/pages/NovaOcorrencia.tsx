import { ErrorState, LoadingState } from '../components/FeedbackStates'
import { useConsultaApi } from '../hooks/useConsultaApi'
import type { BairroSaidaDTO, CategoriaSaidaDTO, UsuarioSaidaDTO } from '../types/api'

const campo = 'w-full min-w-0 rounded-lg border border-slate-500 bg-white px-3 py-2 font-normal text-primary'

function NovaOcorrencia() {
  const usuarios = useConsultaApi<UsuarioSaidaDTO[]>('/usuarios')
  const bairros = useConsultaApi<BairroSaidaDTO[]>('/bairros')
  const categorias = useConsultaApi<CategoriaSaidaDTO[]>('/categorias')

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
              <select className={campo} defaultValue="">
                <option value="">Selecione</option>
                {usuarios.dados?.map((u) => (
                  <option key={u.cdUsuario} value={u.cdUsuario}>{u.nmUsuario}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Bairro</span>
              <select className={campo} defaultValue="">
                <option value="">Selecione</option>
                {bairros.dados?.map((b) => (
                  <option key={b.cdBairro} value={b.cdBairro}>{b.nmBairro} – {b.nmCidade}/{b.sgUf}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1 font-semibold">
              <span>Categoria</span>
              <select className={campo} defaultValue="">
                <option value="">Selecione</option>
                {categorias.dados?.map((c) => (
                  <option key={c.cdCategoria} value={c.cdCategoria}>{c.nmCategoria}</option>
                ))}
              </select>
            </label>
          </form>
        )}
      </div>
    </main>
  )
}

export default NovaOcorrencia
