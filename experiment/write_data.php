<?php
    ini_set('display_errors', 1);
    print_r(json_encode($_POST));
    $file = $_POST['postfile'];
    $result_string = $_POST['postresult'];
    if(isset($_POST['postfile'])) print "yes!";
    file_put_contents($file, $result_string, FILE_APPEND);
 ?>