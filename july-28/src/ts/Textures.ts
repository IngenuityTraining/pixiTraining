import {
  Texture, Resource, ILoaderResource, BaseTexture, Rectangle,
} from 'pixi.js';
import { animations, dinoAnimFrames } from './animation';

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

export function getTexture(id:string): Texture<Resource>|null {
  if (id in resources) {
    return resources[id].texture as Texture<Resource>;
  }
  return null;
}

export function getSSAnimTextures(assetId: string, keyId: string): Texture[] {
  const baseTexture = new BaseTexture(resources[assetId].url);
  const textures:Texture[] = [];
  animations[keyId].forEach((frame) => {
    textures.push(new Texture(baseTexture, new Rectangle(...frame)));
  });
  return textures;
}

export function getTextures(assetId: string, keyId: string): Texture[] {
  const textures:Texture[] = [];
  const atlas = resources[assetId];
  dinoAnimFrames[keyId].forEach((frame) => {
    textures.push((atlas.textures as {[key:string]:Texture})[frame]);
  });
  return textures;
}
