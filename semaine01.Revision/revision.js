const firstName = "Pierre-Antoine";
console.log(firstName);

let age = 19;
age++;
console.log(age);

const test = 1 + true;
const test2 = 125 + "9";
console.log(test);
console.log(test2);

console.log(("b" + "a" + + "a" + "a"));

function displayUser() {
    console.log("Bonjour de la fonction"); 
}

displayUser();

function displayUser2(fName, ageOfUser) {
    console.log(`My name is ${fName}, I am ${ageOfUser}yrs old`);
    
}

displayUser2(firstName, age);
displayUser2("Joe", 69);

const fruits = ["kiwi","banane","fraise","pamplemousse","mangue"];

for (let fruit of fruits){
    console.log(fruit);
}

console.log("==================");

fruits.push("pommes");

fruits.forEach(f => console.log(f));

const sum = (a,b)=>a+b;

const result = sum(12,8);
console.log(result);

const filtre = fruits.filter(f=> f.length >6);
console.log(filtre);

const numbers = [10,20,30,40];
const MULTIPLIER = 3;

const products = numbers.map(n => n*MULTIPLIER).filter(n=> n>75).map(n=>n+9);
console.log(products);
console.log(numbers);

const SpiderMan = {
    hero:'SpiderMan',
    alterEgo:'Peter Parker',
    movies:[{title:'SpiderMan 1'},{title:'SpiderMan 2'},{title:'SpiderMan 3'}]
};

const IronMan = {
    hero:'IronMan',
    alterEgo:'Tony Stark',
    movies:[{title:'IronMan 1'},{title:'IronMan 2'},{title:'IronMan 3'}]
};

class Avenger {
    constructor(hero,alterEgo,movies){
        this.hero = hero;
        this.alterEgo = alterEgo;
        this.movies = movies;
    }

    test(){
        
    }
}

const oneAvenger = new Avenger('Hulk','Bruce Banner', [{title:'The incredible Hulk'},{title:'Hulk Smash'}])
console.log(oneAvenger.hero);
console.log(SpiderMan.hero);