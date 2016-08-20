import Canvas from '../tool/Canvas.js';
import Room from '../engine/Room.js';

class Map {

    static cache = {};

    constructor(corridor, distance, scale, height) {
        this.corridor = corridor;
        this.scale = scale;
        this.width = Math.round(distance * scale);

        for (var i = this.corridor.rooms.length - 1; i >= 0; i--) {
            this.drawRoom(this.corridor.rooms[i]);
        }
    }

    drawRoom(room) {
        const { color, wallColor, size } = room;
        const id = `${color}`; //:${size}

        if (typeof(Map.cache[id]) === 'undefined') {
            Map.cache[id] = this.getColor(size, color, wallColor);
        }

        const { view, mirror } = Map.cache[id];

        room.view = view;
        room.mirror = mirror;
    }

    /**
     * Draw a room into the map
     *
     * @param {Room} room
     */
    getColor(size, color, wallColor) {
        const width = Math.ceil(size * this.scale);
        const view = new Canvas(width, 1);
        const mirror = new Canvas(width, 1);

        // Draw the room;
        view.setFill(color);
        view.drawRect(0, 0, view.element.width, view.element.height);

        // Draw the wall
        const wallSize = Math.ceil(size * Room.wallSize * this.scale);
        view.setFill(wallColor);
        view.drawRect(0, 0, wallSize, view.element.height);

        // Draw the reverse view for top lane
        mirror.reverse();
        mirror.drawImageTo(view.element, 0, 0);
        mirror.reverse();

        return {
            view: view.element,
            mirror: mirror.element,
        };
    }
}

export default Map;
