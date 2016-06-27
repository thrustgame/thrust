class AudioPlayer {
    constructor() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        this.enableMusic = true;

        this.ostBuffer = null;
        this.audioSource = null;

        this.audioContext = new AudioContext();
        this.audioPlaying = false;

        this.load = this.load.bind(this);
        this.play = this.play.bind(this);

        if (this.enableMusic) {
            this.load(this.play);
        }
    }

    load(done) {
        let request = new XMLHttpRequest();
        request.open('GET', 'ost/title.ogg');
        request.responseType = 'arraybuffer';

        request.onload = function() {
            this.audioContext.decodeAudioData(request.response, function(buffer) {
                this.ostBuffer = buffer;
                done();
            }.bind(this));
        }.bind(this);

        request.send();
    }

    play() {
        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.ostBuffer;
        this.audioSource.connect(this.audioContext.destination);
        this.audioSource.start(0);

        this.audioPlaying = true;
    }

    toggle() {
        if (this.audioPlaying) {
            this.audioSource.disconnect();
        } else {
            this.audioSource.connect(this.audioContext.destination);
        }

        this.audioPlaying = !this.audioPlaying;
    }
}

export default AudioPlayer;
