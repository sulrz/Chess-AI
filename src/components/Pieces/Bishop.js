import Piece from "./Piece";
import BoardUtils from "../Board/BoardUtils";

class Bishop extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_bishop.png`;
        super (alliance, imageUrl);
    }

    getMoveOffsets() {
        return [-9, -7, 7, 9];
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
        if ((BoardUtils.isColumnNumberN(1, position) && (moveOffset === -9 || moveOffset === 7)) ||
            (BoardUtils.isColumnNumberN(8, position) && (moveOffset === -7 || moveOffset === 9)))
            return true;
        return false;
    }
}

export default Bishop;