import type { Board } from "../board";
import type { Side, Position } from "../types";
import { classNameToChar } from "../utils/classNameToChar";
import { Cell } from "./cell";

export abstract class Piece extends Cell {
    pristine: boolean = true;

    constructor(board: Board, position: Position, public readonly side: Side) {
        super(board, position);
    }

    toString(): string {
        let char = classNameToChar(this.getPieceName());
        if (this.side === 'white') {
            char = char.toUpperCase();
        }

        return char;
    }

    abstract getPieceName(): string;

    abstract getPossibleMovements(): Position[];
}
