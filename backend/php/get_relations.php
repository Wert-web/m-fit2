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
            // Cambiar para consultar la tabla class_block y obtener información de block
            $consulta = "
                SELECT b.id_block AS id, b.name AS firstContent, b.date AS secondContent 
                FROM class_block cb 
                JOIN block b ON cb.id_block = b.id_block 
                WHERE cb.id_class = :id_class
            ";
            break;
        case 'alumnos':
            // Cambiar para consultar la tabla class_user y obtener información de user
            $consulta = "
                SELECT u.id_user AS id, u.name AS firstContent, u.date AS secondContent 
                FROM class_user cu 
                JOIN user u ON cu.id_user = u.id_user 
                WHERE cu.id_class = :id_class AND u.type = 0
            ";
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