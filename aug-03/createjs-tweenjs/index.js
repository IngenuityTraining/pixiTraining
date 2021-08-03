let createjs = window.createjs || {};
function start() {
    if (!createjs.Tween) {
        setTimeout(start, 10);
    }
    const main = document.querySelector("#main");
    const tween = createjs.Tween.get(main, { loop: true, css: true })
        .to({ top: 100, left: 500 }, 1000, createjs.Ease.bounceOut);
    tween.play();
}
setTimeout(start, 10);
//# sourceMappingURL=index.js.map