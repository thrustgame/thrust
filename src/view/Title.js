import AudioPlayer from '../tool/AudioPlayer.js'

class Title {
    constructor(thrust) {
        this.thrust = thrust;
        this.setState = this.setState.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.overlays = {
            title: document.getElementById('title'),
            pause: document.getElementById('pause'),
            gameover: document.getElementById('gameover')
        };

        this.audioPlayer = new AudioPlayer();

        document.body.addEventListener('keydown', this.onKeyDown)
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 32:
                this.toggleState();
                break;
            case 84:
                this.audioPlayer.toggle();
                break;
        }
    }

    setState(state) {
        this.overlays.title.style.display = 'none';
        this.overlays.pause.style.display = 'none';
        this.overlays.gameover.style.display = 'none';

        switch (state) {
            case 'paused':
                this.overlays.pause.style.display = 'block';
                break;
            case 'gameover':
                this.overlays.gameover.style.display = 'block';
        }
    }

    toggleState() {
        switch (this.thrust.state) {
            case 'title':
            case 'paused':
                this.thrust.start();
                break;
            case 'playing':
                this.thrust.pause();
                break;
            case 'gameover':
                this.thrust.reset();
                this.thrust.start();
        }


        this.setState(this.thrust.state);
    }
}

export default Title;
