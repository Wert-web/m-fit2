<?php
include("connection.php");
session_start();

$id_class = $_GET['id_class'];
$type = $_GET['type'];

if ($id_class && $type) {
    try {
        if ($type == 'class_user') {
            $consulta = "SELECT cu.id_class_user, u.name, cu.id_class, cu.id_user 
                         FROM class_user cu 
                         JOIN user u ON cu.id_user = u.id_user 
                         WHERE cu.id_class = :id_class";
        } elseif ($type == 'class_block') {
            $consulta = "SELECT cb.id_class_block, b.name, cb.id_class, cb.id_block, cb.id_user 
                         FROM class_block cb 
                         JOIN block b ON cb.id_block = b.id_block 
                         WHERE cb.id_class = :id_class";
        } else {
            throw new Exception("Tipo desconocido.");
        }

        $stmt = $pdo->prepare($consulta);
        $stmt->execute(['id_class' => $id_class]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros.']);
}
?>