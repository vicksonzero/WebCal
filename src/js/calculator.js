// cal.js

// main calculator controls

// pretending CommonJS
// var config = require("config");
// var calculationModel = require("calculationModelLocal");

var Calculator = (function() {
	function Calculator() {
		this.isNew = true; // bool
		this.isWaitingForAnswer = false;
		this.bufferSignBurning = false;
		this.hasAnswer = false;
		this.result = 0; // int

		/*private*/
		var buffer = 0; // int
		var bufferLength = 0; // int
		var bufferSign = ""; // string{1}
		var isOperating = false;

		this.getBuffer = function() {
			return buffer;
		};
		this.setBuffer = function(val, len) {
			buffer = val;
			bufferLength = len;
		};
		this.getBufferLength = function() {
			return bufferLength;
		};
		this.getBufferString = function() {
			var str = "("+this.result+this.getBufferSign()+")";
			if (this.getBufferLength() == 0) {
				str+=config.leadCharacterEmpty;
			}else if (this.bufferSignBurning) {
				str+=config.leadCharacter + buffer + this.getBufferSign();
			}else if(this.isNew){
				str+=config.leadCharacter + this.result;
			}else {
				str+= config.leadCharacter + buffer;
			}
			return str;
		};
		this.getBufferSign = function() {
			return bufferSign;
		};
		this.setBufferSign = function(str) {
			bufferSign = str;
		};
		this.unsetBufferSign = function() {
			bufferSign = "";
		};
	}

	/* ***** Region: Register function to prototype ***** */
	var p = Calculator.prototype;
	/**
	 * clears the buffer area, but not the operation or the saved result
	 */
	p.clearExpression = clearExpression;
	/**
	 * clears the buffer area, the operation and the saved result
	 */
	p.clearAll = clearAll;
	/**
	 * Adds a digit to the end of the buffer
	 * @param {int} d digit
	 * returns false if buffer is full
	 * returns true  if success
	 */
	p.addDigit = addDigit;
	/**
	 * updates the bufferSign of this calsulation
	 * @param  {string} s sign{+,-,*,/}
	 * @return {true}     if successful
	 * @return {false}    else
	 */
	p.chooseSign = chooseSign;
	/**
	 * call model and get some result back
	 * with callback function
	 * @return {nothing}
	 */
	p.calculate = calculate;


	/* ***** Region: Register Private function ***** */
	p._evaluateBufferToResult = _evaluateBufferToResult;

	/* ***** Region: Return the object ***** */
	return Calculator;

	/* ***** Region: function bodies ***** */

	/**
	 * Adds a digit to the end of the buffer
	 * @param {int} d digit
	 * returns false if buffer is full or d is not integer/ not in [0-9]
	 * returns true  if success
	 */
	function addDigit(d) {
		if (this.getBufferLength() >= config.displayLength) return false;
		if (!isInt(d)) return false;
		if (d < 0 || d > 9) return false;
		if (d == 0 && this.getBuffer() == 0) return false;
		
		if(this.isNew){
			this.clearAll();
		}
		if(this.bufferSignBurning){
			this.clearExpression();
			this.setBufferSign("");
			this.bufferSignBurning = false;
		}
		this.setBuffer(this.getBuffer() * 10 + d, this.getBufferLength() + 1);
		this.isNew = false;
	};
	/**
	 * clears the buffer area, but not the operation or the saved result
	 */
	function clearExpression() {
		this.setBuffer(0, 0);
		this.bufferSignBurning = false;
	};
	/**
	 * clears the buffer area, the operation and the saved result
	 */
	function clearAll() {
		this.setBuffer(0, 0);
		this.result = 0;
		this.setBufferSign("");
		this.isNew = true;
		this.bufferSignBurning = false;
		this.hasAnswer = false;
	};
	/**
	 * updates the bufferSign of this calsulation
	 * @param  {string} s sign{+,-,*,/}
	 * @return {boolean}  true  if successful,
	 *                    false if there is nothing in buffer,
	 */
	function chooseSign(s) {
		if (this.isNew && this.getBufferLength() <= 0) return false;
		this.bufferSignBurning = true;
		this.isNew = false;
		this._evaluateBufferToResult();
		this.setBufferSign(s);
		console.log("chosen sign: " + s);
		return true;
	};
	/**
	 * Private function
	 * pushed buffer to back, gets ready for next operation
	 * @return {boolean} true  if successful,
	 *                   false if nothing is in buffer
	 */
	function _evaluateBufferToResult() {
		if (this.getBufferLength() <= 0) return false;
		if(this.hasAnswer) return false;
		if (this.bufferSignBurning) {
			this.result = this.getBuffer();
		} else {
			this.result = this.calculate();
		}
		console.log("Result is now " + this.result);
		return true;
	}

	/**
	 * call model and get some result back
	 * with callback function
	 * @return {nothing}
	 */
	function calculate() {
		var _this = this;
		calculationModel.getCalculateResult({
			a: this.result,
			sign: config.signToEnum(this.getBufferSign()),
			b: this.getBuffer(),
			callback: function(result, resultExponent) {
				_putResult.call(_this, result, resultExponent);
			}
		});
	}

	function _putResult(result, resultExponent) {
		this.result=result;
		this.setBuffer(result);
		this.hasAnswer = true;
		this.isNew = true;
	}

	// helper function
	// returns if n is an integer
	function isInt(n) {
		return Number(n) === n && n % 1 === 0;
	}



})();