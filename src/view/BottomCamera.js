import Camera from './Camera.js';

class BottomCamera extends Camera {

    constructor(canvas, map, player, scale, y) {
        super(canvas, map, player, scale, y);

        this.centerX = canvas.element.width / 4;
        this.centerY = canvas.element.height * 3 / 4;
    }

    translate(x) {
        return Math.round(this.centerX + (x - this.player.position) * this.scale);
    }

    getViewPort() {
        const margin = this.centerX / this.scale;

        return {
            start: this.player.position - Math.floor(margin),
            end: this.player.position + Math.floor(margin * 3),
        };
    }
}

export default BottomCamera;
