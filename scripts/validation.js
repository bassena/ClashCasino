var validationFlag = false;

$(document).ready(function(){
	$(document).tooltip();
	$("form").dialog({
		open: function(){
			$("#firstName").blur();
		},
		autoOpen: true,
		draggable: false,
		resizable: false,
		closeOnEscape:false,
		dialogClass: "noclose",
		height:"auto",
		width:450,
		modal:true,
		buttons: {
			"Submit": function(){
				var res = validateFields();
				if(res){
					$(this).submit();
				}
			} //"submit"
		}//buttons
	});
	
});

function validateFields(){
	
	/*Boolean variables, assigned to their appropriate method calls, used to make sure all fields
	have passed validation before submission*/
	var isFNamePassed, isLNamePassed, isPhoneNumPassed, isPostCodePassed, isStartingAmtPassed;
	

	/* Retrieves what the person entered as a first name and sends it to the
	validateFirstName(fName) function. A value of true is returned if the validation passed. */
	isFNamePassed = validateFirstName(document.getElementById("firstName").value);
	

	// Same principle as before.
	isLNamePassed = validateLastName(document.getElementById("lastName").value);
	
	// Same principle as before.
	isPhoneNumPassed = validatePhoneNum(document.getElementById("phoneNum").value);
	
	isPostCodePassed = validatePostalCode(document.getElementById("postalCode").value);
	
	// Same principle as before.
	isStartingAmtPassed = validateStartingAmt(document.getElementById("startingCash").value);
	
	
	
	
	if(isFNamePassed && isLNamePassed && isStartingAmtPassed && isPhoneNumPassed && isPostCodePassed){
		createCookie(_("firstName").value, _("lastName").value, _("phoneNum").value, _("postalCode").value, _("startingCash").value);
		return true;
	}else{
		return false;
	}
}

function validateFirstName(fName){
	var lengthElem = document.getElementById("firstNameErrorMsg");
	var capitalElem = document.getElementById("firstNameLetterErrorMsg");
	var emptyFieldErrElem = document.getElementById("fNameEmptyFieldErrorMsg");
	var onlyLetterErrElem = document.getElementById("fNameNumFieldErrMsg");
	var numCheck = /[0-9]/;
	
	
	if(fName == "" || fName == "Enter your first name"){
		//Clears error messages if some have been previously displayed
		capitalElem.style.display = "none";
		lengthElem.style.display = "none";
		onlyLetterErrElem.style.display = "none";
		
		emptyFieldErrElem.style.display = "inherit";
		return false;
			
	}
	else if(fName.search(numCheck) != -1){
		capitalElem.style.display = "none";
		lengthElem.style.display = "none";
		emptyFieldErrElem.style.display = "none";
		
		onlyLetterErrElem.style.display = "inherit";
		
		return false;
	
	}else{
		//Checks if the length of the first name is less than or equal to 20
		if(fName.length > 20){
			emptyFieldErrElem.style.display = "none";
			capitalElem.style.display = "none";
			onlyLetterErrElem.style.display = "none";
			
			lengthElem.style.display = "inherit";
			
			return false;
			
		//Checks if the first letter is a capital letter	
		}else if(fName.charAt(0) !== fName.charAt(0).toUpperCase()){
			
			//Hides the previous error message if the case may be
			lengthElem.style.display = "none";
			emptyFieldErrElem.style.display = "none";
			onlyLetterErrElem.style.display = "none";
			
			capitalElem.style.display = "inherit";
			return false;
		}else{
			
			//Hides the previous error message if the case may be
			emptyFieldErrElem.style.display = "none";
			capitalElem.style.display = "none";
			lengthElem.style.display = "none";
			onlyLetterErrElem.style.display = "none";
			
			return true;
		}
	}
}

