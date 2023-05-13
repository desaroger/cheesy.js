import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";

export class Game /*extends Array<Array<Piece | undefined>>*/ {
    board: (Piece | undefined)[][] = [];

    constructor() {}

    startGame() {
        this.board = [
            [new Pawn(), undefined, new Pawn()],
            [undefined, new Pawn(), undefined],
            [new Pawn(), undefined, new Pawn()],
        ]
    }
}
