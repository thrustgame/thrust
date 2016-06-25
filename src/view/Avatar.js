import Canvas from '../tool/Canvas.js'

class Avatar {
    constructor(player, direction) {
        this.player = player;
        this.radius = 50;

        this.idle = Avatar.createLozange('#FFFB52', direction);
        this.thrust = Avatar.createLozange('#BCBA3C', direction);
    }

    static createLozange(color, direction) {
        const canvas = new Canvas(100, 100);
        const context = canvas.element.getContext('2d');

        canvas.setFill(color);
        context.beginPath();

        if (direction == 'rtl') {
            canvas.reverse();
        }

        context.moveTo(25,50);
        context.lineTo(75,75);
        context.lineTo(100,50);
        context.lineTo(75,25);
        context.fill();

        if (direction == 'rtl') {
            canvas.reverse();
        }

        return canvas.element;
    }

    draw() {
        return this.player.thrusting ? this.thrust : this.idle;
    }
}

export default Avatar;
