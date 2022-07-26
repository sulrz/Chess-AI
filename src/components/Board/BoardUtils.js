import Bishop from "../Pieces/Bishop";
import King from "../Pieces/King";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";
import Queen from "../Pieces/Queen";
import Rook from "../Pieces/Rook";

class BoardUtils {

    static rowsAmount = 8;
    static columnsAmount = 8;

    static initializeBoard() {
        const newBoard = Array(64).fill(null);
        const white = 'w';
        const black = 'b';

        for (let i = 0; i < 8; i++) {
            newBoard[i + 8] = new Pawn(black);
            newBoard[i + 48] = new Pawn(white);
        }

        newBoard[0] = new Rook(black);
        newBoard[1] = new Knight(black);
        newBoard[2] = new Bishop(black);
        newBoard[3] = new Queen(black);
        newBoard[4] = new King(black);
        newBoard[5] = new Bishop(black);
        newBoard[6] = new Knight(black);
        newBoard[7] = new Rook(black);
        
        newBoard[56] = new Rook(white);
        newBoard[57] = new Knight(white);
        newBoard[58] = new Bishop(white);
        newBoard[59] = new Queen(white);
        newBoard[60] = new King(white);
        newBoard[61] = new Bishop(white);
        newBoard[62] = new Knight(white);
        newBoard[63] = new Rook(white);
    
        return newBoard;
    }

    static areKingsAlive(board) {
        let whiteKing = false;
        let blackKing = false;
    
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) continue;

            if (board[i].isWhite() && board[i].isKing())
                whiteKing = true;
            if (board[i].isBlack() && board[i].isKing())
                blackKing = true;
        }

        return whiteKing && blackKing;
    }

    static isValidMove(index) {
        return 0 <= index && index < 64;
    }

    static isColumnNumberN(n, index) {
        return index % 8 === n - 1;
    }

    static isRowNumberN(n, index) {
        return Math.floor(index / 8) === n - 1;
    }

    static copyBoard(board) {
        const newBoard = Array(64).fill(null);

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) continue;

            let clone = Object.assign(Object.create(Object.getPrototypeOf(board[i])), board[i]);
            newBoard[i] = clone;
        }

        return newBoard;
    }

    static getAllMoves(board, whiteTurn) {
        const allMoves = [];

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) continue;

            if ((whiteTurn && board[i].isWhite()) ||
                (!whiteTurn && board[i].isBlack())) {
                board[i].getMoves(board, i).forEach(move => allMoves.push({src: i, dest: move}));
            }
        }

        return allMoves;
    }

    static isUnderCheck(board, whiteTurn) {
        const allMoves = this.getAllMoves(board, !whiteTurn);

        for (let i = 0; i < allMoves.length; i++) {
            if (!board[allMoves[i].dest]) continue;
            if (board[allMoves[i].dest].isKing()) return true;
        }

        return false;
    }

    static getAllLegalMoves(board, whiteTurn) {
        const allMoves = this.getAllMoves(board, whiteTurn);
        const legalMoves = [];

        for (let i = 0; i < allMoves.length; i++) {
            const copyBoard = this.copyBoard(board);

            this.makeMove(copyBoard, allMoves[i].src, allMoves[i].dest);

            if (!this.isUnderCheck(copyBoard, whiteTurn))
                legalMoves.push(allMoves[i]);
        }

        return legalMoves;
    }

    static makeMove(board, src, dest) {
        if (board[src].isKing()) {
            // left castling
            if (dest - src === -2) {
                board[src - 1] = board[src - 4];
                board[src - 1].move();
                board[src - 4] = null;
            }
            // right castling
            else if (dest - src === 2) {
                board[src + 1] = board[src + 3];
                board[src + 1].move();
                board[src + 3] = null;
            }
        }
        else if (board[src].isPawn()) {
            // double moved pawn
            if (Math.abs(src - dest) === 16) {
                board[src].doubleMoved = true;
            }
            
            // en passant
            if (!board[dest]) {
                if (Math.abs(src - dest) === 7) {
                    board[src - board[src].getDirection()] = null;
                }
                else if (Math.abs(src - dest) === 9) {
                    board[src + board[src].getDirection()] = null;
                }
            }

            // pawn promotion
            if ((board[src].isWhite() && this.isRowNumberN(1, dest)) ||
                (board[src].isBlack() && this.isRowNumberN(8, dest))) {
                board[src] = new Queen(board[src].getAlliance());
            }
        }

        board[dest] = board[src];
        board[dest].move();
        board[src] = null;
    }
}

export default BoardUtils;