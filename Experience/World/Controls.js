import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from "../experience";
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger';
import ASScroll from '@ashthornton/asscroll';

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes= this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child)=>{
            if(child.type === "RectAreaLight"){
                this.rectLight = child;
            }
        });
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
        this.setScrollTrigger();
    }

    setupASScroll(){
        // from official asscroll GitHub
        const asscroll = new ASScroll({
            disableRaf: true
        });
        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });
        ScrollTrigger.scrollerProxy(asscroll.containerElement,{
            scrollTop(value){
                if(arguments.length){
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect(){
                return{
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh",asscroll.resize);

        requestAnimationFrame(()=>{
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){

        ScrollTrigger.matchMedia({
            // Desktop version
            "(min-width: 969px)": ()=>{

                // Hardcoded Values
                this.rectLight.width = 1;
                this.rectLight.height= 1;

                this.room.scale.set(1,1,1);

                // First section!
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position,{
                    x:()=>{
                        return this.sizes.width*0.004
                    }
                });

                // second section
                
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.position,{
                    x:()=>{
                        return 1;
                    },
                    z:()=>{
                        return this.sizes.height*0.005;
                    }
                }, "same");
                this.secondMoveTimeline.to(this.room.scale,{
                    x:1.94,
                    y:1.94,
                    z:1.94,
                }, "same");
                this.secondMoveTimeline.to(this.rectLight,{
                    width:1.94,
                    height:1.94,
                }, "same");

                // Third Section...
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                // transition of Contact Me section.
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position,{
                    y: 1.5,
                    x: -2,
                });

            },
            // Mobile version
            "(max-width: 968px)": ()=>{

                // Reset the scales
                this.room.scale.set(0.8, 0.8,0.8);
                this.rectLight.width = 0.8;
                this.rectLight.height = 0.8;
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x:0.95,
                    y:0.95,
                    z:0.95,
                }, "same").to(this.rectLight,{
                    width:0.95,
                    height:0.95,
                }, "same");

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x:1.5,
                    y:1.5,
                    z:1.5,
                },"same").to(this.rectLight,{
                    width:1.5,
                    height:1.5,
                },"same").to(this.room.position,{
                    x:1,
                    z:2,
                },"same");
                
                //Third Section.

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x:1.9,
                    y:1.9,
                    z:1.9,
                },"same").to(this.rectLight,{
                    width:1.9,
                    height:1.9,
                },"same").to(this.camera.orthographicCamera.position,{
                    y: 2.3,
                    x: -2,
                    z: 1.4,
                },"same");;
            },
            all: () =>{
                // start from here
                
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section)=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        // console.log("here!!");
                        GSAP.to(section,{
                            borderTopLeftRadius:10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                // markers: true,
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section,{
                            borderBottomLeftRadius:700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                // markers: true,
                                scrub: 0.6,
                            }
                        })
                    }else{
                        // console.log("there!!");
                        GSAP.to(section,{
                            borderTopRightRadius:10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                // markers: true,
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section,{
                            borderBottomRightRadius:700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                // markers: true,
                                scrub: 0.6,
                            }
                        })
                    }
                    GSAP.from(this.progressBar,{
                        scaleY:0,
                        scrollTrigger:{
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
                })

                //Circle animation

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleFirst.scale,{
                    x: 3,
                    y: 3,
                    z: 3,
                });

                // second section
                
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleSecond.scale,{
                    x:3,
                    y:3,
                    z:3,
                });
                
                // Third Section...
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        // markers:true,
                        start:"top top",
                        end:"bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleThird.scale,{
                    x:3,
                    y:3, 
                    z:3,
                },"same").to(this.room.position,{
                    y:0.4,
                },"same");


                // Telephone animation
                 this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        // markers: true,
                        start: "center center",
                        // end: "bottom bottom",
                        // scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                }).to(this.room.children[0].position, {
                    x:-1.344099998474121,
                    y:1.0219000577926636,
                    z:1.4336999654769897,
                    ease: "back.out(2)",
                    duration: 1
                })
            },
        });


    }
  
    resize(){

    }

    update(){
    }

}