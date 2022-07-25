import Piece from "./Piece";

class King extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_king.png`;
        super (alliance, imageUrl);
    }

    getMoveOffsets() {
        return [-9, -8, -7, -1, 1, 7, 8, 9];
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

            const candidateTile = board[candidateMove];

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
        if ((this.isColumnNumberN(1, position) && (moveOffset === -9 || moveOffset === -1 || moveOffset === 7)) ||
            (this.isColumnNumberN(8, position) && (moveOffset === -7 || moveOffset === 1 || moveOffset === 9)))
            return true;
        return false;
    }

    isKing() {
        return true;
    }
}

export default King;