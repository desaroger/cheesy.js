import { describe, it, expect } from 'vitest'
import { Piece } from '../pieces/piece'
import type { Position, Side } from '../types'
import type { Board } from '../board'
import type { Cell } from '../pieces/cell'
import { Empty } from '../pieces/empty'

class Pawn extends Piece {
  getPossibleMovements(): Position[] {
    throw new Error('')
  }
}

class Knight extends Piece {
  getPossibleMovements(): Position[] {
    throw new Error('')
  }
}

describe('Piece', () => {
  it('works with instanceof', () => {
    const pawn = create(Pawn);
    const knight = create(Knight);

    expect(pawn).instanceOf(Pawn);
    expect(pawn instanceof Pawn).toEqual(true);
    expect(pawn.is(Pawn)).toEqual(true);
    expect(pawn).instanceOf(Piece);
    expect(pawn instanceof Piece).toEqual(true);
    expect(pawn.is(Piece)).toEqual(true);

    expect(knight).not.instanceOf(Pawn);
    expect(knight instanceof Pawn).toEqual(false);
    expect(knight.is(Pawn)).toEqual(false);
    expect(knight).instanceOf(Piece);
    expect(knight instanceof Piece).toEqual(true);
    expect(knight.is(Piece)).toEqual(true);
  });
  
  describe('toString', () => {
    it.each<[Cell, string]>([
      [create(Empty), ' '],
      [create(Pawn), 'p'],
      [create(Pawn, {side: 'white'}), 'P']
    ])('%', (piece, expectedOutput) => {
      const output = piece.toString();
      expect(output).toStrictEqual(expectedOutput);
    })
  })
})

function create(pieceType: new (board: Board, position: Position, side: Side) => Cell, data: {board?: Board, position?: Position, side?: Side} = {}): Cell {
  const board = (data.board ?? null) as Board;
  const position = (data.position ?? null) as Position;
  const side = (data.side ?? null) as Side;

  return new pieceType(board, position, side);
}
