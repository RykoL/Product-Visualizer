import { WebGLRenderer } from "three";
import { AssetType } from "./assets/domain/Asset";
import { AssetRegistry } from "./assets/repository/AssetRegistry.js";
import { LoaderFactory } from "./assets/domain/service/LoaderFactory.js";
import { ProductMessageReceiver } from "./scene/application/ProductMessageReceiver.js";
import { EnvironmentService } from "./scene/domain/service/EnvironmentService.js";
import { SceneService } from "./scene/domain/service/SceneService.js";
import { Renderer } from "./scene/repository/Renderer.js";
import { EnvironmentMessageReceiver } from "./scene/application/EnvironmentMessageReceiver";

export class Application {

  private renderer: Renderer;
  private environmentMessageReceiver: EnvironmentMessageReceiver;
  private productMessageReceiver: ProductMessageReceiver;
  private environmentService: EnvironmentService;

  constructor(domElement?: HTMLElement) {
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
    this.environmentMessageReceiver = new EnvironmentMessageReceiver(
      this.environmentService
    );
    this.productMessageReceiver = new ProductMessageReceiver(sceneService);

    const root = domElement ?? document.body
    root.appendChild(this.renderer.canvas);
  }

  async run() {
    this.renderer.initialize();
    await this.environmentService.initialize();
    this.renderer.start();
  }
}
