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

        this.lerp = {
            current : 0,
            target : 0,
            ease : 0.1, // governs the smoothness (low value will be more smoother)
        };

        this.setModel();
        this.onMouseMove();

    }
    setModel(){
        // console.log(this.actualRoom);
        this.actualRoom.children[0].children[0].children[0].children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                    if(groupchild.name === "Plane"){
                        if(groupchild.children[0].name === "Plane_TV_Screen_0"){
                            groupchild.children[0].material = new THREE.MeshBasicMaterial({
                                map : this.resources.items.screen,
                            })
                        }
                        else{
                            groupchild.children[1].material = new THREE.MeshBasicMaterial({
                                map : this.resources.items.screen,
                            })
                        }
                    }
                });
            // console.log(child);
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.rotation.y = -Math.PI/4;
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