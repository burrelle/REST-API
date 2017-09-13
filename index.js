var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/api');
var mongoose = require('mongoose');

//Set up express app
var app = express();
var port = 4000;

//Connect to MongoDB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

//
app.use(express.static('public'));

app.use(bodyParser.json());

//Initialize Routes
app.use('/api', routes);

//Error Handling Middleware
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
})

//Listen to a specified port number
app.listen(port, function(){
  console.log("Express listening on port: "+ port +". Press CTRL + C to quit");
});
