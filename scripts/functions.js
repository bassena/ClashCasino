var img;
var curLogo = 0;
var firstN, lastN, phoneN, postCode, sAmt, lVisit;
var amountID;
var numBetArray = new Array();
var cornerBetArray = new Array();
var streetBetArray = new Array();
var avenueBetArray = new Array();
var oneThirdBetArray = new Array();
var highLowBetArray = new Array();
var colourBetArray = new Array();
var oddEvenBetArray = new Array();
var isNumBet = false, isCornerBet = false, isStreetBet = false, isAvenueBet = false, isThirdBet = false, isColourBet = false, isOddEvenBet = false, isHighLowBet = false;

function imageInit(){
	img = new Array(2);
	
	for(var i = 0; i < img.length; i++){
		img[i] = new Image();
		img[i].src = "images/logo_blink" + i + ".png";
		
		if(i == 1){
			setInterval("blinkingLogo()", 500);
		}
	}
}

function blinkingLogo(){
	if(curLogo == 1){
		curLogo = 0;
	}else{
		curLogo++;
	}
	document.getElementById("logo").src = img[curLogo].src;
}

function footerPlacement(){	
		var foot = document.getElementById("container");
	foot.style.height = (window.innerHeight - 156) + "px";
}

var headerWidth;
function headerSize(){
	headerWidth = document.getElementById("header");
	header.style.width = (window.innerWidth - 266) + "px";
}

var _ = function(id){return document.getElementById(id)}

function convertPostalCodeFormat(){
	var postCode = document.getElementById("postalCode").value;
	if(isNaN(postCode.charAt(postCode.length - 1))){
		var newPostCodeLetter = postCode.charAt(postCode.length - 1).toUpperCase();
		document.getElementById("postalCode").value = postCode.substr(0, postCode.length - 1) + newPostCodeLetter;
	}
}

//Checks to see if a cookie exists for the player's current session
function checkCookie(){
	
	if(document.cookie.length > 0){
		window.location = "game.html";
	}
}

function createCookie(fName, lName, pNum, pCode, startAmt){
	var futureDate = new Date();
	futureDate.setFullYear(futureDate.getFullYear() + 1);
	
	var curDate = new Date();
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	
	document.cookie = "firstName=" + encodeURIComponent(fName) + "; expires=" + futureDate.toUTCString();
	document.cookie = "lastName=" + encodeURIComponent(lName) +  "; expires=" + futureDate.toUTCString();
	document.cookie = "phoneNum=" + encodeURIComponent(pNum) + "; expires=" + futureDate.toUTCString();
	document.cookie = "pCode=" + encodeURIComponent(pCode) + "; expires=" + futureDate.toUTCString();
	document.cookie = "bankRoll=" + encodeURIComponent(startAmt) + "; expires=" + futureDate.toUTCString();
	document.cookie = "lastVisit=" + encodeURIComponent(monthNames[curDate.getMonth()] + " " + curDate.getDate() + ", " + curDate.getFullYear())  + "; expires=" + futureDate.toUTCString();
	
}

//Updates the user's bankroll so that they may keep it in a later session
function updateCookieBankRoll(bRoll){
	var futureDate = new Date();
	futureDate.setFullYear(futureDate.getFullYear() + 1);
	document.cookie = "bankRoll=" + encodeURIComponent(bRoll) + "; expires=" + futureDate.toUTCString();
}

//Displays the user's last visit if the case may be.
function welcomeCookieMsg(lstVst){
	var today = new Date();
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	
	if(lstVst < today){
		moneyAmt.innerHTML += "&nbsp;&nbsp;Your last visit was on: " + monthNames[lstVst.getMonth()] + " " + lstVst.getDate() + ", " + lstVst.getFullYear() + " at " + ((lstVst.getHours() < 10) ? ( "0" + lstVst.getHours()) : lstVst.getHours()) + ":" + ((lstVst.getMinutes() < 10) ? ( "0" + lstVst.getMinutes()) : lstVst.getMinutes());
	}
	
}

function stringToDate(visitDate){
	var month = visitDate.substring(0, visitDate.indexOf(" "));
	var day = visitDate.substring(visitDate.indexOf(" ") + 1, visitDate.indexOf(", "));
	var year = visitDate.substring(visitDate.indexOf(", ") + 2);
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	
	for(i = 0; i < monthNames.length; i++){
		if(month == monthNames[i]){
			month = i;
		}
	}
	
	var dateObj = new Date();
	dateObj.setFullYear(parseInt(year), month, parseInt(day));
	
	return dateObj;
}//stringToDate()

function deleteCookie(fn, ln, pn, pc, sa, lv){
	document.cookie = "firstName=" + fn + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "lastName=" + ln + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "phoneNum=" + pn + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "pCode=" + pc + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "bankRoll=" + sa + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "lastVisit=" + lv + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}//deleteCookie()

