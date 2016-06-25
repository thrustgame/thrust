import Corridor from './Corridor.js';
import Room from './Room.js';

class World
{
    constructor(distance, players, onEnd) {
        this.distance = distance;
        this.players = players;
        this.onEnd = onEnd;
        this.rooms = World.createRooms(distance);
    }

    static createRooms(distance, length = 10) {
        const rooms = [];
        const size = Math.ceil(distance / length);
        let start = 0;
        let end = 0;

        for (var i = 0; i < length; i++) {
            start = end;
            end = start + size;
            rooms.push(new Room(start, end));
        }

        return new Corridor(rooms);
    }

    update(delta) {
        let distance = 0;

        for (var i = this.players.length - 1; i >= 0; i--) {
            distance += this.players[i].update(delta)
        }

        if (distance >= this.distance) {
            this.onEnd();
        }
    }
}

export default World;
