import Canvas from '../tool/Canvas.js';

const baseWallSize = 30;

class Map {
    constructor(corridor, distance, scale, height) {
        this.corridor = corridor;
        this.scale = scale;
        this.width = Math.round(distance * scale);

        console.log(
            this.canvas.element.width,
            this.canvas.element.height,
            this.canvas.element.width * this.canvas.element.height
        );

        for (var i = this.corridor.rooms.length - 1; i >= 0; i--) {
            this.drawRoom(this.corridor.rooms[i]);
        }

        this.canvas.debug();
    }

    /**
     * Draw a room into the map
     *
     * @param {Room} room
     */
    drawRoom(room) {
        const width = Math.ceil(room.size * this.scale);

        room.view = new Canvas(width, 1);
        room.mirror = new Canvas(width, 1);

        room.view.setFill(room.color);
        room.view.drawRect(0, 0, room.view.element.width, room.view.element.height);

        const wallSize = Math.ceil(baseWallSize * this.scale);
        const wallX = Math.floor(width - wallSize);

        room.view.setFill(room.wallColor);
        room.view.drawRect(wallX, 0, wallSize, room.view.element.height);

        room.mirror.reverse();
        room.mirror.drawImageTo(room.view.element, 0, 0);
        room.mirror.reverse();
    }
}

export default Map;
