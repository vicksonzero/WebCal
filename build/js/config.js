// config.js

// data object for configs
// 
// var AddressBar = require("addressBar");

var config = (function() {
	var config = {
		addressBar: new AddressBar(location.search),
		DEBUG: false,

		model:"php", // "local", "php"
		serverURL:"http://raptor.kent.ac.uk/~hc316/webcalServer/index.php",

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
			"GREETINGS":"WebCal v1.3",
			"D0": "DIV-0",
			"ROUNDED": "Rounded",
			"TOOLONG": "TOO LONG"
		},
		signToEnum:signToEnum
	};
	config.DEBUG = config.addressBar.hasValueOrNot("debug",true,config.DEBUG);

	config.model = config.addressBar.getValue("model",config.model,false);
	config.model = config.addressBar.hasValueOrNot("local","local",config.model);
	config.model = config.addressBar.hasValueOrNot("php","php",config.model);

	config.displayLength=parseInt(config.addressBar.getValue("displayLength",config.displayLength));

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