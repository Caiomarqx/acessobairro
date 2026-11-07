
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'

function PaginaEmConstrucao({ titulo }: { titulo: string }) {
  return (
    <main className="bg-background px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="font-semibold text-secondary hover:underline"
        >
          ← Voltar para a Home
        </Link>

        <h1 className="mt-10 text-4xl font-bold text-primary">
          {titulo}
        </h1>

        <p className="mt-4 text-slate-600">
          Esta página está sendo desenvolvida pela equipe AcessoBairro.
        </p>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="sobre" element={<Sobre />} />
          <Route path="integrantes" element={<PaginaEmConstrucao titulo="Integrantes" />} />
          <Route path="faq" element={<PaginaEmConstrucao titulo="Perguntas frequentes" />} />
          <Route path="contato" element={<PaginaEmConstrucao titulo="Contato" />} />

          <Route path="ocorrencias" element={<PaginaEmConstrucao titulo="Ocorrências" />} />
          <Route path="ocorrencias/nova" element={<PaginaEmConstrucao titulo="Registrar ocorrência" />} />
          <Route path="ocorrencias/:id" element={<PaginaEmConstrucao titulo="Detalhes da ocorrência" />} />

          <Route path="*" element={<PaginaEmConstrucao titulo="Página não encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
