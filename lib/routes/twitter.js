var express = require('express')
var mongojs = require('mongojs');

module.exports = function(app){
	//get the db connection instance
	var db = app.get('db');
	var router = express.Router();

	var getData = function(req, res){
		console.log("I receive a GET request")
		res.end();
	}

	var pushData = function(req, res){
		var query = req.body.text;

		db.tweets.find({"$text": {"$search" : query}}	, function (err, docs) {
			if (err){
				console.log("Something went wrong" + err);
				return res.json({"err":err})
			}
			if(!docs){
				docs = {};
			}
			console.log(docs);
			return res.json(docs);
		}); 
	}

	var findById = function(req, res){
		var id = req.body.id;
		var ObjectId = mongojs.ObjectId;
		console.log(id);
		db.tweets.find({ _id : ObjectId(id) }, function  (err, docs) {
		 	if (err){
				console.log("Something went wrong" + err);
				return res.json({"err":err})
			}
			if(!docs){
				docs = {};
			}
			console.log(docs);
			return res.json(docs);
		 });
	}

	var savedata =function(req,res){
		var comments=req.body.comments;
		var id = req.body.id;
		console.log("comments: " + comments);
		var ObjectId = mongojs.ObjectId;
		db.tweets.update({ 
			_id: ObjectId(id) 
		},{
			$set: {
				comment: comments
			}
		}, function function_name (err,docs) {
			if (err){
				console.log("Something went wrong" + err);
				return res.json({"err":err})
			}
			db.tweets.find({ _id : ObjectId(id) }, function  (err, docs) {
			 	if (err){
					console.log("Something went wrong" + err);
					return res.json({"err":err});
				}
				if(!docs){
					docs = {};
				}
				console.log(docs);
				return res.json(docs);
		 	});
			
		});
	}

	router.route('/searchList')
		.get(getData)
		.post(pushData);

	router.route('/findbyid')
		.post(findById);

	router.route('/savecomment')
		.post(savedata);


	app.use('/api/v2/twitter',router);
}
