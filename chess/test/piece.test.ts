import { describe, it, expect } from 'vitest'
import { Piece } from '../pieces/piece'
import type { Position, Side } from '../types'
import type { Board } from '../board'

class Pawn extends Piece {
    get pieceName(): string {
        throw new Error('Method not implemented.')
    }
    get pieceAbbr(): string {
        return 'P';
    }
    getPossibleMovements(): Position[] {
        throw new Error('Method not implemented.')
    }
}

class Knight extends Piece {
    get pieceName(): string {
        throw new Error('Method not implemented.')
    }
    get pieceAbbr(): string {
        throw new Error('Method not implemented.')
    }
    getPossibleMovements(): Position[] {
        throw new Error('Method not implemented.')
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
  
  describe('pieceChar', () => {
    it.each<[Piece, string]>([
      [create(Pawn), 'p'],
      [create(Pawn, {side: 'white'}), 'P']
    ])('%', (piece, expectedChar) => {
      const char = piece.pieceChar;
      expect(char).toStrictEqual(expectedChar);
    })
  })
})

function create(pieceType: new (board: Board, position: Position, side: Side) => Piece, data: {board?: Board, position?: Position, side?: Side} = {}): Piece {
  const board = (data.board ?? null) as Board;
  const position = (data.position ?? null) as Position;
  const side = (data.side ?? null) as Side;

  return new pieceType(board, position, side);
}
