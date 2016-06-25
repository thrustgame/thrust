import Minimap from './Minimap.js';
import Camera from './Camera.js';
import Canvas from '../tool/Canvas.js';

class Renderer {
    /**
     * Constructor
     *
     * @param {World} world
     */
    constructor(world) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas = new Canvas(width, height);

        this.canvas.context.imageSmoothingEnabled = false;

        document.body.appendChild(this.canvas.element);

        this.world = world;

        this.cameras = [
            new Camera(0, this.world.rooms, this.world.distance / 20, width, height),
            new Camera(1, this.world.rooms, this.world.distance / 20, width, height),
        ];
        this.minimap = new Minimap(this.world.distance, width, height);
    }

    /**
     * Draw the whole game
     */
    draw() {
        this.canvas.clear();

        for (var i = this.cameras.length - 1; i >= 0; i--) {
            this.cameras[i].draw(this.canvas, this.world.players[i].position);
        }

        this.minimap.draw(this.canvas, [this.world.players[0].position, this.world.players[1].position]);
    }
}

export default Renderer;
