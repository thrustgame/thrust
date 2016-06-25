class Corridor {
    constructor(rooms) {
        this.rooms = rooms;
    }

    filter(start, end) {
        let matches = [];

        for (var i = 0; i < this.rooms.length; i++) {
            let room = this.rooms[i];

            // console.log(start, end, room);

            if (room.start < end && room.end > start) {
                matches.push(room);
            }
        }

        return matches;
    }
}

export default Corridor;