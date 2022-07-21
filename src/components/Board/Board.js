import React from "react";
import './Board.css';
import Tile from "../Tile/Tile";

const rowsAmount = 8;
const columnsAmount = 8;

function Board() {
    let board = [];

    for (let i = 0; i < rowsAmount; i++) {
        for (let j = 0; j < columnsAmount; j++) {
            board.push(<Tile coordinate={i+j} />);
        }
    }

    return (
        <div className="Board">
            {board}
        </div>
    );
}

export default Board;