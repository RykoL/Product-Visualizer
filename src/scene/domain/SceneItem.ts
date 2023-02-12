import { Vector3 } from "three";
import { SceneAsset } from "./Asset";

export class SceneItem {
  asset: SceneAsset;
  scale: Vector3;
  translation: Vector3;
  rotation: Vector3;

  constructor() {
    this.scale = new Vector3(1, 1, 1);
    this.translation = new Vector3();
    this.rotation = new Vector3(1, 1, 1);
  }
}
