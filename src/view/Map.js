import Canvas from '../tool/Canvas.js';

class Map {
    constructor(corridor, distance, scale, height) {
        this.corridor = corridor;
        this.scale = scale;
        this.canvas = new Canvas(distance * scale, height);

        for (var i = this.corridor.rooms.length - 1; i >= 0; i--) {
            this.drawRoom(this.corridor.rooms[i]);
        }
    }

    /**
     * Draw a room into the map
     *
     * @param {Room} room
     */
    drawRoom(room) {
        const x = Math.round(room.start * this.scale);
        const width = Math.round(room.size * this.scale);

        this.canvas.setFill(room.color);
        this.canvas.drawRect(x, 0, width, this.canvas.element.height);
    }
}

export default Map;
