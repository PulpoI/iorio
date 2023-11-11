<?php

require_once 'class/token.class.php';
require_once 'class/responses.class.php';

$_token = new Token();
$_response = new Responses();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  // Recibir datos
  $postBody = file_get_contents('php://input');

  // Enviar datos al manejador
  $postBody = json_decode($postBody, true);
  $dataArray = $_token->verifyToken($postBody['token']);

  // Devolver respuesta
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: POST");
  header("Allow:  POST");
  header('Content-Type: application/json');
  if (!isset($dataArray)) {
    $responseCode = $dataArray;
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);

  // Update token
} else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
  $putBody = file_get_contents('php://input');
  $putBody = json_decode($putBody, true);
  $dataArray = $_token->updateToken($putBody['token']);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: PUT");
  header("Allow:  PUT");
  header('Content-Type: application/json');
  if (!isset($dataArray)) {
    $responseCode = $dataArray;
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
