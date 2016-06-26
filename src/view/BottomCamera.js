import Camera from './Camera.js';
import Avatar from './Avatar.js';
import Player from '../engine/Player.js';

class BottomCamera extends Camera {

    translate(x) {
        const margin = this.canvas.element.width / 4;

        return Math.round(margin + (x - this.player.position) * this.scale);
    }

    getViewPort() {
        const margin = this.canvas.element.width / 4 / this.scale;

        return {
            start: this.player.position - Math.floor(margin),
            end: this.player.position + Math.floor(margin * 3),
        };
    }

    updateAvatar() {
        const margin = this.canvas.element.height * 3 / 4;
        const screenHalfWidth = this.canvas.element.width / 4;
        const x = this.canvas.element.width / 2;
        const avatar = {};

        avatar.size = Avatar.radius * this.avatar.player.speed / Player.speed;
        avatar.x = Math.round(screenHalfWidth - avatar.size);
        avatar.y = Math.round(margin - avatar.size / 2);

        return avatar;
    }
}

export default BottomCamera;
