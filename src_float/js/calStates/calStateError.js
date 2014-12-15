// calStateError.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateError = (function() {
	function CalStateError(parent) {
		this.parent = parent;
	}
	var p = CalStateError.prototype;
	
	p.onPressDigit = function(digit){
		return;

	};
	p.onPressDot = function(){
		return;

	};
	p.onPressOp = function(op){
		return;

	};
	p.onPressAC = function(){
		this.parent.clearAll();
		this.parent.state = "calStateStart";
	};
	p.onPressCE = function(){
		return;
	};
	p.onPressEqual = function(){
		return;
	};


	return CalStateError;

})();