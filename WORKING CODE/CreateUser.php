<?php

//file just knows that it can find the input using the file_get function here
//json_decode lets us use data that was sent as a jasn object
$data = json_decode(file_get_contents("php://input"));

//establish connection to server
$conn = mysqli_connect("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
//error output if connection fails
if (!$conn) {
  die("Connection failed: ");
}

//example of how data looks. $data holds a jason object like this and then gets made usable with json_decode
#$jsondict = '{"fName":"asdf","lName":"asdfafsdg","email":"asdf@asdf.ads","password":"asdfas"}';
#$data = json_decode($jsondict);


//Make sure a user with the email does not already exist in the database. 
$ask = 'SELECT * FROM Users WHERE Login="'. $data->email .'"';

if($result = mysqli_query($conn, $ask)){
  if(mysqli_num_rows($result) > 0)
  {
	  die("Email in use");
  }
}

mysqli_free_result($result);



//the sql line to be executed by the data base. it needs to be sent as a string, but since the line has variable data in it theres a lot of string concatenation to make it work
//concatenation is done using . and strings are marked by '' instead of "" so we don't have to worry about escape characters. i.e. 'hello' . 'world'
$sql = 'INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ("'. $data->fName . '","' . $data->lName . '","' . $data->email . '","' . $data->password . '")';
echo "sql text";
echo $sql;

/*
$sql1 = 'CREATE USER \'' . $data->email . '\'@\'localhost\' IDENTIFIED BY \'' . $data->password . '\'';
echo "sql1 text";
echo $sql1;
*/

//CREATE TABLE `COP4331`.`Username`ContactTable ( `Name` VARCHAR (30), `Email` VARCHAR (30), `PhoneNumber` VARCHAR (30), `DateCreated` DATETIME);
//CREATE TABLE testtable1 (FirstName VARCHAR (30), LastName VARCHAR(30), Email VARCHAR (30), PhoneNumber VARCHAR (30), DateCreated DATETIME);
$sql2 = 'CREATE TABLE `'.$data->email.'` (FirstName VARCHAR (30), LastName VARCHAR(30), Email VARCHAR (30), PhoneNumber VARCHAR (30), DateCreated DATETIME)';
echo "sql2 text";
echo $sql2;

/*
$sql3 = 'GRANT ALL PRIVILEGES ON COP4331.`' . $data->email . '`ContactTable TO \'`' . $data->email . '`\'@\'localhost\'';
echo "sql3 text";
echo $sql3;
*/

//sends the sql line to the database to be executed
if (mysqli_query($conn, $sql) && /*mysqli_query($conn, $sql1) &&*/ mysqli_query($conn, $sql2) /*&& mysqli_query($conn, $sql3)*/ ) {
  echo "Record updated successfully";
} else {
  echo "Error updating record";
}

mysqli_close($conn);

?>
