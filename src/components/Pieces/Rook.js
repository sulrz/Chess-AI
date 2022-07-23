import Piece from "./Piece";

class Rook extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_rook.png`;
        super (alliance, imageUrl);
    }
}

export default Rook;