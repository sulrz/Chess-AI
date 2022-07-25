import Piece from "./Piece";
import BoardUtils from "../Board/BoardUtils";

class King extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_king.png`;
        super (alliance, imageUrl);
    }

    getMoveOffsets() {
        return [-9, -8, -7, -2, -1, 1, 2, 7, 8, 9];
    }

    getMoves(board, position) {
        const moveOffsets = this.getMoveOffsets();
        const moves = [];

        for (let i = 0; i < moveOffsets.length; i++) {
            const candidateMove = position + moveOffsets[i];

            if (!BoardUtils.isValidMove(candidateMove))
                continue;

            // left castling
            if (moveOffsets[i] === -2) {
                if (this.numberOfMoves > 0 ||
                    board[position - 1] !== null ||
                    board[position - 2] !== null ||
                    board[position - 3] !== null ||
                    board[position - 4] === null ||
                    !board[position - 4].isRook() ||
                    board[position - 4].getAlliance() !== this.getAlliance() ||
                    board[position - 4].numberOfMoves > 0) 
                    continue;

                moves.push(candidateMove);
                continue;
            }
            
            // right castling
            if (moveOffsets[i] === 2) {
                if (this.numberOfMoves > 0 ||
                    board[position + 1] !== null ||
                    board[position + 2] !== null ||
                    board[position + 3] === null ||
                    !board[position + 3].isRook() ||
                    board[position + 3].getAlliance() !== this.getAlliance() ||
                    board[position + 3].numberOfMoves > 0) 
                    continue;

                moves.push(candidateMove);
                continue;
            }

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
        if ((BoardUtils.isColumnNumberN(1, position) && (moveOffset === -9 || moveOffset === -1 || moveOffset === 7)) ||
            (BoardUtils.isColumnNumberN(8, position) && (moveOffset === -7 || moveOffset === 1 || moveOffset === 9)))
            return true;
        return false;
    }

    isKing() {
        return true;
    }
}

export default King;