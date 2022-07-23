import Piece from "./Piece";

class Bishop extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_bishop.png`;
        super (alliance, imageUrl);
    }
}

export default Bishop;