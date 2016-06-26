import Minimap from './Minimap.js';
import TopCamera from './TopCamera.js';
import BottomCamera from './BottomCamera.js';
import Map from './Map.js';
import Player from '../engine/Player.js';
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
        this.canvas = new Canvas(width, height, document.getElementById('canvas'));
        this.fov = this.world.getDistance() / 20;
        this.scale = width / this.fov;

        console.log(width, this.fov, this.scale);

        const halfHeight = Math.ceil(height / 2);

        this.map = new Map(this.world.rooms, this.world.getDistance(), this.scale, halfHeight);
        this.cameras = [
            new TopCamera(this.canvas, this.map, this.world.players[0], this.scale, 0),
            new BottomCamera(this.canvas, this.map, this.world.players[1], this.scale, halfHeight)
        ];

        console.log(this.map);

        this.minimap = new Minimap(this.world.getDistance(), width, height);
    }

    /**
     * Draw the whole game
     */
    draw() {
        this.canvas.clear();

        const meet = this.world.meet(this.canvas.element.width / this.scale);
        const difference = meet ? Math.round(this.world.getDifference() * this.scale) : 0;

        this.cameras[0].draw(meet ? this.cameras[1].avatar : null, difference);
        this.cameras[1].draw(meet ? this.cameras[0].avatar : null, difference);

        this.minimap.draw(this.canvas, [
            this.cameras[0].avatar,
            this.cameras[1].avatar,
        ]);
    }
}

export default Renderer;
