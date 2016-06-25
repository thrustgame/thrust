class Track {
    constructor(player, walls) {
        this.walls = walls;
        this.index = 0;
        player.track = this;
    }

    getWall(position) {
        for (let i = this.walls.length - 1; i >= 0; i--) {
            let wall = this.walls[i];

            if (wall.match(position)) {
                return wall;
            }
        }

        return null;
    }
}

export default Track;
