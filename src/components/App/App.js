import React from 'react';
import './App.css';
import Board from '../Board/Board';
import BoardInit from '../Board/BoardInit';
import GameOverWindow from '../GameOver/GameOverWindow';

class App extends React.Component {
  constructor() {
    super();

    this.state = this.getInitialGameState();
  }

  getInitialGameState() {
    return {
      board: BoardInit(),
      gameOver: false,
      whiteTurn: true,
      selectedIndex: -1,
      candidateMoves: [],
      whiteDeadPieces: [],
      blackDeadPieces: []
    };
  }

  checkKing() {
    let whiteKing = false;
    let blackKing = false;

    const board = this.state.board;
    for (let i = 0; i < board.length; i++) {
      if (board[i]?.isWhite() && board[i].isKing())
        whiteKing = true;
      if (board[i]?.isBlack() && board[i].isKing())
        blackKing = true;
    }

    if (!whiteKing || !blackKing) {
      this.setState(prevState => ({
        ...this.state,
        gameOver: true
      }));
    }
  }

  handleClick(index) {
    if (this.state.gameOver) return;

    const selectedIndex = this.state.selectedIndex;
    const newBoard = this.state.board;

    if (selectedIndex === -1) {
      if (!newBoard[index]) return;
      if (newBoard[index].isWhite() && !this.state.whiteTurn) return;
      if (newBoard[index].isBlack() &&  this.state.whiteTurn) return;

      const candidateMoves = newBoard[index].getMoves(newBoard, index);

      if (!candidateMoves.length)
        return;

      this.setState(prevState => ({
        ...prevState,
        board: newBoard,
        selectedIndex: index,
        candidateMoves: candidateMoves
      }));

      return;
    }

    const deadWhites = this.state.whiteDeadPieces;
    const deadBlacks = this.state.blackDeadPieces;

    const candidateMoves = newBoard[selectedIndex].getMoves(newBoard, selectedIndex);
    let whiteTurn = this.state.whiteTurn;

    for (let i = 0; i < candidateMoves.length; i++) {
      if (index !== candidateMoves[i])
        continue;

      if (newBoard[index]) {
        if (newBoard[index].isWhite())
          deadWhites.push(newBoard[index]);
        else
          deadBlacks.push(newBoard[index]);
      }

      newBoard[index] = newBoard[selectedIndex];
      newBoard[index].move();
      newBoard[selectedIndex] = null;

      whiteTurn = !whiteTurn;
    }

    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      whiteTurn: whiteTurn,
      selectedIndex: -1,
      candidateMoves: [],
      whiteDeadPieces: deadWhites,
      blackDeadPieces: deadBlacks
    }));

    this.checkKing();
  }

  drawGameOverWindow() {
    const winner = this.state.whiteTurn ? "White" : "Black";

    return (
      <GameOverWindow 
        winner = {winner}
        onClick = {this.restartGame}
      />
    );
  }

  restartGame = () => {
    this.setState(this.getInitialGameState());
  }

  render() {
    return (
      <div className='App'>
        {this.state.gameOver && this.drawGameOverWindow()}
        <Board 
          board = {this.state.board}
          candidateMoves = {this.state.candidateMoves}
          onClick = {index => this.handleClick(index)}
          gameOver = {this.state.gameOver}
          whiteTurn = {this.state.whiteTurn}
         />
      </div>
    );
  }
}

export default App;
