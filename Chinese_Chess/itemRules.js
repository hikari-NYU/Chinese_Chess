

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

exports.checkGeneral=checkGeneral
exports.checkAdvisor=checkAdvisor
exports.checkElephant=checkElephant
exports.checkHorse=checkHorse
exports.checkChariot=checkChariot
exports.checkCannon=checkCannon
exports.checkSoldier=checkSoldier
exports.checkSuperSoldier=checkSuperSoldier