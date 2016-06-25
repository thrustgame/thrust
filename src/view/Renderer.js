import Minimap from './Minimap.js';

class Renderer {
    constructor(world) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.renderer = new PIXI.autoDetectRenderer(width, height);

        document.body.appendChild(this.renderer.view);

        this.world = world;
        this.scale = width / this.world.distance;

        this.stage = new PIXI.Container();
        this.minimap = new Minimap(this.world.distance, height, this.scale, this.stage);
    }

    draw() {
        this.minimap.draw([this.world.players[0].position, this.world.players[1].position]);
        this.renderer.render(this.stage);
    }
}

export default Renderer;
