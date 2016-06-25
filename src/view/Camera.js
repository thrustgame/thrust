class Camera {

    constructor(rooms, fov, width, height, scale, stage) {
        this.rooms = rooms;
        this.fov = fov;
        this.screen = { width, height };
        this.scale = scale;

        this.graphic = new PIXI.Graphics();

        stage.addChild(this.graphic);
    }

    draw(position) {
        const start = (position - fov/2) * this.scale;
        const end = (position + fov/2) * this.scale;
        const rooms = this.rooms.filter(start, end);

        for (var i = rooms.length - 1; i >= 0; i--) {
            this.drawRoom(start, end, rooms[i]);
        }
    }

    drawRoom(start, end, room) {

    }
}

export default Camera;
