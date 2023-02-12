import { AssetLoader } from "../repository/AssetLoader";
import { Product } from "../domain/Product";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export class LoadProductUseCase {
  constructor(protected assetLoader: AssetLoader) {}

  public async loadProduct(product: Product): Promise<GLTF[]> {
    return await Promise.all(
      product.assets.map((asset) => this.assetLoader.loadAsset(asset))
    );
  }

  public async unloadProduct(product: Product) {
    product.assets.forEach((asset) => this.assetLoader.unloadAsset(asset));
  }
}
