import React from "react";
import "./Tile.css"

function Tile(props) {
    let className;
    className = props.coordinate % 2 === 0 ?
        "Tile white" : "Tile black";

    return (
        <div className={className} onClick={props.onClick}>
            {
                props.image !== null &&
                <img className="Piece" src={props.image} alt="" />
            }
        </div>
    );
}

export default Tile;
