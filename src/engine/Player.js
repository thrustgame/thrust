import PlayerController from './PlayerController';
import Room from './Room.js';

class Player {

    static speed = 300;
    static speedStep = Player.speed / 5;
    static maxSpeed = Player.speed * 4;

    static thrustDuration = 350;

    constructor(key, zone) {
        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = 0;
        this.speed = Player.speed;
        this.thrusting = false;
        this.ready = false;
        this.thrustTimeout = null;
        this.wallEventListener = null;
        this.controller = new PlayerController(key, zone);

        this.controller.addActionListener(this.thrust);
    }

    reset() {
        clearTimeout(this.thrustTimeout);
        this.position = 0;
        this.speed = Player.speed;
        this.thrusting = false;
        this.ready = false;
    }

    thrust() {
        if (this.ready) {
            clearTimeout(this.thrustTimeout);
            const time = Player.thrustDuration / this.getSpeedRatio();
            this.thrusting = true;
            this.ready = false;
            this.thrustTimeout = setTimeout(this.endThrust, time);
        }
    }

    endThrust() {
        this.thrusting = false;
        this.ready = true;
    }

    increaseSpeed() {
        this.speed = Math.min(this.speed + Player.speedStep, Player.maxSpeed);
        this.ready = true;
    }

    resetSpeed() {
        this.speed = Math.max(this.speed / 2, Player.speed);

        if (this.wallEventListener) {
            this.wallEventListener();
        }
    }

    update(delta) {
        this.position = Math.round(this.position + this.speed * delta);

        return this.position;
    }

    setWallEventListener(callback) {
        this.wallEventListener = callback;
    }

    getSpeedRatio() {
        return this.speed / Player.speed;
    }
}

export default Player;
