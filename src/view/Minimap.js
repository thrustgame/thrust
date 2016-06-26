import Canvas from '../tool/Canvas.js';

/**
 * Minimap view
 */
class Minimap {
    static radius = 20;

    /**
     * Constructor
     *
     * @param {Number} distance
     * @param {Number} height
     * @param {Number} scale
     * @param {Number} stage
     */
    constructor(distance, width, height, stage) {
        this.distance = distance;
        this.height = height;
        this.halfHeight = Math.round(this.height / 2) - Minimap.radius;
        this.scale = width / distance;
        this.canvas = new Canvas(width, Minimap.radius * 2);
    }

    /**
     * Draw players on the minimap
     *
     * @param {Canvas} canvas
     * @param {Array} avatars
     */
    draw(canvas, avatars) {
        this.drawPlayer(canvas, avatars[0], 'right');
        this.drawPlayer(canvas, avatars[1], 'left');
    }

    /**
     * Draw a player on the minimap
     *
     * @param {Canvas} canvas
     * @param {Avatar} avatar
     * @param {String} direction
     */
    drawPlayer(canvas, avatar, direction) {
        const position = avatar.player.position;
        const ltr = (direction == 'left');
        const width = Minimap.radius * 2;
        const x = (ltr ? position : this.distance - position) * this.scale - width / 2;
        const color = ltr ? 0xFF00000 : 0x00FF00;

        canvas.drawImage(avatar.draw(), x, this.halfHeight, width, width);
    }
}

export default Minimap;
