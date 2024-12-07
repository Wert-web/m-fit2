<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id_class = $input['id_class'];

    // Obtener los bloques de la clase
    $stmt = $pdo->prepare("SELECT id_class_block, name, description FROM class_block WHERE id_class = :id_class");
    $stmt->execute(['id_class' => $id_class]);
    $blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'blocks' => $blocks]);
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request"]);
}
