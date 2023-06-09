import { CanNotMoveOutsideTheBoard, EmptySquareCanNotBeMoved } from "./errors";
import type { Game } from "./game";
import type { Pawn } from "./pieces/pawn";
import type { Piece } from "./pieces/piece";
import type { Position, Side } from "./types";
import { charToPieceClass } from "./utils/charToPieceClass";

export type Matrix = Array<Array<Piece | null>>;
export type Square = {piece: Piece | null, position: Position};

export class Board {
    matrix: Matrix;
    starts: Side;

    constructor(matrixString: string, game: Game) {
        this.matrix = parseMatrixString(matrixString, game);
        if (!this.matrix.length || this.matrix.length !== this.matrix[0].length) {
            throw new Error(`Invalid matrix length ${this.matrix[0]?.length}x${this.matrix.length}`)
        }
        const cornerSquare = this.get([0, 0]);
        if (!cornerSquare?.piece) {
            throw new Error('wtf');
        }

        this.starts = cornerSquare.piece.side;
    }

    get squares(): Square[] {
        return this.matrix.flatMap((row, rowIndex) => {
            return row.map((piece, colIndex) => {
                return {piece, position: [colIndex, this.size - 1 - rowIndex]}
            })
        })
    }

    get pieces(): Piece[] {
        return this.squares.map(square => square.piece).filter((piece): piece is Piece => !!piece);
    }

    get squareMatrix(): Square[][] {
        return this.matrix.map((row, rowIndex) => {
            return row.map((piece, colIndex) => {
                return {piece, position: [colIndex, this.size - 1 - rowIndex]}
            })
        })
    }

    get size(): number {
        return this.matrix.length;
    }

    toChars(): string {
        return this.toCharsMatrix().map(row => {
            return row.join('');
        }).join('|');
    }

    toCharsMatrix(): string[][] {
        return this.matrix.map(row => {
            return row.map(piece => {
                return piece?.pieceChar ?? ' ';
            })
        })
    }

    get(position: Position): Square | null {
        const piece = this.matrixGet(position);
        if (piece === undefined) {
            return null;
        }

        return {piece, position}
    }

    getPiecePosition(piece: Piece): Position {
        const square = this.squares.find(square => square.piece === piece);
        if (!square) {
            throw new Error(`Square not found for piece ${piece}`);
        }

        return square.position;
    }

    move(piece: Piece, target: Position): Piece | null {
        const position = this.getPiecePosition(piece);
        piece.pristine = false
        // piece.position = target;

        this.matrixSet(position, null);

        // We already checked that the target exists.
        return this.matrixSet(target, piece) as Piece | null;
    }

    removePiece(piece: Piece) {
        this.matrix = this.matrix.map(row => {
            return row.map(p => p === piece ? null : p);
        })
    }

    getRelative(root: Position, position: Position): Square | null {
        position = [position[0] + root[0], position[1] + root[1]];

        return this.get(position);
    }

    protected matrixGet(position: Position): Piece | null | undefined {
        const matrixIndexes = this.positionToMatrixIndexes(position);
        return this.matrix[matrixIndexes[0]]?.[matrixIndexes[1]];
    }

    protected matrixSet(position: Position, piece: Piece | null): Piece | null | undefined {
        const matrixIndexes = this.positionToMatrixIndexes(position);
        const existingPiece = this.matrix[matrixIndexes[0]]?.[matrixIndexes[1]];
        if (existingPiece === undefined) {
            return undefined;
        }

        this.matrix[matrixIndexes[0]]![matrixIndexes[1]] = piece;

        return existingPiece;
    }

    protected positionToMatrixIndexes(position: Position): Position {
        return [this.size - 1 - position[1], position[0]]
    }
}

function parseMatrixString(matrixString: string, game: Game): Matrix {
    const rows = matrixString.split('|');

    return rows.map((row, rowIndex) => {
        return row.split('').map((char, columnIndex) => {
            const x = columnIndex;
            const y = rows.length - rowIndex - 1;
            const side: Side = char.toUpperCase() === char ? 'white' : 'black';

            const PieceClass = charToPieceClass(char);
            if (!PieceClass) {
                return null;
            } else {
                // Using Pawn as a type to let me create the instance
                return new (PieceClass as typeof Pawn)(game, side);
            }
        })
    });
}
