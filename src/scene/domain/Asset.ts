import { Matrix } from "three";

export enum AssetType {
  GLTF = "GLTF",
  HDRI = "HDRI",
}

export class SceneAsset {
  id: string;
  name: string;
  path: string;
  type: AssetType;
  initialTransform: Matrix;
}
