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
        this.rooms = new Corridor();

        new Track(this.players[0], this.rooms.getInverseWalls());
        new Track(this.players[1], this.rooms.getWalls());
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
