import PlayerController from './PlayerController'

class Player {

    static speed = 300;

    constructor(key) {
        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = Player.speed;
        this.speed = Player.speed;
        this.thrusting = false;

        this.controller = new PlayerController(this, key);
    }

    reset() {
        this.position = Player.speed;
        this.speed = Player.speed;
        this.thrusting = false;
    }

    thrust() {
        this.thrusting = true;
    }

    endThrust() {
        this.thrusting = false;
    }

    increaseSpeed() {
        this.speed += Player.speed / 5;
    }

    resetSpeed() {
        this.speed = Player.speed;
    }

    update(delta) {
        this.position = Math.round(this.position + this.speed * delta);

        return this.position;
    }
}

export default Player;
