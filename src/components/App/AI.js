import BoardUtils from "../Board/BoardUtils";

class AI {

    static max = 9999999;
    static min = -9999999;
    static cnt = 0;

    static pawnLookupTable = [
        0,  0,  0,  0,  0,  0,  0,  0,
        50, 50, 50, 50, 50, 50, 50, 50,
        10, 10, 20, 30, 30, 20, 10, 10,
        5,  5, 10, 25, 25, 10,  5,  5,
        0,  0,  0, 20, 20,  0,  0,  0,
        5, -5,-10,  0,  0,-10, -5,  5,
        5, 10, 10,-20,-20, 10, 10,  5,
        0,  0,  0,  0,  0,  0,  0,  0
    ];

    static knightLookupTable = [
        -50,-40,-30,-30,-30,-30,-40,-50,
        -40,-20,  0,  0,  0,  0,-20,-40,
        -30,  0, 10, 15, 15, 10,  0,-30,
        -30,  5, 15, 20, 20, 15,  5,-30,
        -30,  0, 15, 20, 20, 15,  0,-30,
        -30,  5, 10, 15, 15, 10,  5,-30,
        -40,-20,  0,  5,  5,  0,-20,-40,
        -50,-40,-30,-30,-30,-30,-40,-50
    ];

    static bishopLookupTable = [
        -20,-10,-10,-10,-10,-10,-10,-20,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  5, 10, 10,  5,  0,-10,
        -10,  5,  5, 10, 10,  5,  5,-10,
        -10,  0, 10, 10, 10, 10,  0,-10,
        -10, 10, 10, 10, 10, 10, 10,-10,
        -10,  5,  0,  0,  0,  0,  5,-10,
        -20,-10,-10,-10,-10,-10,-10,-20
    ];

    static rookLookupTable = [
        0,  0,  0,  0,  0,  0,  0,  0,
        5, 10, 10, 10, 10, 10, 10,  5,
       -5,  0,  0,  0,  0,  0,  0, -5,
       -5,  0,  0,  0,  0,  0,  0, -5,
       -5,  0,  0,  0,  0,  0,  0, -5,
       -5,  0,  0,  0,  0,  0,  0, -5,
       -5,  0,  0,  0,  0,  0,  0, -5,
        0,  0,  0,  5,  5,  0,  0,  0
    ];

    static queenLookupTable = [
        -20,-10,-10, -5, -5,-10,-10,-20,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  5,  5,  5,  5,  0,-10,
        -5,  0,  5,  5,  5,  5,  0, -5,
        0,  0,  5,  5,  5,  5,  0, -5,
        -10,  5,  5,  5,  5,  5,  0,-10,
        -10,  0,  5,  0,  0,  0,  0,-10,
        -20,-10,-10, -5, -5,-10,-10,-20
    ];

    static kingLookupTable = [
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -20,-30,-30,-40,-40,-30,-30,-20,
        -10,-20,-20,-20,-20,-20,-20,-10,
        20, 20,  0,  0,  0,  0, 20, 20,
        20, 30, 10,  0,  0, 10, 30, 20
    ];

    static random(board, isWhiteTurn) {
        const legalMoves = BoardUtils.getAllLegalMoves(board, isWhiteTurn);
        const randomMoveIndex = Math.floor(Math.random() * legalMoves.length);

        return legalMoves[randomMoveIndex];
    }

    static minimax(board, depth, isWhiteTurn) {
        if (depth === 0) {
            this.cnt++;
            return this.evaluate(board);
        }
        
        let bestScore = isWhiteTurn ? this.min : this.max;

        const allMoves = BoardUtils.getAllLegalMoves(board, isWhiteTurn);
        for (let i = 0; i < allMoves.length; i++) {
            const newBoard = BoardUtils.copyBoard(board);
            BoardUtils.makeMove(newBoard, allMoves[i].src, allMoves[i].dest);
            let score = this.minimax(newBoard, depth - 1, !isWhiteTurn);

            if (isWhiteTurn) {
                bestScore = Math.max(bestScore, score);
            }
            else {
                bestScore = Math.min(bestScore, score);
            }
        }

        return bestScore;
    }

    static minimaxAB_helper(board, depth, alpha, beta, isWhiteTurn) {
        let bestScore = isWhiteTurn ? this.min : this.max;
        let bestMove = this.random(board, isWhiteTurn);
        
        const allMoves = BoardUtils.getAllMoves(board, isWhiteTurn);
        // const allMoves = BoardUtils.getAllLegalMoves(board, isWhiteTurn);
        for (let i = 0; i < allMoves.length; i++) {
            const newBoard = BoardUtils.copyBoard(board);
            BoardUtils.makeMove(newBoard, allMoves[i].src, allMoves[i].dest);
            
            let score = this.minimaxAB(newBoard, depth - 1, alpha, beta, !isWhiteTurn);
            if (score <= bestScore) {
                bestScore = score;
                bestMove = allMoves[i];
            }
        }

        return bestMove;
    }

    static minimaxAB(board, depth, alpha, beta, isWhiteTurn) {
        if (depth === 0) {
            this.cnt++;
            return this.evaluate(board);
        }
        
        let bestScore = isWhiteTurn ? this.min : this.max;

        const allMoves = BoardUtils.getAllMoves(board, isWhiteTurn);
        // const allMoves = BoardUtils.getAllLegalMoves(board, isWhiteTurn);
        for (let i = 0; i < allMoves.length; i++) {
            const newBoard = BoardUtils.copyBoard(board);
            BoardUtils.makeMove(newBoard, allMoves[i].src, allMoves[i].dest);
            let score = this.minimaxAB(newBoard, depth - 1, alpha, beta, !isWhiteTurn);

            if (isWhiteTurn) {
                bestScore = Math.max(bestScore, score);
                
                alpha = Math.max(alpha, bestScore);

                if (bestScore >= beta) return bestScore;
            }
            else {
                bestScore = Math.min(bestScore, score);
                
                beta = Math.min(beta, bestScore);

                if (bestScore <= alpha) return bestScore;
            }
        }

        return bestScore;
    }

    static evaluate(board) {
        let valueOfBoard = 0;

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) continue;

            let value = board[i].value;

            const index = board[i].isWhite() ? i : board.length - i - 1;

            if (board[i].isPawn()) value += this.pawnLookupTable[index];
            else if (board[i].isKnight()) value += this.knightLookupTable[index];
            else if (board[i].isBishop()) value += this.bishopLookupTable[index];
            else if (board[i].isRook()) value += this.rookLookupTable[index];
            else if (board[i].isQueen()) value += this.queenLookupTable[index];
            else if (board[i].isKing()) value += this.kingLookupTable[index];

            valueOfBoard += board[i].isWhite() ? value : -value;
        }

        return valueOfBoard;
    }
}

export default AI;