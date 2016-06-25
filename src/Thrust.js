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
        this.state = 'title';
        this.frame = null;
        this.clock = new Clock();
        this.players = [new Player(65), new Player(76)];
        this.world = new World(this, this.players, this.onEnd);
        this.renderer = new Renderer(this.world);

        this.title = new Title(this);

        this.onFrame();
    }

    reset() {
        this.players[0].reset();
        this.players[1].reset();
        this.world.reset();
    }

    start() {
        this.state = 'playing';
        this.clock.start();
        this.onFrame();
    }

    pause() {
        this.state = 'paused';
        this.clock.stop();
    }

    gameover() {
        this.state = 'gameover';
        this.clock.stop();
    }

    /**
     * On frame
     */
    onFrame() {
        this.frame = requestAnimationFrame(this.onFrame);

        if (this.state == 'playing') {
            const delta = this.clock.getDelta();
            this.world.update(delta);
        }

        this.renderer.draw();
    }

    onEnd() {
        this.pause();
        //this.frame = cancelAnimationFrame(this.frame);
        this.state = 'gameover';
        this.title.setState(this.state);
    }
}

export default Thrust;
