<?php
session_start();

// Destruir todas las variables de sesión
$_SESSION = array();

// Destruir la sesión.
session_destroy();

// Devolver respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>