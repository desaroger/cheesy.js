import { Board } from "./board";
import { EmptySquareCanNotBeMoved, ItIsNotYourTurn, MovementNotAllowed } from "./errors";
import type { Piece } from "./pieces/piece";
import type { Position, Side } from "./types";
import { includes } from "./utils";

export class Game {
    board: Board = new Board();
    turn: Side = 'white';
    status: 'inProgress' | 'finished' = 'inProgress';
    killed: { [k in Side]: Piece[] } = { 'black': [], 'white': [] };
    winner: Side | null = null;

    move(position: Position, target: Position) {
        if (this.status === 'finished') {
            throw new Error('Game finished')
        }

        const square = this.board.get(position);
        if (!square?.piece) {
            throw new EmptySquareCanNotBeMoved();
        }
        const piece = square.piece;

        if (piece.side !== this.turn) {
            throw new ItIsNotYourTurn();
        }

        const possibleMovements = piece.getPossibleMovements();
        if (!includes(possibleMovements, target)) {
            throw new MovementNotAllowed();
        }
        // TODO check for checkmates

        const killed = this.board.move(position, target);
        if (killed) {
            this.killed[killed.side].push(killed);
        }

        this.turn = this.turn === 'white' ? 'black' : 'white';

        this.checkIfFinished();
    }

    restart() {
        this.board = new Board();
        this.turn = 'white';
        this.status = 'inProgress';
        this.killed = { 'black': [], 'white': [] };
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
