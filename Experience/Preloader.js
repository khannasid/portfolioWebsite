import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import { resolve } from "path";
// import convertDivsToSpans from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        // convertDivsToSpans(document.querySelector(".intro-text"));
        // convertDivsToSpans(document.querySelector(".hero-main-title"));
        // convertDivsToSpans(document.querySelector(".hero-main-description"));
        // convertDivsToSpans(document.querySelector(".hero-second-subheading"));
        // convertDivsToSpans(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        // console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) =>{
            this.timeline = new GSAP.timeline();

        if(this.device === "desktop"){
            this.timeline.to(this.roomChildren.cube.scale,{
                x:0.87,
                y:1,
                z:1,
                ease: "back.out(2.5)",
                duration: 2,
            })
            .to(this.room.position,{ // change position of whole room including box(all other room stuffs are shrinked/vanished)
                x:-4,
                // y: 1,
                ease: "power1.out",
                duration: 0.7,
                onComplete: resolve,
            }

            );
        }else{
            this.timeline.to(this.roomChildren.cube.scale,{
                x:0.87,
                y:1,
                z:1,
                ease: "back.out(2.5)",
                duration: 2,
            })
            .to(this.room.position,{ // change position of whole room including box(all other room stuffs are shrinked/vanished)
                x:-1,
                z:1,
                ease: "power1.out",
                duration: 0.7,
                onComplete: resolve,

            }

            );
        }
    });
}



    secondIntro() {
        this.secondTimeline = new GSAP.timeline();

        if(this.device === "desktop"){
            this.secondTimeline.to(this.room.position,{ // change position of whole room including box(all other room stuffs are shrinked/vanished)
                x:0,
                y:0,
                z:0,
                ease: "power1.out",
                duration: 0.7,
            }
            );
        }else{
            this.secondTimeline.to(this.room.position,{ // change position of whole room including box(all other room stuffs are shrinked/vanished)
                x:0,
                y:0,
                z:0,
                ease: "power1.out",
                duration: 0.7,
            }

            );
        }
    }



    onScroll(e){
        if(e.deltaY > 0){
            window.removeEventListener("wheel", this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    async playIntro() {
        // this.scaleFlag = true;
        await this.firstIntro();
        // this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        // this.touchStart = this.onTouch.bind(this);
        // this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        // window.addEventListener("touchstart", this.touchStart);
        // window.addEventListener("touchmove", this.touchMove);
    }
    playSecondIntro(){
        this.secondIntro();
    }

}