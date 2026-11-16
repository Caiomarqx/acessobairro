
import type { CategoriaSaidaDTO } from '../types/api'
import type { CategoriaBarreiraIA } from '../types/ia'

/**
 * Relaciona os códigos da IA aos nomes
 * cadastrados na API Java.
 */
const nomesCategoriasJava: Record<CategoriaBarreiraIA, string> = {
  CALCADA_DANIFICADA: 'Calçada danificada',
  RAMPA_AUSENTE: 'Rampa ausente',
  RAMPA_INADEQUADA: 'Rampa inadequada',
  PASSAGEM_OBSTRUIDA: 'Passagem obstruída',
  TRAVESSIA_INADEQUADA: 'Travessia insegura',
}

/**
 * Normaliza o texto para comparar nomes,
 * ignorando diferenças de acentos e maiúsculas.
 */
function normalizarNome(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

/**
 * Localiza a categoria correspondente na lista
 * retornada por GET /categorias da API Java.
 *
 * Retorna null quando não encontra correspondência,
 * evitando usar um ID incorreto.
 */
export function localizarCategoriaJava(
  categoriaIA: CategoriaBarreiraIA,
  categoriasJava: readonly CategoriaSaidaDTO[],
): CategoriaSaidaDTO | null {
  const nomeEsperado = nomesCategoriasJava[categoriaIA]

  return (
    categoriasJava.find(
      (categoria) =>
        normalizarNome(categoria.nmCategoria) ===
        normalizarNome(nomeEsperado),
    ) ?? null
  )
}
