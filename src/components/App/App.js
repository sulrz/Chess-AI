import React from 'react';
import './App.css';
import Board from '../Board/Board';
import BoardInit from '../Board/BoardInit';
import EmptyPiece from '../Pieces/EmptyPiece';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      board: BoardInit(),
      isChoosing: false,
      whiteDeadPieces: [],
      blackDeadPieces: []
    }
  }

  handleClick(index) {
    if (!this.state.board[index].getPiece()) return;

    const newBoard = [];
    const candidateMoves = this.state.board[index].getMoves(this.state.board, index);
    console.log(this.state.board[index].getMoves(this.state.board, index));

    for (let i = 0; i < this.state.board.length; i++) {
      let isCandidateMove = false;
      for (let j = 0; j < candidateMoves.length; j++) {
        isCandidateMove = i == candidateMoves[j] ? true : isCandidateMove;
      }
      const newPiece = this.state.board[i];
      newPiece.setIsCandidateMove(isCandidateMove);
      newBoard.push(newPiece);
    }

    // newBoard[newBoard[index].getMoves(this.state.board, index)[0]] = this.state.board[index];
    // newBoard[index] = new EmptyPiece();

    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      isChoosing: true
    }));


  }

  render() {
    return (
      <div className='App'>
        <Board 
          board = {this.state.board}
          onClick = {index => this.handleClick(index)}

         />
      </div>
    );
  }
}

export default App;
