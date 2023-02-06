import { Asset } from '../domain/asset'
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class AssetLoader {

  constructor(private loader: GLTFLoader) {

  }

  public async loadAsset(asset: Asset): Promise<GLTF> {
    return this.loader.loadAsync(asset.path)
  }
}
