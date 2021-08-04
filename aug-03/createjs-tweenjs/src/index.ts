// @ts-ignore
let createjs = window.createjs || {};
function start() {
    if(!createjs.Tween) {
        setTimeout(start, 10);
    }
    // createjs.CSSPlugin.install();
    const main = document.querySelector("#main") as HTMLDivElement;
    // const pos = {
    //     top: 0,
    //     left: 0
    // }
    const tween = createjs.Tween.get(main, {loop: true, css: true})
        .to({top: 100, left: 500}, 1000, createjs.Ease.bounceOut);
    tween.play();
}
setTimeout(start, 10);
