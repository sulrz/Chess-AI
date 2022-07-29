import React from "react";
import './SideWindow.css'

function SideWindow(props) {
    return (
        <div className="SideWindow">
            <div className="SideWindow-Block">
                <h3 className="SideWindow-Header">Select the Minimax algorithm search depth:</h3>
                <select 
                    label="search-depth" 
                    className="SideWindow-SearchDepth"
                    value={props.searchDepth}
                    onChange={props.changeSearchDepth}
                >
                    <option value={0}>0 (random)</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>

            <h3 className="SideWindow-Header">Iterations performed: {props.iterationsNum}</h3>

            {/* <div className="SideWindow-Block">
                <h3 className="SideWindow-Header">Select the color:</h3>

                <div className="SideWindow-Radio">
                    <input type="radio" name="color" id="white" />
                    <label for="white">White</label>
                </div>

                <div className="SideWindow-Radio">
                    <input type="radio" name="color" id="black" />
                    <label for="black">Black</label>
                </div>
            </div> */}

            <button 
                className="SideWindow-RestartButton"
                onClick={props.restartGame}            
            >Restart game</button>
        </div>
    );
}

export default SideWindow;