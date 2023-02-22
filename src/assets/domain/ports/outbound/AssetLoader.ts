import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {DataTexture} from "three";

export type SupportedAssets = GLTF | DataTexture

export interface AssetLoader<T extends SupportedAssets> {
  load(path: string): Promise<T>;
}
