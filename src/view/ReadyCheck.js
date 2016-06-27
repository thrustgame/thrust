class ReadyCheck {
    constructor(onReady, players) {
        this.onReady = onReady;
        this.players = players;
        this.states = [];
        this.elements = [
            document.getElementById('player1-ready'),
            document.getElementById('player2-ready'),
        ];

        this.onPlayerOneReady = this.onPlayerOneReady.bind(this);
        this.onPlayerTwoReady = this.onPlayerTwoReady.bind(this);
        this.reset();
    }

    reset() {
        this.states = [false, false];
        this.elements[0].style.display = 'block';
        this.elements[1].style.display = 'block';
        this.players[0].controller.addActionListener(this.onPlayerOneReady);
        this.players[1].controller.addActionListener(this.onPlayerTwoReady);
    }

    onPlayerOneReady() {
        this.setReady(0);
    }

    onPlayerTwoReady() {
        this.setReady(1);
    }

    setReady(index) {
        this.states[index] = true;
        this.elements[index].style.display = 'none';

        if (this.states[0] && this.states[1]) {
            this.players[0].controller.removeActionListener(this.onPlayerOneReady);
            this.players[1].controller.removeActionListener(this.onPlayerTwoReady);
            this.onReady();
        }
    }
}

export default ReadyCheck;
