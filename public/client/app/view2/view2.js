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
	(function (){
		$http.post('/api/v2/twitter/findbyid',{id:$scope.id}).success(function(response){
			var tweets = []
			response.forEach(function(data){
				var tweet = data;
				var dateTime = new Date(tweet.createdAt)
				tweet.createdAt =  dateTime.getMonth()  + "/" + dateTime.getDay() + "/" + dateTime.getFullYear();
				tweets.push(tweet) 
			})
			$scope.stringlist = tweets;
		});
	})()
}]);