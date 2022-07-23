import Piece from "./Piece";

class Knight extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_knight.png`;
        super (alliance, imageUrl);
    }

    getMoveOffsets() {
        return [-17, -15, -10, -6, 6, 10, 15, 17];
    }

    getMoves(board, position) {
        const moveOffsets = this.getMoveOffsets();
        const moves = [];

        for (let i = 0; i < moveOffsets.length; i++) {
            const candidateMove = position + moveOffsets[i];

            if (!this.isValidMove(board, candidateMove))
                continue;

            if (this.isExclusion(position, moveOffsets[i]))
                continue;

            const candidateTile = board[candidateMove].getPiece();

            if (candidateTile === null) {
                moves.push(candidateMove);
                continue;
            }
            
            if (candidateTile.getAlliance() !== this.getAlliance())
                moves.push(candidateMove);
        }

        return moves;
    }

    isExclusion(position, moveOffset) {
        if ((this.isColumnNumberN(1, position) && (moveOffset === -17 || moveOffset === -10 || moveOffset === 6 || moveOffset === 15)) ||
            (this.isColumnNumberN(2, position) && (moveOffset === -10 || moveOffset === 6 )) ||
            (this.isColumnNumberN(7, position) && (moveOffset === -6 || moveOffset === 10)) ||
            (this.isColumnNumberN(8, position) && (moveOffset === -15 || moveOffset === -6 || moveOffset === 10 || moveOffset === 17)))
            return true;
        return false;
    }
}

export default Knight;