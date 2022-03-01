const express = require('express');
const expressApp = express();
const port = 4004;

let counter = 0;
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next();
}
expressApp.use(myLogger);

console.log("hi");
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
});

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


expressApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

