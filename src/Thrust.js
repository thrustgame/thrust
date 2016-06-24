class Thrust {
    /**
     * Constructor
     */
    constructor() {
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight
        );

        // Bind
        this.animate = this.animate.bind(this);
    }

    /**
     * Animate
     */
    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.stage);
    }
}

export default Thrust;
