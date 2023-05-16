import fs from 'fs';
import express, { Express, Request, Response } from "express";
import {stringify} from "querystring";

const app: Express = express();

const directoryPath = 'kolmapaev/'
let sum:number=0;
const filenames: string[] = fs.readdirSync(directoryPath)
console.log(filenames);

// const textFiles: string[] = filenames.filter(filename => filename.endsWith('.txt'))
// auto kiirus kokku
for (const filename of filenames) {
    const filePath = `${directoryPath}/${filename}`
    const contents = fs.readFileSync(filePath, 'utf-8')
    console.log(`Contents of ${filename}: ${contents}`)
}

for(let filename of filenames){
    let contents:string=fs.readFileSync(directoryPath+filename, "utf-8");
    sum+=parseInt(contents);
}
console.log(sum)
// kiirus
let min:number=parseInt(fs.readFileSync(directoryPath+filenames[0], "utf-8"));
let max:number=parseInt(fs.readFileSync(directoryPath+filenames[0], "utf-8"));
let minPlate: string = filenames[0];
for(let filename of filenames) {
    let value: number = parseInt(fs.readFileSync(directoryPath + filename, "utf-8"));
    if(value<min) {
        min=value;
        minPlate = filename;
    }
}
let maxPlate: string = filenames[0];
for(let filename of filenames) {
    let value: number = parseInt(fs.readFileSync(directoryPath + filename, "utf-8"));
    if(value>max) {
        max=value;
        maxPlate = filename;
    }
}

let diff = max - min

console.log(`License plate ${minPlate} has the minimum speed of ${min}`)
console.log(`License plate ${maxPlate} has the maximum speed of ${max}`)
console.log(diff)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

/*app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});*/