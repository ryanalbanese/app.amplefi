/*
 * Login - v1.0.0
 * Developed for Amplefi, LLC
 * Developed and maintanined by Ryan Albanese
 */
 
//GLOBAL WEBSRVC INPUT VALUES
 

//GLOBAL INPUT CLEARING

var clearAll = function () {
    $("#email").removeClass("cross").removeClass("check").removeClass("load").addClass("email");
    $("#pass").removeClass("cross").removeClass("check").removeClass("load").addClass("email");
    $("#pass-reset-icon").removeClass("cross").removeClass("check").removeClass("load").addClass("email");
    $("#pass-reset-icon-2").removeClass("cross").removeClass("check").removeClass("load").addClass("email");
    $(".login-form").css("border-color", "#e0e0e0");
    $(".user-message").empty().hide();
}



var clearMessage = function () {    
    $(".user-message").empty().hide();  
}

var showMessage = function(){
	$(".user-message").fadeIn(500);  
}

var emailFocus = function () {
    $(".email-input").focus(function () {
        clearAll();
    });
}

//GLOBAL INPUT SHOW

var showPass = function(){
	setTimeout(function () {
    $(".show-next").fadeIn(500);
    }, 300);
}

var showLogin = function(){setTimeout(function () {
    $(".login").html('Sign in').fadeIn(800);                   
     }, 300);
}

//GLOBAL CHOOSER BUILD

var showChooser = function(){
	setTimeout(function () {
    $(".chooser").fadeIn(500);
    }, 300)
}

//GLOBAL LOADING VALUES

var loading = {

    'addEmail': function () {
        $("#email").addClass("load");       
    },
    'addPwd': function () {
        $("#pass").addClass("load");
    },
    'removeEmail': function () {
       $("#email").removeClass("load").addClass("email");
    },
    'removePwd': function () {
        $("#email").removeClass("load").addClass("pass");
    },
    'successEmail': function () {
        $("#email").removeClass("load").addClass("check");
    },
    'successPwd': function () {
         $("#pass").removeClass("load").addClass("check");
    },
    'errorEmail': function () {
         $("#email").removeClass("load").addClass("cross");
    },
    'errorPwd': function () {
         $("#pass").removeClass("load").addClass("cross");
    }

}

//GLOBAL ADD ALERT BOX

var alertBox = {
	
	'green' : function(){
		$(".login-form").css("border-color", "#cdffc1");
	},
	'blue' : function(){
		$(".login-form").css("border-color", "#2fb0df");
	},
	'red' : function(){
		$(".login-form").css("border-color", "#ffc1c1");
	}
}