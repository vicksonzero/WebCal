// calStateFirstNumber.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateFirstNumber = (function() {
	function CalStateFirstNumber(parent) {
		this.parent = parent;
	}
	var p = CalStateFirstNumber.prototype;
	
	p.onPressDigit = function(digit){
		if(this.parent.buffer==0 && digit==0) return;

		// add number if buffer is not full
		if(!this.parent.bufferIsFull()){
			this.parent.addDigit(digit);
		}else{
			this.parent.displayFlag.bufferIsFull = true;
			return;
		}

	};
	p.onPressDot = function(){
		return;

	};
	p.onPressOp = function(op){
		this.parent.sign = op;
		this.parent.state = "calStateSign";
	};
	p.onPressAC = function(){
		// back to start
		this.parent.clearAll();
		this.parent.state = "calStateStart";
	};
	p.onPressCE = function(){
		this.onPressAC();
	};
	p.onPressEqual = function(){
		// special operation: a+0=a
		this.parent.memory = this.parent.buffer;
		this.parent.clearBuffer();
		this.parent.sign = "+";
		this.parent.nextState = "calStateAnswer";
		this.parent.state = "calStateWaiting";
		this.parent.commit(this.parent.sign);
	};


	return CalStateFirstNumber;

})();