import Piece from "./Piece";

class Rook extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_rook.png`;
        super (alliance, imageUrl);
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

                if (!this.isValidMove(board, candidateMove))
                    break;


                const candidateTile = board[candidateMove].getPiece();

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
        if ((this.isColumnNumberN(1, position) && (moveOffset === -1)) ||
            (this.isColumnNumberN(8, position) && (moveOffset === 1)))
            return true;
        return false;
    }
}

export default Rook;