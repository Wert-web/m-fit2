<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include("connection.php");
session_start();

try {
    if (!isset($_SESSION['id_user'])) {
        throw new Exception("ID de usuario no encontrado en la sesión.");
    }

    $id_user = $_SESSION['id_user'];

    $consulta = "SELECT id_class, name FROM class WHERE id_user = :id_user";
    $stmt = $pdo->prepare($consulta);
    $stmt->execute([':id_user' => $id_user]);

    $clases = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($clases);
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
?>