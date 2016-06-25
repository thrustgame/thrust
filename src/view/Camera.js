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
        this.top = lane * this.screen.halfHeight;
        this.scale = width / fov;
        this.graphic = new PIXI.Graphics();

        stage.addChild(this.graphic);
    }

    /**
     * Draw the player view at its current position
     *
     * @param {Number} position
     */
    draw(position) {
        const start = position - this.halfWidth;
        const end = position + this.halfWidth;
        const rooms = this.rooms.filter(start, end);

        for (var i = rooms.length - 1; i >= 0; i--) {
            this.drawRoom(start, end, rooms[i]);
        }
    }

    /**
     * Draw a room into the camera
     *
     * @param {Number} start
     * @param {Number} end
     * @param {Room} room
     */
    drawRoom(start, end, room) {
        const x = (room.start - start) * this.scale;
        const width = Math.min(room.size * this.scale, this.screen.width - x);

        this.graphic.lineStyle(0);
        this.graphic.beginFill(room.color, 1);
        this.graphic.drawRect(x, this.top, width, this.screen.halfHeight);
    }
}

export default Camera;
