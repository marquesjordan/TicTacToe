var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){

	$scope.sign = {
		name: "Marques Jordan",
		title: "Student",
		school: "General Assembly"
	};


	//$scope.board = [null,null,null,null,null,null,null,null,null];

	//$scope.boxes = [0,1,2,3,4,5,6,7,8];

	$scope.boxes = [
		{status: "Empty", boxNum: 0},
		{status: "Empty", boxNum: 1},
		{status: "Empty", boxNum: 2},
		{status: "Empty", boxNum: 3},
		{status: "Empty", boxNum: 4},
		{status: "Empty", boxNum: 5},
		{status: "Empty", boxNum: 6},
		{status: "Empty", boxNum: 7},
		{status: "Empty", boxNum: 8}
	];

	$scope.players = [
		{name: "Player X", board: [], wins: 0},
		{name: "Player Y", board: [], wins: 0}
	];



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


	$scope.movecounter = 0;

	$scope.playerPicks = function(thisCell, num) {
		if(thisCell.status != "Empty") return;
	    $scope.movecounter = $scope.movecounter + 1 ;
	    console.log("Cell was: " + thisCell.status) ;
	    if (($scope.movecounter % 2) == 1) {
	      thisCell.status = "X" ;
	      console.log("The current index is " + num);
	      $scope.players[0].board[num] = true;
	      console.log($scope.players[0].board);
	    } else {
	      thisCell.status = "O" ;
	    } 
	    console.log("Cell is now: " + thisCell.status) ;
	    console.log("Counter: " + $scope.movecounter);
    };

    $scope.checkWinner =function (user){

            if( user[4] && ( (user[1] && user[7] ) 
                || (user[3] && user[5]) 
                    || ( user[0] && user[8] )
                        || (user[2] && user[6]) ) ){
                return true;
            } 
            else if( user[0] && ( ( user[1] && user[2] ) || ( user[3] && user[6] ) ) ){
                return true;
            }
            else if( user[8] && ( ( user[2] && user[5] ) || ( user[6] && user[7] ) ) ){
                return true;
            }
            else{
                return false;
            }

        }



});