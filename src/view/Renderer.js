import Minimap from './Minimap.js';

class Renderer {
    constructor(world) {
        this.renderer = new PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight
        );

        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        this.world = world;
        this.graphics = new PIXI.Graphics();
        this.minimap = new Minimap(this.graphics);
    }

    draw() {
        this.minimap.draw(this.world.players[0].position, this.world.players[1].position);
        this.renderer.render(this.stage);
    }
}

export default Renderer;
