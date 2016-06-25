class Wall {
    constructor(position, thickness = 0.01) {
        this.position = position;
        this.zone = position - thickness;
        this.done = false;
    }

    match(position) {
        return this.position >= position
            && this.zone <= position;
    }

    pass() {
        this.done = true;
    }
}

export default Wall;
