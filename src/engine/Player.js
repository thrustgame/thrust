import PlayerController from './PlayerController'

class Player
{
    constructor(key) {
        this.position = 0;
        this.speed = 1;
        this.thrusting = false;

        this.contoller = new PlayerController(this, key)
    }

    thrust() {
        console.log('THRUUUUUUST');
        this.thrusting = true;
    }

    endThrust() {
        console.log('End thrust.');
        this.thrusting = false;
    }

    update(delta) {
        this.position += this.speed * delta;

        return this.position;
    }
}

export default Player;
