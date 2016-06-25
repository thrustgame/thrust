class Title {
    constructor(thrust) {
        this.thrust = thrust;
        this.onStart = this.onStart.bind(this);
        this.overlay = document.getElementById('title');

        document.body.addEventListener('keydown', this.onStart)
    }

    onStart(event) {
        if (event.keyCode == 32) {
            if (this.thrust.started) {
                this.overlay.style.display = 'block';
                this.thrust.stop();
            } else {
                this.overlay.style.display = 'none';
                this.thrust.start();
            }
        }
    }
}

export default Title;
