// TODO
let express  = require ("express");
expressApp = express ();


function applicationMW(req, res, next){

        console.log("Request to my app");
        next();
}

expressApp.use(applicationMW);
let port = 3000;

expressApp.get("/", (req, res/*, next*/)=>{
    res.send("Hi ");
});

function doSomethingA(avi, moshe, goForward){
    console.log("Handler A");
    goForward();
    // goForward();
    // moshe.send("finished A");//Will generate error 
}


function doSomethingB(avi, moshe, goForward){
    console.log("Handler B");
    moshe.send("Finished response.")
}

expressApp.get("/two-handlers", [doSomethingA, doSomethingB]);

expressApp.get("/declared-function", doSomethingA);



expressApp.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });




//   expressApp.get();
//Lec 7 - until page 10 (exclude)
//Pass over that https://expressjs.com/en/guide/using-middleware.html

//and that https://expressjs.com/en/guide/routing.html

//Helmet:
// https://expressjs.com/en/advanced/best-practice-security.html#use-helmet


//Morgan:
// https://expressjs.com/en/resources/middleware/morgan.html

//Postman - refreshing. alignment

//At home :
//passover this also:
//https://expressjs.com/en/guide/writing-middleware.html



