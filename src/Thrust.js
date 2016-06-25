import Clock from './tool/Clock.js';
import World from './engine/World.js';
import Player from './engine/Player.js';

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
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight
        );

        document.body.appendChild(this.renderer.view);

        this.onFrame();
    }

    /**
     * On frame
     */
    onFrame() {
        this.frame = requestAnimationFrame(this.onFrame);

        const delta = this.clock.getDelta();

        this.world.update(delta);
        this.renderer.render(this.stage);
    }

    onEnd() {
        this.frame = cancelAnimationFrame(this.frame);
        console.log('STOP!');
    }
}

export default Thrust;
