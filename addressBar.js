// addressBar.js

// breaks address into get parameters
// use public methods to query the parameters, or look at the parameters directly
// 
// constructor:
//     AddressBar(getStrings)
//     
// public methods:
//     hasValueOrNot : function(key, trueVal, falseVal);
//         returns trueVal if the key is present in the address bar, 
//         even if it contains falsy value
//         else return falseVal
//         
//     getValue      : function(key, defaultVal, allowUndefined);
//         returns the first occuring value of key if key exists, and has a value
//         else return defaultVal
//         if allowUndefined is true, and key is present with no value
//         it returns "undefined" instead of defaultVal
//         
//     getValues     : function(key, defaultVal);
//         same as getValue without the s, but returns an array of values if
//         you expect there would be more than 1 value in the address bar.
//         
// public field:
//     params        : {"key":[value],"key2":[value1,value2,value1]};
//     


// usage:
// in the webpage:
// www.mycandymachine.com/index?debug&machineColor=red&candies=chocolate&candies=toffee
// 
// <script src="addressBar.js" type="text/javascript"></script>
// <script type="text/javascript">
//     var addressBar = new AddressBar(location.search);
//     
//     var doDebugOrNot = addressBar.hasValueOrNot("debug", "hello!", false);
//     // returns: "hello!"
//     
//     var allowUndefined = false;
//     machineColor = addressBar.getValue(
//         "machineColor", 
//         "white", 
//         allowUndefined
//     );
//     // returns: "red"
//     
//     candies = addressBar.getValues(
//         "candies", 
//         ["default1","default2"], 
//         allowUndefined
//     );
//     // returns: ["chocolate","toffee"]
// </script>




var AddressBar = (function() {

	function AddressBar(getStirngs) {
		// main logic: breaking GET params into js object
		this.params = parseURLParam(getStirngs);
	};
	var p = AddressBar.prototype;
	// public methods
	// p.hasValueOrNot = function(key, trueVal, falseVal);
	// p.getValue      = function(key, defaultVal, allowUndefined);
	// p.getValues     = function(key, defaultVal);

	p.hasValueOrNot = function(key, trueVal, falseVal) {
		if (trueVal === undefined) trueVal = true;
		if (falseVal === undefined) falseVal = false;

		if (this.params.hasOwnProperty(key)) {
			return trueVal;
		} else {
			return falseVal;
		}
	};
	p.getValue = function(key, defaultVal, allowUndefined) {
		if (defaultVal === undefined) defaultVal = null;
		if (allowUndefined === undefined) allowUndefined = false;

		if (this.params.hasOwnProperty(key)) {
			if ( this.params[key][0] != "undefined" || allowUndefined ) {
				return this.params[key][0];
			} else {
				return defaultVal;
			}
		} else {
			return defaultVal;
		}
	};
	p.getValues = function(key, defaultVal) {
		if (defaultVal === undefined) defaultVal = null;

		if (this.params.hasOwnProperty(key)) {
			return this.params[key];
		} else {
			return defaultVal;
		}
	};
	p.toString = function(){
		return JSON.stringify(this.params);
	};



	return AddressBar;


	/**
	 * turns get-part of the URL (eg: after the ? sign) into tokens of GET parameters
	 * in the form of "key":["value","value"...]
	 * @param  {string}               getStrings the part after ?
	 * @return {associative_array[
	 *             "key":["value","value"]
	 *             ]}                 dictionary of processed GET parameters
	 */
	function parseURLParam(getStrings) {
		var result = {}
		var temp; // reusing holder
		getStrings
			.replace("?", "")
			.split("&")
			.forEach(function(item) {
				temp = item.split("=");
				if (temp[0] in result) {
					result[temp[0]].push(decodeURIComponent(temp[1]));
				} else {
					result[temp[0]] = [decodeURIComponent(temp[1]), ];
				}
			});
		return result;
	}

})();