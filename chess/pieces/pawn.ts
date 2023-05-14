import type { Position } from "../types";
import { Empty } from "./empty";
import { Piece } from "./piece";

export class Pawn extends Piece {

    getPossibleMovements(): Position[] {
        const movements: Position[] = [];
        const blackModifier = this.side === 'black' ? -1 : 1;

        const frontCell = this.board.getRelative(this.position, [0, 1 * blackModifier]);
        if (frontCell && frontCell instanceof Empty) {
            movements.push(frontCell.position);

            if (this.pristine) {
                const frontFrontCell = this.board.getRelative(this.position, [0, 2 * blackModifier]);
                if (frontFrontCell && frontFrontCell instanceof Empty) {
                    movements.push(frontFrontCell.position)
                }
            }
        }

        for (const pos of [[-1, 1 * blackModifier], [1, 1 * blackModifier]] as Position[]) {
            const cell = this.board.getRelative(this.position, pos);
            if (cell && (cell instanceof Piece && cell.side !== this.side)) {
                movements.push(cell.position);
            }
        }

        return movements;
    }

}
