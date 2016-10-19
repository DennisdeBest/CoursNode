$(document).ready(function() {
	$('.submit').attr('disabled', true);
	var email_pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	$('.email').change(function() {
		if(email_pattern.test($(this).val())){
			$(this).addClass("inputOk");
			$(this).removeClass("inputKo");
		} else {
			$(this).addClass("inputKo");
			$(this).removeClass("inputoK")
		}
	})
	$('.password').change(function(){
		if(password_pattern.test($(this).val())){
			$(this).addClass("inputOk");
			$(this).removeClass("inputKo");
		} else {
			$(this).addClass("inputKo");
			$(this).removeClass("inputoK")
		}
	})
	$('input').change(function(){
		var pass = $('.password').val();
		var mail = $('.email').val();
		console.log("keydown");
		if(password_pattern.test(pass) && email_pattern.test(mail)) {
			console.log("conditions met");
			$('.submit').attr('disabled', false);

		} 

	})
})