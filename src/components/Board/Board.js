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

    for (let y = 0; y < rowsAmount; y++) {
        if (y !== 1 && y !== rowsAmount - 2) continue;
        
        let allience = y === 1 ? "b_" : "w_";
        allience = imagesPath + allience;
        for (let x = 0; x < columnsAmount; x++) {
            newPieces.push(new Piece(x, y, allience + "pawn.png"));
        }
    }

    for (let y = 0; y < rowsAmount; y++) {
        if (y !== 0 && y !== rowsAmount - 1) continue;

        let allience = y === 0 ? "b_" : "w_";
        allience = imagesPath + allience;
        for (let x = 0; x < columnsAmount; x++) {

            switch (x) {
                case 0: case 7:
                    // black rook
                    newPieces.push(new Piece(x, y, allience + "rook.png"));
                    break;

                case 1: case 6:
                    // black knight
                    newPieces.push(new Piece(x, y, allience + "knight.png"));
                    break;

                case 2: case 5:
                    // black bishop
                    newPieces.push(new Piece(x, y, allience + "bishop.png"));
                    break;

                case 3:
                    // black queen
                    newPieces.push(new Piece(x, y, allience + "queen.png"));
                    break;

                case 4:
                    // black king
                    newPieces.push(new Piece(x, y, allience + "king.png"));
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

    function onclick(x, y) {
        setPieces(prevState => prevState.map(piece => {
            if (x === piece.x && y === piece.y) {
                piece.y++;
                return piece;
            }
            return piece;
        }));
    }

    for (let y = 0; y < rowsAmount; y++) {
        for (let x = 0; x < columnsAmount; x++) {
            const piece = pieces.filter(piece => 
                piece.x === x && piece.y === y
            )[0];
            
            board.push(<Tile coordinate={y+x} image={piece ? piece.image : null} onClick={() => onclick(x, y)}/>);
        }
    }

    return (
        <div className="Board">
            {board}
        </div>
    );
}

export default Board;