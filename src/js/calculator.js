// calculator.js

// main calculator controls

// pretending CommonJS
// var config 				= require("config");
// var calculationModel 	= require("calculationModelLocal");
// var calStateStart		= require("calStateStart");
// var calStateFirstNumber 	= require("calStateFirstNumber");
// var calStateSign 		= require("calStateSign");
// var calStateSecondNumber = require("calStateSecondNumber");
// var calStateAnswer 		= require("calStateAnswer");
// var calStateAnswerSign 	= require("calStateAnswerSign"); 

var Calculator = (function() {
	function Calculator() {
		// state objects
		this.states = {
			"calStateStart": 		new CalStateStart(this),
			"calStateFirstNumber": 	new CalStateFirstNumber(this),
			"calStateSign": 		new CalStateSign(this),
			"calStateSecondNumber": new CalStateSecondNumber(this),
			"calStateAnswer": 		new CalStateAnswer(this),
			"calStateAnswerSign": 	new CalStateAnswerSign(this),
			"calStateError": 		new CalStateError(this),
			"calStateWaiting": 		new CalStateWaiting(this)
		};
		// state index
		this.state = "calStateStart"; // start, firstNum, sign, secondNum,
		this.answer = 0;
		this.buffer = 0;
		this.bufferLength = 0;
		this.sign = "";
		this.memory = 0;
		this.displayFlag = {
			bufferIsFull:false,
			redoOperation:false,
			answerRounded:false
		};
		this.isWaiting = false;
	}

	var p = Calculator.prototype;

	p.onPressDigit = function(digit) {
		this.states[this.state].onPressDigit(digit);

	};
	p.onPressOp = function(op) {
		this.states[this.state].onPressOp(op);

	};
	p.onPressAC = function() {
		this.states[this.state].onPressAC();

	};
	p.onPressCE = function() {
		this.states[this.state].onPressCE();

	};
	p.onPressEqual = function() {
		this.states[this.state].onPressEqual();

	};
	p.getBufferString = function() {
	};
	p.getDebugString = function() {
		// display last calculation if answer mode
		var str = "";
		if(config.DEBUG){
			str+= 
				this.state+" ("+
				"a: "+this.answer+
				" m:"+this.memory+this.sign+
				" b:"+this.buffer+")";
		}
		
		return str;
	};

	p.clearAll = function(){
		this.answer = 0;
		this.buffer = 0;
		this.bufferLength = 0;
		this.sign = "";
		this.memory = 0;

		this.displayFlag.bufferIsFull = false;
		this.displayFlag.redoOperation = false;
		this.displayFlag.answerRounded = false;

		this.isWaiting = false;
	}
	p.clearBuffer = function(){
		this.buffer = 0;
		this.bufferLength = 0;
		this.displayFlag.bufferIsFull=false;
	}
	p.bufferIsFull = function() {
		return this.bufferLength >= config.displayLength;
	};
	p.addDigit = function(digit){
		this.buffer = this.buffer*10 + digit;
		this.bufferLength++;
	};
	p.commit = function(){
		var _this = this;
		calculationModel.getCalculateResult({
			a: 		this.memory, 
			sign: 	config.signToEnum(this.sign), 
			b: 		this.buffer,
			callback:function(result){
				_commitResultHandler.call(_this,result);
			}
		});
	};
	p._commitResultHandler = _commitResultHandler;
	function _commitResultHandler(result){
		this.answer = result;
	};
	return Calculator;



})();