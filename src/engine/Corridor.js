class Corridor {
    constructor(rooms) {
        this.rooms = rooms;
    }

    filter(start, end) {
        let matches = [];

        for (var i = 0; i < this.rooms.length; i++) {
            let room = this.rooms[i];

            if (room.start < end && room.end > start) {
                matches.push(room);
            }
        }

        return matches;
    }

    getWall(position) {
        for (var i = 0; i < this.rooms.length; i++) {
            let room = this.rooms[i];

            if (room.wall < position && room.end > position) {
                return true;
            }
        }

        return false;
    }
}

export default Corridor;
