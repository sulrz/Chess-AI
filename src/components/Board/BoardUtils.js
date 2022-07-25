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

        newBoard[0] = new Rook('b');
        newBoard[1] = new Knight('b');
        newBoard[2] = new Bishop('b');
        newBoard[3] = new Queen('b');
        newBoard[4] = new King('b');
        newBoard[5] = new Bishop('b');
        newBoard[6] = new Knight('b');
        newBoard[7] = new Rook('b');
        
        newBoard[56] = new Rook('w');
        newBoard[57] = new Knight('w');
        newBoard[58] = new Bishop('w');
        newBoard[59] = new Queen('w');
        newBoard[60] = new King('w');
        newBoard[61] = new Bishop('w');
        newBoard[62] = new Knight('w');
        newBoard[63] = new Rook('w');
    
        return newBoard;
    }

    static areKingsAlive(board) {
        let whiteKing = false;
        let blackKing = false;
    
        for (let i = 0; i < board.length; i++) {
          if (board[i]?.isWhite() && board[i].isKing())
            whiteKing = true;
          if (board[i]?.isBlack() && board[i].isKing())
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

}

export default BoardUtils;