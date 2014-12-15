// calStateStart.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateStart = (function() {
	function CalStateStart(parent) {
		this.parent = parent;
	}
	var p = CalStateStart.prototype;
	
	p.onPressDigit = function(digit){

		if(!this.parent.bufferIsFull()){
			this.parent.addDigit(digit);
		}
		this.parent.state = "calStateFirstNumber";
	};
	p.onPressOp = function(op){
		this.parent.addDigit(0);
		this.parent.sign = op;
		this.parent.state = "calStateSign";

	};
	p.onPressAC = function(){
		return;

	};
	p.onPressCE = function(){
		return;

	};
	p.onPressEqual = function(){
		return;

	};


	return CalStateStart;

})();