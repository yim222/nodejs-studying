
let startWebServices = async () => {

    console.log("Starting WS");
    //Creating web services for my app
    const express = require("express");
    const app = express();
    //we need to use json middleware 

    app.use(express.json());

    const port = 3005;

    //this make express listen to the calls to this localhost.
    app.listen(port, () => {
        console.log("Express listen to this port " + port);
    });

    app.get("/", (req, res) => {
        res.send("WELCOME");
    });

    //handling the db connections and actions:

    const mongoose = require('mongoose');
    //I don't sure what I need to insert here... let's check it



    mongoose.connect('mongodb://localhost:27017/my_database');

    const Cat = mongoose.model('Cat', { name: String });

    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));

    // const Schema = mongoose.Schema;
    // const ObjectId = Schema.ObjectId;

    // const BlogPost = new Schema({
    //     author: ObjectId,
    //     title: String,
    //     body: String,
    //     date: Date
    // });
    /*
    
    All available types:
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
    Decimal128
    Map
    */

    //let's take a stock as an item 

    function Stock(sign, price, isUp) {
        this.sign = sign;
        this.price = price;
        this.isUp = isUp;
    }
    // instance = שכפול
    let stockInstance1 = new Stock("TSLA", 839.29, false);
    const stockSchema = new mongoose.Schema({ sign: String, price: Number, isUp: Boolean, creator: mongoose.Schema.ObjectId });

    const StockMongo = mongoose.model('Stock', stockSchema);



    let stockDbConnection = new StockMongo(stockInstance1);



    app.get("/stocks", async (req, res, next) => {


        let stocks = await StockMongo.find();
        res.send(stocks);

    });

    app.post("/stocks", (req, res, next) => {
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
        
    });
}


module.exports = startWebServices;