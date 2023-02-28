import Experience from "../experience";
import Room from "./Room";
import Controls from "./Controls";
import Floor from "./Floor";
import Environment from "./Environment";


export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () =>{
            this.room = new Room();
            this.environment = new Environment();
            this.floor = new Floor();
            this.controls = new Controls();
        });

        // this.room = new Room();
    }

    resize(){

    }

    update(){
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }
}