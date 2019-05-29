function GirdSquare(col,row){

	var self = this;
	self.state = ko.observable(" ");
	self.row = row;
	self.col = col;

}


function GameBoard(){

	var self = this;

	self.topRow = ko.observableArray(
		[ new GirdSquare('leftCol', 'topRow'),
		new GirdSquare('middleCol', 'topRow'),
		new GirdSquare('rightCol', 'topRow')]);

	self.middleRow = ko.observableArray(
		[ new GirdSquare('leftCol', 'middleRow'),
		new GirdSquare('middleCol', 'middleRow'),
		new GirdSquare('rightCol', 'middleRow')]);
	
	self.bottomRow = ko.observableArray(
		[ new GirdSquare('leftCol', 'bottonRow'),
		new GirdSquare('middleCol', 'bottonRow'),
		new GirdSquare('rightCol', 'bottonRow')]);

	self.moves = 0;
	self.state = ko.observable('xturn');

	self.turn = ko.computed(function(){
		var turns;
		var states = self.state();
		switch(states){
			case 'xturn':
				turns ='x';
				break;
			case 'oturn':
				turns ='o';
				break;
			default:
				turns = 'finished';
				break;


		}
		return turns;
	});

	self.message = ko.computed(function(){
		var msg;
		var states = self.state();
		switch(states){
			case 'xturn':
				msg = "X's turn";
				break;
			case 'oturn':
				msg = "O's turn";
				break;
			case 'xwins':
				msg = 'Xwins';
				break;
			case 'owins':
				msg = 'Owins'
				break;
			case 'draw':
				msg = 'draw';
				break;

		}
		return msg;
	});	

}

function Player(name){

	var self = this;
	self.name = name;
	self.squares = {
		topRow: [],
		middleRow: [],
		bottonRow: [],
		leftCol: [],
		middleCol: [],
		rightCol: [],
		leftDiagonal: [],
		rightDiagonal: []

	};

}

function ViewModel(){

	var self = this;

	self.gameBoard = new GameBoard();
	self.playerX = new Player('x');
	self.playero = new Player('o');
	self.currentPlayer = self.playerX;


	self.changeCurrentPlayer = function(){
		self.currentPlayer = self.gameBoard.turn()==='x'? self.playerX: this.playero;

	};


	self.placeMarker = function(gridSquare){
		if(gridSquare.state() === ' ' && self.gameBoard.turn()!== 'finished'){
			self.gameBoard.moves +=1;
			gridSquare.state(self.gameBoard.turn());
			self.addSquareToPlayer(gridSquare);
			if(self.gameBoard.moves>4){
				self.checkForWin(gridSquare.row, gridSquare.col);
			}
			self.changeTurn(self.gameBoard.state());

			self.checkDraw();
			// console.log("state is"+self.gameBoard.turn());

		}
	}; 	


	self.addSquareToPlayer = function(gridSquare){
		// console.log("row is"+gridSquare.row);
		// console.log("col is"+gridSquare.col);
		self.currentPlayer.squares[gridSquare.row].push(0);
		self.currentPlayer.squares[gridSquare.col].push(0);

		if(gridSquare.row === "topRow"){
			if(gridSquare.col === "leftCol"){
				self.currentPlayer.squares.leftDiagonal.push(0);

			} else if(gridSquare.col === "rightCol"){
				self.currentPlayer.squares.rightDiagonal.push(0);
			}

		} else if (gridSquare.row === "middleRow" && 
			gridSquare.col === "middleCol"){
			self.currentPlayer.squares.rightDiagonal.push(0);
			self.currentPlayer.squares.leftDiagonal.push(0);
		}else if(gridSquare.row === "bottomRow"){
			if ( gridSquare.column === "leftColumn" ) {
                    self.currentPlayer.squares.rightDiagonal.push(0);
                } else if ( gridSquare.column === "rightColumn" ) {
                    self.currentPlayer.squares.leftDiagonal.push(0);
                }

		} 



	};
		


	self.changeTurn = function(currentState){

		switch(currentState){
			case 'xturn':
				self.gameBoard.state('oturn');
				break;
			case 'oturn':
				self.gameBoard.state('xturn');
				break;
		}
		self.changeCurrentPlayer();
	};


	self.checkForWin = function(row,col){
		if(row === 'topRow' &&
			(col === 'leftCol' || col === 'rightCol')){
			self.checkDiagonal();
		}else if(row === 'middleRow' &&
			(col === 'midCol')){
			self.changeDiagonal();
		}else if(row === 'bottomRow' &&
			(col === 'rightCol' || col ==='leftCol')){
			self.checkDiagonal();
		}

		self.checkRow(row);
		self.checkCol(col);
	};

	self.checkRow = function(row){
		if(self.currentPlayer.squares[row].length === 3){
			self.gameBoard.state(self.currentPlayer.name+"wins");
		}
	};

	self.checkCol = function(col){
		if(self.currentPlayer.squares[col].length === 3){
			self.gameBoard.state(self.currentPlayer.name+"wins");
		}
	};


	self.checkDiagonal = function(){
		if(self.currentPlayer.squares.leftDiagonal.length === 3){
			self.gameBoard.state(self.currentPlayer.name+"wins");
		}else if(self.currentPlayer.squares.rightDiagonal.length === 3){
			self.gameBoard.state(self.currentPlayer.name+"wins");
		}
	};

	self.checkDraw = function(){
		if(self.gameBoard.moves === 9 &&
			!(self.gameBoard.state() == "xwins" ||
				self.gameBoard.state() == "owins")){
			self.gameBoard.state('draw');
		}

	};
};

ko.applyBindings(new ViewModel());