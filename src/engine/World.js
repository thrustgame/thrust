import Corridor from './Corridor.js';
import Track from './Track.js';

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
    constructor(thrust, players, onEnd) {
        this.thrust = thrust;
        this.players = players;
        this.onEnd = onEnd;

        this.reset();
    }

    reset() {
        delete this.rooms;
        delete this.players[0].track;
        delete this.players[1].track;

        this.rooms = new Corridor();
        this.players[0].track = new Track(this.rooms.getInverseWalls());
        this.players[1].track = new Track(this.rooms.getWalls());
    }

    getDistance() {
        return this.rooms.distance;
    }

    /**
     * Update
     *
     * @param {Number} delta
     */
    update(delta) {
        this.updatePlayer(this.players[0], delta);
        this.updatePlayer(this.players[1], delta);

        if (this.meet()) {
            this.players[1].position = this.getDistance() - this.players[0].position;
            this.onEnd();
        }
    }

    updatePlayer(player, delta) {
        const position = player.update(delta);
        const wall = player.track.getWall(position);

        if (wall) {
            if (player.thrusting) {
                player.increaseSpeed();
            } else {
                player.resetSpeed();
            }
        }

        return position;
    }

    meet(limit = 0) {
        return this.getDifference() <= limit;
    }

    getDifference() {
        return this.getDistance() - (this.players[0].position + this.players[1].position);
    }
}

export default World;
