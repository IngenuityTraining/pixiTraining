import {
  Container, Sprite, Point, Texture,
} from 'pixi.js';

// eslint-disable-next-line no-shadow
export enum Directions {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

export class Snake extends Container {
  private readonly START_LENGTH = 15;

  private readonly SIZE = 20;

  // private color: number | undefined;

  public dir: Directions | undefined;

  private parts: Sprite[] | undefined;

  private partPos: Point[] | undefined;

  private startX: number | undefined;

  private startY: number | undefined;

  public alive = false;

  private readonly dirFunc = {
    up: (p: Point) => new Point(p.x, p.y - this.SIZE),
    down: (p: Point) => new Point(p.x, p.y + this.SIZE),
    left: (p: Point) => new Point(p.x - this.SIZE, p.y),
    right: (p: Point) => new Point(p.x + this.SIZE, p.y),
  }

  private bodyTexture: Texture|undefined;

  public init(initX: number, initY: number, texture:Texture): void {
    this.parts = [];
    this.partPos = [];
    // this.color = 0x00ff00;
    this.dir = Directions.LEFT;
    this.startX = initX;
    this.startY = initY;
    this.alive = true;
    this.bodyTexture = texture;
    for (let i = this.startX + (this.START_LENGTH * this.SIZE); i >= this.startX; i -= this.SIZE) {
      const pos = new Point(i, this.startY);
      this.partPos.push(pos);
      this.parts.push(this.drawPart(pos));
    }
  }

  private drawPart(pos:Point): Sprite {
    const s = Sprite.from(this.bodyTexture as Texture);
    s.x = pos.x;
    s.y = pos.y;
    this.addChild(s);
    return s;
    // const g = new Graphics();
    // g.beginFill(this.color as number);
    // g.lineStyle(1);
    // g.drawRect(0, 0, this.SIZE, this.SIZE);
    // g.endFill();
    // this.addChild(g);
    // g.x = pos.x;
    // g.y = pos.y;
    // return g;
  }

  public draw() {
    this.partPos?.forEach((pos: Point, index: number) => {
      if (this.parts && this.parts[index]) {
        this.parts[index].x = pos.x;
        this.parts[index].y = pos.y;
      } else {
        this.drawPart(pos);
      }
    });
  }

  public move(): void {
    if (this.partPos?.length) {
      const lastValue = this.partPos[this.partPos?.length - 1];
      const newPos = this.dirFunc[this.dir as Directions](lastValue);
      this.checkGrowth();
      this.partPos.push(newPos);
    }
    if (this.checkSelfCollision()) {
      this.partPos?.shift();
      if (this.parts) {
        this.removeChild(this.parts.shift() as Sprite);
      }
      if (this.parts?.length === 2) {
        this.alive = false;
      }
    }
  }

  private checkGrowth(): void {
    this.partPos?.shift();
  }

  private checkSelfCollision(): boolean {
    if (this.partPos?.length) {
      const lastValue = this.partPos[this.partPos?.length - 1];
      for (let i = this.partPos.length - 2; i >= 0; i--) {
        if (lastValue.x === this.partPos[i].x && lastValue.y === this.partPos[i].y) {
          return true;
        }
      }
    }
    return false;
  }
}
