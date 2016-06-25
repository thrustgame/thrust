import PlayerController from './PlayerController'

const speed = 0.2;

class Player
{
    constructor(key) {
        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = 0;
        this.speed = speed;
        this.thrusting = false;

        this.controller = new PlayerController(this, key);
    }

    reset() {
        this.position = 0;
        this.speed = speed;
        this.thrusting = false;
    }

    thrust() {
        console.log('THRUUUUUUST');
        this.thrusting = true;
    }

    endThrust() {
        console.log('End thrust.');
        this.thrusting = false;
    }

    increaseSpeed() {
        this.speed += speed/5;
    }

    resetSpeed() {
        this.speed = speed;
    }

    update(delta) {
        this.position += this.speed * delta;

        return this.position;
    }
}

export default Player;
