import { describe, it, expect } from 'vitest';
import { Pawn } from '../pieces/pawn';
import { Game } from '../game';

describe('Pawn', () => {
    describe('getPossibleMovements', () => {
        it('can move one in front', () => {
            const {board} = new Game('ppp|   |PPP');
            const square = board.get([1, 0]);
            expect(square?.piece).toBeTruthy();
            expect(square!.piece).instanceOf(Pawn);
            expect(square!.position).toEqual([1, 0]);

            const movements = square!.piece!.getPossibleMovements();
            expect(movements.map(m => m.destination)).toEqual([[1, 1]])
        })

        it('can attack in diagonal', () => {
            const {board} = new Game('ppp| P |P P');
            const square = board.get([1, 1]);
            expect(square?.piece).toBeTruthy();
            expect(square!.piece).instanceOf(Pawn);
            expect(square!.position).toEqual([1, 1]);

            const movements = square!.piece!.getPossibleMovements();
            expect(movements.map(m => m.destination)).toEqual([[0, 2], [2, 2]])
        })

        it('can long jump', () => {
            const {board} = new Game('p p|   |PPP');
            const square = board.get([1, 0]);
            expect(square?.piece).toBeTruthy();
            expect(square!.piece).instanceOf(Pawn);
            expect(square!.position).toEqual([1, 0]);

            const movements = square!.piece!.getPossibleMovements();
            expect(movements.map(m => m.destination)).toEqual([[1, 1], [1, 2]]);

            // Can not jump if already moved
            square!.piece!.pristine = false;
            const movements2 = square!.piece!.getPossibleMovements();
            expect(movements2.map(m => m.destination)).toEqual([[1, 1]]);
        })

        it('can move to 3 places', () => {
            const {board} = new Game('p p| P |P P');
            const square = board.get([1, 1]);
            expect(square?.piece).toBeTruthy();
            expect(square!.piece).instanceOf(Pawn);
            expect(square!.position).toEqual([1, 1]);

            const movements = square!.piece!.getPossibleMovements();
            expect(movements.map(m => m.destination)).toEqual([[1, 2], [0, 2], [2, 2]])
        })

        it('works on black side', () => {
            const {board} = new Game('ppp| P |P P');
            const square = board.get([2, 2]);
            expect(square?.piece).toBeTruthy();
            expect(square!.piece).instanceOf(Pawn);
            expect(square!.position).toEqual([2, 2]);

            const movements = square!.piece!.getPossibleMovements();
            expect(movements.map(m => m.destination)).toEqual([[2, 1], [1, 1]])
        })

        it('works with "en passant" capture', () => {
            const game = new Game('pppp|    |    |PPPP');
            game.move([1, 0], [1, 1]);
            expect(game.board.toChars()).toEqual('pppp|    | P  |P PP');
            expect(game.movements.length).toEqual(1);
            game.move([0, 3], [0, 1]);
            expect(game.board.toChars()).toEqual(' ppp|    |pP  |P PP');
            expect(game.movements.length).toEqual(2);
            
            const square = game.board.get([1, 1]);
            expect(square).toBeTruthy();
            expect(square!.piece).toBeTruthy();
            const movements = square!.piece!.getPossibleMovements();
            expect(movements.map(m => m.destination)).toEqual([[1, 2], [0, 2]]);
        })
    })
})
