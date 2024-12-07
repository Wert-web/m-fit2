<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id_block'])) {
        $id_block = $input['id_block'];

        // Depuración: Verificar el valor de id_block
        error_log("ID del Bloque: $id_block");

        try {
            // Obtener las asignaciones del bloque, uniendo con la tabla asig para obtener el nombre de las asignaciones
            $stmt = $pdo->prepare("
                SELECT a.id_asig, a.name 
                FROM block_asig ba
                JOIN asig a ON ba.id_asig = a.id_asig
                WHERE ba.id_block = :id_block
            ");
            $stmt->execute(['id_block' => $id_block]);
            $asigs = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'asigs' => $asigs]);
        } catch (PDOException $e) {
            error_log("Error en la base de datos: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => "No block ID provided"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request"]);
}
?>