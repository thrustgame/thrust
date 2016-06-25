class Room {
    constructor(id, start, end) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.size = this.end - this.start;
        this.color = this.start % 2 === 0 ? 0xFF700B : 0x9354cc;
    }
}

export default Room;
