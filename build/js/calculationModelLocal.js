// event.js

// binds events

// pretending CommonJS
// var config = require("config");

var calculationModelLocal = (function() {

	var calculationModel = {};


	calculationModel.getCalculateResult = function getCalculateResult(args) {
		if (!checkArgumentFormat(args)) return false;
		var result = {
			result:0,
			resultExponent:0,
			msg:""
		};
		var a = args.a;
		var b = args.b;
		switch (args.sign) {
			case "+":
				result.result = a + b;
				break;
			case "-":
				result.result = a - b;
				break;
			case "*":
				result.result = a * b;
				break;
			case "/":
				if(b===0){
					result.msg = config.messages.D0;
					args.callback(result);
					return;
				}
				result.result = a / b;
				break;
		}

		var roundedResult = Math.floor(result.result);
		if((""+roundedResult).length>config.displayLength){
			result.msg = config.messages.TOOLONG;
			args.callback(result);
			return;
		}
		if(roundedResult!=result.result){
			result.msg = config.messages.ROUNDED;
		}
		result.result = roundedResult;

		//console.log(result);
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