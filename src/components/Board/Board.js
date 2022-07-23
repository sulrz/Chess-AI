import React from "react";
import './Board.css';
import Tile from "../Tile/Tile";
import boardData from "./BoardData";

const rowsAmount = boardData.rowsAmount;
const columnsAmount = boardData.columnsAmount;

class Board extends React.Component {
    
    createTile(i, j) {
        const index = i*columnsAmount + j;
        const image = this.props.board[index] ?
            this.props.board[index].getImage() : undefined;

        return (
            <Tile
                key = {`${i}, ${j}`}
                coordinate = {i + j}
                image = {image}
                onClick = {() => this.props.onClick(index)}
            />
        );
    }

    createBoard() {
        const board = [];

        for (let i = 0; i < rowsAmount; i++) {
            for (let j = 0; j < columnsAmount; j++) {
                board.push(this.createTile(i, j))
            }
        }

        return board;
    }
    
    render() {
        return (
            <div className="Board">
                {this.createBoard()}
            </div>
        );
    }
}

export default Board;