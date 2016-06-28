import Clock from './tool/Clock.js';
import World from './engine/World.js';
import Player from './engine/Player.js';
import Room from './engine/Room.js';
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
        this.state = 'title';
        this.frame = null;
        this.clock = new Clock();
        this.players = [
            new Player(65, { start: 0, end: height / 2}),
            new Player(76, { start: height / 2, end: height})
        ];
        this.world = new World(this, this.players, this.onEnd);
        this.renderer = new Renderer(this.world);
        this.title = new Title(this);
        this.setPlayersPosition();

        this.onFrame();
    }

    reset() {
        this.players[0].reset();
        this.players[1].reset();
        this.world.reset();
        this.renderer.reset();
        this.setPlayersPosition();
    }

    start() {
        this.players[0].ready = true;
        this.players[1].ready = true;
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

    setPlayersPosition() {
        const x = this.renderer.cameras[1].centerX;
        const wall = this.world.rooms.rooms[0].size * Room.wallSize;
        const margin = Math.ceil(x / this.renderer.scale + wall);
        this.world.players[0].position = margin;
        this.world.players[1].position = margin;
    }

    /**
     * On frame
     */
    onFrame() {
        this.frame = requestAnimationFrame(this.onFrame);

        try {
            if (this.state == 'playing') {
                this.world.update(this.clock.getDelta());
            }

            this.renderer.draw();
        } catch(e) {
            this.onEnd();
            throw e;
        }
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
