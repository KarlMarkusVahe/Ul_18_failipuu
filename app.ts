import fs from 'fs';

let startdir:string="teekond1/"

function displayDirectoryData(dirname:string){
    console.log(dirname)
    let filenames:string[] = fs.readdirSync(startdir+dirname);
    let maxMileage: number = -1;
    let maxMileagePlate: string = "";
    for(let filename of filenames){
        let contents:string=fs.readFileSync(startdir+dirname+"/"+filename, "utf-8");
        let mileage: number =parseInt(contents)
        if (mileage > 30) {
            console.log("  " + filename, contents);
        if (mileage > maxMileage) {
            maxMileage = mileage;
            maxMileagePlate = filename;
        }
    }
}
console.log(`Highest mileage of the day: ${maxMileage} (Car number: ${maxMileagePlate})`);
}

let dirnames:string[] = fs.readdirSync(startdir);
for(let dirname of dirnames){
    displayDirectoryData(dirname);
}

function sumDirectoryData(dirname:string):number{
    let filenames:string[] = fs.readdirSync(dirname);
    let sum: number=0;
    for(let filename of filenames){
        let contents:string=fs.readFileSync(dirname+"/"+filename, "utf-8");
        sum+=parseInt(contents);
    }
    return sum;
}

let sum1: number = sumDirectoryData("teekond1/kolmapaev/");
let sum2: number = sumDirectoryData("teekond1/neljapaev/");
let totalSum: number = sum1 + sum2;

console.log("Sum of teekond1/kolmapaev/: " + sum1);
console.log("Sum of teekond1/neljapaev/: " + sum2);
console.log("Total sum: " + totalSum);

function getHighestMileageForDay(dayDirPath: string): number {
    let filenames: string[] = fs.readdirSync(dayDirPath);
    let highestMileage: number = -1;
    for (let filename of filenames) {
        let contents: string = fs.readFileSync(dayDirPath + "/" + filename, "utf-8");
        let mileage: number = parseInt(contents);
        if (mileage > highestMileage) {
            highestMileage = mileage;
        }
    }
    return highestMileage;
}

let dayDirPath: string = "teekond1/neljapaev";
let highestMileage: number = getHighestMileageForDay(dayDirPath);
console.log(`Highest mileage for ${dayDirPath}: ${highestMileage}`);

function minDayData(dirname:string){
    let values:number[]=fs.readdirSync(dirname).map(filename =>
        parseInt(fs.readFileSync(dirname+"/"+filename, "utf-8") ));
    return Math.min(...values);
}

function minDaysData(startdir:string){
    let daynames:string[]=fs.readdirSync(startdir);
    let values:number[]=daynames.map(dayname => minDayData(startdir+dayname));
    return Math.min(...values);
}

function maxDaysData(startdir:string){
    let daynames:string[]=fs.readdirSync(startdir);
    let values:number[]=daynames.map(dayname => getHighestMileageForDay(startdir+dayname))
    return Math.max(...values)
}

console.log(minDayData("teekond1/kolmapaev/"));
console.log(minDaysData("teekond1/"));
console.log(maxDaysData("teekond1/"));

function getHighestSumOfMileage(startdir:string) {
    let daynames: string[] = fs.readdirSync(startdir);
    let highestSum: number = 0;
    for (let dayname of daynames) {
        let filenames: string[] = fs.readdirSync(startdir + dayname);
        let sum: number = 0;
        for (let filename of filenames) {
            let contents: string = fs.readFileSync(startdir + dayname + "/" + filename, "utf-8");
            sum += parseInt(contents);
        }
        if (sum > highestSum) {
            highestSum = sum;
        }
    }
    return highestSum;
}

console.log(getHighestSumOfMileage("teekond1/"));

function calculateDailyTotals(startdir:string){
    let daynames:string[]=fs.readdirSync(startdir);
    let totals:number[]=daynames.map(dayname => sumDirectoryData(startdir+dayname));
    return totals;
}

let dailyTotals: number[] = calculateDailyTotals("teekond1/");
let highestTotal: number = Math.max(...dailyTotals);
let lowestTotal: number = Math.min(...dailyTotals);
let difference: number = highestTotal - lowestTotal;

console.log("Highest total mileage for the day: " + highestTotal);
console.log("Lowest total mileage for the day: " + lowestTotal);
console.log("Difference: " + difference);