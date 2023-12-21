<?php

require_once 'class/responses.class.php';
require_once 'class/users.class.php';

class Content extends Users
{
  private $table = 'contenido_subido';
  private $id_content = "";
  private $usuario_id = "";
  private $categoria_id = "";
  private $titulo = "";
  private $descripcion = "";
  private $tipo_contenido = "";
  private $contenido = "";
  private $estado = "";
  private $fecha_subida = "";

  public function contentList($page = 1)
  {
    $start = 0;
    $quantity = 100;
    if ($page > 1) {
      $start = ($quantity * ($page - 1)) + 1;
      $quantity = $quantity * $page;
    }
    $query = "SELECT id, usuario_id, categoria_id, titulo, descripcion, tipo_contenido, contenido, estado, fecha_subida FROM " . $this->table . " limit $start, $quantity";
    $data = parent::getData($query);
    return $data;
  }

  // GET
  public function getContent($id)
  {
    $query = "SELECT id, usuario_id, categoria_id, titulo, descripcion, tipo_contenido, contenido, estado, fecha_subida FROM " . $this->table . " WHERE id = $id";
    $data = parent::getData($query);
    return $data;
  }

  public function getContentUser($id)
  {
    $query = "SELECT id, usuario_id, categoria_id, titulo, descripcion, tipo_contenido, contenido, estado, fecha_subida FROM " . $this->table . " WHERE usuario_id = $id";
    $data = parent::getData($query);
    return $data;
  }

  public function getContentCategory($id)
  {
    $query = "SELECT id, usuario_id, categoria_id, titulo, descripcion, tipo_contenido, contenido, estado, fecha_subida FROM " . $this->table . " WHERE categoria_id = $id";
    $data = parent::getData($query);
    return $data;
  }

  // POST
  public function postContent($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);

    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $this->token = $data['token'];
      $arrayToken = $this->searchToken($this->token);
      if ($arrayToken) {
        // if (!isset($data['usuario_id']) || !isset($data['categoria_id']) || !isset($data['tipo_contenido']) || !isset($data['contenido']) || !isset($data['estado'])) {
        if (!isset($data['usuario_id']) || !isset($data['categoria_id']) || !isset($data['tipo_contenido']) || !isset($data['contenido']) || !isset($data['estado'])) {
          return $_responses->error_400();
        } else {
          $this->usuario_id = $data['usuario_id'];
          $this->categoria_id = $data['categoria_id'];
          $this->tipo_contenido = $data['tipo_contenido'];
          if ($this->tipo_contenido == "fotografia") {
            $resp = $this->proccesImage($data['contenido'], "content");
            $this->contenido = $resp;
          } else {
            $this->contenido = $data['contenido'];
          }
          $this->estado = $data['estado'];
          if (isset($data['titulo'])) {
            $this->titulo = $data['titulo'];
          }
          if (isset($data['descripcion'])) {
            $this->descripcion = $data['descripcion'];
          }
          if (isset($data['fecha_subida'])) {
            $this->fecha_subida = date("Y-m-d H:i");
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
        }
      } else {
        return $_responses->error_401("El token enviado es invalido o ha caducado");
      }
    }

  }

  private function postQuery()
  {
    $query = "INSERT INTO " . $this->table . " (usuario_id, categoria_id, titulo, descripcion, tipo_contenido, contenido, estado) 
    VALUES ('" . $this->usuario_id . "','" . $this->categoria_id . "','" . $this->titulo . "','" . $this->descripcion . "','" . $this->tipo_contenido . "','" . $this->contenido . "','" . $this->estado . "')";
    $data = parent::nonQueryId($query);
    if ($data) {
      return $data;
    } else {
      return 0;
    }
  }


  // DELETE 
  public function deleteContent($id)
  {
    $_responses = new Responses();
    $data = json_decode($id, true);
    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $token = $data['token'];
      $arrayToken = $this->searchToken($token);
      if ($arrayToken[0]['usuario_id'] == $data['usuario_id']) {
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

  // PUT
  public function updateContent($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);
    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $token = $data['token'];
      $arrayToken = $this->searchToken($token);
      if ($arrayToken[0]['usuario_id'] == $data['usuario_id']) {
        $this->id = $data['id'];
        $this->usuario_id = $data['usuario_id'];
        $this->categoria_id = $data['categoria_id'];
        $this->titulo = $data['titulo'];
        $this->descripcion = $data['descripcion'];
        $this->tipo_contenido = $data['tipo_contenido'];
        $this->contenido = $data['contenido'];
        $this->estado = $data['estado'];
        $this->fecha_subida = date("Y-m-d H:i");
        $resp = $this->updateQuery();
        if ($resp) {
          $response = $_responses->response;
          $response['result'] = array(
            "id" => $this->id
          );
          return $response;
        } else {
          return $_responses->error_500();
        }

      } else {
        return $_responses->error_401("El token enviado es invalido o ha caducado");
      }
    }
  }

  private function updateQuery()
  {
    $query = "UPDATE " . $this->table . " SET usuario_id = '" . $this->usuario_id . "', categoria_id = '" . $this->categoria_id . "', titulo = '" . $this->titulo . "', descripcion = '" . $this->descripcion . "', tipo_contenido = '" . $this->tipo_contenido . "', contenido = '" . $this->contenido . "', estado = '" . $this->estado . "', fecha_subida = '" . $this->fecha_subida . "' WHERE id = '" . $this->id . "'";
    $data = parent::nonQuery($query);
    if ($data >= 1) {
      return $data;
    } else {
      return 0;
    }
  }
}

