 
 console.log("This is starting point of my code");
process.nextTick(() => {
    console.log("This is process.nextTick");
});
setTimeout(() => {
    console.log("This is first Timeout operation");
}, 10000);
setImmediate(() => {
    console.log("This is setImmediate operation");
});
setTimeout(() => {
    console.log("This is second Timeout operation");
}, 5000);
console.log("This is the end point of my code");