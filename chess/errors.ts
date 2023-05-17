
export class MovementNotAllowed extends Error {
    constructor(msg = 'movement not allowed') {
        super(msg)
    }
}

export class EmptySquareCanNotBeMoved extends MovementNotAllowed {
    constructor() {
        super('empty square can not be moved')
    }
}

export class CanNotMoveOutsideTheBoard extends MovementNotAllowed {
    constructor() {
        super('can not move outside the board')
    }
}

export class ItIsNotYourTurn extends MovementNotAllowed {
    constructor() {
        super('it is not your turn')
    }
}

