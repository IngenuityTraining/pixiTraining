import {
  AnimatedSprite, Application, Container, Resource, Sprite, Texture, DisplayObject,
} from 'pixi.js';
// import * as PIXI from 'pixi.js';
// import { getTexture } from './Textures';
import { preLoader } from './PreLoader';
import assets from './assets';
import { getSSAnimTextures, getTextures } from './Textures';

export class Game {
    private stage: Container;

    private readonly app: Application;

    private readonly background: Container;

    private isInitialized = false;

    private gokuSS: AnimatedSprite | undefined;

    private dino: AnimatedSprite | undefined;

    //
    // private mountain1: TilingSprite | undefined;
    //
    // private mountain2: TilingSprite | undefined;
    //
    private speed = 10;

    private keyMap: {[key:string]: boolean} = {};

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
      this.background = new Container();
      this.stage.addChild(this.background);
      preLoader(assets, () => {
        this.createImage(getSSAnimTextures('goku-ss', 'still')[0]);
        this.gokuSS = this.createAnimated('goku-ss', 'punch');

        const dino = this.createAnimatedSprite('dino', 'idle');
        dino.x = dino.width / 2;
        dino.y = app.view.height - dino.height / 2;
        this.dino = dino;
        this.isInitialized = true;
        window.onkeydown = (e) => {
          this.keyMap[e.code] = true;
          if (this.keyMap.ArrowRight || this.keyMap.ArrowLeft) {
            dino.textures = getTextures('dino', 'walk');
            if (dino.playing === false) {
              dino.loop = true;
              dino.play();
            }
            // console.log(dino.playing);
          }
          // console.log('key down', this.keyMap);
        };
        window.onkeyup = (e) => {
          this.keyMap[e.code] = false;
          if (!this.keyMap.ArrowRight || !this.keyMap.ArrowLeft) {
            dino.textures = getTextures('dino', 'idle');
            dino.play();
          }
        };
      });
      console.warn(this.app);
    }

    /* private createTilingSprites(texture: Texture<Resource>): TilingSprite {
      const img = new TilingSprite(texture, 1600, 1080);
      // img.anchor.set(0.5);
      // img.position.set(this.app.view.width / 2);
      img.scale.set(0.5);
      return this.background.addChild(img);
    } */

    private createImage(texture: Texture<Resource>): Sprite {
      const img = Sprite.from(texture);
      img.anchor.set(0.5);
      img.position.set(this.app.view.width / 2, this.app.view.height / 2);
      return this.stage.addChild(img);
    }

    private createAnimated(assetId: string, animId:string): AnimatedSprite {
      const anim = new AnimatedSprite(getSSAnimTextures(assetId, animId));
      anim.animationSpeed = 0.05;
      anim.play();
      return this.stage.addChild(anim);
    }

    private createAnimatedSprite(assetId: string, animId:string): AnimatedSprite {
      const anim = new AnimatedSprite(getTextures(assetId, animId));
      anim.animationSpeed = 0.33;
      anim.scale.set(0.5);
      anim.anchor.set(0.5);
      anim.play();
      console.log(assetId, anim);
      return this.stage.addChild(anim);
    }

    public update(delta:number):void {
      if (this.isInitialized) {
        // console.warn(delta);
        (this.gokuSS as DisplayObject).x += delta;
        const dino = this.dino as AnimatedSprite;
        if (this.keyMap.ArrowRight) {
          dino.x += this.speed;
        }
        if (this.keyMap.ArrowLeft) {
          dino.x -= this.speed;
        }
      }
    }
}
