import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Theme from "./Theme";
import Renderer from "./renderer";
// import Preloader from "./Preloader";

import World from "./World/World";
// import Controls from "./World/Controls";

export default class Experience{
    static instance
    constructor(canvas){
        
        if(Experience.instance){
            return Experience.instance;
        }

        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer(); 
        this.resources = new Resources(assets);
        this.theme = new Theme();
        // model input.
        this.world = new World();
        // this.preloader = new Preloader();
        
        // this.preloader.on("enablecontrols",()=>{
            // this.controls = new Controls();
        // });

        this.time.on("update", ()=>{
            this.update();
        });

        this.sizes.on("resize",()=>{
            this.resize();
        });

    }
    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
}