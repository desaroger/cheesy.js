import type { Movement, Position } from "../types";
import { Piece } from "./piece";

export class King extends Piece {
    get pieceName(): string {
        return 'King';
    }

    get pieceAbbr(): string {
        return 'K';
    }

    getPossibleMovements(): Movement[] {
        const position = this.board.getPiecePosition(this);
        const movements: Movement[] = [];
        const positions: Position[] = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

        for (const pos of positions) {
            const square = this.board.getRelative(position, pos);
            if (!square) {
                continue;
            }

            if (!square.piece || square.piece.side !== this.side) {
                movements.push({
                    piece: this,
                    source: position,
                    destination: square.position,
                });
            }
        }

        return movements;
    }

}
