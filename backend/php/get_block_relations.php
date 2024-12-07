<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Obtener las relaciones de bloques
        $stmt = $pdo->prepare("
            SELECT ba.id_block_asig, b.name as block_name, a.name as asig_name
            FROM block_asig ba
            JOIN block b ON ba.id_block = b.id_block
            JOIN asig a ON ba.id_asig = a.id_asig
        ");
        $stmt->execute();
        $relations = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'relations' => $relations]);
    } catch (PDOException $e) {
        error_log("Error en la base de datos: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request"]);
}
?>