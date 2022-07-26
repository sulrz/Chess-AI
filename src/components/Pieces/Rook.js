import Piece from "./Piece";
import BoardUtils from "../Board/BoardUtils";

class Rook extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_rook.png`;

        const value = 500;

        super (alliance, imageUrl, value);
    }

    getMoveOffsets() {
        return [-8, -1, 1, 8];
    }

    getMoves(board, position) {
        const moveOffsets = this.getMoveOffsets();
        const moves = [];

        for (let i = 0; i < moveOffsets.length; i++) {
            let candidateMove = position;

            while (true) {
                if (this.isExclusion(candidateMove, moveOffsets[i]))
                    break;

                candidateMove += moveOffsets[i];

                if (!BoardUtils.isValidMove(candidateMove))
                    break;


                const candidateTile = board[candidateMove];

                if (candidateTile !== null) {
                    if (candidateTile.getAlliance() !== this.getAlliance())
                        moves.push(candidateMove);

                    break;
                }

                moves.push(candidateMove);
            }
        }

        return moves;
    }

    isExclusion(position, moveOffset) {
        if ((BoardUtils.isColumnNumberN(1, position) && (moveOffset === -1)) ||
            (BoardUtils.isColumnNumberN(8, position) && (moveOffset === 1)))
            return true;
        return false;
    }

    isRook() {
        return true;
    }
}

export default Rook;