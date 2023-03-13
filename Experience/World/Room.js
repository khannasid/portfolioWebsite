import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from "../experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current : 0,
            target : 0,
            ease : 0.1, // governs the smoothness (low value will be more smoother)
        };

        this.setModel();
        this.onMouseMove();

    }
    setModel(){
        //  console.log(this.actualRoom.children);
        this.actualRoom.children[1].children[0].children[0].children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

                if(child.name === "computer"){
                        child.children[9].children[3].material = new THREE.MeshBasicMaterial({
                            map : this.resources.items.screen,
                        })
                }

                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
                // child.scale.set(0,0,0);
                this.roomChildren[child.name.toLowerCase()] = child;
        });
        this.actualRoom.children[0].position.z = 1.1537;
        // this.actualRoom.children[0].scale.set(0,0,0);
        this.roomChildren[this.actualRoom.children[0].name.toLowerCase()] = this.actualRoom.children[0];

        // console.log(this.actualRoom.children[3]);
        
        // for preloader cube
        // this.actualRoom.children[2].scale.set(0,0,0);
        // this.actualRoom.children[2].position.set(0,0,0)
        // this.actualRoom.children[2].rotation.y = Math.PI/4;
        this.roomChildren[this.actualRoom.children[2].name.toLowerCase()] = this.actualRoom.children[2];
        
        
        // Code from Three official docs
        const width = 1;
        const height = 1;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
            );
            rectLight.position.set(0,1,-0.8);
            rectLight.lookAt(0,0,-0.6);
            rectLight.scale.set(0,0,0);
            this.actualRoom.add(rectLight);
            this.roomChildren['rectlight'] = rectLight;
            
            this.scene.add(this.actualRoom);
            this.actualRoom.rotation.y = -Math.PI/4;
            // log Roomchild
            // for(const key in this.roomChildren){
            //         if(this.roomChildren.hasOwnProperty(key)){
            //                 console.log(`${key}: ${this.roomChildren[key]}`);
            //             }
            //         }
        }
        
        onMouseMove(){
                    window.addEventListener("mousemove",(e)=>{
        this.rotation = ((e.clientX - window.innerWidth/2)*2)/window.innerWidth;
        this.lerp.target = this.rotation * 0.1;
    });
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }

}