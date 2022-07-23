import Piece from "./Piece";

class Knight extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_knight.png`;
        super (alliance, imageUrl);
    }
}

export default Knight;