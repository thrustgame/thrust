import Canvas from '../tool/Canvas.js';
import Animation from './Animation/Animation.js';
import Frame from './Animation/Frame.js';
import Player from '../engine/Player.js';

class Avatar {

    static radius = 200;

    constructor(player, direction) {
        this.player = player;
        this.idle = Avatar.createLozange('#FFFD1B', '#BCBB14', direction, 0.5, 0.75, 0.25);

        this.thrust = Avatar.createLozange('#F5DF0E', '#AB9B0A', direction, 0.25, 1, 0.25);

        this.idle.debug();
        this.thrust.debug();
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

    static _createLozange(color, colorDark, direction, height, body, head) {
        const canvasWidth = 2;
        const canvasHeight = 2;

        const size = Avatar.radius * 1;
        const canvas = new Canvas(size * canvasWidth, size * canvasHeight);
        const context = canvas.context;

        const fullLength = body + head;
        const margin = { x: (canvasWidth - fullLength) / 2, y: (canvasHeight - height) / 2 };

        const top = { x: margin.x  + body, y: margin.y };
        const bottom = { x: top.x, y: top.y + height };
        const left = { x: margin.x, y: canvasHeight / 2 };
        const right = { x: canvasWidth - margin.x, y: left.y }

        return Avatar.createLozangeFromCoordinates(color, colorDark, direction, top, right, bottom, left);
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
