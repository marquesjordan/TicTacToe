var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){

	//Array of Objects to represnt TTT Board
	//Status will change as user click box of indexed object
	$scope.boxes = [
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"},
		{status: "Empty"}
	];

	//Array of player objects:
	//'board' is an array to keep track of player moves 
	$scope.players = [
		{name: "Joker", board: [], wins: 0, winner: false},
		{name: "Batman", board: [], wins: 0, winner: false}
	];


	$scope.movecounter = 0; // Click Counter
	$scope.endgame = false; // Trigger to end game

	// On click send (board div and index)
	$scope.playerPicks = function(thisCell, num) {
		
		// If box has been selected already
		if(thisCell.status != "Empty") return; 
	    
	    $scope.movecounter = $scope.movecounter + 1 ;
	    
	    $scope.turn = ($scope.movecounter % 2);
	    if (($scope.movecounter % 2) == 1) {
	      thisCell.status = "O" ;
	     
	      $scope.players[0].board[num] = true;
	      $scope.endgame = $scope.checkWinner($scope.players[0].board);
	      $scope.gameOver($scope.endgame, $scope.turn);
	    } else {
	      thisCell.status = "X" ;
	      $scope.players[1].board[num] = true;
	      $scope.endgame = $scope.checkWinner($scope.players[1].board);
	      $scope.gameOver($scope.endgame, $scope.turn);
	    }

	    if($scope.movecounter == 9 && !$scope.endgame){
	    	$scope.thewinner = "Cats Game"
	    	$scope.newgame = true;
	    }
    };

    $scope.gameOver = function(game, counter){
	    if(game == true){
			$scope.thewinner = $scope.players[counter].name + " is the winner";
			$scope.players[counter].wins += 1;
			for($scope.i=0; $scope.i<9; $scope.i++){
				if($scope.boxes[$scope.i].status == "Empty"){
					$scope.boxes[$scope.i].status = "Fill";
				}
			}
			$scope.newgame = true;
			//$scope.play = prompt("Do you want to play again?");
		}
	};

	$scope.restartGame = function(){

		//Loop to Reset Board - and Player trackers
		for($scope.p=0; $scope.p<9; $scope.p++){
			$scope.boxes[$scope.p].status = "Empty";
			$scope.players[0].board[$scope.p]=false;
			$scope.players[1].board[$scope.p]=false;
		}
		$scope.movecounter = 0; // sets the click to 0
		$scope.endgame = false; 
		$scope.newgame = false;
		
	}

	$scope.resetGame = function(){

		$scope.players[0].wins=0;
		$scope.players[1].wins=0;
		//Loop to Reset Board - and Player trackers
		$scope.restartGame();
	}

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