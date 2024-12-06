<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['id_user'])) {
    echo json_encode(['error' => "ID de usuario no encontrado en la sesión."]);
    exit;
}

$id_user = $_SESSION['id_user'];
$id_class = isset($_GET['id_class']) ? $_GET['id_class'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';

if (!$id_class || !$type) {
    echo json_encode(['error' => "Faltan parámetros necesarios."]);
    exit;
}

try {
    $consulta = '';
    switch ($type) {
        case 'bloques':
            $consulta = "SELECT id_block AS id, name AS firstContent, date AS secondContent FROM block WHERE id_class = :id_class";
            break;
        case 'alumnos':
            $consulta = "SELECT id_user AS id, name AS firstContent, date AS secondContent FROM user WHERE id_class = :id_class AND type = 0";
            break;
        default:
            echo json_encode(['error' => "Tipo desconocido."]);
            exit;
    }

    $stmt = $pdo->prepare($consulta);
    $stmt->execute([':id_class' => $id_class]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}