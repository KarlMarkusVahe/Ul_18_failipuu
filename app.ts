import fs from 'fs';

function display(path:string):void{
    console.log(path);
    if(fs.lstatSync(path).isDirectory()){
        for(let subpath of fs.readdirSync(path)){
            display(path+"/"+subpath);
        }
    }
}

display("teekond1/");

function distanceSum(path:string):number{
    if(fs.lstatSync(path).isDirectory()){
        let sum: number=0;
        for(let subpath of fs.readdirSync(path)){
            sum+=distanceSum(path+"/"+subpath);
        }
        return sum;
    }
    return parseInt(fs.readFileSync(path, "utf-8"));
}

console.log(distanceSum("teekond1/"));
console.log(distanceSum("teekond1/neljapaev"));

function distanceMin(path:string):number{
    if(fs.lstatSync(path).isDirectory()){
        let min: number=-1;
        for(let subpath of fs.readdirSync(path)){
            let value=distanceMin(path+"/"+subpath);
            if(value!=-1){
                if(min==-1){min=value;}
                min=value<min?value:min;
            }
        }
        return min;
    }
    return parseInt(fs.readFileSync(path, "utf-8"));
}

function distanceMax(path:string):number{
    if(fs.lstatSync(path).isDirectory()){
        let max: number=-1;
        for(let subpath of fs.readdirSync(path)){
            let value=distanceMax(path+"/"+subpath);
            if(value!=-1){
                if(max==-1){max=value;}
                max=value>max?value:max;
            }
        }
        return max;
    }
    return parseInt(fs.readFileSync(path, "utf-8"));
}

console.log(distanceMin("teekond1"));
console.log(distanceMax("teekond1"));

function distancesLess(path:string, criteria: number):string[]{
    if(fs.lstatSync(path).isDirectory()){
        let result:string[]=[];
        for(let subpath of fs.readdirSync(path)){
            let values=distancesLess(path+"/"+subpath, criteria);
            for(let value of values){
                result.push(value);
            }
        }
        return result;
    }
    let amount=parseInt(fs.readFileSync(path, "utf-8"));
    return amount<criteria?[path]:[];
}

function distancesMore(path:string, criteria: number):string[]{
    if(fs.lstatSync(path).isDirectory()){
        let result:string[]=[];
        for(let subpath of fs.readdirSync(path)){
            let values=distancesMore(path+"/"+subpath, criteria);
            for(let value of values){
                result.push(value);
            }
        }
        return result;
    }
    let amount=parseInt(fs.readFileSync(path, "utf-8"));
    return amount>criteria?[path]:[];
}

console.log(distancesLess("teekond1", 30));
console.log(distancesMore("teekond1", 100));

function findRegistrationNumbers(path:string):string[]{
    if(fs.lstatSync(path).isDirectory()){
        let result:string[]=[];
        for(let subpath of fs.readdirSync(path)){
            let values=findRegistrationNumbers(path+"/"+subpath);
            for(let value of values){
                result.push(value);
            }
        }
        return result;
    }
    let contents=fs.readFileSync(path, "utf-8");
    let matches=contents.match(/[A-Z]{3}-\d{3}/g);
    return matches?matches:[];
}

console.log(findRegistrationNumbers("teekond1"));