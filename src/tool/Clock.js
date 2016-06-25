/**
 * Three.js clock
 *
 * https://github.com/mrdoob/three.js/blob/6400f2c9b6ee58e01c005a66f00c7cd1113752aa/src/core/Clock.js
 *
 * @author alteredq / http://alteredqualia.com/
 */
class Clock {

    constructor(autoStart) {
        this.autoStart = autoStart || true;
        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.running = false;
    }

    start() {
        this.startTime = Date.now();
        this.oldTime = this.startTime;
        this.running = true;
    }

    stop() {
        this.getElapsedTime();
        this.running = false;
    }

    getElapsedTime() {
        this.elapsedTime += this.getDelta();

        return this.elapsedTime;
    }


    getDelta() {
        let diff = 0;

        if (this.autoStart && ! this.running) {
            this.start();
        }

        if (this.running) {
            const newTime = Date.now();
            diff = 0.001 * ( newTime - this.oldTime );
            this.oldTime = newTime;
            this.elapsedTime += diff;
        }

        return diff;
    }
}

export default Clock;
