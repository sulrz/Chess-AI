import Piece from "./Piece";
import BoardUtils from "../Board/BoardUtils";

class Pawn extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_pawn.png`;

        const value = 100;

        super (alliance, imageUrl, value);

        this.doubleMoved = false;
    }

    getMoveOffsets() {
        return [8, 16, 7, 9].map(offset => this.getDirection() * offset);
    }

    getMoves(board, position) {
        const moveOffsets = this.getMoveOffsets();
        const moves = [];

        for (let i = 0; i < moveOffsets.length; i++) {
            const candidateMove = position + moveOffsets[i];

            if (!BoardUtils.isValidMove(candidateMove))
                continue;

            const candidateTile = board[candidateMove];

            if (Math.abs(moveOffsets[i]) === 8 && candidateTile === null) {
                moves.push(candidateMove);
                continue;
            }
            
            if (Math.abs(moveOffsets[i]) === 16 && this.numberOfMoves === 0) {
                const beforeCandidateTileCoord = position + (this.getDirection() * 8);
                const beforeCandidateTile = board[beforeCandidateTileCoord];
                if (beforeCandidateTile === null &&
                    candidateTile === null) {

                    moves.push(candidateMove);
                }
                continue;
            }

            if (Math.abs(moveOffsets[i]) === 7 && 
                !((BoardUtils.isColumnNumberN(1, position) && this.isBlack()) ||
                 (BoardUtils.isColumnNumberN(8, position) && this.isWhite()))) {

                // en passant
                if (candidateTile === null) {
                    if (board[position - this.getDirection()] === null ||
                        board[position - this.getDirection()].getAlliance() === this.getAlliance() ||
                        board[position - this.getDirection()].numberOfMoves > 1 ||
                        !board[position - this.getDirection()].doubleMoved) continue;

                    moves.push(candidateMove);
                    continue;
                }

                if (candidateTile !== null && 
                    candidateTile.getAlliance() !== this.getAlliance()) {

                    moves.push(candidateMove);
                    continue;
                }
                
                continue;
            }

            if (Math.abs(moveOffsets[i]) === 9 &&
                !((BoardUtils.isColumnNumberN(1, position) && this.isWhite()) ||
                 (BoardUtils.isColumnNumberN(8, position) && this.isBlack()))) {
                     
                // en passant
                if (candidateTile === null) {
                    if (board[position + this.getDirection()] === null ||
                        board[position + this.getDirection()].getAlliance() === this.getAlliance() ||
                        board[position + this.getDirection()].numberOfMoves > 1 ||
                        !board[position + this.getDirection()].doubleMoved) continue;

                    moves.push(candidateMove);
                    continue;
                }

                if (candidateTile !== null && 
                    candidateTile.getAlliance() !== this.getAlliance()) {

                    moves.push(candidateMove);
                    continue;
                }
                
                continue;
            }
        }

        return moves;
    }

    isPawn() {
        return true;
    }
}

export default Pawn;