var checkMove=require("./checkMove")

function move(item,origPos,destPos,Board,turn) {
	if(item*turn<0) {
		return undefined;
	}
	var movible=checkMove.checkMove(item,origPos,destPos,Board);
	var destItem=Board[destPos[0],destPos[1]];
	if(movible==true) {
		Board[destPos[0],destPos[1]]=Board[origPos[0],origPos[1]];
		Board[origPos[0],origPos[1]]=0;
		if(Math.abs(destItem)==1) {
			//Game ends
			return destItem;
		}
		return false;
	}
	else {
		return undefined;
	}
}

exports.move=move