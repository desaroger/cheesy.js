import { describe, it, expect } from 'vitest'
import { Piece } from '../pieces/piece'
import type { Movement, Position, Side } from '../types'
import type { Game } from '../game'

class Pawn extends Piece {
    get pieceName(): string {
        throw new Error('Method not implemented.')
    }
    get pieceAbbr(): string {
        return 'P';
    }
    getPossibleMovements(): Movement[] {
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
    getPossibleMovements(): Movement[] {
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

function create(pieceType: new (game: Game, position: Position, side: Side) => Piece, data: {game?: Game, position?: Position, side?: Side} = {}): Piece {
  const game = (data.game ?? null) as Game;
  const position = (data.position ?? null) as Position;
  const side = (data.side ?? null) as Side;

  return new pieceType(game, position, side);
}
