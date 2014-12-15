// event.js

// binds events

// pretending CommonJS
// var config = require("config");
// var $ = require("jquery");

var calculationDelegateAjax = (function() {

	var calculationDelegate = {name:"php"};


	calculationDelegate.getCalculateResult = function getCalculateResult(args) {
		if (!checkArgumentFormat(args)) return false;

		$.ajax({
			type: "POST",
			url: config.serverURL,
			data: {
				a:args.a,
				b:args.b,
				sign:encodeURI(args.sign)
			},
			success: function unpacker(data, status){
				console.log("server returned: " + data);
				var jsonObject = JSON.parse(data);
				args.callback({
					msg:jsonObject.msg,
					result:jsonObject.result
				});//, resultExponent);
			}
		});

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
		//if (!isInt(args.sign)) return false;
		if (!isInt(args.b)) return false;
		if (!isFunction(args.callback)) return false;
		return true; 
	}

	function isInt(n) {
		return Number(n) === n && n % 1 === 0;
	}

	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}



	return calculationDelegate;

})();