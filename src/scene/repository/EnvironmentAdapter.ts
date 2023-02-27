import {RendererPort} from "../domain/ports/outbound/RendererPort";
import {AssetRegistry} from "../../assets/repository/AssetRegistry";
import {DataTexture, EquirectangularReflectionMapping, Mesh, PlaneGeometry, ShadowMaterial} from "three";
import {GroundProjectedEnv} from "three/examples/jsm/objects/GroundProjectedEnv";
import { EnvironmentPort } from "../domain/ports/outbound/EnvironmentPort";
import {Environment} from "../domain/Environment";

export class EnvironmentAdapter implements EnvironmentPort {
    private environmentPrefix = "ENV";

    constructor(
        protected rendererPort: RendererPort,
        protected assetLoader: AssetRegistry
    ) {}

    async loadEnvironment(environment: Environment) {
        console.log(environment)
        const hdriTexture: DataTexture = await this.assetLoader.loadAsset(environment.asset) as DataTexture
        hdriTexture.mapping = EquirectangularReflectionMapping

        const env = new GroundProjectedEnv(hdriTexture)
        env.name = `${this.environmentPrefix}`

        this.rendererPort.addObjects(env)
        this.rendererPort.setEnvironment(hdriTexture)
    }
}
