const mainObject = require("../../utils");
// let generateIdLocally = utils;
console.log("mainObject = ", mainObject);
let generateIdLocal = mainObject.utils.generateId;
let booksMock = [
    { id: generateIdLocal(), name: "bible", author: "God" },
    { id: generateIdLocal(), name: "Harry Poter", author: "John" },
    { id: generateIdLocal(), name: "How to play footbal", author: "Izik Zohar" }
];

// const e = require('express');
const express = require('express');
const expressApp = express();
const port = 3000;
expressApp.use(express.json());
expressApp.get('/', (req, res) => {
    res.send("Welcome books");

})

expressApp.get('/books', (req, res) => {
    res.send(booksMock);

})

expressApp.post("/books", (req, res) => {
    console.log("req= ", req.body);
    let newItem = { id: generateIdLocal() };
    newItem = Object.assign(newItem, req.body);
    console.log("new item, ", newItem);

    booksMock.push(newItem);
    res.send("Post done successfully");
})

expressApp.put("/books/:id", (req, res) => {

    console.log("put request (Update) id = ", req.params.id);

    //google how to update js element in arrray by id. 
    for (let i = 0; i < booksMock.length; i++) {
        if (booksMock[i].id === +req.params.id) {
            booksMock[i] = Object.assign(booksMock[i], req.body);
            break;
        } 
    }
    res.send("put request ");

});

expressApp.delete("/books/:id", (req, res) => {

    booksMock = booksMock.filter((item)=>{
        return item.id !== +req.params.id;
    });
    // //google how to update js element in arrray by id. 
    // for (let i = 0; i < booksMock.length; i++) {
    //     if (booksMock[i].id === +req.params.id) {
    //         booksMock[i] = Object.assign(booksMock[i], req.body);
    //         break;
    //     } 
    // }
    res.send("delete request ");

});

//making the server came up 
expressApp.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
