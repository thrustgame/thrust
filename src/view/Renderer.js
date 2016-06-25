import Minimap from './Minimap.js';
import Camera from './Camera.js';
import Map from './Map.js';
import Player from '../engine/Player.js';
import Avatar from './Avatar.js';
import Canvas from '../tool/Canvas.js';

class Renderer {
    /**
     * Constructor
     *
     * @param {World} world
     */
    constructor(world) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.world = world;
        this.canvas = new Canvas(width, height, document.getElementById('canvas'));
        this.fov = this.world.getDistance() / 20;
        this.scale = width / this.fov;

        const halfHeight = Math.ceil(height / 2);

        this.map = new Map(this.world.rooms, this.world.getDistance(), this.scale, halfHeight);
        this.cameras = [new Camera(0, 0), new Camera(0, halfHeight)];
        this.avatars = [
            new Avatar(this.world.players[0], 'rtl'),
            new Avatar(this.world.players[1], 'ltr')
        ];

        this.minimap = new Minimap(this.world.getDistance(), width, height);
    }

    /**
     * Draw the whole game
     */
    draw() {
        this.canvas.clear();

        const screenWidth = this.canvas.element.width;
        const screenHeight = this.canvas.element.height;
        const screenHalfWidth = screenWidth / 2;
        const screenHalfHeight = screenHeight / 2;
        const mapWidth = this.map.canvas.element.width;
        const player1 = this.world.players[0].position * this.scale;
        const player2 = this.world.players[1].position * this.scale;

        this.cameras[0].x = Math.round(-screenHalfWidth - mapWidth + screenWidth + player1);
        this.cameras[1].x = Math.round(screenHalfWidth - player2);

        this.canvas.drawImage(this.map.canvas.element, this.cameras[0].x, this.cameras[0].y, mapWidth, screenHalfHeight);
        this.canvas.drawImage(this.map.canvas.element, this.cameras[1].x, this.cameras[1].y, mapWidth, screenHalfHeight);

        const margin = this.canvas.element.height / 4;
        const avatar1 = {};
        const avatar2 = {};

        avatar1.size = Avatar.radius * (this.avatars[0].player.speed / Player.speed);
        avatar1.x = Math.round(screenHalfWidth);
        avatar1.y = Math.round(margin - avatar1.size/2);

        avatar2.size = Avatar.radius * (this.avatars[1].player.speed / Player.speed);
        avatar2.x = Math.round(screenHalfWidth - avatar2.size);
        avatar2.y = Math.round(margin * 3 - avatar2.size/2);

        this.canvas.drawImage(this.avatars[0].draw(), avatar1.x, avatar1.y, avatar1.size, avatar1.size);
        this.canvas.drawImage(this.avatars[1].draw(), avatar2.x, avatar2.y, avatar2.size, avatar2.size);
        this.minimap.draw(this.canvas, this.avatars);
    }
}

export default Renderer;
