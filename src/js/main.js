// main.js

// binds events

// pretending CommonJS
// var $ = require("jquery");
// var Calculator = require("calculator");
// var config = require("config");

$(function() {

	// Region: gather document divs
	var doc = {
		screenPrimaryDiv: 	document.querySelector("#bufferPrimary"),
		screenSecondaryDiv: document.querySelector("#bufferSecondary"),
		clearExpDiv: 		document.querySelector(".button[value='CE']"),
		clearAllDiv: 		document.querySelector(".button[value='AC']"),
		equalDiv: 			document.querySelector(".button[value='=']"),
		digitDivs: [],
		operatorDivs: {}
	};

	for (var i = 0; i <= 9; i++) {
		doc.digitDivs[i] = document.querySelector(".button[value='" + i + "']");
	}
	['+', '-', '*', '/'].forEach(function(element, index, array) {
		doc.operatorDivs[element] = 
			document.querySelector(".button[value='" + element + "']");
	});

	// Region: bind events

	calculator = new Calculator();
	updateScreen(doc, calculator);


	// bind button: CE
	doc.clearExpDiv.addEventListener("click", function() {
		calculator.onPressCE();
		updateScreen(doc, calculator);
	});

	// bind button: AC
	doc.clearAllDiv.addEventListener("click", function() {
		calculator.onPressAC();
		updateScreen(doc, calculator);
	});

	// bind button: =
	doc.equalDiv.addEventListener("click", function() {
		calculator.onPressEqual();
		updateScreen(doc, calculator);
	});

	// bind button: 0-9
	for (var i = 0; i <= 9; i++) {
		// closure: give every function a unique i
		(function(digi) {
			doc.digitDivs[i].addEventListener("click", function() {
				calculator.onPressDigit(digi);
				updateScreen(doc, calculator);
			});
		})(i); // closure end
	}

	// bind operators + - * /
	['+', '-', '*', '/'].forEach(function(element, index, array) {
		// closure: give every function a unique i
		(function(op) {
			doc.operatorDivs[element].addEventListener("click", function() {
				calculator.onPressOp(op);
				updateScreen(doc, calculator);
			});
		})(element); // closure end
	});

	// Region: helper function
	// param {cal} calculator instance
	function updateScreen(doc, cal) {
		// primary buffer: buffer and current sign
		var str = "";
		if (cal.state == "calStateAnswer" || cal.state == "calStateAnswerSign") {
			str += cal.answer;
		} else {
			str += cal.buffer;
		}
		if (cal.state == "calStateSign" || cal.state == "calStateAnswerSign") {
			str += cal.sign;
		}
		if (cal.state == "calStateError") {
			str += "-E-";
		}
		doc.screenPrimaryDiv.innerHTML = str;

		// secondary buffer: current equation
		str = "";
		if (config.DEBUG) {
			str += cal.getDebugString();
		} else {
			switch (cal.state) {
			case "calStateStart":
				str += config.greetings;
				break;
			case "calStateFirstNumber":
				str += cal.buffer;
				break;
			case "calStateSign":
				str += cal.buffer + cal.sign;
				break;
			case "calStateSecondNumber":
				str += cal.memory + cal.sign + cal.buffer;
				break;
			case "calStateAnswer":
				str += cal.memory + cal.sign + cal.buffer + "=";
				break;
			case "calStateAnswerSign":
				str += cal.answer + cal.sign;
				break;
			case "calStateError":
				str += "Error";
				break;
			case "calStateWaiting":
				str += "Waiting for server...";
				break;
			default:
				str += "Unexpected state. is it possible?";
			}
		}
		doc.screenSecondaryDiv.innerHTML = str;
		// flash screen if displayFlag.bufferIsFull==false
	}
});