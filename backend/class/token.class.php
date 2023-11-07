<?php

require_once 'connection/connection.php';
require_once 'class/users.class.php';


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

  public function verifyToken($token)
  {
    // funcion para verificar si el token esta activo y pertenece al usuario  y guardar el id del usuario en una variable
    // $query = "SELECT id, usuario_id, token, estado FROM `usuario_token` WHERE `token` = '$token' AND `estado` = 'Activo'";
    $queryUser = "SELECT id, nombre, correo, foto_perfil, es_admin FROM `usuario` WHERE `id` = (SELECT usuario_id FROM `usuario_token` WHERE `token` = '$token' AND `estado` = 'Activo')";
    $data = parent::getData($queryUser);
    if (isset($data[0]['id'])) {
      return $data[0];
    } else {
      return 0;
    }

  }
}