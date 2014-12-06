// config.js

// data object for configs

var config = (function() {
	var config = {
		DEBUG: false,
		displayLength: 8,
		leadCharacter: "",
		leadCharacterEmpty: "0",
		enumSigns: {
			PLUS: 0,
			MINUS: 1,
			MULTIPLY: 2,
			DIVIDE: 3
		},
		messages:{
			"GREETINGS":"WebCal v1.1",
			"D0": "DIV-0",
			"ROUNDED": "Rounded",
			"TOOLONG": "TOO LONG"
		},
		serverURL:"http://raptor.kent.ac.uk/~hc316/webcalServer/index.php",
		signToEnum:signToEnum
	};

	return config;

	/**
	 * Turns tring sign into config.enumSigns
	 * @param  {String} 		sign
	 * @return {config.enum}    enumerated sign
	 */
	function signToEnum(sign) {
		//console.log(sign);
		switch (sign) {
			case '+':
				return config.enumSigns.PLUS;
			case '-':
				return config.enumSigns.MINUS;
			case '*':
				return config.enumSigns.MULTIPLY;
			case '/':
				return config.enumSigns.DIVIDE;
		}
	}

})();