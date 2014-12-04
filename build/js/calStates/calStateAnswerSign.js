// calStateAnswerSign.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateAnswerSign = (function() {
	function CalStateAnswerSign(parent) {
		this.parent = parent;
	}
	var p = CalStateAnswerSign.prototype;
	
	p.onPressDigit = function(digit){
		// prepare to receive 2 numbers
		this.parent.memory = this.parent.answer;
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
		this.parent.clearAll();
		this.parent.state = "calStateStart";
	};
	p.onPressCE = function(){
		this.parent.memory = this.parent.answer;
		this.parent.clearBuffer();
		this.parent.state = "calStateSecondNumber";
	};
	p.onPressEqual = function(){
		// special operation: += -= *= /=
		this.parent.memory = this.parent.answer;
		this.parent.buffer = this.parent.answer;
		this.parent.nextState = "calStateAnswer";
		this.parent.state = "calStateWaiting";
		this.parent.commit();
	};


	return CalStateAnswerSign;

})();