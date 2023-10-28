<?php

require_once 'class/auth.class.php';
require_once 'class/responses.class.php';

$_auth = new Auth();
$_response = new Responses();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  // Recibir datos
  $postBody = file_get_contents('php://input');

  // Enviar datos al manejador
  $dataArray = $_auth->login($postBody);

  // Devolver respuesta
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);

} else {
  header('Content-Type: application/json');
  $dataArray = $_response->error_405();
  echo json_encode($dataArray);
}