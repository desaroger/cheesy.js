import type { Position } from "../types";
import { Piece } from "./piece";

export class Pawn extends Piece {
    get pieceName(): string {
        return 'Pawn';
    }

    get pieceAbbr(): string {
        return 'P';
    }

    getPossibleMovements(): Position[] {
        const movements: Position[] = [];
        const blackModifier = this.side === 'black' ? -1 : 1;

        const frontSquare = this.board.getRelative(this.position, [0, 1 * blackModifier]);
        if (frontSquare && !frontSquare.piece) {
            movements.push(frontSquare.position);

            if (this.pristine) {
                const frontFrontSquare = this.board.getRelative(this.position, [0, 2 * blackModifier]);
                if (frontFrontSquare && !frontFrontSquare.piece) {
                    movements.push(frontFrontSquare.position)
                }
            }
        }

        for (const pos of [[-1, 1 * blackModifier], [1, 1 * blackModifier]] as Position[]) {
            const square = this.board.getRelative(this.position, pos);
            if (square && (square.piece && square.piece.side !== this.side)) {
                movements.push(square.position);
            }
        }

        return movements;
    }

}
