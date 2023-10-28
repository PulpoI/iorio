<?php

require_once 'class/responses.class.php';
require_once 'class/users.class.php';

$_responses = new Responses();
$_users = new Users();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $userList = $_users->userList($page);
    echo json_encode($userList);
  } else if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    $userData = $_users->getUser($userId);
    echo json_encode($userData);
  }


} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  echo "POST";
} else if ($_SERVER['REQUEST_METHOD'] == "PUT") {
  echo "PUT";
} else if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
  echo "DELETE";
} else {
  header('Content-Type: application/json');
  $dataArray = $_response->error_405();
  echo json_encode($dataArray);
}