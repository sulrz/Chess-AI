import React from "react";

function GameOverWindow(props) {
    return (
        <div className="GameOverWindow">
            <h1>Game Over!</h1>
            <h2>{props.winner} won!</h2>
            <button 
                className="GameOverButton"
                onClick={props.onClick}
            >Play again</button>
        </div>
    );
}

export default GameOverWindow;