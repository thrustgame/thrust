import Room from './Room.js';
import Wall from './Wall.js';

class Corridor {

    static roomSize = 300;

    constructor(length = 50) {
        this.rooms = [];
        this.distance = 0;

        this.addRoom(Corridor.roomSize * 2);

        for (var i = 0; i < length; i++) {
            this.addRoom();
        }

        this.addRoom(Corridor.roomSize * 2);
    }

    addRoom(forceSize = 0) {
        const length = this.rooms.length;
        const start = length ? this.rooms[length - 1].end : 0;
        const size = forceSize ? forceSize : Math.round(Corridor.roomSize * (1 + (Math.random() - 0.3)));

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
