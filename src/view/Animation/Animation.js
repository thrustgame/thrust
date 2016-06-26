import Clock from '../../tool/Clock.js';

class Animation {
    constructor(frames, timeline) {
        this.clock = new Clock();
        this.frames = frames;

        this.checkIntegrity(frames);
    }

    checkIntegrity(frames) {
        let lastTo = 0;

        for (i = 0; i <= frames.length; i++) {
            if (frames[i].from !== lastTo) {
                throw new Error('frames integrity broken');
            }

            lastTo = frames[i].to;
        }

    }

    getCurrentFrame(time) {
        for (i = 0; i <= this.frames.length; i++) {
            if (frames[i].matches(time)) {
                return frames[i];
            }
        }

        throw new Error('could not find a frame for time ' + time);
    }
}
