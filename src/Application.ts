import {WebGLRenderer} from "three";
import {AssetType} from "./assets/domain/Asset";
import {AssetRegistry} from "./assets/repository/AssetRegistry.js";
import {LoaderFactory} from "./assets/domain/service/LoaderFactory.js";
import {ProductMessageReceiver} from "./scene/application/ProductMessageReceiver.js";
import {EnvironmentService} from "./scene/domain/service/EnvironmentService.js";
import {SceneService} from "./scene/domain/service/SceneService.js";
import {Renderer} from "./scene/repository/Renderer.js";
import {EnvironmentMessageReceiver} from "./scene/application/EnvironmentMessageReceiver";
import {EnvironmentAdapter} from "./scene/repository/EnvironmentAdapter";
import {Scene} from "./scene/domain/Scene";

export class Application {

    private renderer: Renderer;
    private environmentMessageReceiver: EnvironmentMessageReceiver;
    private productMessageReceiver: ProductMessageReceiver;
    private environmentService: EnvironmentService;
    private assetLoader: AssetRegistry;
    private sceneService: SceneService;

    constructor(domElement?: HTMLElement, width?: number, height?: number) {
        const dimension = {
            width: width ?? window.innerWidth,
            height: height ?? window.innerHeight,
        };

        const webglRenderer = new WebGLRenderer();
        webglRenderer.setSize(dimension.width, dimension.height);
        webglRenderer.setClearColor(0xadd8e6, 1);

        this.renderer = new Renderer(webglRenderer, dimension);

        const assetLoader = new AssetRegistry();
        /*assetLoader.registerLoader(
            AssetType.GLTF,
            LoaderFactory.gltfLoader("/libs/")
        );*/

        assetLoader.registerLoader(AssetType.ENVIRONMENT, LoaderFactory.HDRILoader());

        const environmentAdapter = new EnvironmentAdapter(this.renderer, assetLoader)

        this.sceneService = new SceneService(
            this.renderer,
            environmentAdapter,
            this.assetLoader
        );

        this.setupListeners()

        const root = domElement ?? document.body
        root.appendChild(this.renderer.canvas);
    }

    private setupListeners() {
        this.environmentService = new EnvironmentService(
            this.renderer,
            this.assetLoader
        );
        this.environmentMessageReceiver = new EnvironmentMessageReceiver(
            this.environmentService
        );
        this.productMessageReceiver = new ProductMessageReceiver(this.sceneService);
    }

    public async loadScene(scene: Scene) {
        await this.sceneService.loadScene(scene)
    }

    async run() {
        this.renderer.initialize();
        await this.environmentService.initialize();
        this.renderer.start();
    }
}
