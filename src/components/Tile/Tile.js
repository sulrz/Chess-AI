import React from "react";
import "./Tile.css"

function Tile(props) {
    let className;
    className = props.coordinate % 2 === 0 ?
        "Tile white" : "Tile black";

    if (props.isCandidate)
        className = "Tile red";

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
