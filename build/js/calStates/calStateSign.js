// calStateSign.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateSign = (function() {
	function CalStateSign(parent) {
		this.parent = parent;
	}
	var p = CalStateSign.prototype;
	
	p.onPressDigit = function(digit){
		// prepare to receive 2 numbers
		this.parent.memory = this.parent.buffer;
		this.parent.clearBuffer();
		if(!this.parent.bufferIsFull()){
			this.parent.addDigit(digit);
		}
		this.parent.state = "calStateSecondNumber";
	};
	p.onPressOp = function(op){
		// TODO can do advance operators here
		// ++ and 7=, 8=, 9=
		// now it is just replacing signs
		this.parent.sign = op;
	};
	p.onPressAC = function(){
		// back to start
		this.parent.clearAll();
		this.parent.state = "calStateStart";
	};
	p.onPressCE = function(){
		// proceeds to second number with 0 in buffer
		this.parent.memory = this.parent.buffer;
		this.parent.clearBuffer();
		this.parent.state = "calStateSecondNumber";
	};
	p.onPressEqual = function(){
		// special operation: += -= *= /=
		this.parent.memory = this.parent.buffer;
		this.parent.commit();
		this.parent.state = "calStateAnswer";
	};


	return CalStateSign;

})();