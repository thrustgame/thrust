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

        console.log(this.renderer);

        document.body.appendChild(this.renderer.view);

        this.world = world;

        this.stage = new PIXI.Container();
        this.cameras = [
            new Camera(0, this.world.rooms, this.world.distance / 20, width, height, this.stage),
            new Camera(1, this.world.rooms, this.world.distance / 20, width, height, this.stage),
        ];
        this.minimap = new Minimap(this.world.distance, width, height, this.stage);

        this.stage.interactive = true;
    }

    /**
     * Draw the whole game
     */
    draw() {
        for (var i = this.cameras.length - 1; i >= 0; i--) {
            this.cameras[i].draw(this.world.players[i].position);
        }
        this.minimap.draw([this.world.players[0].position, this.world.players[1].position]);
        this.renderer.render(this.stage);
    }
}

export default Renderer;
