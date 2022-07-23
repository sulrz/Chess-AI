import Piece from "./Piece";

class Queen extends Piece {
    constructor (alliance) {
        let imageUrl = `./images/${alliance}_queen.png`;
        super (alliance, imageUrl);
    }
}

export default Queen;