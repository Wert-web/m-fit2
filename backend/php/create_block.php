<?php
include("connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);
    $visibility = isset($_POST['visibility']) ? 1 : 0;
    $id_user = $_SESSION['id_user']; // Asumiendo que el usuario está registrado en la sesión
    $class_id = $_POST['class_id'];

    $consulta = "INSERT INTO block (id_user, visibility, name, description) VALUES (:id_user, :visibility, :name, :description)";
    $stmt = $pdo->prepare($consulta);

    if ($stmt->execute([':id_user' => $id_user, ':visibility' => $visibility, ':name' => $name, ':description' => $description])) {
        // Insertar en la tabla class_block para relacionar el bloque con la clase
        $id_block = $pdo->lastInsertId();
        $consulta_class_block = "INSERT INTO class_block (id_class, id_block, id_user) VALUES (:class_id, :block_id, :id_user)";
        $stmt_class_block = $pdo->prepare($consulta_class_block);

        if ($stmt_class_block->execute([':class_id' => $class_id, ':block_id' => $id_block, ':id_user' => $id_user])) {
            echo "Bloque creado correctamente.";
        } else {
            echo "Error al relacionar el bloque con la clase: " . $stmt_class_block->errorInfo()[2];
        }
    } else {
        echo "Error al crear el bloque: " . $stmt->errorInfo()[2];
    }
}
?>