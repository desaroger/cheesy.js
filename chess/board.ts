import { defaultMatrixString } from "./constants";
import type { Cell } from "./pieces/cell";
import { Empty } from "./pieces/empty";
import type { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";
import type { Position, Side } from "./types";
import { charToCellClass } from "./utils/charToCellClass";

export type Matrix = Array<Array<Cell>>;

export class Board {
    matrix: Matrix;
    starts: Side;

    constructor(matrixString = defaultMatrixString) {
        this.matrix = parseMatrixString(matrixString, this);
        const cornerPiece = this.get([0, 0]);
        if (!cornerPiece || !(cornerPiece instanceof Piece)) {
            throw new Error('wtf');
        }

        this.starts = cornerPiece.side;
    }

    get pieces(): Piece[] {
        return this.matrix.flatMap(row => row).filter(cell => cell.is(Piece)) as Piece[];
    }

    toString(): string {
        return this.toCharsMatrix().map(row => {
            return row.join('');
        }).join('|');
    }

    toCharsMatrix(): string[][] {
        return this.matrix.map(row => {
            return row.map(cell => {
                return cell.toString()
            })
        })
    }

    get(position: Position): Cell | undefined {
        return this.matrixGet(position);
    }

    move(position: Position, target: Position): Cell | undefined {
        const sourcePiece = this.get(position);
        if (!(sourcePiece instanceof Piece)) {
            throw new Error('can not move empty cell')
        }
        sourcePiece.pristine = false
        sourcePiece.position = target;
        this.matrixSet(position, new Empty(this, position));

        return this.matrixSet(target, sourcePiece);
    }

    getRelative(root: Position, position: Position): Cell | undefined {
        position = [position[0] + root[0], position[1] + root[1]];

        return this.get(position);
    }

    size(): [number, number] {
        if (!this.matrix.length) {
            throw new Error('invalid');
        }

        return [this.matrix[0].length, this.matrix.length];
    }

    maximums(): [number, number] {
        const size = this.size();

        return [size[0] - 1, size[1] - 1];
    }

    protected matrixGet(position: Position) {
        const matrixIndexes = this.positionToMatrixIndexes(position);
        return this.matrix[matrixIndexes[0]]?.[matrixIndexes[1]];
    }

    protected matrixSet(position: Position, cell: Cell): Cell | undefined {
        const matrixIndexes = this.positionToMatrixIndexes(position);
        const existingCell = this.matrix[matrixIndexes[0]]?.[matrixIndexes[1]];

        this.matrix[matrixIndexes[0]]![matrixIndexes[1]] = cell;

        return existingCell;
    }

    protected positionToMatrixIndexes(position: Position): Position {
        return [this.maximums()[0] - position[1], position[0]]
    }
}

function parseMatrixString(matrixString: string, board: Board): Matrix {
    const rows = matrixString.split('|');

    return rows.map((row, rowIndex) => {
        return row.split('').map((char, columnIndex) => {
            const x = columnIndex;
            const y = rows.length - rowIndex - 1;
            const side: Side = char.toUpperCase() === char ? 'white' : 'black';

            const CellClass = charToCellClass(char);
            if (CellClass === Empty) {
                return new (CellClass as typeof Empty)(board, [x, y]);
            } else {
                // Using Pawn as a type to let me create the instance
                return new (CellClass as typeof Pawn)(board, [x, y], side);
            }
        })
    });
}
