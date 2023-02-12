import { SceneAsset } from "./Asset";
import { SceneItem } from "./SceneItem";

export class Scene {
  private items: SceneItem[];
  private _assets: SceneAsset[];

  constructor() {
    this.items = [];
    this._assets = [];
  }

  public addAssets(assets: SceneAsset[]) {
    this._assets.push(...assets);
  }

  public removeAssets(assets: SceneAsset[]) {
    this._assets.filter((asset) => !assets.includes(asset));
  }

  get assets(): SceneAsset[] {
    return this._assets;
  }
}
