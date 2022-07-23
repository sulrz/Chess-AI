class Piece {
    constructor (alliance, imageUrl) {
        this.alliance = alliance;
        this.imageUrl = imageUrl;
        this.isCandidate = false;
        this.firstMove = true;
    }

    setIsCandidateMove(isCandidateMove) {
        this.isCandidate = isCandidateMove;
    }

    getPiece() {
        return this;
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

    isValidMove(board, index) {
        if (index < 0 || index >= board.length)
            return false;
        return true;
    }

    isColumnNumberN(n, index) {
        return index % 8 === n - 1;
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
        this.firstMove = false;
    }
}

export default Piece;