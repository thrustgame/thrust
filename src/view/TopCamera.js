import Camera from './Camera.js';
import Avatar from './Avatar.js';
import Player from '../engine/Player.js';

class TopCamera extends Camera {
    getX() {
        const screenWidth = this.canvas.element.width;
        const screenHalfWidth = screenWidth / 4;
        const mapWidth = this.map.width;

        return Math.round(-screenHalfWidth - mapWidth + screenWidth + this.getPlayerPosition());
    }

    updateAvatar() {
        const margin = this.canvas.element.height / 4;
        const screenHalfWidth = this.canvas.element.width * 3 / 4;
        const avatar = {};

        avatar.size = Avatar.radius * this.avatar.player.speed / Player.speed;
        avatar.x = Math.round(screenHalfWidth);
        avatar.y = Math.round(margin - avatar.size / 2);

        return avatar;
    }
}

export default TopCamera;
