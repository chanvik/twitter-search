var express = require('express');
var mongojs = require('mongojs');
var PORT = 3000;

var TwitterApi = module.exports =  function(){

}

TwitterApi.prototype.init = function(){
	var self = this;
	var app = express();
	//connecttion to db
	var db =mongojs('twitter',['tweets']);
	//save db instance 
	app.set('db',db);
	//parsing request objects
	var bodyParser = require('body-parser');
	app.use(express.static(__dirname + "/public/client/app",{index:'index.html'}));
	app.use(bodyParser.json());
	//set app as a member of TwitterApi class
	self.app = app;
	//set-up routes
	require('./lib/routes/index')(self.app)
	//start the server
	self.app.listen(PORT, function  (argument) {
		console.log("App Server Started at port Number: " + PORT);
	});
}