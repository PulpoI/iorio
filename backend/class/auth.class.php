<?php

require_once 'class/connection/connection.php';
require_once 'class/responses.class.php';

class Auth extends Connection
{
  public function login($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);
    if (!isset($data['correo']) || !isset($data['contraseña'])) {
      return $_responses->error_400();
    } else {
      $email = $data['correo'];
      $password = $data['contraseña'];
      $password = parent::encrypt($password);
      $data = $this->getUserData($email);
      if ($data) {
        if ($password == $data[0]['contraseña']) {
          // Crear token
          $token = $this->insertToken($data[0]['id']);
          if ($token) {
            // set cookie in the navegator
            // $setCookie = setcookie("token", $token, time() + (86400 * 30), "/", "localhost:5173", false, true);
            $result = $_responses->response;
            $result['result'] = array(
              "id" => $data[0]['id'],
              "token" => $token,
              "correo" => $email,
              "nombre" => $data[0]['nombre'],
              "foto_perfil" => $data[0]["foto_perfil"],
              "es_admin" => $data[0]["es_admin"],
            );
            return $result;
          } else {
            return $_responses->error_500("Error interno, no hemos podido guardar el token");
          }
        } else {
          return $_responses->error_200("La contraseña es incorrecta");
        }
      } else {
        return $_responses->error_200("El usuario con el correo $email no existe");
      }
    }
  }

  private function getUserData($email)
  {
    $query = "SELECT id, contraseña, nombre, foto_perfil, es_admin FROM usuario WHERE correo = '$email'";
    $data = parent::getData($query);
    if (isset($data[0]['id'])) {
      return $data;
    } else {
      return 0;
    }
  }

  private function insertToken($userId)
  {
    $val = true;
    $token = bin2hex(openssl_random_pseudo_bytes(16, $val));
    $date = date("Y-m-d H:i");
    $status = "Activo";
    $query = "INSERT INTO usuario_token (usuario_id, token, estado, fecha) VALUES ('$userId', '$token', '$status', '$date')";
    $verify = parent::nonQuery($query);
    if ($verify) {
      return $token;
    } else {
      return 0;
    }
  }

}