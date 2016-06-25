import Room from './Room.js';
import Wall from './Wall.js';

class Corridor {
    constructor(distance, length = 40) {
        this.distance = distance;
        this.rooms = new Array(length);

        const size = distance / length;
        let start = 0;
        let end = 0;

        for (let i = 0; i < length; i++) {
            start = end;
            end = start + size;
            this.rooms[i] = new Room(i, start, end);
        }
    }

    getWalls() {
        const length = this.rooms.length;
        const walls = new Array(length-1);

        for (let i = walls.length - 1; i >= 0; i--) {
            let room = this.rooms[i];
            walls[i] = new Wall(room.end);
        }

        return walls;
    }

    getInverseWalls() {
        const length = this.rooms.length;
        const walls = new Array(length-1);

        for (let i = walls.length - 1; i >= 0; i--) {
            let room = this.rooms[length-1 - i];
            walls[i] = new Wall(this.distance - room.start);
        }

        return walls;
    }
}

export default Corridor;
