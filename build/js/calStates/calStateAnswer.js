// calStateAnswer.js

// main calculator controls

// pretending CommonJS
// var config = require("config");

var CalStateAnswer = (function() {
	function CalStateAnswer(parent) {
		this.parent = parent;
	}
	var p = CalStateAnswer.prototype;
	
	p.onPressDigit = function(digit){
		this.parent.clearAll();
		if(digit==0){
			this.parent.state = "calStateStart";
		}
		if(!this.parent.bufferIsFull()){
			this.parent.addDigit(digit);
		}
		this.parent.state = "calStateFirstNumber";
	};
	p.onPressOp = function(op){
		this.parent.memory = this.parent.answer;
		this.parent.sign = op;
		this.parent.state = "calStateAnswerSign";
	};
	p.onPressAC = function(){
		this.parent.clearAll();
		this.parent.state = "calStateStart";
	};
	p.onPressCE = function(){
		this.onPressAC();
	};
	p.onPressEqual = function(){
		// redo last operation
		this.parent.memory = this.parent.answer;
		this.parent.nextState = "calStateAnswer";
		this.parent.state = "calStateWaiting";
		this.parent.commit(this.parent.sign);
		this.parent.displayFlag.redoOperation = true;
	};


	return CalStateAnswer;

})();