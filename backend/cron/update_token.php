<?php

require_once '../class/token.class.php';

$_token = new Token();
$date = date("Y-m-d H:i");

echo $_token->updateTokenCron($date);