import Player from './Player.js';

class PlayerController {

    constructor(key, zone) {
        this.key = key;
        this.zone = zone;
        this.listeners = [];

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.onAction = this.onAction.bind(this);

        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('touchstart', this.onTouch, false);
    }

    /**
     * On key down
     *
     * @param {Event} event
     */
    onKeyDown(event) {
        if (event.keyCode == this.key) {
            this.onAction();
        }
    }

    /**
     * On touch
     *
     * @param {Event} event
     */
    onTouch(event) {
        event.preventDefault();

        for (let i = event.changedTouches.length - 1; i >= 0; i--) {
            let touch = event.changedTouches[i].clientY;

            if (touch >= this.zone.start && touch <= this.zone.end) {
                return this.onAction();
            }
        }
    }

    /**
     * On action
     */
    onAction() {
        const length = this.listeners.length;

        for (var i = 0; i < length; i++) {
            this.listeners[i]();
        }
    }

    /**
     * Add action listener
     *
     * @param {Function} callback
     */
    addActionListener(callback) {
        if (this.listeners.indexOf(callback) < 0) {
            this.listeners.push(callback);
        }
    }

    /**
     * Remove action listener
     *
     * @param {Function} callback
     */
    removeActionListener(callback) {
        const index = this.listeners.indexOf(callback);

        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    }
}

export default PlayerController;
