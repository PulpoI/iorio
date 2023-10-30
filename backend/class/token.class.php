<?php

require_once '../class/connection/connection.php';

class Token extends Connection
{

  public function updateToken($date)
  {
    $query = "UPDATE usuario_token SET estado = 'Inactivo' WHERE fecha < '$date' AND estado = 'Activo'";
    $verify = parent::nonQuery($query);
    if ($verify >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}