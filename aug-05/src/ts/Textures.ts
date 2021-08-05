import {
  Texture, Resource, ILoaderResource, BaseTexture, Rectangle
} from 'pixi.js';

let resources: {[key:string]: ILoaderResource };

export function getAllTexture(): {[key:string]: Texture<Resource> } {
  const keys = Object.keys(resources);
  const textures: {[key:string]: Texture<Resource> } = {} as {[key:string]: Texture<Resource> };
  keys.forEach((key) => {
    textures[key] = resources[key].texture as Texture<Resource>;
  });

  return textures;
}

export function setResources(value: {[key:string]: ILoaderResource }) {
  resources = value;
  getAllTexture();
}

export function getResource(id: string): ILoaderResource {
  return resources[id];
}

export function getTexture(id:string): Texture<Resource>|null {
  if (id in resources) {
    return resources[id].texture as Texture<Resource>;
  }
  return null;
}

export type CardFrame = {
  name:string;
  frame:number[]
};

export type CardFront = {id:string, frame:CardFrame};
export const cardFrames: CardFrame[] = [];
export const CARD_WIDTH = 150;
export const CARD_HEIGHT = 150;
for (let c = 0; c < 4; c++) {
  for (let r = 0; r < 6; r++) {
    for (let i = 0; i < 2; i++) {
      cardFrames.push({
        name: `card-${c}-${r}`,
        frame: [CARD_WIDTH * c, CARD_HEIGHT * r, CARD_WIDTH, CARD_HEIGHT],
      });
    }
  }
}

export function getSmily():Texture {
  const baseTexture = new BaseTexture(resources.front.url);
  const frameSrc = cardFrames[Math.floor(Math.random() * cardFrames.length)].frame;
  const frameRect = new Rectangle(...frameSrc);
  return new Texture(baseTexture, frameRect);
}
