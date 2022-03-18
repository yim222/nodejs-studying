const {sign} = require("jsonwebtoken");
const jwt = require("jsonwebtoken");


let startWebServices = async () => {
    //Creating web services for my app

    console.log("Starting WS");

    //imports
    const express = require("express");
    const uniqueValidator = require('mongoose-unique-validator');
    const joi = require("joi");
    const jwt = require("jsonwebtoken");


    const app = express();
    //we need to use json middleware 

    app.use(express.json());


    const port = 3005;

    //this make express listen to the calls to this localhost.
    app.listen(port, () => {
        console.log("This is authentication example " + port);
    });


    //WEB SERVICES
    app.get("/", (req, res) => {
        res.send("WELCOME");
    });

    //handling the db connections and actions:

    const mongoose = require('mongoose');
    //I don't sure what I need to insert here... let's check it


    mongoose.connect('mongodb://localhost:27017/my_authenticated_db');

    //let's take a stock as an item 

    function Stock(sign, price, isUp) {
        this.sign = sign;
        this.price = price;
        this.isUp = isUp;
    }

    // instance = שכפול
    let stockInstance1 = new Stock("TSLA", 839.29, false);
    const stockSchema = new mongoose.Schema({
        sign: String,
        price: Number,
        isUp: Boolean,
        creator: mongoose.Schema.ObjectId
    });

    const StockMongo = mongoose.model('Stock', stockSchema);


    app.get("/stocks", async (req, res, next) => {


        let stocks = await StockMongo.find();
        res.send(stocks);

    });

    app.post("/stocks", (req, res, next) => {

        //handling all verification
        // verify(req, res, next);
        const token =  req.header("lingar-auth-token");//whatever you want

        try {
            jwt.verify(token, "currentUser");
            console.log("user ok")
        }catch (e){
            res.send("invalid user: \n" + e.toString());
            return;
        }

        // let isUserSignIn = true;//to change
        // if (!isUserSignIn) {
        //     res.send("User is not sign in");
        //     return;
        //
        //
        // }


        let data = req.body;
        console.log("validateStock(data)? ", validateStock(data))
        //validating data :
        // if (!validateStock(data)){
        //     console.log("not proper object")
        //     res.send("not proper object");
        // }
        let {error} = validateStock(data);
        if (error !== undefined && error.details !== undefined) {
            return res.status(400).send(error.details[0].message);
        }
        let stockInstance2 = new Stock(data.sign, data.price, data.isUp);//
        console.log(stockInstance2);


        let stockDbConnection = new StockMongo(stockInstance2);
        stockDbConnection.save().then(() => {
            console.log("stock added successfully ", stockInstance2);
        });

        res.send("added successfully");
    });


    app.delete("/stocks/:id", (req, res, next) => {
        //todo
    });


    //making users:
    //User Object:
    function User(email, password) {
        this.email = email;
        this.password = password;
    }

    /*
    name: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 50,
      },
     */
    //user schema:
    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            require: true,
            minLength: 4,
            unique: true

            // maxLength
        },
        password: {
            type: String,
            require: true,
            minLength: 4,
            maxLength: 8
        },
        creator: mongoose.Schema.ObjectId
    });
    userSchema.plugin(uniqueValidator);
    const UserMongo = mongoose.model('User', userSchema);


    app.get("/users", async (req, res, next) => {
        let users = await UserMongo.find();
        res.send(users);
    });

    //user js schema

    app.post("/users", (req, res, next) => {

        let data = req.body;
        if (!validateUser(data)) {
            res.send("not valid user");
            return;
        }
        console.log(data)
        let userInstance = new User(data.email, data.password);//


        console.log(userInstance);


        let userDbConnection = new UserMongo(userInstance);

        //U here - there is a problem with the validation here . - it's because u passed it as undefined, and that's the reason we
        //need the joi validator.
        // https://stackoverflow.com/questions/59066852/node-js-express-mongoose-schema-validation-not-working-fine
        // userDbConnection.save().then(() => {
        //     console.log("user added successfully ", userInstance);
        // });

        userDbConnection.save().then(() => {
            res.send("user added successfully");
        }).catch((err) => {
            console.error("error = \n", err);
            res.send(err);
            return;


        });


    });


    //running:

    try {
        let userInstance1 = new User("bbb2345", "33344");//
        let userDbConnection1 = new UserMongo(userInstance1);
        userDbConnection1.save().catch((err) => {
            console.error("error = \n", err);

        });
    } catch (err) {
        console.error("error2 = \n", err);

    }


    function validateStock(stock) {
        // const joiSchema = Joi.object({
        //     name: Joi.string().min(4).max(50).required(),
        //     price: Joi.number().min(1).required(),
        //     color: Joi.string(),
        //     image: Joi.string(),
        // });//stockSchema
        //stock schema isn't enough, we need to create a joi object:
        // const joiSchema = joi.object(stockSchema);//won't work

        //plain object = not with new
        // https://stackoverflow.com/questions/52453407/the-difference-between-object-and-plain-object-in-javascript


        /*
        const stockSchema = new mongoose.Schema({
        sign: String,
        price: Number,
        isUp: Boolean,
        creator: mongoose.Schema.ObjectId
    });
         */
        /*
         const joiSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    price: Joi.number().min(1).required(),
    color: Joi.string(),
    image: Joi.string(),
  });
         */
        let joiObject = {
            sign: joi.string().required(),
            price: joi.number().required(),
            isUp: joi.boolean().required()
        }
        const joiSchema2 = joi.object(joiObject);

        return joiSchema2.validate(stock);
    }

    function validateUser(user) {
        let joiObject = {
            email: joi.string().required(),
            password: joi.string().required()
        }
        const joiSchema = joi.object(joiObject);
        const validation = joiSchema.validate(user);
        return validation.error === undefined;

    }

    //auth
    app.post("/auth", async (req, res, next) => {

        if (!validateUser(req.body)) {
            console.log("not valid user ");
            res.send("not valid user");
            return;//exit the function
        }
        let userDbConnection = new UserMongo();
        // userDbConnection.find

        let userQuery = UserMongo.findOne({email: req.body.email});
        // Query hasn't been executed yet, so Mongoose hasn't casted the filter.
        userQuery.getFilter();

        const user = await userQuery.exec();
        // doc.name; // "Jean-Luc Picard"
        console.log("user = ", user);

        let validDetails = (user !== undefined && req.body.password === user.password);


        // res.send(user.password ? user.password : "Not defined");
        try {
            if (validDetails) {
                const token = getJwt(user);
                res.send("User authenticated token = " + token);
                console.log("User authenticated token = " , token)
                return token;
            } else throw ("Error... ");
        } catch (error) {
            console.error(error);
            res.send("Not valid details");

        }


    });
    //token:
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMxMDRkNThkZjIyNzMzMWRiMTcwNjQiLCJpYXQiOjE2NDczODM4NjN9.QTGjvvHNQUiCnMxV_svsg2pULVsneyPD1nxgNdOYnXU
    //will throw error if token not defined in user
    async function verify(req, res,  next){

        //check the header
        const token = await req.header("lingar-auth-token");//whatever you want

        try {
            // await verifyJwt(token);
            let decoded = jwt.verify("token", "currentUser");
            //No other action needed

        }catch (err){
            console.log("not verified")
            // res.send("not verified");
        }
        finally {
            next();
        }
        //will throw an error if the token isn't right .

    }


    //UTILs auth
    //JWT - https://www.npmjs.com/package/jsonwebtoken
    //sign
    function getJwt(user) {
        console.log("user...", user._id)
        // jwt.sign({userId: user._id},  "secret generate jwt");
        let token = jwt.sign({ _id: user._id }, "currentUser");
        return token;

    }

    //verify
    //If this throws an error, this is not verified
    function verifyJwt(token) {
        jwt.verify(token, "currentUser");//how to pass the object id with that .
    }

    //From the docs https://www.npmjs.com/package/jsonwebtoken
    // To learn it:
    //https://jwt.io/introduction
    //search for: When should you use JSON Web Tokens?
    //You can also make things with the private key pair./

    /*
    From my understanding key pair, is the like in the real world, you have a good lock, with two
    keys that can opening it. So here it's the similar, you sign the jwt with some public/private key,
    and in the next requests you need to assign it to the verification.

     */
    var token = jwt.sign({ foo: 'bar2', userId: "my special id " }, 'shhhhh');
    console.log("token = ", token)


    // verify a token symmetric - synchronous
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded.foo, "user id = ", decoded.userId) // bar

    let token2 = "abc"
    try{
        var decoded2 = jwt.verify(token2, 'shhhhh');
        console.log("decoded 2 ")
        console.log(decoded2.foo)
    }catch (err){
        console.log("decoded err ")

        console.log(err)
    }





}


module.exports = startWebServices;