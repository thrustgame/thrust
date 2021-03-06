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
        this.context.imageSmoothingEnabled = false;
    }

    setFill(color) {
        this.context.fillStyle = color;
    }

    setAlpha(alpha) {
        this.context.globalAlpha = alpha;
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
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

    reverse() {
        this.context.save();
        this.context.translate(this.element.width, 0);
        this.context.scale(-1, 1);
    };

    toImage() {
        const image = new Image();
        image.src = this.toString();

        return image;
    }

    /**
     * To string
     *
     * @return {String}
     */
    toString() {
        return this.element.toDataURL();
    }

    toImage() {
        const image = new Image();

        image.src = this.toString();

        return image;
    }

    /**
     * Debug canvas content
     *
     * @param {Boolean} image
     */
    debug(image = false) {
        if (image) {
            document.body.appendChild(this.toImage());
        } else {
            console.info(this.toString());
        }
    }
}

export default Canvas;
