import {
  ILoaderResource,
  Loader,
} from 'pixi.js';
import { setResources } from './Textures';
import { Assets } from './assets';

function addAssets(loader:Loader, assets: {key:string, url:string}[]):void {
  assets.forEach((asset) => {
    loader.add(asset);
  });
}
export type ResourceType = {[key:string]: ILoaderResource };
let progDiv: HTMLDivElement;
function showProgress(e: any) {
  if (progDiv === undefined) {
    progDiv = document.createElement('div');
    progDiv.className = 'progress';
    document.body.appendChild(progDiv);
  }
  progDiv.style.width = `${e.progress}%`;
}

function loadComplete(
  loader:Loader,
  resources: ResourceType,
  onCompleteCallback:(l:Loader, r: ResourceType)=>void,
): void {
  setResources(resources);
  console.log(resources);
  progDiv.style.display = 'none';
  onCompleteCallback(loader, resources);
}

export function preLoader(assetList: Assets, callback: (l:Loader, r: ResourceType) => void) {
  const loader = Loader.shared;
  if (assetList.baseUrl) {
    loader.baseUrl = assetList.baseUrl;
  }
  addAssets(loader, assetList.images);
  loader.onProgress.add(showProgress);
  loader.onComplete.add((l:Loader, res) => {
    console.log('res ', l.resources);
    loadComplete(l, res as any, callback);
  });
  loader.load();
  return loader;
}
