import Piece from "./Piece";

class Pawn extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_pawn.png`;
        super (alliance, imageUrl);
    }

    getMoveOffsets() {
        return [8, 16, 7, 9].map(offset => this.getDirection() * offset);
    }

    getMoves(board, position) {
        const moveOffsets = this.getMoveOffsets();
        const moves = [];

        for (let i = 0; i < moveOffsets.length; i++) {
            const candidateMove = position + moveOffsets[i];

            if (!this.isValidMove(board, candidateMove))
                continue;

            const candidateTile = board[candidateMove].getPiece();

            if (Math.abs(moveOffsets[i]) === 8 && candidateTile === null) {
                moves.push(candidateMove);
                continue;
            }
            
            if (Math.abs(moveOffsets[i]) === 16 && this.firstMove) {
                const beforeCandidateTileCoord = position + (this.getDirection() * 8);
                const beforeCandidateTile = board[beforeCandidateTileCoord].getPiece();
                if (beforeCandidateTile === null &&
                    candidateTile === null) {

                    moves.push(candidateMove);
                }
                continue;
            }

            if (Math.abs(moveOffsets[i]) === 7 && 
                !((this.isColumnNumberN(1, position) && this.isBlack()) ||
                 (this.isColumnNumberN(8, position) && this.isWhite()))) {
                
                if (candidateTile !== null && 
                    candidateTile.getAlliance() !== this.getAlliance()) {

                    moves.push(candidateMove);
                }
                
                continue;
            }

            if (Math.abs(moveOffsets[i]) === 9 &&
                !((this.isColumnNumberN(1, position) && this.isWhite()) ||
                 (this.isColumnNumberN(8, position) && this.isBlack()))) {

                if (candidateTile !== null && 
                    candidateTile.getAlliance() !== this.getAlliance()) {

                    moves.push(candidateMove);
                }
                
                continue;
            }
        }

        return moves;
    }
}

export default Pawn;