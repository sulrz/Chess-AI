import Bishop from "../Pieces/Bishop";
import King from "../Pieces/King";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";
import Queen from "../Pieces/Queen";
import Rook from "../Pieces/Rook";
import boardData from "./BoardData";

const rowsAmount = boardData.rowsAmount;
const columnsAmount = boardData.columnsAmount;

function BoardInit() {
    const newBoard = Array(64).fill(null);

    for (let i = 0; i < rowsAmount; i++) {
        if (i !== 1 && i !== rowsAmount - 2) continue;

        let allience = i === 1 ? "b" : "w";

        for (let j = 0; j < columnsAmount; j++) {
            newBoard[i*columnsAmount + j] = new Pawn(allience);
        }
    }
    
    for (let i = 0; i < rowsAmount; i++) {
        if (i !== 0 && i !== rowsAmount - 1) continue;

        let allience = i === 0 ? "b" : "w";

        for (let j = 0; j < columnsAmount; j++) {
            switch (j) {
                case 0: case 7:
                    newBoard[i*columnsAmount + j] = new Rook(allience);
                    break;
                case 1: case 6:
                    newBoard[i*columnsAmount + j] = new Knight(allience);
                    break;
                case 2: case 5:
                    newBoard[i*columnsAmount + j] = new Bishop(allience);
                    break;
                case 3:
                    newBoard[i*columnsAmount + j] = new Queen(allience);
                    break;
                case 4:
                    newBoard[i*columnsAmount + j] = new King(allience);
                    break;
                default:
                    break;
            }
        }
    }

    return newBoard;
}

export default BoardInit;