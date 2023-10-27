<?php

require_once 'class/auth.class.php';
require_once 'class/responses.class.php';

$_auth = new Auth();
$_response = new Responses();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $postBody = file_get_contents('php://input');
  $dataArray = $_auth->login($postBody);
  print_r(json_encode($dataArray));

} else {
  echo "Metodo no permitido";
}