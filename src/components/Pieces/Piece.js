class Piece {
    constructor (alliance, imageUrl, value) {
        this.alliance = alliance;
        this.imageUrl = imageUrl;
        this.numberOfMoves = 0;
        this.value = value;
    }

    getAlliance() {
        return this.alliance;
    }

    getImage() {
        return this.imageUrl;
    }

    getMoves(board, position) {
        return [];
    }
    
    isWhite() {
        return this.alliance === "w";
    }

    isBlack() {
        return this.alliance === "b";
    }

    getDirection() {
        return this.isWhite() ? -1 : 1;
    }

    move() {
        this.numberOfMoves++;
    }

    isPawn() {
        return false;
    }

    isKnight() {
        return false;
    }

    isBishop() {
        return false;
    }

    isRook() {
        return false;
    }

    isQueen() {
        return false;
    }

    isKing() {
        return false;
    }
}

export default Piece;