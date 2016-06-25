class Player
{
    constructor() {
        this.position = 0;
        this.speed = 1;
    }

    update(delta) {
        this.position += this.speed * delta;

        return this.position;
    }
}

export default Player;
