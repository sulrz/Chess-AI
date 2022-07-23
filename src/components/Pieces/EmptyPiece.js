import Piece from "./Piece";

class EmptyPiece extends Piece {
    constructor() {
        super(null, null);
    }

    getPiece() {
        return null;
    }
}

export default EmptyPiece;