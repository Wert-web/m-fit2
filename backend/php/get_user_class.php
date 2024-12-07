<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['id_user'])) {
    $id_user = $_SESSION['id_user'];

    // Obtener las clases del usuario
    $stmt = $pdo->prepare("SELECT id_class, name FROM class_user WHERE id_user = :id_user");
    $stmt->execute(['id_user' => $id_user]);
    $classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'classes' => $classes]);
} else {
    echo json_encode(['success' => false, 'message' => "No user session found"]);
}
