import title from '@assets/ost/title.ogg';

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

        request.open('GET', title);
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

        try {
            this.audioSource.start(0);
        } catch (error) {
            window.addEventListener('keydown', this.play, { once: true });
            window.addEventListener('touchstart', this.play, { once: true });
        }

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
