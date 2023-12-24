<?php

require_once 'class/responses.class.php';
require_once 'class/vote.class.php';

$_responses = new Responses();
$_vote = new Vote();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $postBody = file_get_contents("php://input");
  $dataArray = $_vote->postVote($postBody);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: POST");
  header("Allow:  POST");
  header('Content-Type: application/json');
  echo json_encode($dataArray);
  http_response_code(200);
} elseif ($_SERVER['REQUEST_METHOD'] == "DELETE") {
  $deleteBody = file_get_contents("php://input");
  $dataArray = $_vote->deleteVote($deleteBody);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: DELETE");
  header("Allow:  DELETE");
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
} else {
  $_responses->error_400();
}