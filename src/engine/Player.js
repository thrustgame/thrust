import PlayerController from './PlayerController'

const speed = 200;

class Player
{
    constructor(key) {
        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = 0;
        this.speed = speed;
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
        this.speed += speed/5;
    }

    resetSpeed() {
        this.speed = speed;
    }

    update(delta) {
        this.position = Math.round(this.position + this.speed * delta);

        return this.position;
    }
}

export default Player;
