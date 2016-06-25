class Wall {
    constructor(position) {
        this.position = position;
    }

    match(position) {
        return this.position <= position;
    }
}

export default Wall;
