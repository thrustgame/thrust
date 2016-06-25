class Room {
    constructor(id, start, end) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.size = this.end - this.start;
        this.wall = this.end - (this.size * 0.1);
        this.color = this.id % 2 === 0 ? '#FF700B' : '#9354cc';
    }
}

export default Room;
