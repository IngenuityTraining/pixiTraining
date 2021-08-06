import './css/main.scss';
import { Application } from 'pixi.js';

import { Game } from './ts/Game';

window.onload = () => {
  const app = new Application({
    width: 1200,
    height: 720,
    backgroundColor: 0xeeeeee,
    // resizeTo: window,
    // sharedTicker: true,
    // sharedLoader: true,
    // resolution: window.devicePixelRatio
  });

  document.body.appendChild(app.view);
  window.focus();
  const game = new Game(app);

  app.ticker.add(game.update.bind(game));
};
