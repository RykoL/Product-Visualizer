import {
  AmbientLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  EquirectangularReflectionMapping,
} from "three";
import { AssetLoader } from "../../../assets/repository/AssetLoader";
import { studioEnvironment } from "../../../mocks/assets";
import { RendererPort } from "../ports/outbound/RendererPort";

export class EnvironmentService {
  constructor(
    protected rendererPort: RendererPort,
    protected assetLoader: AssetLoader
  ) {}

  public addDefaultLight() {
    const ambientLight = new AmbientLight(0xffffff, 1);
    ambientLight.name = "environmentLight";
    this.rendererPort.addObjects(ambientLight);
  }

  public addGroundPlane() {
    const plane = new PlaneGeometry();
    const material = new MeshBasicMaterial({ color: 0xdddddd });
    const mesh = new Mesh(plane, material);
    mesh.name = "environmentGroundPlane";
    mesh.scale.set(100, 100, 100);
    mesh.translateY(-1);
    mesh.rotateX(MathUtils.degToRad(-90));
    this.rendererPort.addObjects(mesh);
  }

  public async loadHDRIBackground() {
    const hdriTexture = await this.assetLoader.loadAsset(studioEnvironment);
    hdriTexture.mapping = EquirectangularReflectionMapping;
    this.rendererPort.setEnvironment(hdriTexture);
  }

  public async initialize() {
    //this.addGroundPlane();
    //this.addDefaultLight();
    this.loadHDRIBackground();
  }
}
