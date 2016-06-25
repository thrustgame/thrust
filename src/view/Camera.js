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
        this.fov = fov;
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
        const start = (position - fov/2) * this.scale;
        const end = (position + fov/2) * this.scale;
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

    }
}

export default Camera;
