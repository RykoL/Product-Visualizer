import {
    Mesh,
    PlaneGeometry,
    EquirectangularReflectionMapping,
    ShadowMaterial, DataTexture,
} from "three";
import {GroundProjectedEnv} from "three/examples/jsm/objects/GroundProjectedEnv";
import {
    beachEnvironment,
    studioEnvironment,
    cozyStudioEnvironment,
} from "../../../mocks/assets";
import {RendererPort} from "../ports/outbound/RendererPort";
import {EnvironmentUseCase} from "../ports/inbound/EnvironmentUseCase";
import {AssetRegistry} from "../../../assets/repository/AssetRegistry";

export class EnvironmentService implements EnvironmentUseCase {
    private environmentPrefix = "ENV";

    constructor(
        protected rendererPort: RendererPort,
        protected assetLoader: AssetRegistry
    ) {
    }

    public addGroundPlane() {
        const geometry = new PlaneGeometry(1, 1);
        const material = new ShadowMaterial({opacity: 0.3});
        const ground = new Mesh(geometry, material);
        ground.scale.setScalar(1000);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.001;
        ground.castShadow = false;
        ground.receiveShadow = true;

        this.rendererPort.addObjects(ground);
    }

    public async loadHDRIBackground() {
        const hdriTexture: DataTexture = await this.assetLoader.loadAsset(beachEnvironment) as DataTexture;
        hdriTexture.mapping = EquirectangularReflectionMapping;

        const env = new GroundProjectedEnv(hdriTexture, {
            height: 20,
            radius: 440,
        });
        env.name = `${this.environmentPrefix}`;
        env.scale.setScalar(800);

        this.rendererPort.addObjects(env);
        this.rendererPort.setEnvironment(hdriTexture);
    }

    public async loadEnvironment(name: string) {
        let envAsset;

        switch (name) {
            case "studio":
                envAsset = studioEnvironment;
                break;
            case "beach":
                envAsset = beachEnvironment;
                break;
            case "cozyStudio":
                envAsset = cozyStudioEnvironment;
                break;
            default:
                envAsset = studioEnvironment;
        }
        console.log(envAsset);
        const hdriTexture = await this.assetLoader.loadAsset(envAsset) as DataTexture;
        hdriTexture.mapping = EquirectangularReflectionMapping;

        const env = new GroundProjectedEnv(hdriTexture, {
            height: 325,
            radius: 40,
        });
        env.name = `${this.environmentPrefix}`;
        env.scale.setScalar(100);

        this.rendererPort.removeObjects(
            this.rendererPort.getSceneObject(this.environmentPrefix)
        );
        this.rendererPort.addObjects(env);
        this.rendererPort.setEnvironment(hdriTexture);
    }

    public changeEnvironmentRadius(radius: number) {
        const env: GroundProjectedEnv = this.rendererPort.getSceneObject(
            this.environmentPrefix
        ) as GroundProjectedEnv;
        env.radius = radius;
    }

    public changeEnvironmentHeight(height: number) {
        const env: GroundProjectedEnv = this.rendererPort.getSceneObject(
            this.environmentPrefix
        ) as GroundProjectedEnv;
        env.height = height;
    }

    public async initialize() {
        this.addGroundPlane();
        await this.loadHDRIBackground();
    }
}
