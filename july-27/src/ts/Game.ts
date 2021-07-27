import {
  Application, Container, Resource, Texture, TilingSprite, Sprite,
} from 'pixi.js';
import * as PIXI from 'pixi.js';
import { getTexture } from './Textures';
import { preLoader } from './PreLoader';
import assets from './assets';

export class Game {
    private stage: Container;

    private app: Application;

    private readonly background: Container;

    private sky: TilingSprite | undefined;

    private mountain1: TilingSprite | undefined;

    private mountain2: TilingSprite | undefined;

    private speed = 10;

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
      this.background = new Container();
      this.stage.addChild(this.background);
      preLoader(assets, () => {
        this.sky = this.createTilingSprites(getTexture('sky') as Texture<Resource>);
        const blur = new PIXI.filters.BlurFilter(12, 8);
        this.sky.filters = [blur];
        this.mountain1 = this.createTilingSprites(getTexture('mountain1') as Texture<Resource>);
        this.mountain2 = this.createTilingSprites(getTexture('mountain2') as Texture<Resource>);
        this.createImage(getTexture('car2')as Texture<Resource>);
      });
      console.log(this.app);
    }

    private createTilingSprites(texture: Texture<Resource>): TilingSprite {
      const img = new TilingSprite(texture, 1600, 1080);
      // img.anchor.set(0.5);
      // img.position.set(this.app.view.width / 2);
      img.scale.set(0.5);
      return this.background.addChild(img);
    }

    private createImage(texture: Texture): Sprite {
      const img = Sprite.from(texture);
      img.anchor.set(0.5);
      img.scale.set(0.15);
      img.position.set(this.app.view.width / 2, this.app.view.height - 50);
      return this.stage.addChild(img);
    }

    public update(delta:number):void {
      console.log(delta);
      // this.background.x = delta;

      if (this.sky) {
        (this.sky as TilingSprite).tilePosition.x += this.speed / 10;
        (this.mountain1 as TilingSprite).tilePosition.x += this.speed / 5;
        (this.mountain2 as TilingSprite).tilePosition.x += this.speed;
      }
    }
}
