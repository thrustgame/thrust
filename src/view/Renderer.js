import Minimap from './Minimap.js';
import Camera from './Camera.js';
import Map from './Map.js';
import Avatar from './Avatar.js';
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

        const halfHeight = Math.ceil(height / 2);

        this.map = new Map(this.world.rooms, this.world.distance, this.scale, halfHeight);
        this.cameras = [
            new Camera(0, 0, this.world.players[0]),
            new Camera(0, halfHeight, this.world.players[1]),
        ];

        this.avatars = [
            new Avatar(this.world.players[0], 'rtl'),
            new Avatar(this.world.players[1], 'ltr')
        ];

        this.minimap = new Minimap(this.world.distance, width, height);
    }

    /**
     * Draw the whole game
     */
    draw() {
        this.canvas.clear();

        this.cameras[0].x = -this.map.canvas.element.width + this.canvas.element.width + (this.cameras[0].player.position * this.scale);
        this.cameras[1].x = -this.cameras[1].player.position * this.scale;

        this.canvas.drawImageTo(this.map.canvas.element, this.cameras[0].x, this.cameras[0].y);
        this.canvas.drawImageTo(this.map.canvas.element, this.cameras[1].x, this.cameras[1].y);

        const margin = this.canvas.element.height / 4;
        const radius = this.avatars[0].radius;

        this.canvas.drawImageTo(this.avatars[0].canvas.element, (this.canvas.element.width - margin) - radius, margin - radius);
        this.canvas.drawImageTo(this.avatars[1].canvas.element, margin - radius, (margin * 3) - radius);

        this.minimap.draw(this.canvas, [this.world.players[0].position, this.world.players[1].position]);
    }
}

export default Renderer;
