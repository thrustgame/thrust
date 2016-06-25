import Clock from './tool/Clock.js';
import World from './engine/World.js';
import Player from './engine/Player.js';
import Renderer from './view/Renderer.js';

class Thrust {
    /**
     * Constructor
     */
    constructor() {
        // Bind
        this.onFrame = this.onFrame.bind(this);
        this.onEnd = this.onEnd.bind(this);

        // Porperties
        this.frame = null;
        this.clock = new Clock();
        this.players = [new Player(), new Player()];
        this.world = new World(10, this.players, this.onEnd);
        this.renderer = new Renderer(this.world);

        this.onFrame();
    }

    /**
     * On frame
     */
    onFrame() {
        this.frame = requestAnimationFrame(this.onFrame);

        const delta = this.clock.getDelta();

        this.world.update(delta);
        this.renderer.draw();
    }

    onEnd() {
        this.frame = cancelAnimationFrame(this.frame);
    }
}

export default Thrust;
