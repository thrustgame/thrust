import Camera from './Camera.js';
import Avatar from './Avatar.js';
import Player from '../engine/Player.js';

class TopCamera extends Camera {

    translate(x) {
        const margin = this.canvas.element.width * 3 / 4;
        const position = this.map.corridor.distance - this.player.position;

        return Math.round(margin + (x - position) * this.scale);
    }

    getViewPort() {
        const margin = this.canvas.element.width / 4 / this.scale;
        const position = this.map.corridor.distance - this.player.position;

        return {
            start: position - Math.floor(margin * 3),
            end: position + Math.floor(margin),
        };
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

    getView(room) {
        return room.mirror.element;
    }
}

export default TopCamera;
