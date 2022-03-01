const imported = require("./module1");
const calc = require("./utils");

console.log("imported:  " , imported);

console.log("calc = ", calc);
// console.log(calc.add(2,7));

console.log(calc.utils.add(2,7));

console.log(calc.utils.substract(55,2));