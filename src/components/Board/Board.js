import React from "react";
import './Board.css';
import Tile from "../Tile/Tile";
import BoardUtils from "./BoardUtils";

class Board extends React.Component {

    createTile(i, j) {
        const index = i*BoardUtils.columnsAmount + j;
        const image = this.props.board[index] ?
            this.props.board[index].getImage() : undefined;

        const isCandidate = this.props.candidateMoves.includes(i*BoardUtils.columnsAmount + j);

        let canMove = false;
        if (!this.props.gameOver &&
            (this.props.whiteTurn && this.props.board[index]?.isWhite()) ||
            (!this.props.whiteTurn && this.props.board[index]?.isBlack()))
            canMove = true;

        return (
            <Tile
                key = {`${i}, ${j}`}
                coordinate = {i + j}
                image = {image}
                onClick = {() => this.props.onClick(index)}
                isCandidate = {isCandidate}
                canMove = {canMove}
            />
        );
    }

    createBoard() {
        const board = [];

        for (let i = 0; i < BoardUtils.rowsAmount; i++) {
            for (let j = 0; j < BoardUtils.columnsAmount; j++) {
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