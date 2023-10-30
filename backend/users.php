<?php

require_once 'class/responses.class.php';
require_once 'class/users.class.php';

$_responses = new Responses();
$_users = new Users();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $userList = $_users->userList($page);
    header('Content-Type: application/json');
    echo json_encode($userList);
    http_response_code(200);
  } else if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    $userData = $_users->getUser($userId);
    header('Content-Type: application/json');
    echo json_encode($userData);
    http_response_code(200);
  }

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // recibimos los datos enviados
  $postBody = file_get_contents("php://input");
  // enviamos los datos a procesar
  $dataArray = $_users->postUser($postBody);
  // Devolver respuesta
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);


} else if ($_SERVER['REQUEST_METHOD'] == "PUT") {
  $postBody = file_get_contents("php://input");
  // enviamos los datos al manejador
  $dataArray = $_users->putUser($postBody);
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);

} else if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
  $headers = getallheaders();
  print_r($headers);
  if (isset($headers['token']) && isset($headers['id'])) {
    $send = [
      'token' => $headers['token'],
      'id' => $headers['id']
    ];
    $postBody = json_encode($send);
  } else {
    $postBody = file_get_contents("php://input");
  }

  // enviamos los datos al manejador
  $dataArray = $_users->deleteUser($postBody);
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