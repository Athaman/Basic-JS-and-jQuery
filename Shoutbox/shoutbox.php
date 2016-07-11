<?php include 'database.php'; ?>

<?php
  if(isset($_POST['name']) && isset ($_POST['shout'])){
    $name = mysqli_real_escape_string($con, $_POST['name']);
    $shout = mysqli_real_escape_string($con, $_POST['shout']);
    $date = mysqli_real_escape_string($con, $_POST['date']);

    // set the time zone
    date_default_timezone_set('Europe/Berlin');
    $date = date('h:i:s a', time());

    $query = "INSERT INTO shouts (name, shout, date)
    VALUES ('$name', '$shout', '$date')";

    if(!mysqli_query($con, $query)){
      echo 'Error: '.mysqli_connect_error($con);
    }else{
      echo '<li>'.$name.': '.$shout.' ['.$date.']</li>';
    }
  }
 ?>
