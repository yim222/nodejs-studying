//Good to know:
//https://expressjs.com/en/starter/basic-routing.html
//https://expressjs.com/en/guide/routing.html
//show url code

//Helmet and morgan

//Run it with npm init
//https://levelup.gitconnected.com/set-up-and-run-a-simple-node-server-project-38b403a3dc09
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
//They are also run the file

//create a script 


///Middleware - 
/*
Todo : 
some middlewares (remind on the next) -done
Show from the guide :
app.route()
All commands. - done

some function to the same route

router .use if for specifc route, and not all....
I think

What to remember - with the use cases and the need you will know. 


U here - next summary the other things too, and run with it. 

**/

const express = require('express');
const expressApp = express();
const port = 4004;

let counter = 0;
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next();
}

const otherMW = (req, res, next)=>{
    console.log("U R calling to the server");
    next();
}
expressApp.use(myLogger);
expressApp.use(otherMW);

console.log("hi");
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
});

expressApp.all('/',(req,res)=>{

    res.send("U are calling to any of post, get , put etc..")

})

expressApp.get('/firstws', (req, res) => {
  res.send('My first ws')
})
expressApp.post('/firstws', (req, res) => {
  console.log("post");
  res.send('Got a POST request');
})

expressApp.put('/firstws', (req, res) => {
  res.send('Got a PUT request at /firstws')
})


expressApp.delete('/firstws', (req, res) => {
  res.send('Got a DELETE request at /user')
})

//Those are also middleware, and u need to do next
// const handler1= ()=>console.log("I am handler 1");//--> wiil hang the request

const handler1 = (req,res, next)=>{
    console.log("I am handler 1");

    next();
}

const handler2 = (req,res, next)=>{
    console.log("I am handler 2");
    res.send('Two handlers')

    next();
}
expressApp.get("/manyfunctions", [handler1, handler2]);


expressApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
