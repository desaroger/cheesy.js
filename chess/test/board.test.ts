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
            expect(board.toChars()).toStrictEqual(boardText);
        })
    })

    describe('get', () => {
        const matrixString = 'P  |p  |ppp';
        it.each<[Position, boolean, string | null]>([
            [[0, 0], true, 'p'],
            [[1, 0], true, 'p'],
            [[2, 0], true, 'p'],
            [[0, 1], true, 'p'],
            [[1, 1], true, null],
            [[2, 1], true, null],
            [[1, 2], true, null],
            [[0, 2], true, 'P'],
            [[2, 2], true, null],
            [[2, 3], false, null],
            [[3, 2], false, null],
            [[3, 3], false, null],
            [[0, -1], false, null],
            [[-1, 0], false, null],
            [[-1, -1], false, null],
        ])('%j', (position, expectedSquareExists, expectedChar) => {
            const board = new Board(matrixString);
            const square = board.get(position);
            expect(!!square).toEqual(expectedSquareExists);
            const pieceChar = square?.piece?.pieceChar ?? null;
            expect(pieceChar).toStrictEqual(expectedChar);
        })
    })
})
