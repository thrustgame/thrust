class Minimap {
    /**
     * Constructor
     */
    constructor(distance, scale, stage) {
        this.distance = distance;
        this.scale = scale;

        this.graphics = [new PIXI.Graphics(), new PIXI.Graphics()];

        stage.addChild(this.graphics[0]);
        stage.addChild(this.graphics[1]);
    }

    drawPlayer(graphic, position, direction) {

        const ltr = (direction == 'right');
        const x = (ltr ? position : this.distance - position) * this.scale;
        const color = ltr ? 0xFF00000 : 0x00FF00;

        graphic.clear();
        graphic.lineStyle(0);
        graphic.beginFill(color, 1);
        graphic.drawCircle(x,  200, 10);
        graphic.endFill();
    }

    draw(positions) {
        this.drawPlayer(this.graphics[0], positions[0], 'right');
        this.drawPlayer(this.graphics[1], positions[1], 'left');
    }
}

export default Minimap;
