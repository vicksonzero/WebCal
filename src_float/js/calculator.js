// calculator.js

// main calculator controls

// pretending CommonJS
// var config 				= require("config");
// var calculationDelegateLocal= require("calculationDelegateLocal");
// var calculationDelegateAjax	= require("calculationDelegateAjax");
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
		this.bufferLength = 0;	// includes decimal
		this.isDecimal = false;
		this.bufferExponent = 0;
		this.sign = "";
		this.memory = 0;
		this.displayFlag = {
			bufferIsFull:false,
			redoOperation:false,
			answerRounded:false
		};
		this.modelUpdatedSignal = new signals.Signal();
		this.errorMsg = "";
		this.nextState = "";
		this.model = config.model=="local"?calculationDelegateLocal:calculationDelegateAjax;
	}

	var p = Calculator.prototype;

	p.onPressDigit = function(digit) {
		this.clearFlags();
		this.states[this.state].onPressDigit(digit);

	};
	p.onPressDot = function() {
		this.clearFlags();
		this.states[this.state].onPressDot();

	};
	p.onPressOp = function(op) {
		this.clearFlags();
		this.states[this.state].onPressOp(op);

	};
	p.onPressAC = function() {
		this.clearFlags();
		this.states[this.state].onPressAC();

	};
	p.onPressCE = function() {
		this.clearFlags();
		this.states[this.state].onPressCE();

	};
	p.onPressEqual = function() {
		this.clearFlags();
		this.states[this.state].onPressEqual();

	};
	
	p.getDebugString = function() {
		// display last calculation if answer mode
		var str = "";
		if(config.DEBUG){
			str+= 
				this.model.name+" "+
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

		this.clearFlags();

		this.errorMsg = "";
		this.nextState = "";
	}
	p.clearBuffer = function(){
		this.buffer = 0;
		this.bufferLength = 0;
		this.displayFlag.bufferIsFull=false;
	}
	p.clearFlags = function(){
		this.displayFlag = {
			bufferIsFull:false,
			redoOperation:false,
			answerTooLong:false,
			answerRounded:false
		};
	}
	p.bufferIsFull = function() {
		return this.bufferLength >= config.displayLength;
	};
	p.addDigit = function(digit){
		this.buffer = this.buffer*10 + digit;
		this.bufferLength++;
	};
	p.addDecimal = function(digit){
		this.bufferDecimal = this.bufferDecimal*10 + digit;
		this.bufferLength++;
		this.bufferDecimalLength++;
	};
	p.commit = function(op){
		var _this = this;
		if(op===undefined) op = this.sign;
		console.log(this.model.name);
		this.model.getCalculateResult({
			a: 		this.memory, 
			sign: 	op, 
			b: 		this.buffer,
			callback:function(result){
				_commitResultHandler.call(_this,result);
			}
		});
	};
	p._commitResultHandler = _commitResultHandler;
	function _commitResultHandler(result){
		// exit if the user cancelled waiting
		if(this.state !="calStateWaiting") return;
		console.log(result);
		switch(result.msg){
		case config.messages.D0:
			this.errorMsg = result.msg;
			this.state = "calStateError";
			break;
		case config.messages.TOOLONG:
			this.errorMsg = result.msg;
			this.state = "calStateError";
			break;
		case config.messages.ROUNDED:
			this.displayFlag.answerRounded = true;

		default:
			this.answer = result.result;
			this.state = this.nextState;
		}
		this.modelUpdatedSignal.dispatch();
	};
	return Calculator;



})();