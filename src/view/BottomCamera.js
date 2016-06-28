import Camera from './Camera.js';

class BottomCamera extends Camera {

    constructor(canvas, map, player, scale, y) {
        super(canvas, map, player, scale, y);

        this.centerX = canvas.element.width / 4;
        this.centerY = canvas.element.height * 3 / 4;

        const margin = this.centerX / this.scale;

        this.marginLeft = - Math.floor(margin);
        this.marginRight = Math.floor(margin * 3);
    }

    translate(x) {
        return this.centerX + (x - this.player.position) * this.scale;
    }

    getViewPort() {
        const margin = this.centerX / this.scale;

        return {
            start: this.player.position + this.marginLeft,
            end: this.player.position + this.marginRight,
        };
    }
}

export default BottomCamera;
