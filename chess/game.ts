import { Board } from "./board";
import { defaultMatrixString } from "./constants";
import { EmptySquareCanNotBeMoved, ItIsNotYourTurn, MovementNotAllowed } from "./errors";
import { King } from "./pieces/king";
import type { Piece } from "./pieces/piece";
import type { Movement, Position, Side } from "./types";
import { equals } from "./utils";

export class Game {
    board: Board;
    turn: Side = 'white';
    status: 'inProgress' | 'finished' = 'inProgress';
    killed: { [k in Side]: Piece[] } = { 'black': [], 'white': [] };
    winner: Side | null = null;
    movements: Movement[] = [];
    
    constructor(protected matrixString: string = defaultMatrixString) {
        this.board = new Board(matrixString, this);
    }

    move(piece: Piece, destination: Position) {
        if (this.status === 'finished') {
            throw new Error('Game finished')
        }

        if (piece.side !== this.turn) {
            throw new ItIsNotYourTurn();
        }

        const possibleMovements = this.getPossibleMovements(piece);
        const movement = possibleMovements.find(m => equals(m.destination, destination));
        if (!movement) {
            throw new MovementNotAllowed();
        }
        // TODO check for checkmates

        let killed = this.board.move(piece, movement.destination);
        killed ??= movement.killed ?? null;
        if (killed) {
            this.killed[killed.side].push(killed);
            this.board.removePiece(killed);
        }

        this.movements.push(movement);

        this.turn = this.turn === 'white' ? 'black' : 'white';

        this.checkIfFinished();
    }

    getPossibleMovements(piece: Piece) {
        const possibleMovements = piece.getPossibleMovements();

        return possibleMovements.filter(movement => {
            const destinationSquare = this.board.get(movement.destination);
            if (!destinationSquare) {
                return false;
            }

            if (destinationSquare.piece instanceof King) {
                return false;
            }
            


            return true;
        })
    }

    restart() {
        this.board = new Board(this.matrixString, this);
        this.turn = 'white';
        this.status = 'inProgress';
        this.killed = { black: [], white: [] };
        this.movements = [];
    }

    get lastMovement() {
        return this.movements[this.movements.length - 1];
    }

    protected checkIfFinished() {
        const piecesThisTurn = this.board.pieces.filter(piece => piece.side === this.turn);

        const finished = !piecesThisTurn.length || !this.board.pieces.length || piecesThisTurn.every(piece => {
            return piece.getPossibleMovements().length === 0;
        })

        if (finished) {
            this.status = 'finished';

            const whitePieces = this.board.pieces.filter(piece => piece.side === 'white');
            const blackPieces = this.board.pieces.filter(piece => piece.side === 'black');
            if (whitePieces.length > blackPieces.length) {
                this.winner = 'white';
            } else if (blackPieces.length > whitePieces.length) {
                this.winner = 'black';
            }
        }
    }

}
