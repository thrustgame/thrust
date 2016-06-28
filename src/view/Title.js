import AudioPlayer from '../tool/AudioPlayer.js'
import ReadyCheck from '../view/ReadyCheck.js'
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
        this.offerReset = this.offerReset.bind(this);
        this.reset = this.reset.bind(this);

        this.thrust = thrust;
        this.countdown = new Countdown(400, this.startGame);
        this.readyCheck = new ReadyCheck(this.startCountdown, this.thrust.players);
        this.audioPlayer = new AudioPlayer();
        this.overlays = {
            title: document.getElementById('title'),
            countdown: document.getElementById('countdown'),
            pause: document.getElementById('pause'),
            gameover: document.getElementById('gameover'),
        };

        this.victoryElements = [
            document.getElementById('player1-victory'),
            document.getElementById('player2-victory'),
        ];

        window.addEventListener('keydown', this.onKeyDown);
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

    reset() {
        window.removeEventListener('keydown', this.reset);
        window.removeEventListener('touchstart', this.reset);
        this.readyCheck.reset();
        this.thrust.reset();
        this.setState('title');
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
        const p1percent = Math.floor(players[0].position / distance * 100);
        const p2percent = 100 - p1percent;

        this.victoryElements[0].innerText = p1percent + '%';
        this.victoryElements[1].innerText = p2percent + '%';
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
                setTimeout(this.offerReset, 1000);
                break;
        }
    }

    offerReset() {
        window.addEventListener('keydown', this.reset);
        window.addEventListener('touchstart', this.reset);
    }

    toggleState() {
        switch (this.thrust.state) {
            case 'paused':
                this.thrust.start();
                break;
            case 'playing':
                this.thrust.pause();
                break;
        }

        this.setState(this.thrust.state);
    }
}

export default Title;
