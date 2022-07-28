import React from "react";
import './GameOverWindow.css'

function GameOverWindow(props) {
    return (
        <div className="GameOverWindow">
            <h1>Game Over!</h1>
            <h2>{props.winner} won!</h2>
            <button 
                className="GameOverButton"
                onClick={props.restartGame}
            >Play again</button>
        </div>
    );
}

export default GameOverWindow;