var myApp = angular.module("myApp", ["firebase"]);

myApp.controller("myController", function($scope, $firebase){

	$scope.remoteGameContainer = $firebase(new Firebase("https://gotham-tictactoe.firebaseio.com/") );

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
		{ name: "Joker", 
		  board: [false,false,false,false,false,false,false,false,false], 
		  wins: 0, winner: 0
		},
		{ name: "Batman", 
		  board: [false,false,false,false,false,false,false,false,false], 
		  wins: 0, winner: 1
		}
	];

	$scope.movecounter = 0; // Click Counter
	$scope.endgame = false; // Trigger to end game
	$scope.newgame = false;
	$scope.currentTurn = 1;
	$scope.thewinner = "Nobody";
	//$scope.turn = 1;

	// This container object is what gets synced:
	$scope.gameContainer = {
		moveNum: $scope.movecounter,
		boardArray: $scope.boxes,
		playerArray: $scope.players,
		gameTurn: $scope.currentTurn,
		gameEnd: $scope.endgame,
		gameNew: $scope.newgame,
		gameWinner: $scope.thewinner
	} ;
	
	$scope.remoteGameContainer.$bind($scope, "gameContainer");

	$scope.$watch('gameContainer', function() {
		console.log('gameContainer has chnaged');
	});

	//$scope.currentTurn

	// On click send (board div and index)
	$scope.playerPicks = function(thisCell, num) {
		
		// If box has been selected already
		if(thisCell.status != "Empty") return; 
	    
	    $scope.gameContainer.moveNum = $scope.gameContainer.moveNum + 1 ;
	    
	    if ($scope.gameContainer.gameTurn == 1) {
	      thisCell.status = "O" ;

	      $scope.gameContainer.playerArray[0].board[num] = true;
		  $scope.gameContainer.gameEnd = $scope.checkWinner($scope.gameContainer.playerArray[0].board);
		 
	      $scope.gameOver($scope.gameContainer.gameEnd, $scope.gameContainer.gameTurn);
	      //$scope.gameContainer.gameTurn = 0;

	    } else {
	      thisCell.status = "X" ;

	      $scope.gameContainer.playerArray[1].board[num] = true;
	      $scope.gameContainer.gameEnd = $scope.checkWinner($scope.gameContainer.playerArray[1].board);

	      $scope.gameOver($scope.gameContainer.gameEnd, $scope.gameContainer.gameTurn);
	      //$scope.gameContainer.gameTurn = 1;
	    }

	    if($scope.gameContainer.moveNum == 9 && !$scope.gameContainer.gameEnd){
	    	$scope.gameContainer.gameWinner = "Cats Game"
	    	$scope.gameContainer.gameNew = true;
	    }
    };

    $scope.gameOver = function(game, counter){
    	
	    if(game == true){
			$scope.gameContainer.gameWinner = $scope.gameContainer.playerArray[counter].name + " is the winner";
			$scope.gameContainer.playerArray[counter].wins += 1;

			$scope.gameContainer.gameTurn = $scope.gameContainer.playerArray[counter].winner;

			for($scope.i=0; $scope.i<9; $scope.i++){
				if($scope.gameContainer.boardArray[$scope.i].status == "Empty"){
					$scope.gameContainer.boardArray[$scope.i].status = "Fill";
				}
			}
			$scope.gameContainer.gameNew = true;
			
			//$scope.play = prompt("Do you want to play again?");
		}else{
			
			if($scope.gameContainer.gameTurn == 1){
				$scope.gameContainer.gameTurn = 0;
			}else{
				$scope.gameContainer.gameTurn = 1;
			}
		}
	};

	$scope.restartGame = function(){

		//Loop to Reset Board - and Player trackers
		for($scope.p=0; $scope.p<9; $scope.p++){
			$scope.gameContainer.boardArray[$scope.p].status = "Empty";
			$scope.gameContainer.playerArray[0].board[$scope.p]=false;
			$scope.gameContainer.playerArray[1].board[$scope.p]=false;
		}
		$scope.gameContainer.moveNum = 0; // sets the click to 0
		$scope.gameContainer.gameEnd = false; 
		$scope.gameContainer.gameNew = false;
		//$scope.currentTurn = 0;
		
	}

	$scope.resetGame = function(){

		$scope.gameContainer.playerArray[0].wins=0;
		$scope.gameContainer.playerArray[1].wins=0;
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