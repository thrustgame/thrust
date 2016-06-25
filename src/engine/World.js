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
    constructor(players, onEnd) {
        this.rooms = new Corridor();
        this.players = players;
        this.onEnd = onEnd;

        this.tracks = [
            new Track(players[0], this.rooms.getWalls()),
            new Track(players[1], this.rooms.getInverseWalls()),
        ];
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

        const distance = this.players[0].position + this.players[1].position;

        if (distance >= this.getDistance()) {
            //this.players[0].position = this.players[1].position;
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
}

export default World;
