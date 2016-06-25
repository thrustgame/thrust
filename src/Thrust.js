import Clock from './tool/Clock.js';
import World from './engine/World.js';
import Player from './engine/Player.js';
import Renderer from './view/Renderer.js';
import Title from './view/Title.js';

class Thrust {
    /**
     * Constructor
     */
    constructor() {
        // Bind
        this.onFrame = this.onFrame.bind(this);
        this.onEnd = this.onEnd.bind(this);

        // Porperties
        this.started = false;
        this.frame = null;
        this.clock = new Clock();
        this.players = [new Player(65), new Player(76)];
        this.world = new World(10, this.players, this.onEnd);
        this.renderer = new Renderer(this.world);

        this.title = new Title(this);

        this.onFrame();
    }

    start() {
        this.started = true;
        this.clock.start();
    }

    stop() {
        this.started = false;
        this.clock.stop();
    }

    /**
     * On frame
     */
    onFrame() {
        this.frame = requestAnimationFrame(this.onFrame);

        if (this.started) {
            const delta = this.clock.getDelta();
            this.world.update(delta);
        }

        this.renderer.draw();
    }

    onEnd() {
        this.frame = cancelAnimationFrame(this.frame);
    }
}

export default Thrust;
