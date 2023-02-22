import {Asset, AssetType} from "../domain/asset";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {DataTexture, Mesh} from "three";
import {AssetLoader, SupportedAssets} from "../domain/ports/outbound/AssetLoader";

interface Disposable {
    dispose: () => void;
}

export class AssetRegistry {
    private loaders: Map<AssetType, AssetLoader<SupportedAssets>>;
    protected assets: Map<string, GLTF | DataTexture>;

    constructor() {
        this.assets = new Map<string, GLTF | DataTexture>();
        this.loaders = new Map();
    }

    public registerLoader(assetType: AssetType.HDRI | AssetType.GLTF, loader: AssetLoader<SupportedAssets>) {
        this.loaders.set(assetType, loader);
    }

    public get(asset: Asset) {
        return this.assets.get(asset.id);
    }

    public async loadAssets(assets: Asset[]): Promise<SupportedAssets[]> {
        const loadActions = assets.map((asset) => this.loadAsset(asset));
        return await Promise.all(loadActions);
    }

    public async loadAsset(asset: Asset): Promise<SupportedAssets> {
        if (this.assets.get(asset.id)) {
            console.info(`Asset(${asset.id}_${asset.name}) already loaded`);
            return this.assets.get(asset.id);
        }
        const loader = this.loaders.get(asset.type);
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
            //this.disposeGLTF(this.assets.get(asset.id));
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
