
const RegularBoard=[[5,4,3,2,1,2,3,4,5],
	[0,0,0,0,0,0,0,0,0],
	[0,6,0,0,0,0,0,6,0],
	[1,0,1,0,1,0,1,0,1],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[-1,0,-1,0,-1,0,-1,0,-1],
	[0,-6,0,0,0,0,0,-6,0],
	[0,0,0,0,0,0,0,0,0],
	[-5,-4,-3,-2,-1,-2,-3,-4,-5],];
describe("Board initialization",function() {
	var Board={};
	beforeEach(function() {
		Board={};
	});

	afterEach(function() {
		Board={};
	});

	it("Should be a regular board",function() {
		Board=initialize();
		var flag=true;
		for(var i in RegularBoard) {
			if(RegularBoard[i].toString()!=Board[i].toString()) {
				flag=false;
			}
		}
		expect(flag).toEqual(true);
	})
});

describe("Test Move",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,5]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move failed -> return false",function() {
		var msg=move(1,[4,0],[2,0],Board,1);
		expect(msg).toEqual(false);
	});

	it("Move caused termination", function() {
		var msg=move(-5,[0,0],[4,0],Board,-1);
		expect(Math.abs(msg)).toEqual(1);
	});

	it("Move caused termination", function() {
		var msg=move(5,[8,9],[3,9],Board,1);
		expect(Math.abs(msg)).toEqual(1);
	});

	it("Move succeed -> return true",function() {
		var msg=move(-5,[0,0],[0,3],Board,-1);
		expect(msg).toEqual(true);
	});

	it("Out of range",function() {
		var msg=move(-5,[0,0],[-1,0],Board,-1);
		expect(msg).toEqual(false);
	});

	it("Stayed",function() {
		var msg=move(-5,[0,0],[0,0],Board,-1);
		expect(msg).toEqual(false);
	});

	it("Stuck by checks in same side",function() {
		var msg=move(-5,[0,0],[0,9],Board,-1);
		expect(msg).toEqual(false);
	});

	it("Not the turn",function() {
		var msg=move(-5,[0,0],[0,3],Board,1);
		expect(msg).toEqual(false);
	});
})

describe("Test rule for General",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed -> return true",function() {
		var msg=checkItemMove(1,[4,0],[3,0],Board);
		expect(msg).toEqual(true);
	});

	it("Move out of range-X",function() {
		var msg=checkItemMove(-1,[3,9],[2,9],Board);
		expect(msg).toEqual(false)
	});

	it("Move out of range-Y",function() {
		var Board1=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,-1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,0,0,0,0,0,0]];
		var msg=checkItemMove(-1,[3,7],[3,6],Board1);
		expect(msg).toEqual(false)
	});

	it("Move more than 1",function() {
		var msg=checkItemMove(1,[4,0],[4,2],Board);
		expect(msg).toEqual(false);
	});

	it("Move tiltly",function() {
		var msg=checkItemMove(1,[4,0],[5,1],Board);
		expect(msg).toEqual(false);
	});
});

describe("Test rule for Advisor",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,2,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed -> return true",function() {
		var msg=checkItemMove(2,[3,0],[4,1],Board);
		expect(msg).toEqual(true);
	});

	it("Move not tiltly",function() {
		var msg=checkItemMove(2,[3,0],[3,1],Board);
		expect(msg).toEqual(false);
	});

	it("Move out of range-X",function() {
		var msg=checkItemMove(2,[3,0],[2,1],Board);
		expect(msg).toEqual(false);
	});

	it("Move out of range-Y",function() {
		var Board1=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,2,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
		var msg=checkItemMove(2,[3,2],[4,3],Board1);
		expect(msg).toEqual(false);
	});
});

describe("Test rule for Elephant",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,5,0,0,0],
		[0,0,0,0,3,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed -> return true",function() {
		var msg=checkItemMove(3,[4,2],[2,0],Board);
		expect(msg).toEqual(true);
	});

	it("Move breaking rule",function() {
		var msg=checkItemMove(3,[4,2],[3,1],Board);
		expect(msg).toEqual(false);
	});

	it("Stuck by other pieces",function() {
		var msg=checkItemMove(3,[4,2],[6,0],Board);
		expect(msg).toEqual(false);
	});

	it("Not to cross river",function() {
		Board1=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,5,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,3,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
		var msg=checkItemMove(3,[2,4],[0,6],Board1);
		expect(msg).toEqual(false);
	});
});

