import {
  Scene,
  PerspectiveCamera,
  AxesHelper,
  AmbientLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  MathUtils,
  CircleGeometry,
} from 'three'
import { LoaderFactory } from './assets/repository/LoaderFactory'
import { AssetLoader } from './assets/repository/AssetLoader'
import { avocadoAsset } from './mocks/assets'

export class CubeScene {

  public scene: Scene;
  public camera: PerspectiveCamera

  constructor() {

    const assetLoader = new AssetLoader(LoaderFactory.gltfLoader('/libs/'))

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 15;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.lookAt(0, 0, 0);

    const geometry = new BoxGeometry(10, 1, 10);

    const inner = new MeshBasicMaterial({ color: 0xf0d1a0 })
    const outside = new MeshBasicMaterial({ color: 0xeec07b })
    const mesh = new Mesh(geometry, [outside, outside, inner, inner, outside, outside])

    const groundPlane = new CircleGeometry(10)
    const groundMesh = new Mesh(groundPlane, new MeshBasicMaterial({ color: 0xDDDDDD }))
    groundMesh.rotateX(MathUtils.degToRad(-90))
    this.scene.add(groundMesh)


    this.scene.add(mesh)

    assetLoader.loadAsset(avocadoAsset).then(avo => {
      avo.scene.scale.set(100, 100, 100)
      avo.scene.translateZ(2.5)
      avo.scene.translateY(1)
      avo.scene.rotateX(MathUtils.degToRad(-90))
      this.scene.add(avo.scene)
    })

    const axesHelper = new AxesHelper(10);
    this.scene.add(axesHelper);

    var ambientLight = new AmbientLight(0xFFFFFF, 1);
    this.scene.add(ambientLight);

    this.scene.add(this.camera)
  }

  update() {

  }
}
