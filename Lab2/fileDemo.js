import fs from "node:fs/promises";
const filePath="data.txt";
async function createFile(content){
    try{
        await fs.writeFile(filePath, content, "utf8");
        console.log("File created successfully");
    } catch (error) {
        console.error("Error creating file:", error);
    }
}
async function readFile(){
    try{
    const content=await fs.readFile(filePath,"utf8");
    console.log("File content:", content);
} catch (error) {
    console.error("Error reading file:", error);
} 
}
createFile("Hello, this is a sample content for the file.");
readFile(); 
async function appendToFile(content){
    try{
        await fs.appendFile(filePath, content, "utf8");
        console.log("Content appended successfully");
    } catch (error) {
        console.error("Error appending to file:", error);
    }  
}
async function deleteFile(){
    try{
        await fs.unlink(filePath);
        console.log("File deleted successfully");
    } catch (error) {
        console.error("Error deleting file:", error);
    }   
}