import { King } from "../pieces/king";
import { Pawn } from "../pieces/pawn";
import type { Piece } from "../pieces/piece";

export function charToPieceClass(char: string): typeof Piece | null {
    char = char.toLowerCase();
    const mapping: Record<string, typeof Piece | null> = {
        ' ': null,
        'p': Pawn,
        'k': King,
    }

    if (char in mapping) {
        return mapping[char];
    }

    throw new Error(`Piece char '${char}' not supported.`);
}
