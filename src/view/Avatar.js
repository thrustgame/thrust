import Canvas from '../tool/Canvas.js'

class Avatar {
    constructor(player, direction) {
        this.player = player;
        this.radius = 40;

        this.canvas = new Canvas(this.radius * 2, this.radius * 2);

        this.canvas.setFill('white');
        this.canvas.drawCircle(this.radius, this.radius, this.radius);
    }

    draw() {

    }
}

export default Avatar;
