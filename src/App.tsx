
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Integrantes from './pages/Integrantes'
import FAQ from './pages/FAQ'
import Ocorrencias from './pages/Ocorrencias'
import DetalhesOcorrencia from './pages/DetalhesOcorrencia'
import Contato from './pages/Contato'
import NovaOcorrencia from './pages/NovaOcorrencia'

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
          <Route path="integrantes" element={<Integrantes />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contato" element={<Contato />} />

          <Route path="ocorrencias" element={<Ocorrencias />} />
          <Route path="ocorrencias/nova" element={<NovaOcorrencia />} />
          <Route path="ocorrencias/:id" element={<DetalhesOcorrencia />} />

          <Route path="*" element={<PaginaEmConstrucao titulo="Página não encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
