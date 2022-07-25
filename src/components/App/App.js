import React from 'react';
import './App.css';
import Board from '../Board/Board';
import BoardUtils from '../Board/BoardUtils';
import GameOverWindow from '../GameOver/GameOverWindow';

class App extends React.Component {
  constructor() {
    super();

    this.state = this.getInitialGameState();
  }

  getInitialGameState() {
    return {
      board: BoardUtils.initializeBoard(),
      gameOver: false,
      whiteTurn: true,
      selectedIndex: -1,
      candidateMoves: []
    };
  }

  // if either of kings are dead -> game over
  checkKing(board) {
    if (!BoardUtils.areKingsAlive(board)) {
      this.setState(prevState => ({
        ...prevState,
        gameOver: true
      }));
    }
  }

  handleClick(index) {
    if (this.state.gameOver) return;

    const selectedIndex = this.state.selectedIndex;
    const newBoard = BoardUtils.copyBoard(this.state.board);

    // if it is a first select click
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

    // if it is a move click
    const candidateMoves = newBoard[selectedIndex].getMoves(newBoard, selectedIndex);
    let whiteTurn = this.state.whiteTurn;

    for (let i = 0; i < candidateMoves.length; i++) {
      if (index !== candidateMoves[i])
        continue;

      BoardUtils.makeMove(newBoard, selectedIndex, index);

      whiteTurn = !whiteTurn;
      this.checkKing(newBoard);
    }
    

    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      whiteTurn: whiteTurn,
      selectedIndex: -1,
      candidateMoves: []
    }));
  }

  drawGameOverWindow() {
    const winner = this.state.whiteTurn ? "Black" : "White";

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