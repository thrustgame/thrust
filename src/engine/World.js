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

        console.log(this.rooms);

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
        let distance = 0;

        for (var i = this.players.length - 1; i >= 0; i--) {
            distance += this.updatePlayer(this.players[i], delta);
        }

        if (distance >= this.getDistance()) {
            this.onEnd();
        }
    }

    updatePlayer(player, delta) {
        const previous = player.position;
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