describe("Test rule for Horse",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,5,4,0,0],
		[0,0,0,0,0,0,5,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed -> return true",function() {
		var msg=checkItemMove(4,[6,1],[8,2],Board);
		expect(msg).toEqual(true);
	});

	it("Move not obeying rule",function() {
		var msg=checkItemMove(4,[6,1],[7,2],Board);
		expect(msg).toEqual(false);
	});

	it("Move stuck by other pieces-X",function() {
		var msg=checkItemMove(4,[6,1],[4,2],Board);
		expect(msg).toEqual(false);
	});

	it("Move stuck by other pieces-Y",function() {
		var msg=checkItemMove(4,[6,1],[7,3],Board);
		expect(msg).toEqual(false);
	});
});

describe("Test rule for Carriot",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,-4,0,5,4,0,0],
		[0,0,0,0,0,0,5,0,0],
		[0,0,0,0,0,0,4,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[-2,0,0,-1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed -> return true",function() {
		var msg=checkItemMove(5,[5,1],[5,9],Board);
		expect(msg).toEqual(true);
	});

	it("Move not obeying the rule",function() {
		var msg=checkItemMove(5,[5,1],[8,2],Board);
		expect(msg).toEqual(false);
	});

	it("Move stuck by other pieces-+0",function() {
		var msg=checkItemMove(5,[5,1],[8,1],Board);
		expect(msg).toEqual(false);
	});

	it("Move stuck by other pieces-0-",function() {
		var msg=checkItemMove(5,[6,2],[6,0],Board);
		expect(msg).toEqual(false);
	});

	it("Move stuck by other pieces--0",function() {
		var msg=checkItemMove(5,[5,1],[0,1],Board);
		expect(msg).toEqual(false);
	});

	it("Move stuck by other pieces-0+",function() {
		var msg=checkItemMove(5,[6,2],[6,9],Board);
		expect(msg).toEqual(false);
	});
});

describe("Test rule for Cannon",function() {
	var Board={};
	beforeEach(function() {
		Board=[[-5,0,0,0,1,0,0,0,0],
		[0,0,0,-4,0,0,0,0,0],
		[0,6,0,0,5,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,-4,0],
		[0,0,0,0,0,0,0,0,0],
		[0,5,0,0,0,0,0,-6,0],
		[0,0,0,0,0,0,0,0,0],
		[0,-3,0,0,0,0,0,0,0],
		[-4,-5,0,-1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed -> return true",function() {
		var msg=checkItemMove(6,[1,2],[1,0],Board);
		expect(msg).toEqual(true);
	});

	it("Move succeed -> return true-other side",function() {
		var msg=checkItemMove(6,[1,2],[1,8],Board);
		expect(msg).toEqual(true);
	});

	it("Move not obeying rule",function() {
		var msg=checkItemMove(6,[1,2],[2,8],Board);
		expect(msg).toEqual(false);
	});

	it("Move not obeying rule-other side",function() {
		var msg=checkItemMove(6,[1,2],[1,7],Board);
		expect(msg).toEqual(false);
	});

	it("Move over too many pieces",function() {
		var msg=checkItemMove(6,[1,2],[1,9],Board);
		expect(msg).toEqual(false);
	});

	it("Move not obeying rule-other side-0+",function() {
		var msg=checkItemMove(6,[1,2],[5,2],Board);
		expect(msg).toEqual(false);
	});

	it("Move not obeying rule-other side--0",function() {
		var msg=checkItemMove(-6,[7,6],[0,6],Board);
		expect(msg).toEqual(false);
	});

	it("Move not obeying rule-other side-0-",function() {
		var msg=checkItemMove(-6,[7,6],[7,0],Board);
		expect(msg).toEqual(false);
	});
});

describe("Test rule for Soldier",function() {
	var Board={};
	beforeEach(function() {
		Board=[[0,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,6,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,7,0,-7,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,5,0,0,7,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,0]];
	});

	afterEach(function() {
		Board={};
	});

	it("Move succeed for normal soldier",function() {
		var msg=checkItemMove(7,[2,4],[2,5],Board);
		expect(msg).toEqual(true);
	});

	it("Move not obeying the rule for normal soldier",function() {
		var msg=checkItemMove(7,[2,4],[3,4],Board);
		expect(msg).toEqual(false);
	});

	it("Move succeed for super soldier",function() {
		var msg=checkItemMove(-7,[4,4],[3,4],Board);
		expect(msg).toEqual(true);
	});

	it("Move succeed for super soldier",function() {
		var msg=checkItemMove(7,[4,6],[5,6],Board);
		expect(msg).toEqual(true);
	});

	it("Move not obeying the rule for super soldier",function() {
		var msg=checkItemMove(-7,[4,4],[4,5],Board);
		expect(msg).toEqual(false);
	});

	it("Move not obeying the rule for super soldier",function() {
		var msg=checkItemMove(-7,[4,4],[2,4],Board);
		expect(msg).toEqual(false);
	});
})