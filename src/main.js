var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}
