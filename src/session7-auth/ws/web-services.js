let startWebServices = async () => {

    console.log("Starting WS");
    //Creating web services for my app
    const express = require("express");
    const app = express();
    //we need to use json middleware 

    app.use(express.json());
    const uniqueValidator = require('mongoose-unique-validator');


    const port = 3005;

    //this make express listen to the calls to this localhost.
    app.listen(port, () => {
        console.log("This is authentication example " + port);
    });

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
        let isUserSignIn = false;
        if (!isUserSignIn) {
            res.send("User is not sign in");
            return;


        }
        console.log("after send")
        let data = req.body;
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


    app.get("/users", async (req,res, next)=>{
        let users = await UserMongo.find();
        res.send(users);
    });

    //user js schema

    app.post("/users", (req, res, next) => {

        let data = req.body;
        let userInstance = new User( data.password);//


        console.log(userInstance);


        let userDbConnection = new UserMongo(userInstance);

        //U here - there is a problem with the validation here . - it's because u passed it as undefined, and that's the reason we
        //need the joi validator.
        // https://stackoverflow.com/questions/59066852/node-js-express-mongoose-schema-validation-not-working-fine
        // userDbConnection.save().then(() => {
        //     console.log("user added successfully ", userInstance);
        // });

        userDbConnection.save().then((res)=>{
            res.send("user added successfully");
        }).catch((err)=>{
            console.error("error = \n", err);
            res.send(err);
            return;


        });


    });


    //running:

    try {
        let userInstance1 = new User("bbb2345","33344");//
        let userDbConnection1 = new UserMongo(userInstance1);
        userDbConnection1.save().catch((err)=>{
            console.error("error = \n", err);

        });
    }catch (err){
        console.error("error2 = \n", err);

    }







}


module.exports = startWebServices;