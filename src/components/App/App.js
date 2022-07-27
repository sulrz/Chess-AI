import React from 'react';
import './App.css';
import Board from '../Board/Board';
import BoardUtils from '../Board/BoardUtils';
import GameOverWindow from '../GameOver/GameOverWindow';
import AI from './AI';

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

  setGameOver() {
    this.setState(prevState => ({
      ...prevState,
      gameOver: true
    }));
  }

  // if either of kings are dead -> game over
  checkForGameOver(board) {
    const legalMoves = BoardUtils.getAllLegalMoves(board, this.state.whiteTurn);

    if (!BoardUtils.areKingsAlive(board) || legalMoves.length === 0) {
      this.setGameOver();
    }
  }

  handleClick(index) {
    if (this.state.gameOver) return;

    const selectedIndex = this.state.selectedIndex;
    const newBoard = BoardUtils.copyBoard(this.state.board);
    let whiteTurn = this.state.whiteTurn;
    const legalMoves = BoardUtils.getAllLegalMoves(newBoard, whiteTurn);

    // if it is a first select click
    if (selectedIndex === -1) {
      if (!newBoard[index]) return;
      if (newBoard[index].isWhite() && !this.state.whiteTurn) return;
      if (newBoard[index].isBlack() &&  this.state.whiteTurn) return;

      const candidateMoves = legalMoves.filter(move => move.src === index).map(move => move.dest);

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
    const candidateMoves = legalMoves.filter(move => move.src === selectedIndex).map(move => move.dest);

    let moved = false;

    for (let i = 0; i < candidateMoves.length; i++) {
      if (index !== candidateMoves[i])
        continue;

      BoardUtils.makeMove(newBoard, selectedIndex, index);

      whiteTurn = !whiteTurn;
      moved = true;
    }

    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      whiteTurn: whiteTurn,
      selectedIndex: -1,
      candidateMoves: []
    }), () => {

      this.checkForGameOver(this.state.board);

      if (moved) {
        setTimeout(() => {
          this.moveAI();
        }, 1);
      }
    });
  }

  moveAI() {
    if (this.state.gameOver) return;

    const newBoard = BoardUtils.copyBoard(this.state.board);
    let whiteTurn = this.state.whiteTurn;

    const legalMoves = BoardUtils.getAllLegalMoves(newBoard, whiteTurn);
    if (legalMoves.length === 0) {
      this.setGameOver();
      return;
    }

    AI.cnt = 0;
    // const aiMove = AI.random(newBoard, whiteTurn);
    // const aiMove = AI.minimax(newBoard, 5, whiteTurn).bestMove;
    // const aiMove = AI.helper(newBoard, 3, AI.min, AI.max, whiteTurn);
    const aiMove = AI.minimaxAB_helper(newBoard, 3, AI.min, AI.max, whiteTurn);
    console.log(AI.cnt);

    BoardUtils.makeMove(newBoard, aiMove.src, aiMove.dest);
    
    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      whiteTurn: !whiteTurn,
    }), () => {this.checkForGameOver(this.state.board)});
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