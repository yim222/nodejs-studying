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

//TODO list
// make auth if the user fine, - DONE
// make check to the auth in the add stock function. - DONE
//then make the later. - U here
//Make the request with user. (attach data to user, make it work with unique id
//and in general understand the unique id concept
//Make sign out, make expiring to the token

//Small TODO
// Make the request with user:
/*
- U need first to get the unique id when you are sign-in.
- Then you need to make the verification only when it's attached. - how it's working, how it's stay ok after I'm shtting down?
 */


//need to install : https://www.npmjs.com/package/jsonwebtoken -->For creating json web token object. For example:
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiMzdjOGEzNzM0YThhYjQ2OTE0N2EiLCJpYXQiOjE2NDcxNzEyMDV9.VrGKo00_eKngboXOn9RpesZcPolUSX4ppp8DG-40l0U
//that too: https://www.npmjs.com/package/joi --> For validate provided data vs, what we want.


//Mongoose - validate schema - this make blocking in the db connection level:
//https://mongoosejs.com/docs/validation.html
//https://www.npmjs.com/package/mongoose-unique-validator



//Steps:
//validation examples - with joi validating the object
//We need to make columns not null - but sound like it's not possible
//https://www.tutorialspoint.com/get-all-the-column-names-in-a-table-in-mongodb#:~:text=In%20MongoDB%2C%20there%20is%20no,of%20documents%20to%20store%20items.
//so we need to manually check it.
//Joi - doc https://joi.dev/api/?v=17.6.0


//TODO - Later



//we also need to install "cors" package, it's for later, when we'll run client side app from the localhost.
//npm i cors
//https://www.npmjs.com/package/cors

//Also later... How (and for what) to crypt a password
//https://www.npmjs.com/package/bcrypt
//https://www.npmjs.com/package/joi-password-complexity
//lodash - for what and how .

//if you have time - u can do it with the project... 
//passover again on express, mongo, mongoose, and other doc, for understanding well.



