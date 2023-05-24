import type { Movement, Position } from "../types";
import { Piece } from "./piece";

export class Pawn extends Piece {
    get pieceName(): string {
        return 'Pawn';
    }

    get pieceAbbr(): string {
        return 'P';
    }

    getPossibleMovements(): Movement[] {
        const movements: Movement[] = [];
        const blackModifier = this.side === 'black' ? -1 : 1;

        const frontSquare = this.board.getRelative(this.position, [0, 1 * blackModifier]);
        if (frontSquare && !frontSquare.piece) {
            movements.push({
                piece: this,
                source: this.position,
                destination: frontSquare.position,
            });

            if (this.pristine) {
                const frontFrontSquare = this.board.getRelative(this.position, [0, 2 * blackModifier]);
                if (frontFrontSquare && !frontFrontSquare.piece) {
                    movements.push({
                        piece: this,
                        source: this.position,
                        destination: frontFrontSquare.position,
                    });
                }
            }
        }

        for (const pos of [[-1, 1 * blackModifier], [1, 1 * blackModifier]] as Position[]) {
            const square = this.board.getRelative(this.position, pos);
            if (!square) {
                continue;
            }
            if (square.piece && square.piece.side !== this.side) {
                movements.push({
                    piece: this,
                    source: this.position,
                    destination: square.position,
                });
            }

            // en passant
            const passantPosition: Position = [pos[0], 0];
            const passantSquare = this.board.getRelative(this.position, passantPosition);
            if (!passantSquare?.piece || !(passantSquare.piece instanceof Pawn)) {
                continue;
            }
            const lastMovement = this.game.lastMovement;
            if (!lastMovement || lastMovement.piece !== passantSquare.piece) {
                continue;
            }
            const displacementY = Math.abs(lastMovement.destination[1] - lastMovement.source[1]);
            if (displacementY === 2) {
                movements.push({
                    piece: this,
                    source: this.position,
                    destination: square.position,
                    killed: passantSquare.piece
                });
            }
        }


        return movements;
    }

}
