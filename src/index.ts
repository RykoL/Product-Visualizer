import { WebGLRenderer } from "three";
import { AssetType } from "./assets/domain/Asset";
import { AssetRegistry } from "./assets/repository/AssetRegistry.js";
import { LoaderFactory } from "./assets/domain/service/LoaderFactory.js";
import { ProductMessageReceiver } from "./scene/application/ProductMessageReceiver.js";
import { EnvironmentService } from "./scene/domain/service/EnvironmentService.js";
import { SceneService } from "./scene/domain/service/SceneService.js";
import { Renderer } from "./scene/repository/Renderer.js";

export class Application {
  private renderer: Renderer;
  private productMessageReceiver: ProductMessageReceiver;
  private environmentService: EnvironmentService;

  constructor() {
    const dimension = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const webglRenderer = new WebGLRenderer();
    webglRenderer.setSize(dimension.width, dimension.height);
    webglRenderer.setClearColor(0xadd8e6, 1);

    this.renderer = new Renderer(webglRenderer, dimension);
    const assetLoader = new AssetRegistry();
    assetLoader.registerLoader(
      AssetType.GLTF,
      LoaderFactory.gltfLoader("/libs/")
    );
    assetLoader.registerLoader(AssetType.HDRI, LoaderFactory.HDRILoader());
    const sceneService = new SceneService(this.renderer, assetLoader);
    this.environmentService = new EnvironmentService(
      this.renderer,
      assetLoader
    );
    this.productMessageReceiver = new ProductMessageReceiver(sceneService);

    document.body.appendChild(this.renderer.canvas);
  }

  async run() {
    this.renderer.initialize();
    await this.environmentService.initialize();
    this.renderer.start();
  }
}
