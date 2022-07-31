import React from 'react';
import './App.css';
import Board from '../Board/Board';
import BoardUtils from '../Board/BoardUtils';
import AI from '../AI/AI';
import SideWindow from '../SideWindow/SideWindow';
import Description from '../Description/Description';

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
      candidateMoves: [],
      movedPieces: [],
      searchDepth: 4
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

  changeSearchDepth = event => {
    this.setState(prevState => ({
      ...prevState,
      searchDepth: event.target.value
    }));
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
    let movedPieces = this.state.movedPieces;

    for (let i = 0; i < candidateMoves.length; i++) {
      if (index !== candidateMoves[i])
        continue;

      BoardUtils.makeMove(newBoard, selectedIndex, index);
      movedPieces = [selectedIndex, index];

      whiteTurn = !whiteTurn;
      moved = true;
    }

    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      whiteTurn: whiteTurn,
      selectedIndex: -1,
      candidateMoves: [],
      movedPieces: movedPieces
    }), () => {

      this.checkForGameOver(this.state.board);

      if (moved) {
        setTimeout(() => {
          this.moveAI();
        }, 500);
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
    let aiMove;

    if (this.state.searchDepth === "0")
      aiMove = AI.random(newBoard, whiteTurn);
    else
      aiMove = AI.minimaxAB_helper(newBoard, this.state.searchDepth, AI.min, AI.max, whiteTurn);

    console.log(AI.cnt);

    BoardUtils.makeMove(newBoard, aiMove.src, aiMove.dest);
    const movedPieces = [aiMove.src, aiMove.dest];
    
    this.setState(prevState => ({
      ...prevState,
      board: newBoard,
      whiteTurn: !whiteTurn,
      movedPieces: movedPieces
    }), () => {this.checkForGameOver(this.state.board)});
  }

  restartGame = () => {
    this.setState(this.getInitialGameState());
  }

  render() {
    return (
      <div className='App'>
        <div className='LeftScreen'>
          <Board 
            board = {this.state.board}
            candidateMoves = {this.state.candidateMoves}
            onClick = {index => this.handleClick(index)}
            gameOver = {this.state.gameOver}
            whiteTurn = {this.state.whiteTurn}
            underCheck = {BoardUtils.isUnderCheck(this.state.board, this.state.whiteTurn)}
            movedPieces = {this.state.movedPieces}
            restartGame = {this.restartGame}
          />
         </div>

        <div className='RightScreen'>
          <Description />

          <SideWindow
            iterationsNum = {AI.cnt}
            restartGame = {this.restartGame}
            searchDepth = {this.state.searchDepth}
            changeSearchDepth = {this.changeSearchDepth}
          />
        </div>
      </div>
    );
  }
}

export default App;