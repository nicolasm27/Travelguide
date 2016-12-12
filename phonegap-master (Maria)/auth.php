<?php
header("Access-Control-Allow-Origin: *");

//Connect & Select Database
mysql_connect("localhost","mlaurani_boot","IHateDigitalMedia!!!") or die("could not connect server");
mysql_select_db("mlaurani_bootstrap") or die("could not connect database");

//Create New Account
if(isset($_POST['signup'])) // checking if the information is a sign up form
{
	$fullname=mysql_real_escape_string(htmlspecialchars(trim($_POST['fullname']))); // it blocks special characters
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email']))); // it blocks special characters
	$password=mysql_real_escape_string(htmlspecialchars(trim($_POST['password']))); // it blocks special characters
	$login=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email'")); //checks if the email already exists
	if($login!=0) //checks the response from the database to make sure if the email already exists
	{
		echo "exist"; //the message that is displayed to the user
	}
	else
	{
		$date=date("d-m-y h:i:s"); //stores the current dates
		$q=mysql_query("insert into `phonegap_login` (`reg_date`,`fullname`,`email`,`password`) values ('$date','$fullname','$email','$password')"); //fills the fields in the table
		if($q)
		{
			echo "success"; //lets the user know if its successful
		}
		else
		{
			echo "failed"; //lets the user know if it failed
		}
	}
	echo mysql_error(); //lets the user know if an error occured
}

//Login
if(isset($_POST['login']))
{
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email']))); // it blocks special characters
	$password=mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));// it blocks special characters
	$login=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email' and `password`='$password'")); //looks at the email from the database and checks if it matches
	if($login!=0)
	{
		echo "success"; //lets the user know if its successful
	}
	else
	{
		echo "failed"; //lets the user know if it failed.
	}
}

//Change Password
if(isset($_POST['change_password']))
{
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$old_password=mysql_real_escape_string(htmlspecialchars(trim($_POST['old_password'])));
	$new_password=mysql_real_escape_string(htmlspecialchars(trim($_POST['new_password'])));
	$check=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email' and `password`='$old_password'"));
	if($check!=0)
	{
		mysql_query("update `phonegap_login` set `password`='$new_password' where `email`='$email'"); //checks if the email is correct and updates the password
		echo "success";
	}
	else
	{
		echo "incorrect";
	}
}

// Forget Password
if(isset($_POST['forget_password']))
{
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$q=mysql_query("select * from `phonegap_login` where `email`='$email'");
	$check=mysql_num_rows($q);
	if($check!=0) //will match the email and if it matches it will display your password
	{
		echo "success";
		$data=mysql_fetch_array($q);
		$string="Hey,".$data['fullname'].", Your password is".$data['password'];
		mail($email, "Your Password", $string);
	}
	else
	{
		echo "invalid";
	}
}

?>