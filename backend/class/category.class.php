<?php

require_once 'class/responses.class.php';
require_once 'connection/connection.php';

class Category extends Connection
{
  private $table = 'categoria';
  private $nombre = '';
  private $descripcion = '';
  private $id_category = '';

  public function getCategories()
  {
    $query = "SELECT id, nombre, descripcion FROM " . $this->table;
    $data = parent::getData($query);
    return $data;
  }

}