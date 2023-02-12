import { HDRILoader } from "./HDRILoader";
import { GLTFLoader } from "./GLTFLoader";
import { GLTFLoader as ThreeGLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export class LoaderFactory {
  public static gltfLoader(decoderPath: string): GLTFLoader {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(decoderPath);

    const loader = new ThreeGLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    return new GLTFLoader(loader);
  }

  public static HDRILoader(): HDRILoader {
    return new HDRILoader(new RGBELoader());
  }
}
