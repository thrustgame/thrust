/**
 * Camera: what the player sees
 */
class Camera {
    /**
     * Constructor
     *
     * @param {Corridor} rooms
     * @param {Number} fov
     * @param {Number} width
     * @param {Number} height
     * @param {Number} scale
     * @param {Object} stage
     */
    constructor(lane, rooms, fov, width, height, stage) {
        this.lane = lane;
        this.rooms = rooms;
        this.width = fov;
        this.halfWidth = fov / 2;
        this.screen = {
            halfHeight: height / 2,
            width,
            height
        };
        this.top = Math.round(lane * this.screen.halfHeight);
        this.scale = width / fov;
    }

    /**
     * Draw the player view at its current position
     *
     * @param {Number} position
     */
    draw(canvas, position) {
        const start = position - this.halfWidth;
        const end = position + this.halfWidth;
        const rooms = this.rooms.filter(start, end);

        for (var i = rooms.length - 1; i >= 0; i--) {
            this.drawRoom(canvas, start, end, rooms[i]);
        }
    }

    /**
     * Draw a room into the camera
     *
     * @param {Number} start
     * @param {Number} end
     * @param {Room} room
     */
    drawRoom(canvas, start, end, room) {
        const x = Math.round((room.start - start) * this.scale);
        const width = Math.round(room.size * this.scale);
        const height = Math.round(this.screen.halfHeight);

        canvas.setFill(room.color);
        canvas.drawRect(x, this.top, width, height);
    }
}

export default Camera;
