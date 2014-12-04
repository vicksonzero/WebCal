// cal.js

// main calculator controls

// pretending CommonJS
// var config = require("config");
// var calculationModel = require("calculationModelLocal");

var CalStart = (function() {
	function CalStart() {
		this.state = start; // start, firstNum, sign, secondNum,
		this.answer = 0;
		this.buffer = 0;
		this.bufferLength = 0;
		this.op = "";
	}
	var p = CalStart.prototype;
	
	p.onPressDigit = function(digit){


	};
	p.onPressOp = function(op){


	};


	return CalStart;

})();