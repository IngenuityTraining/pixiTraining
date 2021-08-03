import {Easing, Tween} from "@tweenjs/tween.js";

window.onload = () => {
    const main = document.querySelector("#main") as HTMLDivElement;
    const pos = {
        top: 0,
        left: 0
    }
    const tween = new Tween(pos);
    tween.to({top: 100, left: 500}, 1000)
        .delay(2000)
        .easing(Easing.Back.Out)
        .onUpdate(() => {
           main.style.top = pos.top+'px';
           main.style.left = pos.left+'px';
        }).start();
    window.requestAnimationFrame(update);
    function update(delta: number){
        tween.update(delta);
        window.requestAnimationFrame(update);
    }
}
