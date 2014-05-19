var _ = function(id){return document.getElementById(id)}
var startingAmount;
var lVisit;
var colourBet, numberBet, cornerBet, streetBet, oddEvenBet, oneThirdBet, highLowBet;

var blackNumsArray = new Array();

	//initializes even numbers from 2 to 10
	for(i = 0; i < 5; i++){
		blackNumsArray[i] = (i*2 + 2);
	}
	
	//initializes odd numbers from 11 to 17
	for(i = 5; i <= 9; i++){
		blackNumsArray[i] = (i*2 + 1);
	}
	
	//initializes even numbers from 20 to 28
	for(i = 9; i < 15 - 1; i++){
		blackNumsArray[i] = ((i-4)*2 + 10);
	}
	
	//initializes odd numbers from 29 to 35
	for(i = 14; i <= 17; i++){
		blackNumsArray[i] = (i*2 + 1);
	}

var redNumsArray = new Array();

	//initializes odd numbers from 1 to 9
	for(i = 0; i < 5; i++){
		redNumsArray[i] = (i*2 + 1);
	}
	
	//initializes even numbers from 12 to 18
	for(i = 5; i < 9; i++){
		redNumsArray[i] = ((i-4)*2 + 10);
	}
	
	//initializes odd numbers from 19 to 27
	for(i = 9; i < 14; i++){
		redNumsArray[i] = (i*2 + 1);
	}
	
	//initializes even numbers from 30 to 36
	for(i = 14; i < 18; i++){
		redNumsArray[i] = (i*2 + 2);
	}
	
function getRedNumsArray(){
	return redNumsArray;
}

function getBlackNumsArray(){
	return blackNumsArray;
}

function formDataUsage(){	
		
	var personalInfo = _("personalInfo");
	personalInfo.innerHTML += firstName + "&nbsp;" + lastName + "&nbsp;&nbsp;" + postalCode + "&nbsp;&nbsp;" + phoneNumber;
	
	moneyAmt = _("cashAmount");
	moneyAmt.innerHTML = "Current&nbsp;Money:&nbsp;<span id='amtId'>$" + startingAmount + "</span>";
	amountID = _("amtId");
}//formDataUsage()

function initCookieValues(){
	var cookies = document.cookie;
	cookies = decodeURIComponent(cookies);
	
	var lastVisitDate;
	
	var nVal;
	
	var cookieArr = cookies.split("; ");
	for(i = 0; i < cookieArr.length; i++){
		nVal = cookieArr[i].substring(0, cookieArr[i].indexOf("="));
		
		switch(nVal){
			case "firstName":
				firstName = cookieArr[i].substring(cookieArr[i].indexOf("=")+1);
				break;
				
			case "lastName":
				lastName = cookieArr[i].substring(cookieArr[i].indexOf("=")+1);
				break;
				
			case "phoneNum":
				phoneNumber = cookieArr[i].substring(cookieArr[i].indexOf("=")+1);
				break;
				
			case "pCode":
				postalCode = cookieArr[i].substring(cookieArr[i].indexOf("=")+1);
				break;
				
			case "bankRoll":
				startingAmount = cookieArr[i].substring(cookieArr[i].indexOf("=")+1);
				break;
				
			case "lastVisit":
				lVisit = cookieArr[i].substring(cookieArr[i].indexOf("=")+1);
				
				lastVisitDate = stringToDate(lVisit);
				
				var futureDate = new Date();
				futureDate.setFullYear(futureDate.getFullYear() + 1);
				
				var curDate = new Date();
				var monthNames = [ "January", "February", "March", "April", "May", "June",
    				"July", "August", "September", "October", "November", "December" ];
				document.cookie = "lastVisit=" + encodeURIComponent(monthNames[curDate.getMonth()] + " " + curDate.getDate() + ", " + curDate.getFullYear())  					+ "; expires=" + futureDate.toUTCString();
				break;
			
			default:
				alert("There was a problem getting the cookie's values.");
				break;
		}
		
	}
	
	var header = _("headSpan");
	header.innerHTML += " -- Not " + firstName + " " + lastName + "? <a href=\"intro.html\" onclick=\"deleteCookie(firstName, lastName, phoneNumber, postalCode, startingAmount, lVisit);\">Sign in as a new user</a>";
	
	formDataUsage();
	welcomeCookieMsg(lastVisitDate);
}//initCookieValues()

//Returns the values written in the cookie so that they may be used on the game page.
function getCookieValues(){
	
	var tempCookieArray = new Array(firstN, lastN, phoneN, postCode, sAmt, lVisit);
	return tempCookieArray;
}//getCookieValues()

function spin(){
	var spinValue = Math.floor(Math.random()*36);
	
	determineWin(spinValue);
}//spin()

function setBet(val){
	numberBet = val;
	
	startingAmount -= parseInt(numberBet);
	updateCookieBankRoll(startingAmount);
	alert("Bet placed.");
	moneyAmt.innerHTML = "Current&nbsp;Money:&nbsp;$" + startingAmount;
}//validateNumberBet()

function validateBetValue(betVal, elemName){
	if(betVal == ""){
		alert(elemName + " bet field cannot be empty.");
		return false;
	}else if(isNaN(betVal)){
		alert(elemName + " bet field can only contain numbers.");
		return false;
	}else if(betVal.search(/[\.\,]/) != -1){
		alert(elemName + " bet field cannot contain decimals.");
		return false;
	}else if(parseInt(betVal) > startingAmount){
		alert("Bet cannot exceed your current amount of money.");
		return false;
	}else if(parseInt(betVal) <= 0){
		alert("You must enter a positive number greater than 0.");
		return false;
	}else{
		return true;
	}
}//validateBetValue()

function animateWheel(){
	//Checks to see if the player did not place a bet but spun anyway.
	if(!isNumBet && !isCornerBet && !isStreetBet && !isAvenueBet && !isThirdBet && !isHighLowBet && !isColourBet && !isOddEvenBet){
		alert("You must place at least one bet on the table.");
	}else{
		$("#wheel").removeAttr("onclick");
		$("#wheel").rotate({
			angle:0,
			animateTo:1080,
			duration:7000
		});
		setTimeout('spin()',7050);
		setTimeout("$('#wheel').attr('onclick', 'animateWheel()')", 7050);
	}
}//animateWheel()

function buttonSpin(){
	if(!isNumBet && !isCornerBet && !isStreetBet && !isAvenueBet && !isThirdBet && !isHighLowBet && !isColourBet && !isOddEvenBet){
		alert("You must place at least one bet on the table.");
	}else{
		spin();
	}
}//buttonSpin()


//Flashes lights when the users wins on a bet.

function flashLights(){
	var flashingLight = setInterval(function(){
		$("#lightBox1").show();
		$("#lightBox2").show();
        var xPos = Math.round(Math.random()*300);
        var yPos = Math.round(Math.random()*500);
        if(xPos >= 86){
            xPos -= 86;
        }
        
        if(yPos >= 86){
            yPos -= 86;
        }
        $(".light").css({
            marginLeft:xPos,
            marginTop:yPos
        });
    }, 50);
    
    setTimeout(function(){clearInterval(flashingLight); $("#lightBox1,#lightBox2").css({
        display:'none'
    });}, 2500);
}