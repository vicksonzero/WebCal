// calStateSecondNumber.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateSecondNumber = (function() {
	function CalStateSecondNumber(parent) {
		this.parent = parent;
	}
	var p = CalStateSecondNumber.prototype;
	
	p.onPressDigit = function(digit){
		if(this.parent.buffer==0 && digit==0) return;

		if(!this.parent.bufferIsFull()){
			this.parent.addDigit(digit);
		}else{
			this.parent.displayFlag.bufferIsFull = true;
			return;
		}
	};
	p.onPressOp = function(op){
		// calculates answer and directly jumps to answer
		this.onPressEqual();
		this.parent.sign = op;
		this.parent.state = "calStateAnswerSign";

	};
	p.onPressAC = function(){
		this.parent.clearAll();
		this.parent.state = "calStateStart";
	};
	p.onPressCE = function(){
		this.parent.clearBuffer();
		this.parent.buffer = this.parent.memory;
		this.parent.state = "calStateSign";
	};
	p.onPressEqual = function(){
		this.parent.commit();
		this.parent.state = "calStateAnswer";
	};


	return CalStateSecondNumber;

})();