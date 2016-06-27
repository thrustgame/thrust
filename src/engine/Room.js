class Room {

    static colors = [
        ['#D64F9E', '#9C4377'],
        ['#5BD3F0', '#50A2B6'],
        ['#5B52B8', '#45407E'],
    ];

    static size = 400;

    static wallSize = 0.05;

    constructor(id, start, size) {
        const colors = Room.colors[id % Room.colors.length];

        this.id = id;
        this.start = start;
        this.size = size;
        this.end = start + size;
        this.wall = this.end - (this.size * Room.wallSize);
        this.color = colors[0];
        this.wallColor = colors[1];
        this.view = null;
        this.mirror = null;
    }

    match(start, end) {
        return this.start < end && this.end > start;
    }

    static getRandomSize() {
        return Room.size * (1 + (Math.random() - 0.5) / 2);
    }
}

export default Room;
