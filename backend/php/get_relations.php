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
$id_block = isset($_GET['id_block']) ? $_GET['id_block'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';

if ((!$id_class && !$id_block) || !$type) {
    echo json_encode(['error' => "Faltan parámetros necesarios."]);
    exit;
}

try {
    $consulta = '';
    if ($type === 'bloques') {
        // Consulta para obtener bloques relacionados con id_class
        $consulta = "
            SELECT b.id_block AS id, b.name AS firstContent, b.date AS secondContent, b.visibility 
            FROM class_block cb 
            JOIN block b ON cb.id_block = b.id_block 
            WHERE cb.id_class = :id_class
        ";
        $stmt = $pdo->prepare($consulta);
        $stmt->execute([':id_class' => $id_class]);
    } elseif ($type === 'alumnos') {
        // Consulta para obtener alumnos relacionados con id_class
        $consulta = "
            SELECT u.id_user AS id, u.name AS firstContent, u.date AS secondContent 
            FROM class_user cu 
            JOIN user u ON cu.id_user = u.id_user 
            WHERE cu.id_class = :id_class AND u.type = 0
        ";
        $stmt = $pdo->prepare($consulta);
        $stmt->execute([':id_class' => $id_class]);
    } elseif ($type === 'asignaciones') {
        // Consulta para obtener asignaciones relacionadas con id_block
        $consulta = "
            SELECT a.name AS firstContent, a.time AS secondContent, a.document_url AS thirdContent, a.visibility AS fourthContent 
            FROM block_asig ba 
            JOIN asig a ON ba.id_asig = a.id_asig 
            WHERE ba.id_block = :id_block
        ";
        $stmt = $pdo->prepare($consulta);
        $stmt->execute([':id_block' => $id_block]);
    } else {
        echo json_encode(['error' => "Tipo desconocido."]);
        exit;
    }

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}


?>