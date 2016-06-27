import Camera from './Camera.js';

class TopCamera extends Camera {

    constructor(canvas, map, player, scale, y) {
        super(canvas, map, player, scale, y);

        this.centerX = canvas.element.width * 3 / 4;
        this.centerY = canvas.element.height / 4;
    }

    translate(x) {
        const position = this.map.corridor.distance - this.player.position;

        return Math.round(this.centerX + (x - position) * this.scale);
    }

    getViewPort() {
        const margin = this.canvas.element.width / 4 / this.scale;
        const position = this.map.corridor.distance - this.player.position;

        return {
            start: position - Math.floor(margin * 3),
            end: position + Math.floor(margin),
        };
    }

    getAlterEgoPosition(x, difference) {
        return x - difference;
    }

    getView(room) {
        return room.mirror.element;
    }

    getSunDirection() {
        return -1;
    }
}

export default TopCamera;
