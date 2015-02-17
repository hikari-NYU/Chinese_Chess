var checkItemMove=require("./checkItemMove")

/**
item:Int
origPos:array[x,y]
destPos:array[x,y]
*/
function checkMove(item,origPos,destPos,Board) {
	//Check if fits the board
	if(destPos[0]<0 || destPos[0]>8 || destPos[1]<0 || destPos[1]>9) {
		return false;
	}
	//Check if follows rule for item
	return checkItemMove.checkItemMove(item,origPos,destPos,Board);
}

exports.checkMove=checkMove