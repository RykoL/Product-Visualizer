import { Object3D, Texture, WebGLRenderer } from "three";

export interface RendererPort {
  getRenderer(): WebGLRenderer;
  addObjects(...objects: Object3D[]): void;
  removeObjects(...objcets: Object3D[]): void;
  setEnvironment(texture: Texture): void;
}
