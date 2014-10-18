var myAPP = angular.module("myApp", []);

myAPP.controller("GameController", function($scope){
	$scope.gameSQ = 3;
	$scope.boxes =[
		{status: 0},
		{status: 0},
		{status: 0},
		{status: 0},
		{status: 0},
		{status: 0},
		{status: 0},
		{status: 0},
		{status: 0}
	];

	$scope.players = [ 
							{name: "Joker", gamepiece: 1, wins: 0},
							{name: "Batman", gamepiece: -1, wins: 0}
							];
	//trigger for winning combo
	$scope.winner = false;
	//ng-show indicator for top div
	$scope.top = true; 
	//ng-show indicator for board div
	$scope.board = false;

	$scope.newgame = false;
 	//ng-show counts the number of clicks
	$scope.clickCounter = 0;
	//keeps track of whose turn;
	$scope.playerTurn = ($scope.clickCount % 2);

	$scope.boardSize = $scope.boxes.length;

	$scope.thewinner = "";

	$scope.currentTurn = 0;

	$scope.setBoard = function(){
		
		if( $scope.gameSQ < 3 || isNaN($scope.gameSQ) || $scope.gameSQ > 6 ){ return; }
		
		console.log($scope.gameSQ);

		$scope.newSize = $scope.gameSQ * $scope.gameSQ;
		console.log($scope.boardSize);
		$scope.reSize = $scope.newSize - $scope.boardSize;

		for($scope.i=0; $scope.i < $scope.reSize; $scope.i++){

			$scope.boxes.push({status: 0});

		}
		$scope.boardSize = $scope.boxes.length;

		$scope.boardSet = true;

		$scope.top = !$scope.top;
		$scope.board = !$scope.board;
		

	};

	$scope.flip = function(thisCell){

		if(thisCell.status != 0){ return; };
		$scope.clickCounter += 1;
		$scope.playerTurn = ($scope.clickCounter % 2);
		if($scope.playerTurn == 1){
			$scope.currentTurn = 1;
			thisCell.status = -1;	
		}else{
			thisCell.status = 1;
			$scope.currentTurn = 0;
		}
		
		$scope.winner = $scope.checkWinner();
		$scope.gameOver($scope.winner, $scope.playerTurn);  
		console.log($scope.playerTurn);
	};


	$scope.gameOver = function(game, counter){
	    if(game == true){
				$scope.thewinner = $scope.players[counter].name + " is the winner";
				$scope.players[counter].wins += 1;

				$scope.currentTurn = $scope.playerTurn;

				for($scope.i=0; $scope.i<9; $scope.i++){
					if($scope.boxes[$scope.i].status == "0"){
						$scope.boxes[$scope.i].status = "Fill";
					}
				}
				$scope.newgame = true;
				
			}
	};
		
	$scope.checkWinner = function(){

		for($scope.rowNum=0;$scope.rowNum<$scope.gameSQ;$scope.rowNum++){
			$scope.boardRowsAdd = 0;
			$scope.boardColsAdd = 0;
			$scope.boardDiag1Add = 0;
			$scope.boardDiag2Add = 0;
			for($scope.colNum=0;$scope.colNum<$scope.gameSQ;$scope.colNum++){
				$scope.boardRowsAdd += $scope.boxes[
																	($scope.rowNum * $scope.gameSQ) + $scope.colNum ].status;

				$scope.boardColsAdd += $scope.boxes[
																	($scope.colNum * $scope.gameSQ) + $scope.rowNum ].status;
				
				if($scope.rowNum == 0){												
					$scope.boardDiag1Add += $scope.boxes[ ($scope.colNum * $scope.gameSQ) + $scope.colNum].status;
					
					console.log("diagnal total" + $scope.boardDiag1Add );

					$scope.boardDiag2Add += $scope.boxes[ ($scope.colNum * $scope.gameSQ) 
																						+ ($scope.gameSQ - $scope.colNum-1) ].status;

					console.log("back diagnal total" + $scope.boardDiag2Add );
				}
				
				
				
				if( ( $scope.boardRowsAdd == (0 - $scope.gameSQ) ) 
					|| ( $scope.boardColsAdd == (0 - $scope.gameSQ) )
						|| ( $scope.boardDiag1Add == (0 - $scope.gameSQ) ) 
							|| ( $scope.boardDiag2Add == (0 - $scope.gameSQ) ) ){
						console.log("Batman Should be a winner");
						return true;
				}else if( ($scope.boardRowsAdd == ($scope.gameSQ) ) 
								|| ( $scope.boardColsAdd == ($scope.gameSQ) )
									|| ( $scope.boardDiag1Add == ($scope.gameSQ) )
										|| ( $scope.boardDiag2Add == ($scope.gameSQ) ) ){
						console.log("Joker Should be a winner");
						return true;
				}


			}
			//console.log("row total" + $scope.boardRowsAdd );
			//console.log("col total" + $scope.boardColsAdd );
			console.log("diagnal total" + $scope.boardDiag1Add );
		}

		

	};

	

	

});