function validateLastName(lName){
	var lengthErrorElem = document.getElementById("lastNameErrorMsg");
	var capitalErrorElem = document.getElementById("lastNameLetterErrorMsg");
	var emptyFieldErrElem = document.getElementById("lNameEmptyFieldErrorMsg");
	var onlyLetterErrElem = document.getElementById("lNameNumFieldErrMsg");
	var numCheck = /[0-9]/;
	
	if(lName == "" || lName == "Enter your last name"){
		//Clears error messages if some have been previously displayed
		capitalErrorElem.style.display = "none";
		lengthErrorElem.style.display = "none";
		onlyLetterErrElem.style.display = "none";
		
		emptyFieldErrElem.style.display = "inherit";
		return false;
			
	}else if(lName.search(numCheck) != -1){
		capitalElem.style.display = "none";
		lengthElem.style.display = "none";
		emptyFieldErrElem.style.display = "none";
		
		onlyLetterErrElem.style.display = "inherit";
		
		return false;
	
	}else{
		if(lName.length > 30){
			
			emptyFieldErrElem.style.display = "none";
			capitalErrorElem.style.display = "none";
			onlyLetterErrElem.style.display = "none";
			
			lengthErrorElem.style.display = "inherit";
			return false;
			
		}else if(lName.charAt(0) !== lName.charAt(0).toUpperCase()){
			
			//Hides the previous error message if the case may be
			lengthErrorElem.style.display = "none";
			emptyFieldErrElem.style.display = "none";
			onlyLetterErrElem.style.display = "none";
			
			capitalErrorElem.style.display = "inherit";
			return false;
			
		}else{
			
			//Hides the previous error message if the case may be
			emptyFieldErrElem.style.display = "none";
			lengthErrorElem.style.display = "none";
			capitalErrorElem.style.display = "none";
			onlyLetterErrElem.style.display = "none";
			
			return true;
		}
	}
}

function validatePhoneNum(phoneNum){
	var phoneNumFormat = /^\(?\d{3}\)?[\-\. ]\d{3}[\-\.]\d{4}$/;
	
	var phoneEmptyFieldElem = document.getElementById("phoneNumEmptyFieldErrorMsg");
	var phoneWrongFormatErrElem = document.getElementById("phoneWrongFormatErrMsg");
	
	if(phoneNum == "" || phoneNum == "(###) ###-####"){
		
		phoneWrongFormatErrElem.style.display = "none";
		phoneEmptyFieldElem.style.display = "inherit";
		return false;
	}else{
		
		 //-1 is returned if the pattern does not match
		if(phoneNum.search(phoneNumFormat) == -1){
			phoneEmptyFieldElem.style.display = "none";
			phoneWrongFormatErrElem.style.display = "inherit";
			return false;
		}
			
		else{
			phoneEmptyFieldElem.style.display = "none";
			phoneWrongFormatErrElem.style.display = "none";
			
			return true;
		}
	}
}

function validatePostalCode(postCode){
	var postalRegExp = /[A-Z][0-9][A-Z]\ [0-9][A-Z][0-9]/;
	var emptyPostCodeElem = document.getElementById("emptyPostCodeErrMsg");
	var wrongFormatPostCodeElem = document.getElementById("postCodeWrongFormatErrMsg");
	
	if(postCode == "" || postCode == "Ex.: A1A 1A1"){
		wrongFormatPostCodeElem.style.display = "none";
		
		emptyPostCodeElem.style.display = "inherit";
		return false;
	}else{
		if(postCode.search(postalRegExp) == -1){
			emptyPostCodeElem.style.display = "none";
			
			wrongFormatPostCodeElem.style.display = "inherit";
			return false;
		}else{
			emptyPostCodeElem.style.display = "none";
			wrongFormatPostCodeElem.style.display = "none";
			return true;
		}
	}
}

function validateStartingAmt(amt){
	var regExpPeriod = /[\.\,]/;
	
	var NaNErrElem = document.getElementById("onlyNumbersAllowedErrorMsg");
	var cashAmtErrElem = document.getElementById("cashAmtErrorMsg");
	var decimalErrElem = document.getElementById("cashDecimalErrorMsg");
	var emptyFieldErrElem = document.getElementById("cashEmptyFieldErrorMsg");
	
	if(amt == "" || amt == "In dollars ($)"){
		
			//Clears error messages if some have been previously displayed
			cashAmtErrElem.style.display = "none";
			NaNErrElem.style.display = "none";
			decimalErrElem.style.display = "none";
			
			emptyFieldErrElem.style.display = "inherit";
			return false;
			
	}else{
		if(isNaN(amt)){
			
			emptyFieldErrElem.style.display = "none";
			cashAmtErrElem.style.display = "none";
			decimalErrElem.style.display = "none";
			NaNErrElem.style.display = "inherit";
			return false;
			
		}else if(parseInt(amt) < 5 || parseInt(amt) > 5000){
			
			emptyFieldErrElem.style.display = "none";
			decimalErrElem.style.display = "none";
			NaNErrElem.style.display = "none";
			cashAmtErrElem.style.display = "inherit";
			return false;
			
		}else if(amt.search(regExpPeriod) != -1){
			
			
			emptyFieldErrElem.style.display = "none";
			NaNErrElem.style.display = "none";
			cashAmtErrElem.style.display = "none";
			decimalErrElem.style.display = "inherit";
			return false;
			
		}else{
			decimalErrElem.style.display = "none";
			emptyFieldErrElem.style.display = "none";
			cashAmtErrElem.style.display = "none";
			NaNErrElem.style.display = "none";
			
			return true;
		}
	}
}