import Canvas from '../tool/Canvas.js'

class Avatar {
    constructor(player, direction) {
        this.player = player;
        this.radius = 50;

        this.canvas = new Canvas(this.radius * 2, this.radius * 2);

        this.canvas.setFill('white');
        // this.canvas.drawCircle(this.radius, this.radius, this.radius);

        let ctx = this.canvas.element.getContext('2d');
        ctx.beginPath();

        if (direction == 'rtl') {
            ctx.moveTo(25,50);
            ctx.lineTo(100,75);
            ctx.lineTo(100,25);
        } else {
            ctx.moveTo(75,50);
            ctx.lineTo(0,75);
            ctx.lineTo(0,25);

        }
        ctx.fill();
    }

    draw() {

    }
}

export default Avatar;
