function checkMove(item,origPos,destPos,Board) {
	//Check if fits the board
	if(destPos[0]<0 || destPos[0]>8 || destPos[1]<0 || destPos[1]>9) {
		return false;
	}
	//Check if follows rule for item
	return checkItemMove(item,origPos,destPos,Board);
}

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
	check[1]=checkGeneral;
	check[2]=checkAdvisor;
	check[3]=checkElephant;
	check[4]=checkHorse;
	check[5]=checkChariot;
	check[6]=checkCannon;
	check[7]=checkSoldier;
	check[8]=checkSuperSoldier;
	var valid=check[Math.abs(item)](itemMove,origPos,destPos,Board);
	if(valid == true) {
		if(Board[origPos[0],origPos[1]]*Board[destPos[0],destPos[1]]>0) {
			valid=false;
		}
	}
	return valid;
}

function checkGeneral(itemMove,origPos,destPos,Board) {
	if(destPos[0]<3 || destPos[0]>5) {
		return false;
	}
	if(destPos[1]>2 && destPos[1]<7) {
		return false;
	}
	if(Math.abs(itemMove[0])+Math.abs(itemMove[1])!=1) {
		return false;
	}
	return true;
}

function checkAdvisor(itemMove,origPos,destPos,Board) {
	if(destPos[0]<3 || destPos[0]>5) {
		return false;
	}
	if(destPos[1]>2 && destPos[1]<7) {
		return false;
	}
	if(Math.abs(itemMove[0])!=1 || Math.abs(itemMove[1])!=1) {
		return false;
	}
	return true;
}

function checkElephant(itemMove,origPos,destPos,Board) {
	if(origPos[1]==4 || origPos[1]==5) {
		if(itemMove[1]>0) {
			return false;
		}
	}
	if(Math.abs(itemMove[0])!=2 || Math.abs(itemMove[1])!=2) {
		return false
	}
	if(Board[(origPos[0]+itemMove[0]/2),(origPos[1]+itemMove[1]/2)]!=0) {
		return false
	}
	return true;
}

function checkHorse(itemMove,origPos,destPos,Board) {
	if(Math.abs(itemMove[0]*itemMove[1])!=2) {
		return false;
	}
	if(Math.abs(itemMove[0])==2) {
		if(Board[(origPos[0]+itemMove[0]/2),origPos[1]]!=0) {
			return false
		}
	}
	if(Math.abs(itemMove[1])==2) {
		if(Board[origPos[0],(origPos[1]+itemMove[1]/2)]!=0) {
			return false;
		}
	}
	return true;
}

function checkChariot(itemMove,origPos,destPos,Board) {
	if(itemMove[0]*itemMove[1]!=0) {
		return false;
	}
	if(itemMove[0]==0) {
		if(itemMove[1]>0) {
			for(var i=origPos[1]+1;i<destPos[1];i++) {
				if(Board[itemMove[0],i]!=0) {
					return false;
				}
			}
		}
		else {
			for(var i=origPos[1]-1;i>destPos[1];i--) {
				if(Board[itemMove[0],i]!=0) {
					return false;
				}
			}
		}	
	}
	if(itemMove[1]==0) {
		if(itemMove[0]>0) {
			for(var i=origPos[0]+1;i<destPos[0];i++) {
				if(Board[i,itemMove[1]]!=0) {
					return false;
				}
			}
		}
		else {
			for(var i=origPos[0]-1;i>destPos[0];i--) {
				if(Board[i,itemMove[1]]!=0) {
					return false;
				}
			}
		}
	}
	return true;
}

function checkCannon(itemMove,origPos,destPos,Board) {
	if(itemMove[0]*itemMove[1]!=0) {
		return false;
	}
	var intermediate=0;
	if(itemMove[0]==0) {
		if(itemMove[1]>0) {
			for(var i=origPos[1]+1;i<destPos[1];i++) {
				if(Board[itemMove[0],i]!=0) {
					intermediate++;
				}
			}
		}
		else {
			for(var i=origPos[1]-1;i>destPos[1];i--) {
				if(Board[itemMove[0],i]!=0) {
					intermediate++;
				}
			}
		}	
	}
	if(itemMove[1]==0) {
		if(itemMove[0]>0) {
			for(var i=origPos[0]+1;i<destPos[0];i++) {
				if(Board[i,itemMove[1]]!=0) {
					intermediate++;
				}
			}
		}
		else {
			for(var i=origPos[0]-1;i>destPos[0];i--) {
				if(Board[i,itemMove[1]]!=0) {
					intermediate++;
				}
			}
		}
	}
	if(Board[destPos[0],destPos[1]]*Board[origPos[0],origPos[1]]<0) {
		if(intermediate!=1) {
			return false;
		}
	}
	else {
		if(intermediate!=0) {
			return false;
		}
	}
	return true;
}

function checkSoldier(itemMove,origPos,destPos,Board) {
	if(itemMove[0]!=0 || itemMove[1]!=1) {
		return false;
	}
	return true;
}

function checkSuperSoldier(itemMove,origPos,destPos,Board) {
	if(itemMove[1]<0) {
		return false;
	}
	if(itemMove[0]>1 || itemMove[1]>1 || itemMove[0]*itemMove[1]!=0) {
		return false;
	}
	return true;
}

function move(item,origPos,destPos,Board,turn) {
	if(item*turn<0) {
		return undefined;
	}
	var movible=checkMove(item,origPos,destPos,Board);
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

function terminate(colorInd) {
	if(colorInd>0) {
		console.log("Red wins!");
	}
	else {
		console.log("Black wins!");
	}
}

var turn=1;
var Board=initialize();
var res;
console.log("Game starts!");
//Play
/*
do {
	console.log((turn>0)?"Red's turn!":"Black's turn!");
	var origPos={},destPos={};
	res=move.move(Board[origPos[0],origPos[1]],origPos,destPos,Board);
	if(res!=undefined) {
		turn=-turn;
	}
} while(res!=1 && res!=-1);
*/
terminate(res);

console.log(Board)
