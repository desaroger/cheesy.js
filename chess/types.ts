import type { Piece } from "./pieces/piece";

export type Position = [number, number];

export type Side = 'white' | 'black';

export type Movement = {piece: Piece, source: Position, destination: Position, killed?: Piece};
