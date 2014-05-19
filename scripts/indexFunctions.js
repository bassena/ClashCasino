var leftPlayerChip, centrePlayerChip, rightPlayerChip;

var leftChipTopMove = 53;
var leftChipLeftMove = 9;

var centreChipTopMove = 64;
var centreChipLeftMove = 46;

var rightChipTopMove = 53;
var rightChipLeftMove = 81;
 
var leftInterval, centreInterval, rightInterval;

function initChipMovement(){
	leftPlayerChip = document.getElementById("leftMovingChip");
	centrePlayerChip = document.getElementById("centreMovingChip");
	rightPlayerChip = document.getElementById("rightMovingChip");
	
	rightInterval = setInterval(rightChipMovement,80);
	
}

function leftChipMovement(){

	if(leftChipLeftMove < 80){
		leftPlayerChip.style.left = leftChipLeftMove + "%";
		leftChipLeftMove++;
	}

	if(leftChipTopMove > 23){
		leftPlayerChip.style.top = leftChipTopMove + "%";
		leftChipTopMove-=0.425;
	}else{
		clearInterval(leftInterval);
		setTimeout(lastCardFlip, 750);
	}
}

function centreChipMovement(){
	if(centreChipLeftMove < 81){
		centrePlayerChip.style.left = centreChipLeftMove + "%";
		centreChipLeftMove++;
	}

	if(centreChipTopMove > 23){
		centrePlayerChip.style.top = centreChipTopMove + "%";
		centreChipTopMove-=1.2;
	}else{
		clearInterval(centreInterval);
		leftInterval = setInterval(leftChipMovement,50);
		
	}
}

function rightChipMovement(){
	

	if(rightChipTopMove > 24){
		rightPlayerChip.style.top = rightChipTopMove + "%";
		rightChipTopMove--;
	}else{
		clearInterval(rightInterval);
		centreInterval = setInterval(centreChipMovement,80);
	}
}

function lastCardFlip(){
	document.getElementById("card5").src = "images/cards/1.png";
	endOfGameFlipOver();
}

function endOfGameFlipOver(){
	var leftPlayerCard1, leftPlayerCard2, centrePlayerCard1, centrePlayerCard2, rightPlayerCard1, rightPlayerCard2;
	
	setTimeout(function(){ // Function to show left player's cards
		leftPlayerCard1 = document.getElementById("leftCard1");
		leftPlayerCard2 = document.getElementById("leftCard2");
		
		leftPlayerCard1.src = "images/cards/16.png";
		leftPlayerCard2.src = "images/cards/41.png";
		
			setTimeout(function(){ // Function to show centre player's cards
			centrePlayerCard1 = document.getElementById("centreCard1");
			centrePlayerCard2 = document.getElementById("centreCard2");
			
			centrePlayerCard1.src = "images/cards/2.png";
			centrePlayerCard2.src = "images/cards/3.png";
			
				setTimeout(function(){ // Function to show right player's cards
				rightPlayerCard1 = document.getElementById("rightCard1");
				rightPlayerCard2 = document.getElementById("rightCard2");
				
				rightPlayerCard1.src = "images/cards/27.png";
				rightPlayerCard2.src = "images/cards/13.png";
				
				setTimeout(winnerBlink,750);
			},600);
		},600);
	},600);
}



function winnerBlink(){
	
	var img = new Array(2);
	var curWin = 0;
	var imgInterval;
	
	document.getElementById("winDiv").style.visibility = "visible";
	
	for(var i = 0; i < img.length; i++){
		img[i] = new Image();
		img[i].src = "images/winner" + i + ".png";
		
		if(i == 1){
			imgInterval = setInterval(function(){
				if(curWin == 1){
					curWin = 0;
				}else{
					curWin++;
				}
				document.getElementById("winnerImg").src = img[curWin].src;
			}, 450);
		}
	}
	setTimeout(function(){ 			//Anonymous function used to add elements once the page is cleared
		clearInterval(imgInterval);
		document.documentElement.replaceChild(document.createElement("body"), document.body);
		
		document.body.innerHTML += '<div class="nonmobile"><a href="intro.html" id="skip">Skip</a></div>';
		document.body.innerHTML += '<div class="nonmobile"><canvas id="finalAnimCanvas" width="460" height="250">Your browser does not support the HTML5 canvas.</canvas></div>';
		document.body.innerHTML += '<div class="nonmobile"><div id="horizon"><div id="logoDiv"><img src="images/logo_blink0.png" alt="image of logo" height="250" width="460" id="logo"/></div></div></div>';
		
		document.body.innerHTML += '<div class="mobile"><img id="mobileImg" class="mobileLogo" src="images/logo_blink1.png" alt="static logo image" width="345" height="187.5"/><a href="intro.html" class="enter">Enter</a></div>';
		
		canvasAnimations();			//Is called when the new elements are done loading
	},4500);
}

function canvasAnimations(){
	var canvas = document.getElementById("finalAnimCanvas");
	var context = canvas.getContext('2d');
	var windowSize = window.innerWidth;
	
	var cardX = 0;
	
	canvas.width = windowSize;
	var cardImg = new Image();
	var logo, imgInterval;
	
	cardImg.src = "images/bothCards.png";
	
	document.body.onload = logoBlink();
	
		cardsInterval = setInterval(function(){
				context.clearRect(0,0,canvas.width, canvas.height);
				context.drawImage(cardImg,cardX,0,236,228);
				if(cardX >= canvas.width/2 - 125){
					clearInterval(cardsInterval);
					setTimeout(function(){window.location = "intro.html";}, 2000); //Redirects to the form page (game page) 2 seconds after finishing moving
				}else{
					cardX += 13;
				}
			}, 200);
		

}

function logoBlink(){
	var curLogo = 0;
	var logo = new Array(2);
	var logoInterval;
	for(var i = 0; i < logo.length; i++){
		logo[i] = new Image();
		logo[i].src = "images/logo_blink" + i + ".png";
		
		if(i == 1){
			logoInterval = setInterval(function(){
				if(curLogo == 1){
					curLogo = 0;
				}else{
					curLogo++;
				}
				document.getElementById("logo").src = logo[curLogo].src;
			}, 450);
		}
	}
}