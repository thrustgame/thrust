import Room from './Room.js';
import Wall from './Wall.js';

class Corridor {

    constructor(length = 80) {
        this.rooms = [];
        this.distance = 0;

        this.addRoom(Room.size * 1.3);
        for (var i = 0; i < length; i++) {
            this.addRoom();
        }
        this.addRoom(Room.size * 1.3);
    }

    addRoom(forceSize = 0) {
        const length = this.rooms.length;
        const start = length ? this.rooms[length - 1].end : 0;
        const size = Math.round(forceSize ? forceSize : Room.getRandomSize());

        this.rooms.push(new Room(length, start, size));
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
