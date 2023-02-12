import { Asset, AssetType } from "../domain/asset";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { AssetLoader } from "../domain/ports/outbound/AssetLoader";

interface Disposable {
  dispose: () => void;
}

export class AssetRegistry {
  private loaders: Map<AssetType, AssetLoader<unknown>>;
  protected assets: Map<string, GLTF>;

  constructor() {
    this.assets = new Map<string, GLTF>();
    this.loaders = new Map();
  }

  public registerLoader<T>(assetType: AssetType, loader: AssetLoader<T>) {
    this.loaders.set(assetType, loader);
  }

  public get(asset: Asset) {
    return this.assets.get(asset.id);
  }

  public async loadAssets(assets: Asset[]): Promise<GLTF[]> {
    const loadActions = assets.map((asset) => this.loadAsset(asset));
    return await Promise.all(loadActions);
  }

  public async loadAsset(asset: Asset): Promise<GLTF> {
    if (this.assets.get(asset.id)) {
      console.info(`Asset(${asset.id}_${asset.name}) already loaded`);
      return this.assets.get(asset.id);
    }
    const loader = this.loaders.get(asset.assetType);
    const gltf = await loader.load(asset.path);
    this.assets.set(asset.id, gltf);

    return gltf;
  }

  public unloadAssets(assets: Asset[]) {
    assets.forEach((asset) => {
      this.unloadAsset(asset);
    });
  }

  public unloadAsset(asset: Asset) {
    try {
      this.disposeGLTF(this.assets.get(asset.id));
      this.assets.delete(asset.id);
    } catch (e) {
      console.error(e);
    }
  }

  private disposeGLTF(gltf: GLTF) {
    gltf.scene.traverse((obj) => {
      if (this.isDisposableItem(obj)) {
        console.debug(`Disposing 3D object ${obj.name}`);
        obj.dispose();
      } else if (obj instanceof Mesh) {
        console.debug(`Disposing 3D object ${obj.name}`);
        obj.geometry.dispose();
        obj.material.dispose();
      }
    });
  }

  private isDisposableItem(item: unknown): item is Disposable {
    return Object.prototype.hasOwnProperty.call(item, "dispose");
  }
}
