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
        this.circles = [
            this.getCircle('#FFFB52'),
            this.getCircle('#FFFB52'),
        ];
    }

    getCircle(color) {
        const circle = new Canvas(radius * 2, radius * 2);

        circle.setFill(color);
        circle.drawCircle(radius, radius, radius);

        return circle.element;
    }

    /**
     * Draw a player on the minimap
     *
     * @param {Graphic} graphic
     * @param {Number} position
     * @param {String} direction
     */
    drawPlayer(canvas, circle, position, direction) {
        const ltr = (direction == 'right');
        const x = (ltr ? position : this.distance - position) * this.scale;
        const color = ltr ? 0xFF00000 : 0x00FF00;

        canvas.drawImage(circle, x - radius, this.halfHeight, radius * 2, radius * 2);
    }

    /**
     * Draw players on the minimap
     *
     * @param {Array} positions
     */
    draw(canvas, positions) {
        this.drawPlayer(canvas, this.circles[0], positions[0], 'right');
        this.drawPlayer(canvas, this.circles[1], positions[1], 'left');
    }
}

export default Minimap;
