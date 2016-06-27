import Canvas from '../tool/Canvas.js';
import Animation from './Animation/Animation.js';
import Frame from './Animation/Frame.js';
import Player from '../engine/Player.js';

class Avatar {

    static radius = 360;

    static shakeTime = 300;

    constructor(player, direction) {
        this.player = player;
        this.idle = Avatar.createLozange('#FFFD1B', '#BCBB14', 1, direction, 0.5, 0.75, 0.25);
        this.idleShadow = Avatar.createLozange('#000000', '#000000', 0.1, direction, 0.5, 0.75, 0.25);
        this.thrust = Avatar.createLozange('#F5DF0E', '#AB9B0A', 1, direction, 0.25, 1, 0.25);
        this.thrustShadow = Avatar.createLozange('#000000', '#000000', 0.1, direction, 0.25, 1, 0.25);
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

    static createLozange(color, colorDark, alpha, direction, height, body, head) {
        const canvasWidth = 2;
        const canvasHeight = 2;

        const size = Avatar.radius * 2;
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
        canvas.setAlpha(alpha);

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

        return Math.cos(time) * Avatar.radius / 25;
    }

    draw() {
        return this.player.thrusting ? this.thrust.element : this.idle.element;
    }

    drawShadow() {
        return this.player.thrusting ? this.thrustShadow.element : this.idleShadow.element;
    }

    getSize() {
        const ratio = 1 + (this.player.getSpeedRatio() - 1) * 0.5;

        return Avatar.radius * ratio;
    }

    getDropShadow() {
        return Avatar.radius * 0.1;
    }
}

export default Avatar;
