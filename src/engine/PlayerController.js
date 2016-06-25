class PlayerController {
    constructor(player, key) {
        this.player = player;
        this.key = key;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.endThrust = this.endThrust.bind(this);
        this.endCooldown = this.endCooldown.bind(this);

        this.timeout = 500;
        this.cooldown = 0;
        this.listening = true;

        document.body.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event) {
        if (this.listening && event.keyCode == this.key) {
            this.listening = false;
            this.player.thrust();
            setTimeout(this.endThrust, this.timeout);
        }
    }

    endThrust() {
        this.player.endThrust();
        setTimeout(this.endCooldown, this.cooldown);
    }

    endCooldown() {
        this.listening = true;
    }
}

export default PlayerController;
