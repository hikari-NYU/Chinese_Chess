var initialize=require("./initialize")
var move=require("./move")
var terminate=require("./terminate")

var turn=1;
var Board=initialize.initialize();
var res;
console.log("Game starts!");
//Play
do {
	console.log((turn>0)?"Red's turn!":"Black's turn!");
	var origPos={},destPos={};
	res=move.move(Board[origPos[0],origPos[1]],origPos,destPos,Board);
	if(res!=undefined) {
		turn=-turn;
	}
} while(res!=1 && res!=-1);
terminate(res);

console.log(Board)