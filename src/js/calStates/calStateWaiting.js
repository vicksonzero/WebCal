// calStateWaiting.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateWaiting= (function() {
	function CalStateWaiting(parent) {
		this.parent = parent;
	}
	var p = CalStateWaiting.prototype;
	
	p.onPressDigit = function(digit){
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


	return CalStateWaiting;

})();