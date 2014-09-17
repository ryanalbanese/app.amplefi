$(document).ready(function () {
	var client_id = $.cookie('cid');
	var form_id = "main";
    var check_session = $.cookie('session');
    var session = $.cookie('session');
	var master_key = $.cookie('mkid');
	var server_id = $.cookie('mode');
    if (session != null) {
        $.getJSON("https://"+server_id+".amplefi.co/auth_page?callback=?", {
                token: session,
				form_id: form_id,
				client_id: client_id,
				master_key: master_key
            },
            function (data) {
                if (data.status == 'authorized') {	
				
				$("body").css("visibility", "visible").css("background", "#FFF");
                }
				else if (data.status == 'expired'){
				$('.show').hide();
				$('body').css("visibility", "visible").css('background', '#464d57');
				$('.error-pop').fadeIn('fast');
					$.removeCookie('session', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mkid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('cid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mode', { domain: '.amplefi.co', path: '/' });
               
				}
				else {
					$('.show').hide();
					$('body').css("visibility", "visible").css('background', '#464d57');
					$('.error-pop').fadeIn('fast');
					$('.top-error').html('You are not authorized to view this page.');
					$.removeCookie('session', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mkid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('cid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mode', { domain: '.amplefi.co', path: '/' });
                   
               }
            });
    } else {
		$('.show').hide();
		$('body').css("visibility", "visible").css('background', '#464d57');
		$('.error-pop').fadeIn('fast');
		$('.top-error').html('Oops! You are not logged in.');
	  $.removeCookie('session', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mkid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('cid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mode', { domain: '.amplefi.co', path: '/' });
     
    }
});
$(document).ready(function(){
$(".logout-trigger").click(function(){
	$.removeCookie('session', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mkid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('cid', { domain: '.amplefi.co', path: '/' });
	$.removeCookie('mode', { domain: '.amplefi.co', path: '/' });
		 window.location = "https://dev.amplefi.co/login/beta/login/"
		 event.preventDefault();
	});
});
