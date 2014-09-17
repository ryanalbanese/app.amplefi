/*
 * Reset - v28.5.0
 * Developed for Amplefi, LLC
 */
$(document).ready(function(){
// Unhide Page 

$('body').fadeIn('fast');

// Global functions & variables 
	
	var cust = 'amplefi';
	
	// Reset email form fields
	
		// Reset email and submit
		var resetEmail = function () {$('.email-address').focus(function(){$('.alert').css('display', 'none');$('#large-btn').attr('value', 'Get Reset Link').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer');$(this).css('border', '1px solid #e1e8ed');});}
	
	// Submit button error handling
	
		// Enabled submit button
		var enableSubmit = function(){$('#large-btn').removeAttr("disabled").css('background', '#50aaf0').css('cursor', 'pointer').attr('value', 'Get Reset Link');}
		// Disabled submit button
		var disableSubmit = function(){$('#large-btn').attr('disabled', 'disabled').css('background', '#d6d6d6').css('cursor', 'not-allowed').attr('value', 'Error on form');}
	
	//Form fields error handling
	
		// Error email field
		var highlightEmail = function(){$('.email-address').css('border', '1px solid #cf6d6b');}
	
	// Form alerts handling
		
		// Error empty email
		var alertErrorEmailEmpty = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>an email address is required').css('display', 'block');}
		
		// Error incorrect email
		var alertErrorEmailNotValid = function(){$('.alert').empty().addClass('error').append('<strong>Oops: </strong>email address is not valid').css('display', 'block');}
		
// Background rotator 

	// Create random number 1-8
		
	var bgCount = Math.floor(Math.random() * 18) + 1
		
	// Hide the image, append random image and show
		
	//$('#bg-img').hide().attr('src', '../login/images/bg'+bgCount+'.png').fadeIn(700);
	
// Form validation pre-submit 

	// Reset form fields 
	
	resetEmail();
	// Server side validation 
		
	// Login Submit Form 
	$('.process-reset').submit(function(){
			var email = $('.email-address').val();
			
			// Add loading status 
			
			$('#large-btn').attr('value', 'Loading...');
			
			// Check if email input is empty
			
			if ($('.email-address').val().length == 0){
				console.log("No value in Email");
				alertErrorEmailEmpty();
				highlightEmail();
				disableSubmit();
			}
			
			// If email has value - send AJAX
			
			else{	
			console.log("email has a value");
        $.getJSON('https://v43.amplefi.co/auth_reset_pwd?callback=?', {
                user: email
            },
            function (data) {
				
			// User fully authenticated 
			
			if (data.status == 'pendingconfirmation'){
				console.log("email sent");
				window.location = "../login/?showSuccessPass=true"
			}
	
			// Not autorized user
			
			else if (data.status == 'bad_address'){
			console.log("email not authorized");
			alertErrorEmailNotValid();
			highlightEmail();
			disableSubmit();		
			}		
			
			else{
			console.log("ERROR EMAIL FALLBACK");
			alertErrorEmailNotValid();
			highlightEmail();
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