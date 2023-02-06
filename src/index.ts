import { Scene, WebGLRenderer, PerspectiveCamera, Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CubeScene } from './CubeScene.js'

export class Application {

  constructor() {
    this.renderer = new WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.cubeScene = new CubeScene();
    this.renderer.setClearColor(0xADD8E6, 1)
    const controls = new OrbitControls( this.cubeScene.camera, this.renderer.domElement );
    document.body.appendChild( this.renderer.domElement );
  }

  run() {
    requestAnimationFrame( this.run.bind(this) );
    this.cubeScene.update();

    this.renderer.render( this.cubeScene.scene, this.cubeScene.camera );
  }
}
