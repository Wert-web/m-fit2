<?php
include("connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['archivo'])) {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']); // Añadir la descripción
    $time = intval($_POST['time']);
    $visibility = isset($_POST['visibility']) ? 1 : 0;
    $block_id = $_POST['block_id'];
    $id_user = $_SESSION['id_user']; // Asumiendo que el usuario está registrado en la sesión

    // Verificar y crear la carpeta 'uploads' si no existe
    $target_dir = "../../uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }
    $target_file = $target_dir . basename($_FILES["archivo"]["name"]);
    if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $target_file)) {
        $consulta = "INSERT INTO asig (name, description, time, document_url, visibility, date) VALUES (:name, :description, :time, :document_url, :visibility, NOW())";
        $stmt = $pdo->prepare($consulta);

        if ($stmt->execute([':name' => $name, ':description' => $description, ':time' => $time, ':document_url' => $target_file, ':visibility' => $visibility])) {
            // Insertar en la tabla block_asig para relacionar la asignación con el bloque
            $id_asig = $pdo->lastInsertId();
            $consulta_block_asig = "INSERT INTO block_asig (id_block, id_asig, id_user) VALUES (:block_id, :asig_id, :id_user)";
            $stmt_block_asig = $pdo->prepare($consulta_block_asig);

            if ($stmt_block_asig->execute([':block_id' => $block_id, ':asig_id' => $id_asig, ':id_user' => $id_user])) {
                echo "Asignación creada y relacionada correctamente.";
            } else {
                echo "Error al relacionar la asignación con el bloque: " . $stmt_block_asig->errorInfo()[2];
            }
        } else {
            echo "Error al crear la asignación: " . $stmt->errorInfo()[2];
        }
    } else {
        echo "Error al subir el archivo.";
    }
}
?>