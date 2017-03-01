//usin browsersync delete server.js
const express = require('express');
const path = require('path');

const app = express();


//Routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/views/index.html');
});
app.use(express.static(path.join(__dirname, 'src')));

//Start server
const port = process.env.PORT || 3000
app.listen(port, function(req, res){
    console.log('Listening on port' + port);
});