import Canvas from '../tool/Canvas.js'

class Avatar {
    constructor(player, direction) {
        this.player = player;
        this.radius = 50;

        this.idle = Avatar.createTriangle(50, '#FFFB52', direction);
        this.thrust = Avatar.createTriangle(50, '#BCBA3C', direction);
    }

    static createTriangle(radius, color, direction) {
        const canvas = new Canvas(radius * 2, radius * 2);
        const context = canvas.element.getContext('2d');

        canvas.setFill(color);
        context.beginPath();

        if (direction == 'rtl') {
            context.moveTo(25,50);
            context.lineTo(100,75);
            context.lineTo(100,25);
        } else {
            context.moveTo(75,50);
            context.lineTo(0,75);
            context.lineTo(0,25);
        }

        context.fill();

        return canvas.element;
    }

    draw() {
        return this.player.thrusting ? this.thrust : this.idle;
    }
}

export default Avatar;
