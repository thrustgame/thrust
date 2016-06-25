/**
 * Canvas
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Element} element
 */
class Canvas {
    constructor(width, height, element = null) {
        this.element = element ? element : document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.element.width = width;
        this.element.height = height;
    }

    setFill(color) {
        this.context.fillStyle = color;
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    clearZone(x, y, width, height) {
        this.context.clearRect(x, y, width, height);
    }

    color(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.element.width, this.element.height);
    }

    drawImage(image, x, y, width, height) {
        this.context.drawImage(image, x, y, width, height);
    }

    drawImageTo(image, x, y) {
        this.context.drawImage(image, x, y);
    }

    drawCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, false);
        this.context.fill();
    }

    drawRect(x, y, width, height) {
        this.context.fillRect(x, y, width, height);
    }

    /**
     * To string
     *
     * @return {String}
     */
    toString() {
        return this.element.toDataURL();
    }
}

export default Canvas;
