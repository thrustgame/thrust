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
        const sun = this.getSunDirection();
        const shadow = sun * this.avatar.getDropShadow();
        const shake = this.avatar.getShake();
        const { start, end } = this.getViewPort();
        let aesize, aex, aey, aeshadow;

        if (alterEgo) {
            aesize = alterEgo.getSize();
            aex = this.getAlterEgoPosition(x, difference);
            aey = Math.round(this.centerY - aesize / 2);
            aeshadow = sun * alterEgo.getDropShadow();
        }

        for (let  i = this.map.corridor.rooms.length - 1; i >= 0; i--) {
            let room = this.map.corridor.rooms[i];
            if (room.match(start, end)) {
                this.drawRoom(room);
            }
        }

        this.canvas.drawImage(this.avatar.drawShadow(), x + shake, y + shadow, size, size);

        if (alterEgo) {
            this.canvas.drawImage(alterEgo.drawShadow(), aex + shake, aey + aeshadow, aesize, aesize);
        }

        this.canvas.drawImage(this.avatar.draw(), x + shake, y, size, size);

        if (alterEgo) {
            this.canvas.drawImage(alterEgo.draw(), aex + shake, aey, aesize, aesize);
        }
    }

    getAlterEgoPosition(x, difference) {
        return x + difference;
    }

    drawRoom(room, shake) {
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

    getSunDirection() {
        return 1;
    }
}

export default Camera;
