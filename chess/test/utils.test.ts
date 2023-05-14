import { describe, it, expect } from 'vitest'
import { Pawn } from '../pieces/pawn'
import { Empty } from '../pieces/empty'
import { classNameToChar } from '../utils/classNameToChar'
import { charToCellClass } from '../utils/charToCellClass'
import type { Cell } from '../pieces/cell'
import type { Piece } from '../pieces/piece'

describe('utils', () => {
  describe('charToCellClass', () => {
    it.each<[string, typeof Cell | typeof Piece]>([
      [' ', Empty],
      ['p', Pawn],
    ])('%', (char, expectedOutput) => {
      const output = charToCellClass(char);
      expect(output).toStrictEqual(expectedOutput);
    })
  })

  describe('classNameToChar', () => {
    it.each<[string, string]>([
      [Empty.name, ' '],
      [Pawn.name, 'p'],
    ])('%', (char, expectedOutput) => {
      const output = classNameToChar(char);
      expect(output).toStrictEqual(expectedOutput);
    })
  })
})
