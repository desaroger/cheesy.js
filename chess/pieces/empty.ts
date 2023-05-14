import { Cell } from "./cell";

export class Empty extends Cell {

    isEmpty() {
        return true;
    }

    toString(): string {
        return ' ';
    }

}
