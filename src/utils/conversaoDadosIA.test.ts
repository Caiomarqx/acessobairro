
import { describe, expect, it } from 'vitest'
import {
  impactoParaIA,
  passagemAlternativaParaIA,
  passagemAlternativaParaJava,
} from './conversaoDadosIA'


describe('Conversão de passagem alternativa entre Java e IA', () => {
  it('converte S do Java para SIM da IA', () => {
    expect(passagemAlternativaParaIA('S')).toBe('SIM')
  })

  it('converte N do Java para NAO da IA', () => {
    expect(passagemAlternativaParaIA('N')).toBe('NAO')
  })

  it('converte SIM da IA para S do Java', () => {
    expect(passagemAlternativaParaJava('SIM')).toBe('S')
  })

  it('converte NAO da IA para N do Java', () => {
    expect(passagemAlternativaParaJava('NAO')).toBe('N')
  })

  it('preserva o valor ao converter Java → IA → Java', () => {
    expect(
      passagemAlternativaParaJava(passagemAlternativaParaIA('S')),
    ).toBe('S')

    expect(
      passagemAlternativaParaJava(passagemAlternativaParaIA('N')),
    ).toBe('N')
  })
})


describe('Conversão de impacto para IA', () => {
  it.each([
    [1, 'BAIXO'],
    [2, 'BAIXO'],
    [3, 'MEDIO'],
    [4, 'ALTO'],
    [5, 'ALTO'],
  ])('converte impacto %i para %s', (valor, esperado) => {
    expect(impactoParaIA(valor)).toBe(esperado)
  })

  it('rejeita impactos inválidos', () => {
    const valoresInvalidos = [
      0,
      6,
      -1,
      2.5,
      NaN,
      Infinity,
      -Infinity,
    ]

    for (const valor of valoresInvalidos) {
      expect(() => impactoParaIA(valor)).toThrow(RangeError)
    }
  })
})
