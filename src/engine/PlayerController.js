import Player from './Player.js';

class PlayerController {
    constructor(player, key, zone, thrustDuration) {
        this.player = player;
        this.key = key;
        this.zone = zone;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.thrustTimeout = null;
        this.thrustDuration = thrustDuration;
        this.cooldown = 0;
        this.listening = false;

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('touchstart', this.onTouch, false);
    }

    onKeyDown(event) {
        if (event.keyCode == this.key) {
            this.onAction();
        }
    }

    onTouch(event) {
        for (let i = event.changedTouches.length - 1; i >= 0; i--) {
            let touch = event.changedTouches[i].clientY;

            if (touch >= this.zone.start && touch <= this.zone.end) {
                return this.onAction();
            }
        }
    }

    onAction() {
        if (this.listening) {
            this.thrustTimeout = clearTimeout(this.thrustTimeout);
            this.listening = false;
            this.player.thrust();
            setTimeout(this.endThrust, this.thrustDuration / this.player.getSpeedRatio());
        }
    }

    endThrust() {
        this.player.endThrust();
        this.listening = true;
    }
}

export default PlayerController;
