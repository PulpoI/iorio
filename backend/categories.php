<?php

require_once 'class/responses.class.php';
require_once 'class/category.class.php';

$_responses = new Responses();
$_category = new Category();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  $categoriesList = $_category->getCategories();
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: GET");
  header("Allow:  GET");
  header('Content-Type: application/json');
  echo json_encode($categoriesList);
  http_response_code(200);
} else {
  $_responses->error_400();
}