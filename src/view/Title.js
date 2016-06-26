import AudioPlayer from '../tool/AudioPlayer.js'
import ReadyCheck from '../engine/ReadyCheck.js'
import Countdown from '../tool/Countdown.js'

class Title {
    constructor(thrust) {
        // Methods bindings
        this.setVictoryMessages = this.setVictoryMessages.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setState = this.setState.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.startCountdown = this.startCountdown.bind(this);

        this.thrust = thrust;
        this.countdown = new Countdown(400, this.startGame);
        this.readyCheck = new ReadyCheck(this.startCountdown);

        this.overlays = {
            title: document.getElementById('title'),
            countdown: document.getElementById('countdown'),
            pause: document.getElementById('pause'),
            gameover: document.getElementById('gameover'),
        };

        this.audioPlayer = new AudioPlayer();

        document.body.addEventListener('keydown', this.onKeyDown)
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case this.thrust.players[0].controller.key:
                if (this.thrust.state == 'title') {
                    this.readyCheck.setReady(0);
                    document.getElementById('player1-ready').classList.remove('blink');
                }
                break;
            case this.thrust.players[1].controller.key:
                if (this.thrust.state == 'title') {
                    this.readyCheck.setReady(1);
                    document.getElementById('player2-ready').classList.remove('blink');
                }
                break;
            case 32:
                this.toggleState();
                break;
            case 84:
                this.audioPlayer.toggle();
                break;
        }
    }

    startCountdown() {
        this.setState('countdown');
        this.countdown.start();
    }

    startGame() {
        this.thrust.start();
        this.setState(this.thrust.state);
    }

    setVictoryMessages(players, distance) {
        let p1 = document.getElementById('player1-victory');
        let p2 = document.getElementById('player2-victory');

        let p1percent = Math.floor(players[0].position / distance * 100);
        let p2percent = 100 - p1percent;

        p1.innerText = p1percent + '%';
        p2.innerText = p2percent + '%';
    }

    setState(state) {
        this.overlays.title.style.display = 'none';
        this.overlays.countdown.style.display = 'none';
        this.overlays.pause.style.display = 'none';
        this.overlays.gameover.style.display = 'none';

        switch (state) {
            case 'title':
                this.overlays.title.style.display = 'flex';
                break;
            case 'countdown':
                this.overlays.countdown.style.display = 'flex';
                break;
            case 'paused':
                this.overlays.pause.style.display = 'flex';
                break;
            case 'gameover':
                this.overlays.gameover.style.display = 'flex';
                break;
        }
    }

    toggleState() {
        switch (this.thrust.state) {
            case 'paused':
                this.thrust.start();
                break;
            case 'playing':
                this.thrust.pause();
                break;
            case 'gameover':
                this.thrust.reset();
                this.thrust.start();
                break;
        }

        this.setState(this.thrust.state);
    }
}

export default Title;
