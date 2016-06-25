import Corridor from './Corridor.js';
import Room from './Room.js';

/**
 * World simulation
 */
class World {
    /**
     * Constructor
     *
     * @param {Number} distance
     * @param {Array} players
     * @param {Function} onEnd
     */
    constructor(distance, players, onEnd) {
        this.distance = distance;
        this.players = players;
        this.onEnd = onEnd;
        this.rooms = World.createRooms(distance);
    }

    /**
     * Creat a corridor full of rooms
     *
     * @param {Number} distance
     * @param {Number} length
     *
     * @return {Corridor}
     */
    static createRooms(distance, length = 40) {
        const rooms = [];
        const size = distance / length;
        let start = 0;
        let end = 0;

        for (var i = 0; i < length; i++) {
            start = end;
            end = start + size;
            rooms.push(new Room(i, start, end));
        }

        return new Corridor(rooms);
    }

    /**
     * Update
     *
     * @param {Number} delta
     */
    update(delta) {
        let distance = 0;

        for (var i = this.players.length - 1; i >= 0; i--) {
            let player = this.players[i];

            distance += player.update(delta);

            let wall = this.rooms.getWall(player.position);

            if (wall) {
                if (player.thrusting) {
                    player.increaseSpeed();
                } else {
                    player.resetSpeed();
                }
            }
        }

        if (distance >= this.distance) {
            this.onEnd();
        }
    }
}

export default World;
