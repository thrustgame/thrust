class Room {
    constructor(id, start, end) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.size = this.end - this.start;
        this.wall = this.end - (this.size * 0.1);
        this.wallColor = this.id % 2 === 0 ? '#BC468B' : '#47A6BC';
        this.color = this.id % 2 === 0 ? '#D64F9E' : '#5BD3F0';
        this.view = null;
        this.mirror = null;
    }

    match(start, end) {
        return this.start < end && this.end > start;
    }
}

export default Room;
