var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){

	$scope.sign = {
		name: "Marques Jordan",
		title: "Student",
		school: "General Assembly"
	};


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
		{name: "Player X", board: [], wins: 0, winner: false},
		{name: "Player Y", board: [], wins: 0, winner: false}
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
	$scope.endgame = false;

	$scope.playerPicks = function(thisCell, num) {
		if(thisCell.status != "Empty") return;
	    
	    $scope.movecounter = $scope.movecounter + 1 ;
	    console.log("Cell was: " + thisCell.status) ;
	    
	    if (($scope.movecounter % 2) == 1) {
	      thisCell.status = "X" ;
	      console.log("The current index is " + num);
	      $scope.players[0].board[num] = true;
	      $scope.endgame = $scope.checkWinner($scope.players[0].board);
	      $scope.gameOver($scope.endgame);
	    } else {
	      thisCell.status = "O" ;
	      $scope.players[1].board[num] = true;
	      $scope.endgame = $scope.checkWinner($scope.players[1].board);
	      $scope.gameOver($scope.endgame);
	    }



	    console.log("Cell is now: " + thisCell.status) ;
	    console.log("Counter: " + $scope.movecounter);
    };

    $scope.gameOver = function(game){
	    if(game == true){
			$scope.thewinner ="Winner";

			for($scope.i=0; $scope.i<9; $scope.i++){
				if($scope.boxes[$scope.i].status == "Empty"){
					$scope.boxes[$scope.i].status = "Fill";
				}
			}
		} 
	};


    //passing in the player Object board array property into user
    //Checks to see if there is a winner
    $scope.checkWinner =function (user){

            if( user[4] && ( (user[1] && user[7] ) 
                || (user[3] && user[5]) 
                    || ( user[0] && user[8] )
                        || (user[2] && user[6]) ) ){
            	//alert("Winner");
                return true;
            } 
            else if( user[0] && ( ( user[1] && user[2] ) || ( user[3] && user[6] ) ) ){
                //alert("Winner");
                return true;
            }
            else if( user[8] && ( ( user[2] && user[5] ) || ( user[6] && user[7] ) ) ){
                //alert("Winner");
                return true;
            }
            else{
                return false;
            }

        }



});