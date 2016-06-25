import Canvas from '../tool/Canvas.js';

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
        this.radius = 10;
        this.distance = distance;
        this.height = height;
        this.scale = width / distance;
        this.canvas = new Canvas(width, this.radius * 2);
        this.circles = [
            this.getCircle('#FF0000'),
            this.getCircle('#00FF00'),
        ];
    }

    getCircle(color) {
        const radius = this.radius * 2;
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

        canvas.drawImage(circle, x, this.height / 2, 10, 10);
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
