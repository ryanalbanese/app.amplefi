/*
 * Set - v28.5.0
 * Developed for Amplefi, LLC
 */
$(document).ready(function(){
// Unhide page

$('body').fadeIn('fast');

// Global functions & variables 
	
	var cust = 'amplefi';
	var uid = $.url().param('uid');
	// Reset email form fields
	
		// Confirm password match 
		
	function checkPasswordMatch() {
			
    var password = $(".password").val();
    var confirmPassword = $(".password-confirm").val();

    if (password != confirmPassword){
		$('.alert').empty().addClass('error').append('<strong>Oops: </strong>passwords must match').css('display', 'block');
	
    }
       
    else if (password == confirmPassword){
		$('.alert').empty().addClass('success').append('<strong>Awesome: </strong>passwords match!').css('display', 'block');
     $('.password').css('border', '1px solid #a3c5a0');
     $('.password-confirm').css('border', '1px solid #a3c5a0');
}
		}

		// Reset email and submit
		var resetPassword = function () {$('.password').focus(function(){$('.alert').css('display', 'none');$('#large-btn').attr('value', 'Reset password').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer');$(this).css('border', '1px solid #e1e8ed');});}
	
	// Submit button error handling
	
		// Enabled submit button
		var enableSubmit = function(){$('#large-btn').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer').attr('value', 'Get Reset Link');}
		// Disabled submit button
		var disableSubmit = function(){$('#large-btn').attr('disabled', 'disabled').css('background', '#d6d6d6').css('cursor', 'not-allowed').attr('value', 'Error(s) on form');}
	
	//Form fields error handling
	
		// Error email field
		var highlightCofirm = function(){$('.password-confirm').css('border', '1px solid #cf6d6b');}
		var highlightPassword = function(){$('.password').css('border', '1px solid #cf6d6b');}
	
	// Form alerts handling
		
		// Error empty email
		var alertErrorConfirmEmpty = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>a password is required').css('display', 'block');}
		
		// Error incorrect email
		var alertErrorNoMatch = function(){$('.alert').empty().addClass('error').append('Passwords do not match').css('display', 'block');}
		
		// Error invalid token
		var alertErrorInvalidToken = function(){$('.alert').empty().append('Your token has expired. <a class="reset-link" href="../reset/"> Reset your password.</a>').css('display', 'block');}
// Background rotator 

	// Create random number 1-8
		
	var bgCount = Math.floor(Math.random() * 2) + 1
		
	// Hide the image, append random image and show
		
	$('#bg-img').hide().attr('src', '../login/images/bg'+bgCount+'.png').fadeIn(700);
	
// Form validation pre-submit

	// Client side validation 
	$('.password-confirm').focus(function(){
			var email = $('.email-address').val();
			
			// Check if email input is empty
			
			if ($('.password').val().length == 0){
				console.log("no value in email");
				highlightPassword();
				alertErrorConfirmEmpty();
				disableSubmit();
			}
	});
		
	// Login Submit Form 
	$('.process-reset').submit(function(){
			var password = $('.password').val();
			var passwordConfirm = $('.password-confirm').val();
			
			// Add loading status 
			
			$('#large-btn').attr('value', 'Loading...');
			
			// Check if email input is empty
			
			if ($('.password').val().length == 0){
				console.log("No value in password");
				
			}
			else if ($('.password-confirm').val().length == 0){
				console.log("No value in pass or confirmation");
				disableSubmit();
				
			}
			
			// If email has value - send AJAX
			
			else {	
			console.log("email has a value");
        $.getJSON('https://v43.amplefi.co/auth_set_pwd?callback=?', {
                pwd1: password,
				pwd2: passwordConfirm,
				token: uid
            },
            function (data) {
				if (data.status == 'ok'){
					console.log('match! ok! redirect!');
					window.location = '../login/?showSuccessReset=true'
				}
				else if (data.status == 'nomatch'){
					console.log('passwords dont match');
					disableSubmit();
					alertErrorNoMatch();
				} 
				else if (data.status == 'invalid_token'){
					console.log('token is invalid');
					$('#large-btn').attr('value','Reset password');
					alertErrorInvalidToken();
				} 
			});
			}
			return false;
		});
// Detect if mobile 
$( window ).resize(function() {
 if ($(".content").css("padding") == "20px" ){
	 $( "#bg-img" ).remove();
 }
});		
// End Doc Ready
});