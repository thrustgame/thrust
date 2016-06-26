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

    draw(alterEgo = null, difference = 0) {
        const size = this.avatar.getSize();
        const x = Math.round(this.centerX - size / 2);
        const y = Math.round(this.centerY - size / 2);
        const shake = this.avatar.getShake();
        const { start, end } = this.getViewPort();

        for (let  i = this.map.corridor.rooms.length - 1; i >= 0; i--) {
            let room = this.map.corridor.rooms[i];
            if (room.match(start, end)) {
                this.drawRoom(room);
            }
        }

        this.canvas.drawImage(this.avatar.draw(), x, y + shake, size, size);

        if (alterEgo) {
            const size = alterEgo.getSize();
            this.canvas.drawImage(alterEgo.draw(), x - difference, y, size, size);
        }
    }

    drawRoom(room) {
        this.canvas.drawImage(
            this.getView(room),
            this.translate(room.start),
            this.y,
            room.view.element.width,
            this.canvas.element.height / 2
        );
    }

    getView(room) {
        return room.view.element;
    }
}

export default Camera;
