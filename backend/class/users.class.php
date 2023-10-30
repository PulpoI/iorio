<?php

require_once 'class/connection/connection.php';
require_once 'class/responses.class.php';

class Users extends Connection
{
  private $table = 'usuario';
  protected $id = "";
  private $nombre = "";
  private $correo = "";
  private $contraseña = "";
  private $foto_perfil = "";
  private $token = "";

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

  // GET
  public function getUser($id)
  {
    $query = "SELECT id, nombre, correo, foto_perfil FROM " . $this->table . " WHERE id = $id";
    $data = parent::getData($query);
    return $data;
  }

  // POST
  public function postUser($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);

    // if (!isset($data['token'])) {
    //   return $_responses->error_401();
    // } else {
    //   $this->token = $data['token'];
    //   $arrayToken = $this->searchToken();
    //   if ($arrayToken) {
    if (!isset($data['nombre']) || !isset($data['correo']) || !isset($data['contraseña'])) {
      return $_responses->error_400();
    } else {
      $this->nombre = $data['nombre'];
      $this->correo = $data['correo'];
      $this->contraseña = $data['contraseña'];
      if (isset($data['foto_perfil'])) {
        $resp = $this->proccesImage($data['foto_perfil'], "profile");
        $this->foto_perfil = $resp;

      }
      $resp = $this->postQuery();
      if ($resp) {
        $response = $_responses->response;
        $response['result'] = array(
          "id" => $resp
        );
        return $response;
      } else {
        return $_responses->error_500();
      }
      //   }
      // } else {
      //   return $_responses->error_401("El token enviado es invalido o ha caducado");
      // }
    }
  }

  private function postQuery()
  {
    $query = "INSERT INTO " . $this->table . " (nombre, correo, contraseña, foto_perfil) 
    VALUES ('" . $this->nombre . "','" . $this->correo . "','" . $this->contraseña . "','" . $this->foto_perfil . "')";
    $data = parent::nonQueryId($query);
    if ($data) {
      return $data;
    } else {
      return 0;
    }
  }

  // PUT
  public function putUser($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);
    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $this->token = $data['token'];
      $arrayToken = $this->searchToken($this->token);
      if ($arrayToken) {
        if (!isset($data['id'])) {
          return $_responses->error_400();
        } else {
          $this->id = $data['id'];
          if (isset($data['nombre'])) {
            $this->nombre = $data['nombre'];
          }
          if (isset($data['correo'])) {
            $this->correo = $data['correo'];
          }
          if (isset($data['foto_perfil'])) {
            $this->foto_perfil = $data['foto_perfil'];
          }
          $resp = $this->putQuery();
          if ($resp) {
            $response = $_responses->response;
            $response['result'] = array(
              "id" => $this->id
            );
            return $response;
          } else {
            return $_responses->error_500();
          }
        }
      } else {
        return $_responses->error_401("El token enviado es invalido o ha caducado");
      }
    }
  }

  private function putQuery()
  {
    $query = "UPDATE " . $this->table . " SET nombre ='" . $this->nombre . "', correo = '" . $this->correo . "', foto_perfil = '" .
      $this->foto_perfil . "' WHERE id = '" . $this->id . "'";
    $data = parent::nonQuery($query);

    if ($data >= 1) {
      return $data;
    } else {
      return 0;
    }
  }

  // DELETE
  public function deleteUser($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);
    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $this->token = $data['token'];
      $arrayToken = $this->searchToken();
      if ($arrayToken) {
        if (!isset($data['id'])) {
          return $_responses->error_400();
        } else {
          $this->id = $data['id'];
          $resp = $this->deleteQuery();
          if ($resp) {
            $response = $_responses->response;
            $response['result'] = array(
              "id" => $this->id
            );
            return $response;
          } else {
            return $_responses->error_500();
          }
        }
      } else {
        return $_responses->error_401("El token enviado es invalido o ha caducado");
      }
    }

  }

  private function deleteQuery()
  {
    $query = "DELETE FROM " . $this->table . " WHERE id = '" . $this->id . "'";
    $data = parent::nonQuery($query);
    if ($data >= 1) {
      return $data;
    } else {
      return 0;
    }
  }

  // TOKEN
  protected function searchToken($token)
  {
    $query = "SELECT id, usuario_id, estado FROM usuario_token  WHERE token = '" . $token . "' AND estado = 'Activo'";
    $data = parent::getData($query);
    if ($data) {
      return $data;
    } else {
      return 0;
    }
  }

  private function updateToken($tokenId)
  {
    $date = date("Y-m-d H:i");
    $query = "UPDATE usuario_token SET fecha = '$date' WHERE id = '$tokenId' ";
    $data = parent::nonQuery($query);
    if ($data >= 1) {
      return $data;
    } else {
      return 0;
    }
  }
  // IMAGE
  protected function proccesImage($img, $dir)
  {
    $direction = dirname(__DIR__) . "/public/images/" . $dir . "/";
    $parts = explode(";base64,", $img);
    $extension = explode("/", mime_content_type($img))[1];
    $image_base64 = base64_decode($parts[1]);
    $file = $direction . uniqid() . "." . $extension;
    file_put_contents($file, $image_base64);
    $file_direction = str_replace('\\', '/', $file);

    return $file_direction;
  }

}