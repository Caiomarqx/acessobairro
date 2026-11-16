
import { describe, expect, it } from 'vitest'
import {
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
