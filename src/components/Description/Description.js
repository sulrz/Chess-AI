import React from "react";
import './Description.css'

function Description() {
    return (
        <div className="Description">
            <h1>CHESS AI</h1>
            <h2>The AI was implemented using <a href="https://en.wikipedia.org/wiki/Minimax" target="_blank">Minimax algorithm</a> with <a href="https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning" target="_blank">Alpha-Beta (α-β) Pruning</a> optimization</h2>
        </div>
    );
}

export default Description;