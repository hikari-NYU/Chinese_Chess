

function initialize() {
	var Board={};
	Board[0]=[5,4,3,2,1,2,3,4,5];
	Board[1]=[0,0,0,0,0,0,0,0,0];
	Board[2]=[0,6,0,0,0,0,0,6,0];
	Board[3]=[1,0,1,0,1,0,1,0,1];
	Board[4]=[0,0,0,0,0,0,0,0,0];
	Board[5]=[0,0,0,0,0,0,0,0,0];
	Board[6]=[-1,0,-1,0,-1,0,-1,0,-1];
	Board[7]=[0,-6,0,0,0,0,0,-6,0];
	Board[8]=[0,0,0,0,0,0,0,0,0];
	Board[9]=[-5,-4,-3,-2,-1,-2,-3,-4,-5];
	return Board;
}

exports.initialize=initialize