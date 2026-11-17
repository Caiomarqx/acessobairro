
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const links = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Ocorrências', caminho: '/ocorrencias' },
  { nome: 'Sobre', caminho: '/sobre' },
  { nome: 'Integrantes', caminho: '/integrantes' },
  { nome: 'FAQ', caminho: '/faq' },
  { nome: 'Contato', caminho: '/contato' },
]

function Layout() {
  const [menuAberto, setMenuAberto] = useState(false)

  const estiloLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-secondary/10 text-secondary'
        : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-background">
        
<a
  href="#conteudo-principal"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:text-primary focus:shadow-xl"
>
  Pular para o conteúdo principal
</a>

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setMenuAberto(false)}
            aria-label="AcessoBairro - Página inicial"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-white">
              AB
            </span>

            <span className="text-xl font-bold tracking-tight text-primary">
              Acesso<span className="text-secondary">Bairro</span>
            </span>
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.caminho}
                to={link.caminho}
                end={link.caminho === '/'}
                className={estiloLink}
              >
                {link.nome}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/ocorrencias/nova"
            className="hidden rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary sm:inline-flex"
          >
            Registrar barreira
          </Link>

          <button
            type="button"
            className="rounded-lg border border-slate-200 p-3 text-primary lg:hidden"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {menuAberto ? '✕' : '☰'}
            </span>
          </button>
        </div>

        {menuAberto && (
          <nav
            id="menu-mobile"
            aria-label="Navegação para dispositivos móveis"
            className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.caminho}
                  to={link.caminho}
                  end={link.caminho === '/'}
                  className={estiloLink}
                  onClick={() => setMenuAberto(false)}
                >
                  {link.nome}
                </NavLink>
              ))}

              <NavLink
                to="/ocorrencias/nova"
                onClick={() => setMenuAberto(false)}
                className="mt-2 rounded-xl bg-secondary px-4 py-3 text-center font-semibold text-white"
              >
                Registrar barreira
              </NavLink>
            </div>
          </nav>
        )}
      </header>

      
<div id="conteudo-principal" tabIndex={-1} className="flex-1">
  <Outlet />
</div>


      <footer className="bg-primary px-6 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold">
              Acesso<span className="text-highlight">Bairro</span>
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Uma cidade mais acessível começa com quem vive nela.
              Juntos, podemos dar mais visibilidade às barreiras
              de acessibilidade urbana.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <Link to="/ocorrencias" className="hover:text-white">
                Consultar ocorrências
              </Link>
              <Link to="/sobre" className="hover:text-white">
                Sobre o projeto
              </Link>
              <Link to="/integrantes" className="hover:text-white">
                Nossa equipe
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-white/20 pt-6 text-sm text-white/70">
          © 2026 AcessoBairro — Projeto acadêmico FIAP.
        </div>
      </footer>
    </div>
  )
}

export default Layout
