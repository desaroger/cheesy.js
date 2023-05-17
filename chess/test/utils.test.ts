import { describe, it, expect } from 'vitest'
import { Pawn } from '../pieces/pawn'
import { charToPieceClass } from '../utils/charToPieceClass'
import type { Piece } from '../pieces/piece'

describe('utils', () => {
  describe('charToPieceClass', () => {
    it.each<[string, typeof Piece]>([
      ['p', Pawn],
    ])('%', (char, expectedOutput) => {
      const output = charToPieceClass(char);
      expect(output).toStrictEqual(expectedOutput);
    })
  })
})
