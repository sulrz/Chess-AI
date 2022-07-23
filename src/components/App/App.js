import React from 'react';
import './App.css';
import Board from '../Board/Board';
import BoardInit from '../Board/BoardInit';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      board: BoardInit(),

    }
  }

  handleClick() {
    
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
