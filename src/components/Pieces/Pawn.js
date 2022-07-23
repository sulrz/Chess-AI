import Piece from "./Piece";

class Pawn extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_pawn.png`;
        super (alliance, imageUrl);
    }
}

export default Pawn;