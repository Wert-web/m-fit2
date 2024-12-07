<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['id_user'])) {
    $id_user = $_SESSION['id_user'];

    // Obtener las clases del usuario, uniendo con la tabla class para obtener el nombre de la clase
    $stmt = $pdo->prepare("
        SELECT c.id_class, c.name 
        FROM class_user cu
        JOIN class c ON cu.id_class = c.id_class
        WHERE cu.id_user = :id_user
    ");
    $stmt->execute(['id_user' => $id_user]);
    $classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'classes' => $classes]);
} else {
    echo json_encode(['success' => false, 'message' => "No user session found"]);
}
?>