// import * as PIXI from 'pixi.js';
import "./css/main.scss";
import {Application, Ticker} from 'pixi.js';
import {Game} from "./ts/Game";
onload = ()=>{
    const app = new Application({
        width:800,
        height:600,
        backgroundColor:0xeeeeee,
        resizeTo:window,
        sharedTicker: true,
        // resolution: window.devicePixelRatio
    });

    document.body.appendChild(app.view);

    const game = new Game(app);
    const ticker = Ticker.shared;
    ticker.add(game.update.bind(game));
};