import Room from './Room.js';
import Wall from './Wall.js';

const baseSize = 0.3;

class Corridor {
    constructor(length = 50) {
        this.rooms = [];
        this.distance = 0;

        for (var i = 0; i < length; i++) {
            this.addRoom();
        }
    }

    addRoom() {
        const length = this.rooms.length;
        const start = length ? this.rooms[length - 1].end : 0;
        const size = baseSize * (1 + (Math.random() - 0.5));

        this.rooms.push(new Room(length, start, start + size));
        this.distance += size;
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
