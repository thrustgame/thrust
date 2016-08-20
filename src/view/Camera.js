import Avatar from './Avatar.js';

class Camera {
    constructor(canvas, map, player, scale, y) {
        this.y = Math.ceil(y);
        this.scale = scale;
        this.map = map;
        this.canvas = canvas;
        this.player = player;
        this.avatar = new Avatar(player, y === 0);
        this.halfHeight = Math.round(this.canvas.element.height / 2);
    }

    draw(alterEgo = null, difference = 0) {
        const size = Math.round(this.avatar.getSize());
        const x = Math.round(this.centerX - size / 2);
        const y = Math.round(this.centerY - size / 2);
        const sun = this.getSunDirection();
        const shadow = Math.round(sun * this.avatar.getDropShadow());
        const shake = Math.round(this.avatar.getShake());
        const { start, end } = this.getViewPort();
        let aesize, aex, aey, aeshadow;

        if (alterEgo) {
            aesize = Math.round(alterEgo.getSize());
            aex = Math.round(this.getAlterEgoPosition(x, difference));
            aey = Math.round(this.centerY - aesize / 2);
            aeshadow = Math.round(sun * alterEgo.getDropShadow());
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

    drawRoom(room) {
        if (!room.scaledSize) {
            room.scaledSize = Math.ceil(room.size * this.scale);
        }

        this.canvas.drawImage(
            this.getView(room),
            Math.round(this.translate(room.start)),
            this.y,
            room.scaledSize,
            this.halfHeight
        );
    }

    getView(room) {
        return room.view;
    }

    getSunDirection() {
        return 1;
    }
}

export default Camera;
