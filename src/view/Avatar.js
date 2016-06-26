import Canvas from '../tool/Canvas.js';
import Animation from './Animation/Animation.js';
import Frame from './Animation/Frame.js';
import Player from '../engine/Player.js';

class Avatar {

    static radius = 200;

    static shakeTime = 300;

    constructor(player, direction) {
        this.player = player;
        this.idle = Avatar.createLozange('#FFFD1B', '#BCBB14', direction, 0.5, 0.75, 0.25);
        this.thrust = Avatar.createLozange('#F5DF0E', '#AB9B0A', direction, 0.25, 1, 0.25);
        this.shake = 0;
        this.shakeTimout = null;

        this.startShake = this.startShake.bind(this);
        this.endShake = this.endShake.bind(this);

        this.player.setWallEventListener(this.startShake);
    }

    static createFrames(color, colorDark, direction) {
        const size = Avatar.radius * 2;
        const canvas = new Canvas(size, size);
        const context = canvas.context();

        let frames = [
        ];
    }

    static createLozange(color, colorDark, direction, height, body, head) {
        const canvasWidth = 2;
        const canvasHeight = 2;

        const size = Avatar.radius * 1;
        const canvas = new Canvas(size * canvasWidth, size * canvasHeight);
        const context = canvas.context;

        const center = { x: canvasWidth / 2, y: canvasHeight / 2 };

        const top = { x: center.x, y: center.y - (height / 2) };
        const right = { x: center.x + head, y: center.y }
        const bottom = { x: center.x, y: top.y + height };
        const left = { x: center.x - body, y: center.y };

        if (direction) {
            canvas.reverse();
        }

        context.scale(size, size);

        canvas.setFill(color);
        context.beginPath();
        context.moveTo(left.x, left.y);
        context.lineTo(top.x, top.y);
        context.lineTo(right.x, right.y);
        context.fill();

        canvas.setFill(colorDark);
        context.beginPath();
        context.moveTo(left.x, left.y);
        context.lineTo(bottom.x, bottom.y);
        context.lineTo(right.x, right.y);
        context.fill();

        if (direction) {
            canvas.reverse();
        }

        return canvas;
    }

    startShake() {
        this.shake = Date.now();
        this.shakeTimout = setTimeout(this.endShake, Avatar.shakeTime);
    }

    endShake() {
        this.shake = false;
        clearTimeout(this.shakeTimout);
    }

    getShake() {
        if (!this.shake) {
            return 0;
        }

        const time = (Date.now() - this.shake) / Avatar.shakeTime * 4 * Math.PI;

        return Math.cos(time) * Avatar.radius / 50;
    }

    draw() {
        return this.player.thrusting ? this.thrust.element : this.idle.element;
    }

    getSize() {
        return Avatar.radius;

        const ratio = this.player.speed / Player.speed;

        return Avatar.radius * ratio;
    }
}

export default Avatar;
