'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello world from controller");

$http.get('/api/v2/twitter/searchlist').success(function(response) {
	console.log("I got the data I requested for");
	$scope.stringlist = response;
})

$scope.submit = function() {
	console.log($scope.string)
	$http.post('/api/v2/twitter/searchlist',$scope.string).success(function(response){
		var tweets = []
		response.forEach(function(data){
			var tweet = data;
			var dateTime = new Date(tweet.createdAt)
			tweet.createdAt =  dateTime.getMonth()  + "/" + dateTime.getDay() + "/" + dateTime.getFullYear();
			tweets.push(tweet) 
		})
		$scope.stringlist = tweets;
	});
};


}]);