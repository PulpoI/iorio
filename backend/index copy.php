<?php

$host = "localhost";
$usuario = "root";
$password = "";
$db = "iorio";

$conexion = new mysqli($host, $usuario, $password, $db);

if ($conexion->connect_error) {
    die("Error en la conexion: " . $conexion->connect_error);
}

header("Content-Type: application/json");
$metodo = $_SERVER["REQUEST_METHOD"];

print_r($metodo);

switch ($metodo) {
    case 'GET':
        echo "metodo GET";
        break;
    case 'POST':
        echo 'metodo POST';

    default:
        # code...
        break;
}