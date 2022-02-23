const { log } = require("console");
var fs = require("fs");


var showData = "initial data";
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    showData = data.toString();
    //    console.log(data.toString());
    console.log("data from file  ", showData);

});

console.log("Program Ended");




// var fs = require("fs");
// var data = fs.readFileSync('input.txt');

// console.log(data.toString());
// console.log("Program Ended");