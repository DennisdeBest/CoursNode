$(document).ready(function() {
	$('.submit').attr('disabled', true);
	var emailCheck = false;
	var passwordCheck = false;


	var email_pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

	if(email_pattern.test($('.email').val())){
		$('.email').addClass("inputOk");
		emailCheck = true;			
	} else {
		$('.email').addClass("inputKo");
		emailCheck = false;	
	}
	if(password_pattern.test($('.password').val())) {
		$('.password').addClass("inputOk");
		passwordCheck = true;
	} else {
		$('.password').addClass("inputOk");
		passwordCheck = true;
	}

	$('.email').bind("keyup change", function() {
		if(email_pattern.test($(this).val())){
			$(this).addClass("inputOk");
			$(this).removeClass("inputKo");
			emailCheck = true;
		} else {
			$(this).addClass("inputKo");
			$(this).removeClass("inputoK");
			emailCheck = false;
		}
	})
	$('.password').bind("keydown change", function(){
		if(password_pattern.test($(this).val())){
			$(this).addClass("inputOk");
			$(this).removeClass("inputKo");
			passwordCheck = true;
		} else {
			$(this).addClass("inputKo");
			$(this).removeClass("inputoK")
			passwordCheck = false;
		}
	})
	$('input').bind("keydown change", function(){
		var pass = $('.password').val();
		var mail = $('.email').val();
		if(passwordCheck && emailCheck) {
			$('.submit').attr('disabled', false);
		} 
	})
})