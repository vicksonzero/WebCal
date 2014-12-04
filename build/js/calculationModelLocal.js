// event.js

// binds events

// pretending CommonJS
// var $ = require("config");

var calculationModel = (function() {

	var calculationModel = {};


	calculationModel.getCalculateResult = function getCalculateResult(args) {
		if (!checkArgumentFormat(args)) return false;
		var result;
		var a = args.a;
		var b = args.b;
		switch (args.sign) {
			case config.enumSigns.PLUS:
				result = a + b;
				break;
			case config.enumSigns.MINUS:
				result = a - b;
				break;
			case config.enumSigns.MULTIPLY:
				result = a * b;
				break;
			case config.enumSigns.DIVIDE:
				result = a / b;
				break;
		}
		result = Math.floor(result);
		console.log(result);
		args.callback(result);//, resultExponent);
	};


	/*{
		a: 		int, 
		sign: 	enum, 
		b: 		int,
		callback:function
	}*/
	function checkArgumentFormat(args) {
		if (!isInt(args.a)) return false;
		if (!isInt(args.sign)) return false;
		if (!isInt(args.b)) return false;
		if (!isFunction(args.callback)) return false;
		return true; // TODO
	}

	function isInt(n) {
		return Number(n) === n && n % 1 === 0;
	}

	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	return calculationModel;

})();