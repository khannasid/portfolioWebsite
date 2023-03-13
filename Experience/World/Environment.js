import * as THREE from "three";
import Experience from "../experience";
import gsap from "gsap";
import GUI from "lil-gui";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI();
        this.obj = {
            colorObj:{r:0, g:0, b:0},
            intensity: 3,
        }

        this.setSunlight();
        // this.setGUI();
    }

    // setGUI(){
    //     this.gui.addColor(this.obj, "colorObj").onChange(()=>{
    //         this.sunLight.color.copy(this.obj.colorObj)
    //         this.ambientLight.color.copy(this.obj.colorObj)
    //         console.log(this.obj.colorObj);
    //     });
    //     this.gui.add(this.obj, "intensity", 0,10).onChange(()=>{
    //         this.sunLight.intensity = this.obj.intensity
    //         this.sunLight.ambientLight = this.obj.intensity
    //     });
    // }

    setSunlight(){

        // Play with Room Lighting!! 
       this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
       this.sunLight.castShadow = true;
       this.sunLight.shadow.camera.far = 20;
       this.sunLight.shadow.mapSize.set(1024*2, 1024*2);
       this.sunLight.shadow.normalBias = 0.05;
       //    const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
       //    this.scene.add(helper);
       // initial value -1.5,7,3
       let t = new THREE.Object3D();
       t.translateX(1).translateY(1).translateZ(1);
       this.sunLight.target = t;
       this.sunLight.position.set(-1.5,10,3);
       this.scene.add(this.sunLight);
       this.scene.add(this.sunLight.target);
       this.scene.add(t);

       this.ambientLight = new THREE.AmbientLight("#ffffff",1);
       this.scene.add(this.ambientLight);

    }

    switchTheme(theme){
        if(theme ==="dark"){
            gsap.to(this.sunLight.color,{
                r:0.1725490,
                g:0.2313725,
                b:0.6862745,
            });
            gsap.to(this.ambientLight.color,{
                r:0.1725490,
                g:0.2313725,
                b:0.6862745,
            });
            gsap.to(this.sunLight,{
                intensity: 0.78
            });
            gsap.to(this.ambientLight, {
                intensity: 0.78
            })
        }else{
            gsap.to(this.sunLight.color,{
                r:1,
                g:1,
                b:1,
            });
            gsap.to(this.ambientLight.color,{
                r:1,
                g:1,
                b:1,
            });
            gsap.to(this.sunLight,{
                intensity: 1.9
            });
            gsap.to(this.ambientLight, {
                intensity: 1.9
            })
        }
    }

    resize(){

    }

    update(){
        
    }
}