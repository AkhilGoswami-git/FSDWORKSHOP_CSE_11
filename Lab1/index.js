 import Eventemitter from "node:events";
 const myEmitter = new Eventemitter();
 myEmitter.on("Greet", (teacher) => {
    console.log(`class started by ${teacher}`);
 });
 myEmitter.on("Exit", (teacher) => {
    console.log(`class finished by ${teacher}`);
 });
 myEmitter.on("Game", (teacher) => {
    console.log(`Football Match `);
    });

 myEmitter.emit("Greet", "Mr. Smith");
 myEmitter.emit("Exit", "Mr. Smith");
 myEmitter.emit("Game");

  
 