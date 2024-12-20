<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['id_user'])) {
    echo json_encode(['error' => "ID de usuario no encontrado en la sesión."]);
    exit;
}

$id_user = $_SESSION['id_user'];
$type = isset($_GET['type']) ? $_GET['type'] : '';

try {
    $consulta = '';
    switch ($type) {
        case 'clases':
            $consulta = "SELECT id_class AS id, 'class' AS type, name AS firstContent, description AS secondContent, date AS teirdContent FROM class WHERE id_user = :id_user";
            break;
        case 'bloques':
            $consulta = "SELECT id_block AS id, 'block' AS type, name AS firstContent, description AS secondContent, date AS teirdContent FROM block WHERE id_user = :id_user";
            break;
        case 'asignaciones':
            $consulta = "SELECT id_asig AS id, 'asignacion' AS type, name AS firstContent, description AS secondContent, date AS teirdContent FROM asig WHERE id_user = :id_user";
            break;
        default:
            echo json_encode(['error' => "Tipo desconocido."]);
            exit;
    }

    $stmt = $pdo->prepare($consulta);
    $stmt->execute([':id_user' => $id_user]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>