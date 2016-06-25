class Title {
    constructor(thrust) {
        this.thrust = thrust;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.overlay = document.getElementById('title');
        this.audioContext = new AudioContext();
        this.ostBuffer;
        this.audioSource;
        this.audioPlaying = false;
        this.loadOst = this.loadOst.bind(this);
        this.playOst = this.playOst.bind(this);

        // this.loadOst(this.playOst);

        document.body.addEventListener('keydown', this.onKeyDown)
    }

    loadOst(done) {
        let request = new XMLHttpRequest();
        request.open('GET', '/ost/title.ogg');
        request.responseType = 'arraybuffer';

        request.onload = function() {
            this.audioContext.decodeAudioData(request.response, function(buffer) {
                this.ostBuffer = buffer;
                done();
            }.bind(this));
        }.bind(this);

        request.send();
    }

    playOst() {
        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.ostBuffer;
        this.audioSource.connect(this.audioContext.destination);
        this.audioSource.start(0);

        this.audioPlaying = true;
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 32:
                this.toggleState();
                break;
            case 84:
                this.toggleSound();
                break;
        }
    }

    toggleSound() {
        if (this.audioPlaying) {
            this.audioSource.disconnect();
        } else {
            this.audioSource.connect(this.audioContext.destination);
        }

        this.audioPlaying = !this.audioPlaying;
    }

    toggleState() {
        if (this.thrust.started) {
            this.overlay.style.display = 'block';
            this.thrust.stop();
        } else {
            this.overlay.style.display = 'none';
            this.thrust.start();
        }
    }
}

export default Title;
