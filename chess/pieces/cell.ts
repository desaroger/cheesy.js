import type { Board } from "../board";
import type { Position } from "../types";
import type { Piece } from "./piece";

export abstract class Cell {

    constructor(protected board: Board, public position: Position) { }

    isEmpty() {
        return false;
    }

    is(pieceType: typeof Piece) {
        return this instanceof pieceType;
    }

}
