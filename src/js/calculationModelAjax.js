// event.js

// binds events

// pretending CommonJS
// var config = require("config");
// var $ = require("jquery");

var calculationModel = (function() {

	var calculationModel = {};


	calculationModel.getCalculateResult = function getCalculateResult(args) {
		if (!checkArgumentFormat(args)) return false;

		$.post(
			config.serverURL,
			{
				a:args.a,
				b:args.b,
				sign:args.sign
			}, 
			function unpacker(data, status){
				args.callback({
					result:data.result,
					resultExponent:data.resultExponent,
					msg:data.msg
				});//, resultExponent);
			},
			"jsonp"
		);

		//console.log(result);
		
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