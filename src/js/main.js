// main.js

// binds events

// pretending CommonJS
// var $ = require("jquery");
// var Calculator = require("calculator");

$(function(){

	// Region: gather document divs
	var doc = {
		screenBoxDiv: document.querySelector("#screen"            ),
		clearExpDiv:  document.querySelector(".button[value='CE']"),
		clearAllDiv:  document.querySelector(".button[value='CA']"),
		equalDiv: 	  document.querySelector(".button[value='=']"),
		digitDivs:[],
		operatorDivs:{}
	};

	for(var i=0; i <=9; i++){
		doc.digitDivs[i] = document.querySelector(".button[value='"+i+"']");
	}
	['+','-','*','/'].forEach(function(element, index, array){
		doc.operatorDivs[element]= document.querySelector(".button[value='"+element+"']");
	});

	// Region: bind events
	
	calculator = new Calculator();
	updateScreen(doc,calculator);


	// bind button: CE
	doc.clearExpDiv.addEventListener("click", function(){
		calculator.clearExpression();
		updateScreen(doc,calculator);
	});

	// bind button: CA
	doc.clearAllDiv.addEventListener("click", function(){
		calculator.clearAll();
		updateScreen(doc,calculator);
	});

	// bind button: =
	doc.equalDiv.addEventListener("click", function(){
		calculator.calculate();
		updateScreen(doc,calculator);
	});
	
	// bind button: 0-9
	for(var i=0; i <=9; i++){
		// closure: give every function a unique i
		(function(digi){
			doc.digitDivs[i].addEventListener("click", function(){
			    calculator.addDigit(digi);
			    updateScreen(doc,calculator);
			});
		})(i);// closure end
	}

	// bind operators + - * /
	['+','-','*','/'].forEach(function(element, index, array){
		// closure: give every function a unique i
		(function(op){
			doc.operatorDivs[element].addEventListener("click", function(){
			    calculator.chooseSign(op);
			    updateScreen(doc,calculator);
			});
		})(element);// closure end
	});

	// Region: helper function
	// param {cal} calculator instance
	function updateScreen(doc,cal){

		doc.screenBoxDiv.innerHTML = cal.getBufferString();
	}
});