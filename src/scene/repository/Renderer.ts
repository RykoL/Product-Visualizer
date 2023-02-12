import {
  AxesHelper,
  Object3D,
  PerspectiveCamera,
  Scene as ThreeScene,
  Texture,
  WebGLRenderer,
  ACESFilmicToneMapping,
  sRGBEncoding,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RendererError } from "../domain/RendererError";
import { SceneItem } from "../domain/SceneItem";
import { RendererPort } from "../domain/ports/outbound/RendererPort";

interface Dimension {
  width: number;
  height: number;
}

export class Renderer implements RendererPort {
  protected scene: ThreeScene;
  protected camera: PerspectiveCamera;
  private controls: OrbitControls;
  private handle: number = 0;

  constructor(
    protected renderer: WebGLRenderer,
    private _dimension: Dimension
  ) {}

  public initialize() {
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = sRGBEncoding;
    this.scene = new ThreeScene();
    this.camera = new PerspectiveCamera(
      75,
      this._dimension.width / this._dimension.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 20, 0);
    this.camera.lookAt(0, 0, 0);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(new AxesHelper(10));
  }

  private renderFrame() {
    this.handle = requestAnimationFrame(this.renderFrame.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  public start() {
    if (this.scene === undefined || this.camera === undefined) {
      throw new RendererError("Renderer has not been initialized.");
    }

    this.handle = requestAnimationFrame(this.renderFrame.bind(this));
  }

  public stop() {
    cancelAnimationFrame(this.handle);
  }

  addObjects(...objects: Object3D[]) {
    this.scene.add(...objects);
    this.scene.traverse((obj) => {
      console.log(obj);
    });
  }

  removeObjects(...objects: Object3D[]) {
    this.scene.remove(...objects);
    this.scene.traverse((obj) => {
      console.log(obj);
    });
  }

  public applyTransformation(sceneItem: SceneItem) {
    const objectRef = this.scene.getObjectByName(sceneItem.asset.name);
    objectRef.scale.set(
      sceneItem.scale.x,
      sceneItem.scale.y,
      sceneItem.scale.z
    );
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  public setEnvironment(texture: Texture) {
    this.scene.background = texture;
    this.scene.environment = texture;
  }
}
