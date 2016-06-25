import PlayerController from './PlayerController'

class Player
{
    constructor(key) {
        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = 0;
        this.speed = 0.1;
        this.thrusting = false;

        this.contoller = new PlayerController(this, key);
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
        this.speed += 0.01;
    }

    resetSpeed() {
        this.speed = 0.1;
    }

    update(delta) {
        this.position += this.speed * delta;

        return this.position;
    }
}

export default Player;
