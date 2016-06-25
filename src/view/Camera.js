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
    constructor(rooms, fov, width, height, scale, stage) {
        this.rooms = rooms;
        this.width = fov;
        this.halfWidth = fov / 2;
        this.screen = { width, height };
        this.scale = scale;
        this.graphic = new PIXI.Graphics();

        stage.addChild(this.graphic);
    }

    /**
     * Draw the player view at its current position
     *
     * @param {Number} position
     */
    draw(position) {
        const start = (position - this.halfWidth);
        const end = (position + this.halfWidth);
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
        const width = room.size * this.scale;

        this.graphic.lineStyle(0);
        this.graphic.beginFill(room.color, 1);
        this.graphic.drawRect(x, 0, width, this.screen.height);
    }
}

export default Camera;
