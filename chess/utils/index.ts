
import type { Position } from "../types";

export function relativePos(root: Position, pos: Position): Position {
    return [root[0] + pos[0], root[1] + pos[1]]
}

export function equals(a: Position, b: Position) {
    return a[0] === b[0] && a[1] === b[1];
}

export function includes(positions: Position[], position: Position) {
    return positions.some(p => equals(p, position));
}
