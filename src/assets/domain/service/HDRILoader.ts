import { DataTexture } from "three";
import { type RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { AssetLoader } from "../ports/outbound/AssetLoader";

export class HDRILoader implements AssetLoader<DataTexture> {
  constructor(private _rgbeLoader: RGBELoader) {}

  public async load(path: string): Promise<DataTexture> {
    return this._rgbeLoader.loadAsync(path);
  }
}
