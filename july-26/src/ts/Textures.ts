import { Texture, Resource, ILoaderResource } from 'pixi.js';

let resources: {[key:string]: ILoaderResource };

export function getAllTexture(): {[key:string]: Texture<Resource> } {
  const keys = Object.keys(resources);
  const textures = {} as {[key:string]: Texture<Resource> };
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
