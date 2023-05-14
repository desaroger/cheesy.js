import { describe, it, expect } from 'vitest'
import { Board } from '../board'
import type { Position } from '../types'

describe('Board', () => {
    describe('constructor', () => {
        it.each<string>([
            'ppp|   |ppp',
            'p p| p |p p',
            'p p| p |PPP',
        ])('%j', (boardText) => {
            const board = new Board(boardText);
            expect(board.toString()).toStrictEqual(boardText);
        })
    })

    describe('get', () => {
        const matrixString = 'P  |p  |ppp';
        it.each<[Position, string | undefined]>([
            [[0, 0], 'p'],
            [[1, 0], 'p'],
            [[2, 0], 'p'],
            [[0, 1], 'p'],
            [[1, 1], ' '],
            [[2, 1], ' '],
            [[0, 2], 'P'],
            [[1, 2], ' '],
            [[2, 2], ' '],
            [[2, 3], undefined],
            [[3, 2], undefined],
            [[3, 3], undefined],
            [[0, -1], undefined],
            [[-1, 0], undefined],
            [[-1, -1], undefined],
        ])('%j', (position, expectedChar) => {
            const board = new Board(matrixString);
            const piece = board.get(position);
            const pieceChar = piece?.toString();
            expect(pieceChar).toStrictEqual(expectedChar);
        })
    })
})
