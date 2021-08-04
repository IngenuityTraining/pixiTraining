window.onload = () => {
    let createjs = createjs || {};
    const main = document.querySelector("#main");
    const tween = createjs.Tween.get(main, { loop: true, css: true }).to({ top: 100, left: 500 });
    tween.play();
};
//# sourceMappingURL=index.js.map