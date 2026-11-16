
import { describe, expect, it } from 'vitest'
import type { CategoriaSaidaDTO } from '../types/api'
import { localizarCategoriaJava } from './mapeamentoIAJava'

const categoriasJava: CategoriaSaidaDTO[] = [
  {
    cdCategoria: 1,
    nmCategoria: 'Calçada danificada',
    dsCategoria: null,
  },
  {
    cdCategoria: 2,
    nmCategoria: 'Rampa ausente',
    dsCategoria: null,
  },
  {
    cdCategoria: 3,
    nmCategoria: 'Rampa inadequada',
    dsCategoria: null,
  },
  {
    cdCategoria: 4,
    nmCategoria: 'Passagem obstruída',
    dsCategoria: null,
  },
  {
    cdCategoria: 5,
    nmCategoria: 'Travessia insegura',
    dsCategoria: null,
  },
]

describe('localizarCategoriaJava', () => {
  it.each([
    ['CALCADA_DANIFICADA', 1],
    ['RAMPA_AUSENTE', 2],
    ['RAMPA_INADEQUADA', 3],
    ['PASSAGEM_OBSTRUIDA', 4],
    ['TRAVESSIA_INADEQUADA', 5],
  ] as const)(
    'converte %s para a categoria %i',
    (categoriaIA, codigoEsperado) => {
      const resultado = localizarCategoriaJava(
        categoriaIA,
        categoriasJava,
      )

      expect(resultado?.cdCategoria).toBe(codigoEsperado)
    },
  )

  it('ignora diferenças de acentuação e maiúsculas', () => {
    const categorias: CategoriaSaidaDTO[] = [
      {
        cdCategoria: 10,
        nmCategoria: 'CALCADA DANIFICADA',
        dsCategoria: null,
      },
    ]

    const resultado = localizarCategoriaJava(
      'CALCADA_DANIFICADA',
      categorias,
    )

    expect(resultado?.cdCategoria).toBe(10)
  })

  it('usa o ID recebido da API, sem depender de código fixo', () => {
    const categorias: CategoriaSaidaDTO[] = [
      {
        cdCategoria: 27,
        nmCategoria: 'Travessia insegura',
        dsCategoria: null,
      },
    ]

    const resultado = localizarCategoriaJava(
      'TRAVESSIA_INADEQUADA',
      categorias,
    )

    expect(resultado?.cdCategoria).toBe(27)
  })

  it('retorna null quando não encontra a categoria', () => {
    const resultado = localizarCategoriaJava(
      'RAMPA_AUSENTE',
      [],
    )

    expect(resultado).toBeNull()
  })
})
