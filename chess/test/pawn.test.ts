import {describe, it, expect} from 'vitest';
import { Pawn } from '../pieces/pawn';
import { Board } from '../board';
import type { Piece } from '../pieces/piece';

describe('Pawn', () => {
    describe('getPossibleMovements', () => {
        it('can move one in front', () => {
            const board = new Board('ppp|   |PPP');
            const pawn = board.get([1, 0]) as Piece;
            expect(pawn).toBeTruthy();
            expect(pawn).instanceOf(Pawn);
            expect(pawn.position).toEqual([1, 0]);

            const movements = pawn.getPossibleMovements();
            expect(movements).toEqual([[1, 1]])
        })

        it('can attack in diagonal', () => {
            const board = new Board('ppp| P |P P');
            const pawn = board.get([1, 1]) as Piece;
            expect(pawn).toBeTruthy();
            expect(pawn).instanceOf(Pawn);
            expect(pawn.position).toEqual([1, 1]);

            const movements = pawn.getPossibleMovements();
            expect(movements).toEqual([[0, 2], [2, 2]])
        })

        it('can long jump', () => {
            const board = new Board('p p|   |PPP');
            const pawn = board.get([1, 0]) as Piece;
            expect(pawn).toBeTruthy();
            expect(pawn).instanceOf(Pawn);
            expect(pawn.position).toEqual([1, 0]);

            const movements = pawn.getPossibleMovements();
            expect(movements).toEqual([[1, 1], [1, 2]]);

            // Can not jump if already moved
            pawn.pristine = false;
            const movements2 = pawn.getPossibleMovements();
            expect(movements2).toEqual([[1, 1]]);
        })

        it('can move to 3 places', () => {
            const board = new Board('p p| P |P P');
            const pawn = board.get([1, 1]) as Piece;
            expect(pawn).toBeTruthy();
            expect(pawn).instanceOf(Pawn);
            expect(pawn.position).toEqual([1, 1]);

            const movements = pawn.getPossibleMovements();
            expect(movements).toEqual([[1, 2], [0, 2], [2, 2]])
        })

        it('works on black side', () => {
            const board = new Board('ppp| P |P P');
            const pawn = board.get([2, 2]) as Piece;
            expect(pawn).toBeTruthy();
            expect(pawn).instanceOf(Pawn);
            expect(pawn.position).toEqual([2, 2]);

            const movements = pawn.getPossibleMovements();
            expect(movements).toEqual([[2, 1], [1, 1]])
        })
    })
})
