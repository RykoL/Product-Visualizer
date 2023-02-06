import { AssetLoader } from './AssetLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class LoaderFactory {

    public static gltfLoader(decoderPath: string): GLTFLoader {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(decoderPath)

        const loader = new GLTFLoader()
        loader.setDRACOLoader(dracoLoader)

        return loader
    }
}
