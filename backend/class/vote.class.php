<?php

require_once 'class/responses.class.php';
require_once 'class/users.class.php';

class Vote extends Users
{
  private $table = 'voto';
  private $id_vote = '';
  private $usuario_id = '';
  private $contenido_id = '';
  private $comentario_id = '';

  //POST
  public function postVote($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);

    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $this->token = $data['token'];
      $arrayToken = $this->searchToken($this->token);
      if ($arrayToken) {
        if (!isset($data['usuario_id']) && !isset($data['contenido_id']) || !isset($data['usuario_id']) && !isset($data['comentario_id'])) {
          return $_responses->error_400();
        } else {
          $this->usuario_id = $data['usuario_id'];
          if (isset($data['contenido_id'])) {
            $this->contenido_id = $data['contenido_id'];
            $this->comentario_id = null;
          }
          if (isset($data['comentario_id'])) {
            $this->contenido_id = null;
            $this->comentario_id = $data['comentario_id'];
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
    $query = "INSERT INTO " . $this->table . " (usuario_id, contenido_subido_id, comentario_id) VALUES ('" . $this->usuario_id . "', " . ($this->contenido_id !== null ? "'" . $this->contenido_id . "'" : "NULL") . ", " . ($this->comentario_id !== null ? "'" . $this->comentario_id . "'" : "NULL") . ")";
    print_r($query);
    $data = parent::nonQueryId($query);

    if ($data >= 1) {
      return $data;
    } else {
      return 0;
    }
  }


  // DELETE
  public function deleteVote($json)
  {
    $_responses = new Responses();
    $data = json_decode($json, true);
    if (!isset($data['token'])) {
      return $_responses->error_401();
    } else {
      $token = $data['token'];
      $arrayToken = $this->searchToken($token);
      if ($arrayToken[0]['usuario_id'] == $data['usuario_id']) {
        $this->id_vote = $data['id'];
        $resp = $this->deleteQuery();
        if ($resp) {
          $response = $_responses->response;
          $response['result'] = array(
            "id" => $this->id_vote
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
    $query = "DELETE FROM " . $this->table . " WHERE id = '" . $this->id_vote . "'";
    $data = parent::nonQuery($query);
    if ($data >= 1) {
      return $data;
    } else {
      return 0;
    }
  }
}