import {
  Application, Container, Graphics, Sprite, Texture,
} from 'pixi.js';

import { preLoader } from './PreLoader';
import assets from './assets';
import { getTexture } from './Textures';

export class Game {
    private stage: Container;

    private readonly app: Application;

    private isInitialized = false;

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
      const centerX = app.view.width / 2;
      const centerY = app.view.height / 2;
      preLoader(assets, () => {
        this.isInitialized = true;
        const bg = new Sprite(getTexture('goku_ui') as Texture);
        bg.anchor.set(0.5);
        bg.x = centerX;
        bg.y = centerY;
        const bgZoomed = new Sprite(getTexture('goku_ui') as Texture);
        bgZoomed.anchor.set(0.5);
        bgZoomed.scale.set(1.1);
        bgZoomed.x = centerX;
        bgZoomed.y = centerY;
        bgZoomed.visible = false;
        this.stage.addChild(bg, bgZoomed);
        const graphics = new Graphics();

        graphics.lineStyle(3, 0x333333, 1);
        graphics.beginFill(0xFF0000);
        graphics.drawRect(10, 10, 100, 80);
        graphics.endFill();

        graphics.lineStyle(3, 0x333333, 0.4);
        graphics.beginFill(0xFF0000);
        graphics.drawRoundedRect(120, 10, 100, 80, 10);
        graphics.endFill();

        graphics.lineStyle(3, 0x333333, 0.4);
        graphics.beginFill(0x00FF00, 0.75);
        graphics.drawCircle(320, 100, 100);
        // graphics.drawStar(100, 150, 3, 80);
        // graphics.moveTo(10, 600);
        // graphics.lineTo(800, 600);
        // graphics.lineTo(600, 200);
        // graphics.lineTo(400, 400);
        // graphics.lineTo(200, 200);
        // graphics.lineTo(10, 600);
        graphics.drawPolygon([10, 600, 800, 600, 600, 200, 400, 400]);
        graphics.endFill();
        graphics.moveTo(10, 600);
        graphics.bezierCurveTo(0, -100, 100, 200, 100, 200);
        graphics.lineTo(200, 400);
        graphics.lineTo(10, 600);

        const anyThing = new Graphics();
        anyThing.x = this.app.view.width / 2;
        anyThing.y = this.app.view.height / 2;
        anyThing.lineStyle(1, 0x333333, 0.4);
        anyThing.beginFill(0x0000FF, 0.75);
        anyThing.drawCircle(0, 0, 300);
        // anyThing.beginHole();
        // anyThing.drawRect(-150, -150, 300, 300);
        // anyThing.endHole();
        anyThing.endFill();
        // bg.mask = anyThing;
        this.stage.addChild(anyThing);
        anyThing.interactive = true;
        this.stage.interactive = true;
        let isMoving = false;
        anyThing.on('pointerup', () => {
          if (graphics.mask) {
            bgZoomed.mask = null;
            bgZoomed.visible = false;
            isMoving = false;
          } else {
            bgZoomed.mask = anyThing;
            bgZoomed.visible = true;
            isMoving = true;
          }
        });
        this.app.stage.on('pointermove', (e) => {
          // eslint-disable-next-line no-console
          console.log('mouse move', isMoving, e);
          if (isMoving) {
            anyThing.x = e.data.global.x;
            anyThing.y = e.data.global.y;
          }
        });
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
