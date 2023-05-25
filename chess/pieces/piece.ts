import type { Game } from "../game";
import type { Side, Movement } from "../types";

export abstract class Piece {
    // id: string;
    pristine: boolean = true;

    constructor(protected game: Game, public readonly side: Side) {
        // this.id = randomBytes(4).toString('hex');
    }

    // TODO check if this makes sense
    // valueOf() {
    //     return this.id;
    // }

    /**
     * Checks if this piece is of a given type
     */
    is(pieceType: typeof Piece) {
        return this instanceof pieceType;
    }
    
    /**
     * Internal notation to be able to write boards
     * with just letters. It's the same as the abbreviation
     * but using uppercase for white and lowercase for black.
     */
    get pieceChar(): string {
        let char = this.pieceAbbr.toLowerCase();
        if (this.side === 'white') {
            char = char.toUpperCase();
        }

        return char;
    }

    get board() {
        return this.game.board;
    }

    /**
     * Full, human readable name for this piece.
     */
    abstract get pieceName(): string;

    /**
     * Piece abbreviation following the Algebraic Notation.
     */
    abstract get pieceAbbr(): string;

    /**
     * Get the list of possible movements of this piece.
     */
    abstract getPossibleMovements(): Movement[];
}
