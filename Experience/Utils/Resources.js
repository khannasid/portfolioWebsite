import * as THREE from "three";
import {EventEmitter} from "events";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import Experience from "../experience";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        // console.log(this.assets);
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
        
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfloader = new GLTFLoader();
        this.loaders.dracoloader = new DRACOLoader();
        this.loaders.dracoloader.setDecoderPath("/draco/");
        this.loaders.gltfloader.setDRACOLoader(this.loaders.dracoloader);

    }

    startLoading(){
        for(const asset of this.assets){
            if(asset.type === "glbmodel"){
                this.loaders.gltfloader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset,file);
                });
            }
            else if(asset.type === "videoTexture"){
                //create Video HTML Element.
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path; 
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
                
                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].megaFilter = THREE.NearestFilter
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }

    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;

        if(this.loaded === this.queue){
           this.emit("ready"); 
        }
    }
}