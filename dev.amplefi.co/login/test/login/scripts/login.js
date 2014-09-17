/*
 * Login - v28.5.0
 * Developed for Amplefi, LLC
 */
$(document).ready(function(){
	
// Global functions & variables 
	
	var cust = 'amplefi';
	var session = $.cookie('session');
	var d = new Date();
    var n = d.getHours();
	
	// Check URL param to show success message
	
	var showMessageReset = $.url().param('showSuccessReset');
	var showMessagePass = $.url().param('showSuccessPass');
	if (showMessageReset == 'true'){$('.alert').empty().addClass('success').append('<strong>Awesome: </strong>your password has been reset').css('display', 'block');}
	if (showMessagePass == 'true'){$('.alert').empty().append('Check your email for instructions to reset your password').css('display', 'block');}
	
	//Check session and authorize page 

	var checkSession = function(){ if (session != null) {
        $.getJSON("https://v43.amplefi.co/auth_page?callback=?", {
                token: session
            },
            function (data) {
               if (data.status == 'authorized') {	
			   
				window.location = '../dashboard/'
				}
				else if (data.status == 'expired'){
				  $("body").fadeIn('fast');
				$.removeCookie('session', { path: '/' });
				}
				else {
					  $("body").fadeIn('fast');
				$.removeCookie('session', { path: '/' });
               }
            });
    } else {
		 $("body").fadeIn('fast');
	   $.removeCookie('session', { path: '/' });
       
    }
}
	// Reset email form fields
	
		// Reset email and submit
		var resetEmail = function () {$('.email-address').focus(function(){$('.alert').css('display', 'none');$('#large-btn').attr('value', 'Login').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer');$(this).css('border', '1px solid #e1e8ed');$(".password").css('border', '1px solid #e1e8ed');});}
		// Reset only pass field 
		var resetPassword = function () {$('.password').keyup(function(){$('.alert').css('display', 'none');$('#large-btn').attr('value', 'Login').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer');$(this).css('border', '1px solid #e1e8ed');});}
	
	// Submit button error handling
	
		// Enabled submit button
		var enableSubmit = function(){$('#large-btn').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer').attr('value', 'Login');}
		// Disabled submit button
		var disableSubmit = function(){$('#large-btn').attr('disabled', 'disabled').css('background', '#d6d6d6').css('cursor', 'not-allowed').attr('value', 'Error(s) on form');}
	
	//Form fields error handling
	
		// Error email field
		var highlightEmail = function(){$('.email-address').css('border', '1px solid #cf6d6b');}
		// Error password field
		var highlightPassword = function(){$('.password').css('border', '1px solid #cf6d6b');}
	
	// Form alerts handling
	
		// Error empty all
		var alertErrorAllEmpty = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>all fields are required').css('display', 'block');}
		// Error empty email
		var alertErrorEmailEmpty = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>an email address is required').css('display', 'block');}
		// Error empty password
		var alertErrorPasswordEmpty = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>password is required').css('display', 'block');}
		// Error incorrect email
		var alertErrorEmailNotValid = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>email address is not valid').css('display', 'block');}
		// Error incorrect password
		var alertErrorPasswordNotValid = function(){$('.alert').empty().removeClass('success').addClass('error').append('<strong>Oops: </strong>password is not valid').css('display', 'block');}
		// Success email reset
		var alertSuccessReset = function(){$('.alert').empty().removeClass('error').addClass('success').append('<strong>Awesome: </strong>your password has been reset').css('display', 'block');}
		
// Background rotator 

	// Create random number 1-8
		
	var bgCount = Math.floor(Math.random() * 18) + 1
		
	// Hide the image, append random image and show
		
	//$('#bg-img').hide().attr('src', 'images/bg'+bgCount+'.png').fadeIn(700);
	
// Form validation pre-submit 

	// Reset form fields 
	
	resetEmail();
	resetPassword();
	checkSession();
	// Server side validation 
		
		// Check email on loss of focus
		
		$('.password').focus(function(){
			var email = $('.email-address').val();
			
			// Check if email input is empty
			
			if ($('.email-address').val().length == 0){
				console.log("no value in email");
				alertErrorEmailEmpty();
				highlightEmail();
				disableSubmit();
			}
			else if ($('.email-address').val().length == 1){
				alert('email is loading');
			}
			
			// If email has value - send AJAX
			
			else{	
			console.log("email has a value");
        $.getJSON('https://v43.amplefi.co/auth?callback=?', {
                user: email,
                cust: cust
            },
            function (data) {
				
			// Authroized User 
			
			if (data.status == 'authorized'){
				console.log("email authorized");
			}
			
			// Error on form 
		
			else if (data.status == 'error'){			
			console.log("error in email");
			alertErrorEmailNotValid();
			highlightEmail();
			disableSubmit();
			}
			
			// Not autorized user
			
			else if (data.status == 'notauthorized'){
			console.log("email not authorized");
			alertErrorEmailNotValid();
			highlightEmail();
			disableSubmit();		
			}	
			else {
			console.log("ERROR EMAIL FALLBACK");
			alertErrorEmailNotValid();
			highlightPassword();
			disableSubmit();
			}	
			});
			}
		});
	// Login Submit Form 
	$('.process-login').submit(function(){
			var email = $('.email-address').val();
			var password = $('.password').val();
			
			// Add loading status 
			
			$('#large-btn').attr('value', 'Loading...');
			
			// Check if email input is empty
			if ($('.email-address').val().length == 0){
				console.log("No value in email");
				alertErrorAllEmpty();
				highlightPassword();
				highlightEmail();
				disableSubmit();
			}
			else if ($('.password').val().length == 0){
				console.log("No value in password");
				alertErrorPasswordEmpty();
				highlightPassword();
				disableSubmit();
			}
			
			
			// If email has value - send AJAX
			
			else{	
		console.log("email has a value");
        $.getJSON('https://v43.amplefi.co/auth_pwd?callback=?', {
                user: email,
				pwd : password,
                cust: cust
            },
            function (data) {
				
			// User fully authenticated 
			
			if (data.status == 'authenticated'){
				console.log("user authenticated");
				$.cookie('session', data.token, {domain: '.amplefi.co',path: '/'});
				$.cookie('mkid', data.master_key, {domain: '.amplefi.co',path: '/'});
				window.location = '../dashboard/'			
			}
	
			// Not autorized user
			
			else if (data.status == 'invalidpassword'){
			console.log("email not authorized");
			alertErrorPasswordNotValid();
			highlightPassword();
			disableSubmit();		
			}		
			
			else{
			console.log("ERROR PASSWORD FALLBACK");
			alertErrorPasswordNotValid();
			highlightPassword();
			disableSubmit();
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