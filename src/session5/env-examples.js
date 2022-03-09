var express = require('express')
var morgan = require('morgan')

var app = express()

// app.use(morgan('combined'));//that will start to generates logs on each request. (try to comment and see the different)

// let morganMW = 
//SET NODE_ENV=production /whatever you want
app.get('/check-env', function (req, res) {

    let env = app.get('env');
    res.send('Environment is ' + env);

});

let port = 3008;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
