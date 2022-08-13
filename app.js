var allDigits = document.getElementsByClassName("digit-btn");
var allOperators = document.getElementsByClassName("operator-btn");
var displayScreen = document.getElementById("displayDigits");
var equalTo = document.getElementById("totalSumBtn");
var decipoint = document.getElementById("decimalpoint");
var clear = document.getElementById("control");
var cancel = document.getElementById("delete");
var currDigits = "";
var firstdigits = 0;
var myOperator = "";
var currOperatorBtn = null;
var sumUp = 0;
var point = '.';
var AC = "";
var firstdigitsready = false;
var key = "";
var operatorClicked = false;
for (var i = 0; i<allDigits.length; i++){
	let btn = allDigits[i]
	btn.addEventListener("click", function(button){
		if(operatorClicked && firstdigitsready == false){
			updateCurrDigit();
			firstdigitsready = true;
		}
		currDigits += btn.getAttribute("digit");
		displayScreen.innerHTML = currDigits;
		clear.textContent = "C";
	});
}
for (var i = 0; i<allOperators.length; i++){
	let btn = allOperators[i]
	btn.addEventListener("click", function(event){
		if(currOperatorBtn != null){
			currOperatorBtn.classList.remove("active");			
		}
		firstdigits = parseFloat(currDigits);		
		operatorClicked = true;
		myOperator = btn.getAttribute("operator");
		currOperatorBtn = btn;
		currOperatorBtn.classList.add("active");
		
	});
}
equalTo.addEventListener("click", function(e){
	finalCalculation();	
});
decipoint.addEventListener("click", function(e){
	currDigits += ".";
	displayScreen.innerHTML = currDigits;
});
clear.addEventListener("click", function(e){
	var action = clear.textContent;
	if(action == "AC"){
		myOperator = "";
		currOperatorBtn.classList.remove("active");
	}else if(action == "C"){
		updateCurrDigit();
		clear.textContent = "AC";
	}
	displayScreen.innerHTML = currDigits;
});
cancel.addEventListener("click", function(e){
	if(currDigits != ""){
		currDigits = currDigits.slice(0,-1);
	}
	displayScreen.innerHTML = currDigits;
});

document.addEventListener("keypress", function (e){
	let key = e.key;
	
	if(parseInt(key) || key == 0){
		if(operatorClicked && firstdigitsready == false){
			updateCurrDigit();
			firstdigitsready = true;
		}
		currDigits += key;
	}

	displayScreen.innerHTML = currDigits;
	if(key == "+" || key == "*" || key == "/" || key == "-" || key == "%"){
		if(currOperatorBtn != null){
			currOperatorBtn.classList.remove("active");			
		}
		firstdigits = parseFloat(currDigits);
		operatorClicked = true;

	}
	if(key == "+"){		
		currOperatorBtn = document.getElementById("add");
		myOperator = "add";
		currOperatorBtn.classList.add("active");
	}else if(key == "-"){
		currOperatorBtn = document.getElementById("substract");
		myOperator = "substract";
		currOperatorBtn.classList.add("active");
	}else if(key == "/"){
		currOperatorBtn = document.getElementById("divide");
		myOperator = "divide";
		currOperatorBtn.classList.add("active");
	}else if(key == "*"){
		currOperatorBtn = document.getElementById("multiply");
		myOperator = "multiply";
		currOperatorBtn.classList.add("active");
	}else if(key == "%"){
		currOperatorBtn = document.getElementById("percent");
		myOperator = "percent";
		currOperatorBtn.classList.add("active");
	}
	if(key == "="){
		finalCalculation();
	}
});

function addUp(x,y){	
	return x + y;
}
function updateCurrDigit(){
	currDigits = "";
}
function finalCalculation(){
	currDigits = parseFloat(currDigits);
		if(myOperator == "substract"){
			sumUp = firstdigits - currDigits;
		}else if(myOperator == "add"){
			sumUp = addUp(firstdigits, currDigits);		
		}else if(myOperator == "divide"){
			sumUp = firstdigits / currDigits;		
		}else if(myOperator == "multiply"){
			sumUp = firstdigits * currDigits;		
		}else if(myOperator == "percent"){
			sumUp = firstdigits % currDigits;		
		}
		firstdigits = 0;
		firstdigitsready = false;
		displayScreen.innerHTML = sumUp;
		updateCurrDigit();
		operatorClicked = false;
}





