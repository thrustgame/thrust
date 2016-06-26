class Room {

    static colors = [
        ['#D64F9E', '#9C4377'],
        ['#5BD3F0', '#50A2B6'],
        ['#5B52B8', '#45407E'],
    ];

    constructor(id, start, end) {
        const colors = Room.colors[id % Room.colors.length];

        this.id = id;
        this.start = start;
        this.end = end;
        this.size = this.end - this.start;
        this.wall = this.end - (this.size * 0.1);
        this.color = colors[0];
        this.wallColor = colors[1];
        this.view = null;
        this.mirror = null;
    }

    match(start, end) {
        return this.start < end && this.end > start;
    }
}

export default Room;
