import Piece from "./Piece";

class King extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_king.png`;
        super (alliance, imageUrl);
    }
}

export default King;