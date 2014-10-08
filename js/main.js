var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){

	$scope.sign = {
		name: "Marques Jordan",
		title: "Student",
		school: "General Assembly"
	};

	//$scope.boxes = [null,null,null,null,null,null,null,null,null];

	$scope.boxes = [0,1,2,3,4,5,6,7,8];

});