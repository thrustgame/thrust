import Canvas from '../tool/Canvas.js';

class Avatar {

    static radius = 100;

    constructor(player, direction) {
        this.player = player;
        this.idle = Avatar.createLozange('#FFFD1B', '#BCBB14', direction);
        this.thrust = Avatar.createLozange('#F5DF0E', '#AB9B0A', direction);
    }

    static createLozange(color, colorDark, direction) {
        const size = Avatar.radius * 2;
        const canvas = new Canvas(size, size);
        const context = canvas.context;

        if (direction) {
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

        if (direction) {
            canvas.reverse();
        }

        return canvas;
    }

    draw() {
        return this.player.thrusting ? this.thrust.element : this.idle.element;
    }
}

export default Avatar;
