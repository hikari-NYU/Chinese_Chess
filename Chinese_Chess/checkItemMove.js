var itemRules=require("./itemRules")

/**
1 General
2 Advisor
3 Elephant
4 Horse
5 Chariot
6 Cannon
7 Soldier
*/
function checkItemMove(item,origPos,destPos,Board) {
	var itemMove;
	if(item<0) {
		itemMove=[origPos[0]-destPos[0],origPos[1]-destPos[1]];
	}
	else {
		itemMove=[destPos[0]-origPos[0],destPos[1]-origPos[1]];
	}
	if(itemMove[0]==itemMove[1]==0) {
		return false;
	}
	if(item==7 && origPos[1]>=5) {
		item=8;
	}
	if(item=-7 && origPos[1]<=4) {
		item=8;
	}
	var check={};
	check[1]=itemRules.checkGeneral;
	check[2]=itemRules.checkAdvisor;
	check[3]=itemRules.checkElephant;
	check[4]=itemRules.checkHorse;
	check[5]=itemRules.checkChariot;
	check[6]=itemRules.checkCannon;
	check[7]=itemRules.checkSoldier;
	check[8]=itemRules.checkSuperSoldier;
	var valid=check[Math.abs(item)](itemMove,origPos,destPos,Board);
	if(valid == true) {
		if(Board[origPos[0],origPos[1]]*Board[destPos[0],destPos[1]]>0) {
			valid=false;
		}
	}
	return valid;
}

exports.checkItemMove=checkItemMove