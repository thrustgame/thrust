class Frame {
    constructor(from, to, sprite) {
        this.from = from;
        this.to = to;
        this.sprite = sprite;
    }

    matches(time) {
        return this.from <= time && this.to >= time;
    }
}
