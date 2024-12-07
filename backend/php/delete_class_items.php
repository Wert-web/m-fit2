<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $ids = $input['ids'];
    $currentView = $input['currentView'];

    if (!isset($_SESSION['id_user'])) {
        echo json_encode(['error' => "ID de usuario no encontrado en la sesión."]);
        exit;
    }

    // Determinar la tabla y la columna basada en currentView
    $table = '';
    $column = '';
    switch ($currentView) {
        case 'usuarios':
            $table = 'class_user';
            $column = 'id_class_user';
            break;
        case 'bloques':
            $table = 'class_block';
            $column = 'id_class_block';
            break;
        default:
            echo json_encode(['error' => "Vista desconocida."]);
            exit;
    }

    try {
        $pdo->beginTransaction();

        $placeholders = rtrim(str_repeat('?,', count($ids)), ',');
        $stmt = $pdo->prepare("DELETE FROM $table WHERE $column IN ($placeholders)");

        if ($stmt->execute($ids)) {
            $pdo->commit();
            echo json_encode(['success' => true]);
        } else {
            $pdo->rollBack();
            echo json_encode(['error' => "Error al ejecutar la eliminación."]);
        }
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => "Método de solicitud no permitido."]);
}
?>