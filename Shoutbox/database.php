<?php
  //connect to the mysql
$con= mysqli_connect("localhost", "root","whargarbl", "shoutbox");

if(mysqli_connect_errno()){
  echo 'Failed to connect: '.mysqli_connect_error();
}
 ?>
