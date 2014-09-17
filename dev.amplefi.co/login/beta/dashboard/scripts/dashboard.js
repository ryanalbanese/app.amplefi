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
	
	
	$(document).on('mouseenter','.append-items li', function (event) {
  $( this ).append( $( '<span class="chooser-icon"><i class="fa fa-arrow-right"></i></span>' ) );
}).on('mouseleave','.append-items li',  function(){
   $( this ).find( 'span:last' ).remove();
    });

// LOGOUT FUNCTION
$(document).on('click','.logout-trigger', function (event) {
	$.removeCookie('session', { path: '/' });
	window.location = 'https://app.amplefi.co/logout/'
	return false;
});
// CHECK SESSION AND DISPLAY USER INFO
	var checkSession = function(){ if (session != null) {
        $.getJSON("https://v43.amplefi.co/auth_page?callback=?", {
                token: session
            },
            function (data) {
               if (data.status == 'authorized') {	
			   $("body").fadeIn('fast');
				$.each(data.package.array, function (i, item) {
                $(".append-items").append("<li><a data='" + item.mode + "' id='"+item.client_id+"' href='" + item.link + "'>" + item.title + "</a></li>");
				if (n < 12 ) {
				$(".append-user").empty().append('Good morning, '+data.first_name+'');
				$(".user").css('background-image', 'url(images/blurred_1.jpg)').css('background-size',' cover;!important');
				}
				else if ( n >= 12 && n <= 17){
				$(".append-user").empty().append('Good afternoon, '+data.first_name+'');
				$(".user").css('background-image', 'url(images/blurred_2.jpg)').css('background-size',' cover;!important');
				}
				else if (n > 17 && n <= 24){
				$(".append-user").empty().append('Good evening, '+data.first_name+'');
				$(".user").css('background-image', 'url(images/blurred_5.jpg)').css('background-size',' cover;!important');
				}
                            $("a").click(function (event) {
                                var server = $(this).attr('data');
								var client = $(this).attr('id');
								var href = $(this).attr('href');
								$.cookie('mode', server, {domain: '.amplefi.co',path: '/'});
								$.cookie('cid', client, {domain: '.amplefi.co',path: '/'});
                                window.location = href
          });
		   });
		  
				// Check time & Append
				$(".user").fadeIn('fast');
				}
				else if (data.status == 'expired'){
				$.removeCookie('session', { path: '/' });
				window.location = '../login/'
				}
				else {
				$.removeCookie('session', { path: '/' });
				window.location = '../login/'
               }
            });
    } else {
	   $.removeCookie('session', { path: '/' });
	   window.location = '../login/'
       
    }
}
checkSession();	
// Detect if mobile 
$( window ).resize(function() {
 if ($(".content").css("padding") == "20px" ){
	 $( "#bg-img" ).remove();
 }
});
// End Doc Ready
});