import React from "react";
import "./Tile.css"

function Tile(props) {
    let className = "Tile ";
    className += props.coordinate % 2 === 0 ?
        "white " : "black ";

    if (props.isCandidate) {
        className += "path ";
        className += "clickable ";
    }

    if (props.image && props.canMove)
        className += "clickable ";

    if (props.underCheck)
        className += "underCheck ";

    return (
        <div 
            className = {className} 
            onClick = {props.onClick}>
            {
                props.image &&
                <img className="Piece" src={props.image} alt="" />
            }
        </div>
    );
}

export default Tile;
