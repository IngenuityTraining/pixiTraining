import {
  Application, Container, Loader,
} from 'pixi.js';
import * as PIXI from 'pixi.js';
import { preLoader, ResourceType } from './PreLoader';
import assets from './assets';
import { getResource } from './Textures';

export class Game {
  private stage: Container;

    private readonly app: Application;

    private isInitialized = false;

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;

      // const centerX = app.view.width / 2;
      // const centerY = app.view.height / 2;
      preLoader(assets, (l:Loader, r:ResourceType) => {
        this.isInitialized = true;
        const boySpineData = (<any>getResource('boy')).spineData;
        console.warn('spine data', (<any>r.boy).spineData, l.resources.boy);
        if (boySpineData) {
          const boy = new (<any>PIXI).spine.Spine(boySpineData);
          this.stage.addChild((<unknown>boy) as Container);
        }
      });

      console.warn(this.app);
    }

    public update(delta:number):void {
      // eslint-disable-next-line no-empty
      if (this.isInitialized) {
        // eslint-disable-next-line no-unused-expressions
        delta;
      }
    }
}
