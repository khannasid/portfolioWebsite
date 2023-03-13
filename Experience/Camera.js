import * as THREE from 'three';
import Experience from "./experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import { transformWithEsbuild } from 'vite';


export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControl();

    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 28.85;
        this.perspectiveCamera.position.y = 9.18;
        this.perspectiveCamera.position.z = 13.95;
    }

    
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect*this.sizes.frustrum)/2,
            (this.sizes.aspect*this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            50
        );

        // FINAL orthographic camera orientation done!!!

        this.orthographicCamera.position.y = 6;
        this.orthographicCamera.position.z = 9;
        this.orthographicCamera.rotation.z = Math.PI/8.5;
        this.orthographicCamera.position.x = 10;
        this.orthographicCamera.rotation.y = Math.PI/4;
        this.orthographicCamera.rotation.x = -Math.PI/6;
        this.scene.add(this.orthographicCamera);

        // FINAL orthographic camera orientation done!!!

    }
    
    setOrbitControl(){
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;

    }
    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }


    update(){
        // console.log(this.perspectiveCamera.position);
        this.controls.update();
       
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
}