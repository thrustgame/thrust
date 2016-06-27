class Countdown {
    static sequence = ['ready?', 'set', 'go!'];

    constructor(interval, callback) {
        this.start = this.start.bind(this);
        this.update = this.update.bind(this);
        this.end = this.end.bind(this);

        this.timer;
        this.sequence;
        this.interval = interval;
        this.callback = callback;
        this.containers = [
            document.getElementById('player1-countdown'),
            document.getElementById('player2-countdown'),
        ];
    }

    start() {
        this.sequence = Countdown.sequence.slice(0);
        this.timer = setInterval(this.update, this.interval);
        setTimeout(this.end, this.interval * this.sequence.length);
        this.update();
    }

    update() {
        if (this.sequence.length >= 0) {
            let current = this.sequence.shift();
            this.containers[0].innerText = current;
            this.containers[1].innerText = current;
        }
    }

    end() {
        clearInterval(this.timer);
        this.callback();
    }
}

export default Countdown;
