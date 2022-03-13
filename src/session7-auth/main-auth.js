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