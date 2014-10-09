var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){

	$scope.sign = {
		name: "Marques Jordan",
		title: "Student",
		school: "General Assembly"
	};

	//$scope.boxes = [null,null,null,null,null,null,null,null,null];

	$scope.boxes = [0,1,2,3,4,5,6,7,8];

	/*$scope.boxes = {
		boxnum: 0,
		boxnum: 1,
		boxnum: 2,
		boxnum: 3,
		boxnum: 4,
		boxnum: 5,
		boxnum: 6,
		boxnum: 7,
		boxnum: 8
	};*/



	$scope.changeBox = function(){
		$scope.test = true;
		// $scope.bg = "br"
	}

	$scope.row = function(){
		if(($scope.$index % 3) == 0){
			return true;
		}
	}

	$scope.makeMove = function(num){
		console.log(num);
		$scope.myX = "X";
	}



});