//Gets the single number's bet and verifies it before applying it.
function numberBetPlacement(numVal){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this number?");
		betIsPassed = validateBetValue(bet, "Number");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		numBetArray.push(new Array(numVal, bet));
		setBet(bet);
		isNumBet = true;
		$("#"+numVal).show();
	}
}//numberBetPlacement(val)

//Gets the numbers surrounding the corner, then verifies the user's bet before applying it.
function cornerBetPlacement(topLeft, topRight, botLeft, botRight){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this corner?");
		betIsPassed = validateBetValue(bet, "Corner");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		cornerBetArray.push(new Array(new Array(topLeft, topRight, botLeft, botRight), bet));
		setBet(bet);
		isCornerBet = true;
		$("#"+topLeft+""+topRight+""+botLeft+""+botRight).show();
	}
}//cornerBetPlacement()

function streetBetPlacement(topNum, midNum, botNum){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this street?");
		betIsPassed = validateBetValue(bet, "Street");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		streetBetArray.push(new Array(new Array(topNum, midNum, botNum), bet));
		setBet(bet);
		isStreetBet = true;
		$("#"+topNum + "" + midNum + "" + botNum).show();
	}
}//streetBetPlacement()

function avenueBetPlacement(n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this avenue?");
		betIsPassed = validateBetValue(bet, "Avenue");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		avenueBetArray.push(new Array(new Array(n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12), bet));
		setBet(bet);
		isAvenueBet = true;
		$("#av"+n1).show();
	}
}//avenueBetPlacement()


function oneThirdBetPlacement(one3rd){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this third of numbers?");
		betIsPassed = validateBetValue(bet, "One Third");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		oneThirdBetArray.push(new Array(one3rd, bet));
		setBet(bet);
		isThirdBet = true;
		$("#"+one3rd).show();
	}
}//oneThirdBetPlacement()

function highLowBetPlacement(highLow){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this half of numbers?");
		betIsPassed = validateBetValue(bet, "One Half");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		highLowBetArray.push(new Array(highLow, bet));
		setBet(bet);
		isHighLowBet = true;
		$("#"+highLow).show();
	}
}//highLowBetPlacement()

function colourBetPlacement(colour){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this colour?");
		betIsPassed = validateBetValue(bet, "Colour");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		colourBetArray.push(new Array(colour, bet));
		setBet(bet);
		isColourBet = true;
		$("#"+colour).show();
	}
}//colourBetPlacement()

function oddEvenBetPlacement(oddEven){
	var bet;
	var betIsPassed = false;
	while(!betIsPassed){
		bet = prompt("How much money would you like to bet on this number type?");
		betIsPassed = validateBetValue(bet, "Odd-Even");
	}
	
	if(betIsPassed){
		bet = parseInt(bet);
		oddEvenBetArray.push(new Array(oddEven, bet));
		setBet(bet);
		isOddEvenBet = true;
		$("#"+oddEven).show();
	}
}

