

function terminate(colorInd) {
	if(colorInd>0) {
		console.log("Red wins!");
	}
	else {
		console.log("Black wins!");
	}
}

exports.terminate=terminate