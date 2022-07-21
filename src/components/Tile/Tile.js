import React from "react";
import "./Tile.css"

function Tile(props) {
    let className;
    className = props.coordinate % 2 == 0 ?
        "Tile-white" : "Tile-black";


    return (
        <div className={className}>

        </div>
    );
}

export default Tile;
