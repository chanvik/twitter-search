var express = require('express')

module.exports = function(app){
	//get the db connection instance
	var db = app.get('db');
	var router = express.Router();

	var getData = function(req, res){
		console.log("I receive a GET request")
		res.end();
	/*	db.tweets.find(function (err, docs) {
			console.log(docs);
			res.json(docs);
		});
	*/

	}

	var pushData = function(req, res){
		console.log(req.body);
		var query = req.body.text;
		/*db.tweets.find({"text": req.body} , function (err, docs) {
			console.log(docs);
			res.json(docs);
		}); 
	*/

	/*db.collection("tweets", {}, function(err, coll) {
    if (err != null) {
      db.createCollection("tweets", function(err, result) {
        assert.equal(null, err);
      });
    }
    db.createIndex("tweets", {
      text: "text"
    }, function(err, indexname) {
      assert.equal(null, err);
    });
   	 
  	});*/

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

	router.route('/searchList')
		.get(getData)
		.post(pushData);

	app.use('/api/v2/twitter',router);
}
