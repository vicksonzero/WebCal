// event.js

// binds events

// pretending CommonJS
// var $ = require("config");

var ajaxHelper = (function() {

	var ajaxHelper = {};


	ajaxHelper.getResult = function getResult(args) {
		if (!checkArgumentFormat(args)) return false;
		var result;
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
		args.callback();
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

	return ajaxHelper;

})();