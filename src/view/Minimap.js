import Canvas from '../tool/Canvas.js';

const radius = 10;

/**
 * Minimap view
 */
class Minimap {
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
        this.halfHeight = Math.round(this.height / 2) - radius;
        this.scale = width / distance;
        this.canvas = new Canvas(width, radius * 2);
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
        const x = (ltr ? position : this.distance - position) * this.scale;
        const color = ltr ? 0xFF00000 : 0x00FF00;

        canvas.drawImage(avatar.draw(), x - radius, this.halfHeight, radius * 2, radius * 2);
    }
}

export default Minimap;
