class Track {
    constructor(player, walls) {
        this.player = player;
        this.walls = walls;
        this.index = 0;
        player.track = this;
    }

    /**
     * Get wall
     *
     * @param {Number} position
     *
     * @return {Wall|null}
     */
    getWall(position) {
        if (!this.walls.length) {
            return null;
        }

        const wall = this.walls[0];

        if (wall.match(position)) {
            return this.walls.splice(0, 1);
        }

        return null;
    }
}

export default Track;
