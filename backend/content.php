<?php

require_once 'class/responses.class.php';
require_once 'class/content.class.php';

$_responses = new Responses();
$_content = new Content();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $contentList = $_content->contentList($page);
    header('Content-Type: application/json');
    echo json_encode($contentList);
    http_response_code(200);
  } else if (isset($_GET['id'])) {
    $contentId = $_GET['id'];
    $contentData = $_content->getContent($contentId);
    header('Content-Type: application/json');
    echo json_encode($contentData);
    http_response_code(200);
  } else if (isset($_GET['user_id'])) {
    $userId = $_GET['user_id'];
    $contentData = $_content->getContentUser($userId);
    header('Content-Type: application/json');
    echo json_encode($contentData);
    http_response_code(200);
  } else {
    $_responses->error_400();
  }

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $postBody = file_get_contents("php://input");
  $dataArray = $_content->postContent($postBody);
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);

}