function determineWin(spinValue){

	/*Checks to see if there is a bet on a number, and if so, check is the spun number
	corresponds to the player's bet.*/
	if(numBetArray.length >= 0 && numBetArray[0] != null){
		var won = false;
		for(i = 0; i < numBetArray.length; i++){
			
			if(numBetArray[i][0] == spinValue){
				if(numBetArray[i][0] == 0){
					won = true;
					alert("Number Bet:\nYou win! You correctly chose the number " + spinValue);
					startingAmount += parseInt(numBetArray[i][1]) + parseInt(numBetArray[i][1]) * 40;
					updateCookieBankRoll(startingAmount);
					moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
					flashMoney();
					flashLights();
					numBetArray = new Array();
					isNumBet = false;
				}else{
					won = true;
					alert("Number Bet:\nYou win! You correctly chose the number " + spinValue);
					startingAmount += parseInt(numBetArray[i][1]) + parseInt(numBetArray[i][1]) * 35;
					updateCookieBankRoll(startingAmount);
					moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
					flashMoney();
					flashLights();
					numBetArray = new Array();
					isNumBet = false;
				}
			}
		}//for(i)
		
		if(!won){
			alert("Number Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			numBetArray = new Array();
			isNumBet = false;
		}//if(!won)
	}
	
	
	/*Checks to see if the player placed a bet on a corner, and if so, check to see
	if the spun number corresponds to one of the numbers around said corner.*/
	if(cornerBetArray.length >= 0 && cornerBetArray[0] != null){
		var won = false;
		for(i = 0; i < cornerBetArray.length; i++){
			
			for(j = 0; j < cornerBetArray[i][0].length; j++){
				
				if(cornerBetArray[i][0][j] == spinValue){
					
					won = true;
					alert("Corner bet:\nYou win! The spun number was " + spinValue);
					startingAmount += parseInt(cornerBetArray[i][1]) + parseInt(cornerBetArray[i][1]) * 8;
					updateCookieBankRoll(startingAmount);
					moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
					flashMoney();
					flashLights();
					cornerBetArray = new Array();
					isCornerBet = false;
				}
			if(won){
				break;
			}
			}//for(j)
		}//for(i)
		
		if(!won){
			alert("Corner Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			cornerBetArray = new Array();
			isCornerBet = false;
		}//if(!won)
	}
	
	//Checks if a bet has been placed in a street, and if that bet is a winning one.
	if(streetBetArray.length >= 0 && streetBetArray[0] != null){
		var won = false;
		for(i = 0; i < streetBetArray.length; i++){
			
			for(j = 0; j < streetBetArray[i][0].length; j++){
				if(streetBetArray[i][0][j] == spinValue){
					won = true;
					alert("Street bet:\nYou win! The spun number was " + spinValue);
					startingAmount += parseInt(streetBetArray[i][1]) + parseInt(streetBetArray[i][1]) * 11;
					updateCookieBankRoll(startingAmount);
					moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
					flashMoney();
					flashLights();
					streetBetArray = new Array();
					isStreetBet = false;
				}//if()
				if(won){
					break;
				}
			}//for(j)
		}//for(i)
		
		if(!won){
			alert("Street Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			streetBetArray = new Array();
			isStreetBet = false;
		}//if(!won)
	}
	
	//Checks to see if there is a bet on an avenue, and if that bet is a winning one.
	if(avenueBetArray.length >= 0 && avenueBetArray[0] != null){
		var won = false;
		for(i = 0; i < avenueBetArray.length; i++){
			
			for(j = 0; j < avenueBetArray[i][0].length; j++){
				if(avenueBetArray[i][0][j] == spinValue){
					won = true;
					alert("Avenue bet:\nYou win! The spun number was " + spinValue);
					startingAmount += parseInt(avenueBetArray[i][1]) + parseInt(avenueBetArray[i][1]) * 3;
					updateCookieBankRoll(startingAmount);
					moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
					flashMoney();
					flashLights();
					avenueBetArray = new Array();
					isAvenueBet = false;
				}//if()
				if(won){
					break;
				}
			}//for(j)
		}//for(i)
		if(!won){
			alert("Avenue Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			avenueBetArray = new Array();
			isAvenueBet = false;
		}//if(!won)
	}
	
	/*Checks to see if there is a bet on a one third
	section of the table and if that bet is a winning one.*/
	if(oneThirdBetArray.length >= 0 && oneThirdBetArray[0] != null){
		var won = false;
		for(i = 0; i < oneThirdBetArray.length; i++){
			
			switch(oneThirdBetArray[i][0]){
				case "firstThirdBet":
					if(spinValue >= 1 && spinValue <= 12){
						won = true;
						alert("First third bet:\nYou win! The spun number was " + spinValue);
						startingAmount += parseInt(oneThirdBetArray[i][1]) + parseInt(oneThirdBetArray[i][1]) * 2;
						updateCookieBankRoll(startingAmount);
						moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
						flashMoney();
						flashLights();
						oneThirdBetArray = new Array();
						isThirdBet = false;
					}else{
						isThirdBet = false;
						won = false;
					}
					break;
				
				case "secondThirdBet":
					if(spinValue >= 13 && spinValue <= 24){
						won = true;
						alert("Second third bet:\nYou win! The spun number was " + spinValue);
						startingAmount += parseInt(oneThirdBetArray[i][1]) + parseInt(oneThirdBetArray[i][1]) * 2;
						updateCookieBankRoll(startingAmount);
						moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
						flashMoney();
						flashLights();
						oneThirdBetArray = new Array();
						isThirdBet = false;
					}else{
						isThirdBet = false;
						won = false;
					}
					break;
					
				case "lastThirdBet":
					if(spinValue >= 25 && spinValue <= 36){
						won = true;
						alert("Last third bet:\nYou win! The spun number was " + spinValue);
						startingAmount += parseInt(oneThirdBetArray[i][1]) + parseInt(oneThirdBetArray[i][1]) * 2;
						updateCookieBankRoll(startingAmount);
						moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
						flashMoney();
						flashLights();
						oneThirdBetArray = new Array();
						isThirdBet = false;
					}else{
						isThirdBet = false;
						won = false;
					}
					break;
			}//switch()
		}//for(i)
		if(!won){
			alert("Last third Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			oneThirdBetArray = new Array();
			isThirdBet = false;
		}
	}
	
	//Checks to see if there is a bet on a half of the numbers and if the bet is a winning one.
	if(highLowBetArray.length >= 0 && highLowBetArray[0] != null){
		var won = false;
		for(i = 0; i < highLowBetArray.length; i++){
			
			switch(highLowBetArray[i][0]){
				case "low":
					if(spinValue >= 1 && spinValue <= 18){
						won = true;
						alert("Low bet:\nYou win! The spun number was " + spinValue);
						startingAmount += parseInt(highLowBetArray[i][1]) * 2;
						updateCookieBankRoll(startingAmount);
						moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
						flashMoney();
						flashLights();
						highLowBetArray = new Array();
						isHighLowBet = false;
					}else{
						won = false;
					}
					break;
					
				case "high":
					if(spinValue >= 19 && spinValue <= 36){
						won = true;
						alert("High bet:\nYou win! The spun number was " + spinValue);
						startingAmount += parseInt(highLowBetArray[i][1]) * 2;
						updateCookieBankRoll(startingAmount);
						moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
						flashMoney();
						flashLights();
						highLowBetArray = new Array();
						isHighLowBet = false;
					}else{
						won = false;
					}
					break;
			}//switch()
		}//for(i)
		if(!won){
			alert("High-Low Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			highLowBetArray = new Array();
			isHighLowBet = false;
		}
	}
	
	//Checks to see if there is a bet on a specific colour and if it is a winning bet.
	if(colourBetArray.length >= 0 && colourBetArray[0] != null){
		var won = false;
		var blackNums = getBlackNumsArray();
		var redNums = getRedNumsArray();
		if(spinValue == 0){
			alert("Colour Bet:\nYou lost. The spun number was 00.");
			colourBetArray = new Array();
		}else{
			for(i = 0; i < colourBetArray.length; i++){
				
				switch(colourBetArray[i][0]){
					
					case "red":
						for(j = 0; j < redNums.length; j++){
							if(redNums[j] == spinValue){
								won = true;
								alert("Colour bet:\nYou win! The spun number was red and was " + spinValue);
								startingAmount += parseInt(colourBetArray[i][1]) * 2;
								updateCookieBankRoll(startingAmount);
								moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
								flashMoney();
								flashLights();
								colourBetArray = new Array();
								isColourBet = false;
							}
						}//for(j)
						break;
						
					case "black":
						for(j = 0; j < blackNums.length; j++){
							if(blackNums[j] == spinValue){
								won = true;
								alert("Colour bet:\nYou win! The spun number was black and was " + spinValue);
								startingAmount += parseInt(colourBetArray[i][1]) * 2;
								updateCookieBankRoll(startingAmount);
								moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
								flashMoney();
								flashLights();
								colourBetArray = new Array();
								isColourBet = false;
							}
						}//for(j)
						break;
				}//switch()
			}//for(i)
			if(!won){
				alert("Colour Bet:\nYou lost. The spun number was " + spinValue);
				moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
				redMoney();
				colourBetArray = new Array();
				isColourBet = false;
			}
		}//else
	}
	
	//Checks to see if there is a bet on either odd or even, and if the bet is a winning one.
	if(oddEvenBetArray.length >= 0 && oddEvenBetArray[0] != null){
		var won = false;
		for(i = 0; i < oddEvenBetArray.length; i++){
			switch(oddEvenBetArray[i][0]){
				case "odd":
					if(spinValue % 2 != 0){
						won = true;
						alert("Odd bet:\nYou win! The spun number was " + spinValue);
							startingAmount += parseInt(oddEvenBetArray[i][1]) * 2;
							updateCookieBankRoll(startingAmount);
							moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
							flashMoney();
							flashLights();
							oddEvenBetArray = new Array();
							isOddEvenBet = false;
					}else{
						won = false;
					}
					break;
				
				case "even":
					if(spinValue % 2 == 0){
						won = true;
						alert("Even bet:\nYou win! The spun number was " + spinValue);
							startingAmount += parseInt(oddEvenBetArray[i][1]) * 2;
							updateCookieBankRoll(startingAmount);
							moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
							flashMoney();
							flashLights();
							oddEvenBetArray = new Array();
							isOddEvenBet = false;
					}else{
						won = false;
					}
					break;
			}//switch()
		}//for(i)
		if(!won){
			alert("Even Bet:\nYou lost. The spun number was " + spinValue);
			moneyAmt.innerHTML =  "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
			redMoney();
			oddEvenBetArray = new Array();
			isOddEvenBet = false;
		}
	}//if(oddEvenBet
	
	$(".numChip").hide();
	$(".cornerChip").hide();
	$(".avenueChip").hide();
	$(".streetChip").hide();
	$(".thirdChip").hide();
	$(".botChip").hide();
}//determineWin()


function flashMoney(){
	$("#amtId").effect("highlight", 1000);
}

function redMoney(){
	$("#amtId").effect("explode", {pieces: 5}, 500);
	$("#amtId").effect("highlight", {color: 'red'}, 1000);
}