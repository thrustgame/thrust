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

        const height = window.innerHeight;

        // Porperties
        this.title = new Title(this);
        this.state = 'title';
        this.frame = null;
        this.clock = new Clock();
        this.players = [
            new Player(65, { start: 0, end: height / 2}),
            new Player(76, { start: height / 2, end: height})
        ];
        this.world = new World(this, this.players, this.onEnd);
        this.renderer = new Renderer(this.world);

        this.onFrame();

        window.addEventListener('error', this.onEnd);
        window.onError = this.onEnd;
    }

    reset() {
        window.location.reload();
    }

    start() {
        this.players[0].controller.listening = true;
        this.players[1].controller.listening = true;
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
            this.world.update(this.clock.getDelta());
        }

        this.renderer.draw();
    }

    onEnd() {
        this.pause();
        this.frame = cancelAnimationFrame(this.frame);
        this.state = 'gameover';
        this.title.setState(this.state);
        this.title.setVictoryMessages(this.players, this.world.rooms.distance);
    }
}

export default Thrust;
