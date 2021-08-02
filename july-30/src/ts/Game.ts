import {
  Application, Container, BitmapText,
} from 'pixi.js';

import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';
import {
  Card, cardFrames, CARD_WIDTH, CARD_HEIGHT,
} from './Card';
import { shuffleArray } from './utils';

export class Game {
    private stage: Container;

    private readonly app: Application;

    private readonly game: Container;

    private readonly start: Container;

    private firstSelection: Card | undefined;

    private secondSelection: Card|undefined;

    private isInitialized = false;

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
      this.start = new Container();
      this.game = new Container();
      this.stage.addChild(this.game, this.start);
      this.game.visible = false;
      preLoader(assets, () => {
        this.isInitialized = true;
        this.createStartText();
        this.createCards();
        this.placeCards();
      });
      console.warn(this.app);
    }

    private createStartText(): void {
      const title = new BitmapText('Memory Game', {
        fontName: 'Desyrel',
        fontSize: 120,
        align: 'center',
      });
      title.anchor.set(0.5);
      title.x = this.app.view.width / 2;
      title.y = title.height;

      const start = new BitmapText('Start Game', {
        fontName: 'Desyrel',
        fontSize: 50,
        align: 'center',
      });
      start.anchor.set(0.5);
      start.position.set(this.app.view.width / 2, this.app.view.height / 2);
      start.buttonMode = true;
      start.interactive = true;
      start.on('pointerup', () => {
        this.start.visible = false;
        this.game.visible = true;
        this.stage.removeChild(this.start);
      });
      this.start.addChild(title, start);
    }

    private next(): void {
      this.firstSelection = undefined;
      this.secondSelection = undefined;
      this.cardEnabled(true);
    }

    private checkResult(): void {
      if (this.firstSelection && this.secondSelection) {
        if (this.firstSelection.name === this.secondSelection.name) {
          gsap.to([this.firstSelection, this.secondSelection],
            {
              width: 160,
              height: 160,
              alpha: 0,
              duration: 0.75,
              onComplete: () => {
                this.game.removeChild(this.firstSelection as Card);
                this.game.removeChild(this.secondSelection as Card);
                this.next();
              },
            });
        } else {
          gsap.fromTo([this.firstSelection, this.secondSelection],
            { rotation: 0.5 },
            {
              rotation: 0,
              ease: 'elastic',
              duration: 0.5,
              onComplete: () => {
                (this.firstSelection as Card).back.visible = true;
                (this.secondSelection as Card).back.visible = true;
                this.next();
              },
            });
        }
      }
    }

    private createCards(): void {
      shuffleArray(cardFrames).forEach((cardFrame) => {
        const card = new Card('back', { id: 'front', frame: cardFrame });
        card.on('pointerup', () => {
          card.interactive = false;
          gsap.to(card.back, {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
              card.back.visible = false;
              card.back.alpha = 1;
            },
          });
          if (this.firstSelection) {
            this.secondSelection = card;
            this.cardEnabled(false);
            setTimeout(this.checkResult.bind(this), 1000);
          } else {
            this.firstSelection = card;
          }
        });
        this.game.addChild(card);
      });
    }

    private cardEnabled(value:boolean) {
      this.game.children.forEach((child) => {
        // eslint-disable-next-line no-param-reassign
        child.interactive = value;
      });
    }

    private placeCards(): void {
      let count = 0;
      const PADDING = 20;
      const OFFSET = 100;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          const card = this.game.getChildAt(count);
          card.x = c * (CARD_WIDTH + PADDING) + OFFSET;
          card.y = r * (CARD_HEIGHT + PADDING) + OFFSET;
          count++;
        }
      }
    }

    public update(delta:number):void {
      if (this.isInitialized) {
        this.game.children.forEach((child) => {
          (<Card><unknown>child).update(delta);
        });
      }
    }
}
