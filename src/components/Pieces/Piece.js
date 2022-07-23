class Piece {
    constructor (alliance, imageUrl) {
        this.alliance = alliance;
        this.imageUrl = imageUrl;
    }

    getAllience() {
        return this.alliance;
    }

    getImage() {
        return this.imageUrl;
    }
}

export default Piece;