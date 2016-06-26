class Countdown {
    static sequence = ['ready?', 'set', 'go!'];

    constructor(interval, onEnd) {
        this.start = this.start.bind(this);
        this.update = this.update.bind(this);

        this.timer;
        this.sequence;
        this.interval = interval;
        this.onEnd = onEnd;
        this.containers = {
            player1: document.getElementById('player1-countdown'),
            player2: document.getElementById('player2-countdown'),
        };
    }

    start() {
        this.sequence = Countdown.sequence;

        setTimeout(this.onEnd, this.interval * this.sequence.length);
        this.timer = setInterval(this.update, this.interval);
        this.update();
    }

    update() {
        if (this.sequence.length >= 0) {
            let current = this.sequence.shift();

            this.containers.player1.innerText = current;
            this.containers.player2.innerText = current;
        }
    }

    end() {
        clearInterval(this.timer);
        this.onEnd();
    }
}

export default Countdown;
