import Eventemitter from "node:events";
function createDomElement(){
const emitter = new Eventemitter();
return{
    addEventListener(eventType,listener){
        emitter.on(eventType,listener);
    },
    remooveEventListner(eventType,listener){
        emitter.off(eventType,listener);
    },
    dipatchEvent(event){
        event.target=this;
        event.currentTarget=this;
        emitter.emit(event.eventType,event);
    }
}
}


const button=createDomElement();
button.addEventListener('save',()=>{
    console.log("saving...");
})
button.addEventListener('submit',()=>{
    console.log("Data submitted");
})
function handleClick(event){
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`message: ${event.detail}`);
}
button.addEventListener("click",(event)=>{
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`message: ${event.detail}`);
});
button.addEventListener('click',handleClick);
button.dipatchEvent({
    eventType:"save"
});
button.dipatchEvent({
    eventType:"submit"
}); 
