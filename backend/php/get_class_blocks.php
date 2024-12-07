<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id_class = $input['id_class'];

    // Obtener los bloques de la clase, uniendo con la tabla block para obtener más detalles del bloque
    $stmt = $pdo->prepare("
        SELECT b.id_block, b.name, b.description
        FROM class_block cb
        JOIN block b ON cb.id_block = b.id_block
        WHERE cb.id_class = :id_class
    ");
    $stmt->execute(['id_class' => $id_class]);
    $blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'blocks' => $blocks]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>