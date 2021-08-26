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

const fruits = ["kiwis","bananes","fraises","oranges","mangues"];

for (let fruit of fruits){
    console.log(fruit);
}