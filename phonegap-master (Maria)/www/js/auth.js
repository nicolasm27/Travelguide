$(document).ready(function(){
	var url="http://www.mlauranicolas.co.uk/phonegap/auth.php?callback=?"; //locates the the php. file
    
    //Login Function
    $("#login").click(function(){
    	
    	var email=$("#email").val(); // takes the value of the input which is the email address
    	var password=$("#password").val(); // takes the value of the input which is the password
    	var dataString="email="+email+"&password="+password+"&login="; //corrects the string
    	if($.trim(email).length>0 & $.trim(password).length>0) // checks if its formatted correctly
		{
			$.ajax({
				type: "POST", // sends information using th post method
				url: url, // connects the javascript to the php
				data: dataString, // sends the datastring
				crossDomain: true, // sends information to different servers
				cache: false,
				beforeSend: function(){ $("#login").html('Connecting...');}, //displays connecting as html
				success: function(data){ //runs the data 
					if(data=="success") // shows if successful
					{
						localStorage.login="true"; //html file local storage, records if user is logged in or not
						localStorage.email=email; // storing the email 
						window.location.href = "index.html"; // this redirects to the page
					}
					else if(data="failed") //displays if it fails
					{
						alert("Login error"); //displays log in error
						$("#login").html('Login'); 
					}
				}
			});
		}return false; //doesnt return anything

    });

    //signup function
    $("#signup").click(function(){
    	var fullname=$("#fullname").val(); // takes the value of the input which is the email address
    	var email=$("#email").val(); // takes the value of the input which is the email
    	var password=$("#password").val(); // takes the value of the input which is the password
    	var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup="; //corrects the string

    	if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0) // checks if its formatted correctly
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#signup").val('Connecting...');},
				success: function(data){
					if(data=="success")
					{
						alert("Thank you for Registering with us! you can login now");
					}
					else if(data="exist")
					{
						alert("Hey! You alreay has account! you can login with us");
					}
					else if(data="failed")
					{
						alert("Something Went wrong");
					}
				}
			});
		}return false;

    });

    //Change Password
    $("#change_password").click(function(){
    	var email=localStorage.email; // takes the value of the input which is the email
    	var old_password=$("#old_password").val(); // takes the value of the input which is the old password
    	var new_password=$("#new_password").val(); // takes the value of the input which is the new password
    	var dataString="old_password="+old_password+"&new_password="+new_password+"&email="+email+"&change_password=";
    	if($.trim(old_password).length>0 & $.trim(old_password).length>0)
		{
			$.ajax({
				type: "POST", // sends information using the post method
				url: url, // connects the javascript to the php
				data: dataString, // sends the datastring
				crossDomain: true, // sends information to different servers
				cache: false,
				beforeSend: function(){ $("#change_password").val('Connecting...');}, //displays connecting as html
				success: function(data){ //runs the data 
					if(data=="incorrect") // shows if incorrect
					{
						alert("Your old password is incorrect"); // shows if incorrect
					}
					else if(data="success") // shows if is successful
					{
						alert("Password Changed successfully"); // shows if password changed successful
					}
					else if(data="failed") // shows if failed
					{
						alert("Something Went wrong"); // shows if something went wrong
					}
				}
			});
		}return false;

    });

    //Forget Password
    $("#forget_password").click(function(){
    	var email=$("#email").val(); // takes the value of the input which is the email
    	var dataString="email="+email+"&forget_password="; // corrects the datastring
    	if($.trim(email).length>0) // checks if its formatted correctly
		{
			$.ajax({
				type: "POST", // sends information using the post method
				url: url, // connects the javascript to the php
				data: dataString, // sends the datastring
				crossDomain: true, // sends information to different servers
				cache: false,
				beforeSend: function(){ $("#forget_password").val('Connecting...');}, //displays connecting as html
				success: function(data){ //runs the data
					if(data=="invalid") // shows if incorrect
					{
						alert("Your have not registered with us"); // shows if it hasnt been registered
					}
					else if(data="success") // shows if successful
					{
						alert("we have sent password to your email address, please check"); //shows that the password is sent to the email address
					}
				}
			});
		}return false;

    });


    //logout function
    $("#logout").click(function(){
    	localStorage.login="false"; // shows the user is logged out 
    	window.location.href = "login.html"; // it redirects to te log in page
    });

    //Displaying user email on home page
    $("#email1").html(localStorage.email); 
    var imageHash="http://www.gravatar.com/avatar/"+md5(localStorage.email);
    $("#profilepic").attr('src',imageHash);
});