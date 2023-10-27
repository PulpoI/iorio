<?php

class Connection
{
  private $server;
  private $user;
  private $password;
  private $database;
  private $port;
  private $connect;


  public function __construct()
  {
    $data = $this->dataConnection();
    foreach ($data as $key => $value) {
      $this->server = $value['server'];
      $this->user = $value['user'];
      $this->password = $value['password'];
      $this->database = $value['database'];
      $this->port = $value['port'];
    }
    $this->connect = new mysqli($this->server, $this->user, $this->password, $this->database, $this->port);
    if ($this->connect->connect_errno) {
      die("Error en la conexion: " . $this->connect->connect_error);
    }

  }

  private function dataConnection()
  {
    $direction = dirname(__FILE__);
    $jsondata = file_get_contents($direction . "/" . "config");
    return json_decode($jsondata, true);
  }

  private function convertUTF8($array)
  {
    array_walk_recursive($array, function (&$item, $key) {
      if (!mb_detect_encoding($item, 'utf-8', true)) {
        $item = mb_convert_encoding($item, '', 'ISO-8859-1');
      }
    });
    return $array;
  }

  public function getData($sqlstr)
  {
    $results = $this->connect->query($sqlstr);
    $resultArray = array();
    foreach ($results as $key) {
      $resultArray[] = $key;
    }
    return $this->convertUTF8($resultArray);
  }

  public function nonQuery($sqlstr)
  {
    $results = $this->connect->query($sqlstr);
    return $this->connect->affected_rows;
  }

  // INSERT
  public function nonQueryId($sqlstr)
  {
    $results = $this->connect->query($sqlstr);
    $rows = $this->connect->affected_rows;
    if ($rows >= 1) {
      return $this->connect->insert_id;
    } else {
      return 0;
    }
  }

  // ENCRIPT
  protected function encrypt($string)
  {
    return md5($string);
  }

}