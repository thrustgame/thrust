import Camera from './Camera.js';
import Avatar from './Avatar.js';
import Player from '../engine/Player.js';

class BottomCamera extends Camera {
    getX() {
        const screenHalfWidth = this.canvas.element.width / 4;

        return Math.round(screenHalfWidth - this.getPlayerPosition());
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
