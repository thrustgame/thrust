class Track {
    constructor(player, walls) {
        this.player = player;
        this.walls = walls;
        this.index = 0;
        player.track = this;
    }

    getWall(position) {
        if (!this.walls.length) {
            return null;
        }

        const wall = this.walls[0];

        if (wall.match(position)) {
            this.walls.splice(0, 1);

            return wall;
        }

        return null;
    }
}

export default Track;
