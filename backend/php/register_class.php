<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $class_id = $input['class_id'];
    $id_user = $_SESSION['id_user'];

    if (!$id_user) {
        echo json_encode(['success' => false, 'message' => 'No user session found']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO class_user (id_user, id_class) VALUES (:id_user, :class_id)");
        if ($stmt->execute(['id_user' => $id_user, 'class_id' => $class_id])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrarse en la clase']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>