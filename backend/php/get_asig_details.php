<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id_asig'])) {
        $id_asig = $input['id_asig'];

        try {
            // Obtener los detalles de la asignación
            $stmt = $pdo->prepare("
                SELECT name, time, document_url 
                FROM asig 
                WHERE id_asig = :id_asig
            ");
            $stmt->execute(['id_asig' => $id_asig]);
            $asig = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'asig' => $asig]);
        } catch (PDOException $e) {
            error_log("Error en la base de datos: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => "No assignment ID provided"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request"]);
}
?>