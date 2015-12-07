'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'TweetCommentCtrl'
  });
}])

.controller('TweetCommentCtrl', ["$scope", "$routeParams", "$http", function($scope, $routeParams , $http ) {
	$scope.id = $routeParams.id;
	$scope.tweet = {
		comment : ""
	};
	$scope.tweets = {}
	(function (){
		$http.post('/api/v2/twitter/findbyid',{id:$scope.id}).success(formatData);
	})()

	$scope.save=function(){
		var tweet = $scope.tweets[0];
		var comments = tweet.comment && tweet.comment.length>0 ? tweet.comment : [];
		comments.push($scope.tweet.comment);
		$scope.tweet.comment = "";
		$http.post('/api/v2/twitter/savecomment',{id:$scope.id, comments:comments}).success(formatData);
	}

	function formatData(response){
		var tweets = []
		$scope.tweets = response;	
		response.forEach(function(data){
			var tweet = data;
			var comment = [];
			if(tweet.comment){
				tweet.comment.forEach(function(data){
					comment.push({text:data});
				})
				tweet.comment = comment;
			}
			var dateTime = new Date(tweet.createdAt)
			tweet.createdAt =  dateTime.getMonth()  + "/" + dateTime.getDay() + "/" + dateTime.getFullYear();
			tweets.push(tweet) 
		})
		$scope.stringlist = tweets;
	}
}]);