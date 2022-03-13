/*
Here we'll learn how to make user-authentication.

In general it's working that when a user sign in, successfully he gets from the server,
some special card - "token", string with many randoms chars.

From now on, when the user want to get connected to the server for authorized action (like send his mail),
he need to attach this token to the request.

This will happen by adding to the request "header" some specific var.

This is the story, now in the code we can see how it's working.

 */
//I am taking the example from session 6.
console.log("Hi authentication example");

const ws = require("./ws/web-services");

ws();
//TODO - NOW
//now, let's say that I want it to be authenticated. This means that only sign-in user will be able to add a stock.

//need to install : https://www.npmjs.com/package/jsonwebtoken -->For creating json web token object. For example:
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiMzdjOGEzNzM0YThhYjQ2OTE0N2EiLCJpYXQiOjE2NDcxNzEyMDV9.VrGKo00_eKngboXOn9RpesZcPolUSX4ppp8DG-40l0U
//that too: https://www.npmjs.com/package/joi --> For validate provided data vs, what we want.

//Steps:
//validation examples




//TODO - Later
//Make the request with user.
//Make sign out, make expiring to the token


//we also need to install "cors" package, it's for later, when we'll run client side app from the localhost.
//npm i cors
//https://www.npmjs.com/package/cors

//Also later... How (and for what) to crypt a password
//https://www.npmjs.com/package/bcrypt
//https://www.npmjs.com/package/joi-password-complexity
//lodash - for what and how .

//Mongoose - validate schema:
//https://mongoosejs.com/docs/validation.html

