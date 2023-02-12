import {
  type GLTFLoader as ThreeGLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader";
import { AssetLoader } from "../ports/outbound/AssetLoader";

export class GLTFLoader implements AssetLoader<GLTF> {
  constructor(private _gltfLoader: ThreeGLTFLoader) {}

  public async load(path: string): Promise<GLTF> {
    return this._gltfLoader.loadAsync(path);
  }
}
