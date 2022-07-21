import React from "react";
import './Board.css';
import Tile from "../Tile/Tile";

const rowsAmount = 8;
const columnsAmount = 8;

class Piece {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }
};

// initiating all the pieces
function initPieces() {
    const newPieces = [];
    const imagesPath = "./images/";

    for (let i = 0; i < rowsAmount; i++) {
        if (i != 1 && i != rowsAmount - 2) continue;
        
        let allience = i == 1 ? "b_" : "w_";
        allience = imagesPath + allience;
        for (let j = 0; j < columnsAmount; j++) {
            newPieces.push(new Piece(j, i, allience + "pawn.png"));
        }
    }

    for (let i = 0; i < rowsAmount; i++) {
        if (i != 0 && i != rowsAmount - 1) continue;

        let allience = i == 0 ? "b_" : "w_";
        allience = imagesPath + allience;
        for (let j = 0; j < columnsAmount; j++) {

            switch (j) {
                case 0: case 7:
                    // black rook
                    newPieces.push(new Piece(j, i, allience + "rook.png"));
                    break;

                case 1: case 6:
                    // black knight
                    newPieces.push(new Piece(j, i, allience + "knight.png"));
                    break;

                case 2: case 5:
                    // black bishop
                    newPieces.push(new Piece(j, i, allience + "bishop.png"));
                    break;

                case 3:
                    // black queen
                    newPieces.push(new Piece(j, i, allience + "queen.png"));
                    break;

                case 4:
                    // black king
                    newPieces.push(new Piece(j, i, allience + "king.png"));
                    break;

                default:
                    break;
            }
        }
    }

    return newPieces;
}

function Board() {
    let board = [];

    const [pieces, setPieces] = React.useState(initPieces());

    for (let i = 0; i < rowsAmount; i++) {
        for (let j = 0; j < columnsAmount; j++) {
            const piece = pieces.filter(piece => 
                piece.x === j && piece.y === i
            )[0];
            
            board.push(<Tile coordinate={i+j} image={piece ? piece.image : ""} />);
        }
    }

    return (
        <div className="Board">
            {board}
        </div>
    );
}

export default Board;