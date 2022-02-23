const express = require('express');
const expressApp = express();
const port = 4004;


expressApp.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  expressApp.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
