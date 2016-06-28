import Camera from './Camera.js';

class TopCamera extends Camera {

    constructor(canvas, map, player, scale, y) {
        super(canvas, map, player, scale, y);

        const margin = this.canvas.element.width / 4 / this.scale;

        this.centerX = canvas.element.width * 3 / 4;
        this.centerY = canvas.element.height / 4;
        this.marginLeft = - Math.floor(3 * margin);
        this.marginRight = Math.floor(margin);
    }

    translate(x) {
        const position = this.map.corridor.distance - this.player.position;

        return this.centerX + (x - position) * this.scale;
    }

    getViewPort() {
        const position = this.map.corridor.distance - this.player.position;

        return {
            start: position + this.marginLeft,
            end: position + this.marginRight,
        };
    }

    getAlterEgoPosition(x, difference) {
        return x - difference;
    }

    getView(room) {
        return room.mirror;
    }

    getSunDirection() {
        return -1;
    }
}

export default TopCamera;
