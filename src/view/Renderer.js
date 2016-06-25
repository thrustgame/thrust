import Minimap from './Minimap.js';
import Camera from './Camera.js';
import Map from './Map.js';
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

        this.world = world;
        this.canvas = new Canvas(width, height);
        this.fov = this.world.distance / 20;
        this.scale = width / this.fov;

        this.canvas.context.imageSmoothingEnabled = false;

        document.body.appendChild(this.canvas.element);

        this.map = new Map(this.world.rooms, this.world.distance, this.scale, height/2);
        this.cameras = [
            new Camera(0, 0, this.world.players[0]),
            new Camera(0, this.canvas.element.height / 2, this.world.players[1]),
        ];
        this.minimap = new Minimap(this.world.distance, width, height);
    }

    /**
     * Draw the whole game
     */
    draw() {
        this.canvas.clear();

        this.cameras[0].x = -this.map.canvas.element.width + this.canvas.element.width + (this.world.players[0].position * this.scale);
        this.cameras[1].x = -this.world.players[1].position * this.scale;

        this.canvas.drawImageTo(this.map.canvas.element, this.cameras[0].x, this.cameras[0].y);
        this.canvas.drawImageTo(this.map.canvas.element, this.cameras[1].x, this.cameras[1].y);

        this.minimap.draw(this.canvas, [this.world.players[0].position, this.world.players[1].position]);
    }
}

export default Renderer;
