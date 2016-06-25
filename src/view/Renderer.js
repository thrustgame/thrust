import Minimap from './Minimap.js';
import Camera from './Camera.js';

class Renderer {
    /**
     * Constructor
     *
     * @param {World} world
     */
    constructor(world) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.renderer = new PIXI.autoDetectRenderer(width, height);

        document.body.appendChild(this.renderer.view);

        this.world = world;
        this.scale = width / this.world.distance;

        this.stage = new PIXI.Container();
        this.camera = new Camera(this.world.rooms, this.world.distance / 20, width, height, this.scale, this.stage);
        this.minimap = new Minimap(this.world.distance, height, this.scale, this.stage);
    }

    /**
     * Draw the whole game
     */
    draw() {
        this.camera.draw(this.world.players[0].position);
        this.minimap.draw([this.world.players[0].position, this.world.players[1].position]);
        this.renderer.render(this.stage);
    }
}

export default Renderer;
