import Avatar from './Avatar.js';

class Camera {
    constructor(canvas, map, player, scale, y) {
        this.y = y;
        this.scale = scale;
        this.map = map;
        this.canvas = canvas;
        this.player = player;
        this.avatar = new Avatar(player, y === 0);
    }

    getPlayerPosition() {
        return this.player.position * this.scale;
    }

    draw() {
        this.canvas.drawImage(
            this.map,
            this.getX(),
            this.y,
            this.map.width,
            this.canvas.element.height / 2
        );

        const { x, y, size } = this.updateAvatar();

        this.canvas.drawImage(this.avatar.draw(), x, y, size, size);
    }
}

export default Camera;
