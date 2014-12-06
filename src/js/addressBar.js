// addressBar.js

// binds events

// pretending CommonJS
// var $ = require("config");

var AddressBar = (function() {


	/**
	 * Creates an addressbar object that executes things.. well,
	 * @param {array [{
	 *                    key:string, 
	 *                    value:any, 
	 *                    trigger:string, 
	 *                    callback:function
	 *                }]} callbacks: callback list
	 */
	function AddressBar(callbacks){
		this.params = parseURLParam(location.search);
	};
	


	return AddressBar;

	function parseURLParam(getStirngs) {
		var qd = {}
		var tmp;
		getStirngs
			.replace("?", "")
			.split("&")
			.forEach(function(item) {
				tmp=item.split("=");
				if(tmp[0] in qd) {
					qd[tmp[0]].push(decodeURIComponent(tmp[1]));
				}else{
					qd[tmp[0]] = [decodeURIComponenttmp[1]), ];
				}
			});
		return qd;
	}

})();