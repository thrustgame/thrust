import AudioPlayer from '../tool/AudioPlayer.js'

class Title {
    constructor(thrust) {
        this.thrust = thrust;
        this.setVictoryMessages = this.setVictoryMessages.bind(this);
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

    setVictoryMessages(players, distance) {
        let p1 = document.getElementById('player1-victory');
        let p2 = document.getElementById('player2-victory');

        let p1percent = Math.floor(players[0].position / distance * 100);
        let p2percent = 100 - p1percent;

        p1.innerText = p1percent + '%';
        p2.innerText = p2percent + '%';

        // console.log(p1, p2);

        // let drawMessage = 'draw :|';
        // let winMessage = 'winner \\o/';
        // let loseMessage = 'loser :(';

        // if (players[0].position == players[1].position) {
        //     console.log('draw');
        //     p1.innerText = drawMessage;
        //     p2.innerText = drawMessage;
        // } else if (players[0].position > players[1].position) {
        //     console.log('p1 wins');
        //     p1.innerText = winMessage;
        //     p2.innerText = loseMessage;
        // } else {
        //     console.log('p2 wins');
        //     p1.innerText = loseMessage;
        //     p2.innerText = winMessage;
        // }
    }

    setState(state) {
        this.overlays.title.style.display = 'none';
        this.overlays.pause.style.display = 'none';
        this.overlays.gameover.style.display = 'none';

        switch (state) {
            case 'paused':
                this.overlays.pause.style.display = 'flex';
                break;
            case 'gameover':
                this.overlays.gameover.style.display = 'flex';
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
