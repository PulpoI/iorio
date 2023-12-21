<?php

require_once 'class/responses.class.php';
require_once 'class/content.class.php';

$_responses = new Responses();
$_content = new Content();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $contentList = $_content->contentList($page);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET");
    header("Allow:  GET");
    header('Content-Type: application/json');
    echo json_encode($contentList);
    http_response_code(200);
  } else if (isset($_GET['id'])) {
    $contentId = $_GET['id'];
    $contentData = $_content->getContent($contentId);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET");
    header("Allow:  GET");
    header('Content-Type: application/json');
    echo json_encode($contentData);
    http_response_code(200);
  } else if (isset($_GET['user_id'])) {
    $userId = $_GET['user_id'];
    $contentData = $_content->getContentUser($userId);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET");
    header("Allow:  GET");
    header('Content-Type: application/json');
    echo json_encode($contentData);
    http_response_code(200);
  } else if (isset($_GET['category'])) {
    $categoryId = $_GET['category'];
    $contentData = $_content->getContentCategory($categoryId);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET");
    header("Allow:  GET");
    header('Content-Type: application/json');
    echo json_encode($contentData);
    http_response_code(200);
  } else {
    $_responses->error_400();
  }

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $postBody = file_get_contents("php://input");
  $dataArray = $_content->postContent($postBody);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: POST");
  header("Allow:  POST");
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);
} else if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
  $deleteBody = file_get_contents("php://input");
  $dataArray = $_content->deleteContent($deleteBody);
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

} else if ($_SERVER['REQUEST_METHOD'] == "PUT") {
  $putBody = file_get_contents("php://input");
  $dataArray = $_content->updateContent($putBody);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: PUT");
  header("Allow:  PUT");
  header('Content-Type: application/json');
  if (isset($dataArray['result']['error_id'])) {
    $responseCode = $dataArray['result']['error_id'];
    http_response_code($responseCode);
  } else {
    http_response_code(200);
  }
  echo json_encode($dataArray);
} else if ($_SERVER[''] == '') {
  $deleteBody = file_get_contents('php://input');
} else {
  $_responses->error_405();
}