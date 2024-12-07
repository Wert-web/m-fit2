<?php
include("connection.php");
session_start();

header('Content-Type: application/json');

// Validar sesión activa
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
    $params = [':id_class' => $id_class];

    if ($type === 'bloques') {
        // Consulta para obtener bloques relacionados con id_class
        $consulta = "
            SELECT 
                b.id_block AS id, 
                b.name AS name, 
                b.date AS date, 
                b.visibility AS visibility 
            FROM 
                class_block cb 
            JOIN 
                block b ON cb.id_block = b.id_block 
            WHERE 
                cb.id_class = :id_class
        ";
    } elseif ($type === 'alumnos') {
        // Consulta para obtener alumnos relacionados con id_class
        $consulta = "
            SELECT 
                u.id_user AS id, 
                u.name AS name, 
                cu.date_assigned AS date 
            FROM 
                class_user cu 
            JOIN 
                user u ON cu.id_user = u.id_user 
            WHERE 
                cu.id_class = :id_class 
                AND u.type = 0
        ";
    } else {
        echo json_encode(['error' => "Tipo desconocido."]);
        exit;
    }

    // Preparar y ejecutar la consulta
    $stmt = $pdo->prepare($consulta);
    $stmt->execute($params);

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Verificar si hay datos
    if (empty($data)) {
        echo json_encode([
            'type' => $type,
            'data' => [],
            'message' => "No se encontraron resultados para el tipo: $type y clase: $id_class."
        ]);
        exit;
    }

    // Respuesta formateada
    echo json_encode([
        'type' => $type,
        'data' => $data,
    ]);

} catch (Exception $e) {
    error_log("Error en get_relations.php: " . $e->getMessage()); // Registrar el error
    echo json_encode(['error' => "Error al procesar la solicitud: " . $e->getMessage()]);
    exit;
}