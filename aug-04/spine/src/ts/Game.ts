import {
  Application, Container,
} from 'pixi.js';
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';
import { preLoader } from './PreLoader';
import assets from './assets';
import { getResource } from './Textures';

(window as any).PIXI = PIXI;

export class Game {
  private stage: Container;

    private readonly app: Application;

    private isInitialized = false;

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;

      const centerX = this.app.view.width / 2;
      // const centerY = this.app.view.height / 2;
      const bottom = app.view.height;
      preLoader(assets, () => {
        this.isInitialized = true;
        const boySpineData = (<any>getResource('boy')).spineData;
        if (boySpineData) {
          const boy = new Spine(boySpineData);
          boy.x = centerX;
          boy.y = bottom;
          boy.state.setAnimation(0, 'walk', true);
          this.stage.addChild((<unknown>boy) as Container);
        }
      });
    }

    public update(delta:number):void {
      // eslint-disable-next-line no-empty
      if (this.isInitialized) {
        // eslint-disable-next-line no-unused-expressions
        delta;
      }
    }
}
