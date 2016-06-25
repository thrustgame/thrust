import Canvas from '../tool/Canvas.js'

class Avatar {
    constructor(player, direction) {
        this.player = player;
        this.radius = 50;

        this.idle = Avatar.createLozange(this.radius, '#FFFB52', '#e2df48', direction);
        this.thrust = Avatar.createLozange(this.radius, '#fffa1c', '#eae61b', direction);
    }

    static createLozange(radius, color, colorDark, direction) {
        const size = radius * 2;
        const canvas = new Canvas(size, size);
        const context = canvas.context;

        if (direction == 'rtl') {
            canvas.reverse();
        }

        canvas.setFill(color);
        context.beginPath();
        context.moveTo(0, 0.5 * size);
        context.lineTo(0.75 * size, 0.25 * size);
        context.lineTo(1 * size, 0.5 * size);
        context.fill();

        canvas.setFill(colorDark);
        context.beginPath();
        context.moveTo(0, 0.5 * size);
        context.lineTo(0.75 * size, 0.75 * size);
        context.lineTo(1 * size, 0.5 * size);
        context.fill();

        if (direction == 'rtl') {
            canvas.reverse();
        }

        return canvas;
    }

    draw() {
        return this.player.thrusting ? this.thrust.element : this.idle.element;
    }
}

export default Avatar;
