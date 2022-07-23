import React from "react";
import './Board.css';
import Tile from "../Tile/Tile";

const rowsAmount = 8;
const columnsAmount = 8;

class Piece {
    constructor(x, y, allience, pieceName) {
        this.x = x;
        this.y = y;
        this.allience = allience;
        this.pieceName = pieceName;

        const imagesPath = "./images/";
        this.image = `${imagesPath}${allience}_${pieceName}.png`;
    }
};

// initiating all the pieces
function initPieces() {
    const newPieces = [];

    for (let y = 0; y < rowsAmount; y++) {
        if (y !== 1 && y !== rowsAmount - 2) continue;
        
        let allience = y === 1 ? "b" : "w";
        let pieceName = "pawn";

        for (let x = 0; x < columnsAmount; x++) {
            newPieces.push(new Piece(x, y, allience, pieceName));
        }
    }

    for (let y = 0; y < rowsAmount; y++) {
        if (y !== 0 && y !== rowsAmount - 1) continue;

        let allience = y === 0 ? "b" : "w";
        let pieceName;
        
        for (let x = 0; x < columnsAmount; x++) {
            switch (x) {
                case 0: case 7:
                    pieceName = "rook";
                    break;
                case 1: case 6:
                    pieceName = "knight";
                    break;
                case 2: case 5:
                    pieceName = "bishop";
                    break;
                case 3:
                    pieceName = "queen";
                    break;
                case 4:
                    pieceName = "king";
                    break;
                default:
                    break;
            }
            newPieces.push(new Piece(x, y, allience, pieceName));
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