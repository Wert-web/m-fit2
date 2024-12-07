<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener todas las clases disponibles
    $stmt = $pdo->prepare("SELECT id_class, name FROM class");
    $stmt->execute();
    $classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'classes' => $classes]);
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request"]);
}
?>