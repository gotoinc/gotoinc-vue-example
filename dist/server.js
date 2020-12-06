const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
app = express()
app.use(serveStatic(__dirname))

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)