//See here more 
// https://expressjs.com/en/resources/middleware/morgan.html
var express = require('express')
var morgan = require('morgan')

var app = express()

app.use(morgan('combined'));//that will start to generates logs on each request. (try to comment and see the different)

// let morganMW = 

app.get('/no-morgan', function (req, res) {
    res.send('hello, world!');

})



// app.get('/with-morgan', function (req, res) {
//     var done = finalhandler(req, res)
//     logger(req, res, function (err) {
//         if (err) return done(err)

//         // respond to request
//         res.setHeader('content-type', 'text/plain');
//         res.end('hello, world!')
//     })

// });



app.listen(3006, () => {
    console.log(`Example app listening on port }`)
})


