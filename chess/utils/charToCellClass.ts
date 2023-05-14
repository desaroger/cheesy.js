import type { Cell } from "../pieces/cell";
import { Empty } from "../pieces/empty";
import { Pawn } from "../pieces/pawn";
import type { Piece } from "../pieces/piece";

// TODO improve types
export function charToCellClass(char: string): typeof Cell | typeof Piece {
    char = char.toLowerCase();
    const mapping: Record<string, typeof Cell | typeof Piece> = {
        ' ': Empty,
        'p': Pawn,
    }

    if (char in mapping) {
        return mapping[char];
    }

    throw new Error(`Character '${char}' not supported.`);
}
