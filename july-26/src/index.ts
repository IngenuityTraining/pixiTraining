// import * as PIXI from 'pixi.js';
import './css/main.scss';
import { Application, Ticker } from 'pixi.js';

// eslint-disable-next-line import/extensions,import/no-unresolved
import { Game } from './ts/Game';

window.onload = () => {
  const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0xeeeeee,
    // resizeTo: window,
    sharedTicker: true,
    sharedLoader: true,
    // resolution: window.devicePixelRatio
  });
  console.log(app);
  document.body.appendChild(app.view);

  const game = new Game(app);
  const ticker = Ticker.shared;
  ticker.add(game.update.bind(game));
};
