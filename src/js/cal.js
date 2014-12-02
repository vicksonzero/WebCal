// cal.js

// main calculator controls

// pretending CommonJS
// var config = require("config");
// var ajaxHelper = require("ajaxHelper");

var Cal = (function(){
	function Calculator(){
		this.isNew = true;		// bool
		this.result = 0;		// int
		this.buffer = 0;		// int
		this.bufferLength = 0;	// int
		this.bufferSign = "";	// string{1}
		this.isUpdating = false;
	}

	/* ***** Region: Register function to prototype ***** */
	var p = Calculator.prototype;
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
	p.getResult = getResult;

	/* ***** Region: Register Private function ***** */
	p._evaluateToResult = _evaluateToResult;

	/* ***** Region: Return the object ***** */
	return Calculator;

	/* ***** Region: function bodies ***** */

	/**
	 * Adds a digit to the end of the buffer
	 * @param {int} d digit
	 * returns false if buffer is full
	 * returns true  if success
	 */
	function addDigit(d){
		if(d)
		if(this.bufferLength>=config.displayLength) return false;
		this.buffer = this.buffer*10+d;
		this.bufferLength++;
	};
	/**
	 * updates the bufferSign of this calsulation
	 * @param  {string} s sign{+,-,*,/}
	 * @return {boolean}  true  if successful,
	 *                    false if there is nothing in buffer, 
	 */
	function chooseSign(s){
		if(this.bufferLength<=0) return false;
		this._evaluateBufferToResult();

		return true;
	};
	/**
	 * Private function
	 * pushed buffer to back, gets ready for next operation
	 * @return {boolean} true  if successful,
	 *                   false if nothing is in buffer
	 */
	function _evaluateToResult(){
		if(this.bufferLength<=0) return false;
		if(this.isNew){
			this.result = this.buffer;
		}else{
			this.result = this.getResult();
		}
		return true;
	}

	/**
	 * call model and get some result back
	 * with callback function
	 * @return {nothing}
	 */
	function getResult(){
		var _this = this;
		ajaxHelper.getResult({
			a: 		this.result, 
			sign: 	this.bufferSign, 
			b: 		this.buffer,
			callback:function(result,resultExponent){
				_putResult.call(_this,result,resultExponent);
			}
		});
	}

	function _putResult(result,resultExponent){
		this.result = result;
	}


})();