<?php

require_once 'class/connection/connection.php';
require_once 'class/responses.class.php';

class Users extends Connection
{
  private $table = 'usuario';

  public function userList($page = 1)
  {
    $start = 0;
    $quantity = 100;
    if ($page > 1) {
      $start = ($quantity * ($page - 1)) + 1;
      $quantity = $quantity * $page;
    }
    $query = "SELECT id, nombre, correo, foto_perfil FROM " . $this->table . " limit $start, $quantity";
    $data = parent::getData($query);
    return $data;
  }


  public function getUser($id)
  {
    $query = "SELECT id, nombre, correo, foto_perfil FROM " . $this->table . " WHERE id = $id";
    $data = parent::getData($query);
    return $data;
  }


}