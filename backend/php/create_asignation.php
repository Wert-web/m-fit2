<?php
include("connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['archivo'])) {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);
    $time = intval($_POST['time']);
    $visibility = isset($_POST['visibility']) ? 1 : 0;
    $block_id = $_POST['block_id'];
    $id_user = $_SESSION['id_user']; // Asumiendo que el usuario está registrado en la sesión

    // Verificar y crear la carpeta 'uploads' si no existe
    $target_dir = "../../uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    // Obtener la información del archivo
    $original_file_name = pathinfo($_FILES["archivo"]["name"], PATHINFO_FILENAME);
    $original_file_extension = pathinfo($_FILES["archivo"]["name"], PATHINFO_EXTENSION);
    $new_file_name = $original_file_name . '_' . uniqid() . '.' . $original_file_extension; // Crear un nombre único para el archivo
    $target_file = $target_dir . $new_file_name;

    if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $target_file)) {
        $consulta = "INSERT INTO asig (name, description, time, document_url, visibility, id_user, file_name, date) VALUES (:name, :description, :time, :document_url, :visibility, :id_user, :file_name, NOW())";
        $stmt = $pdo->prepare($consulta);

        if ($stmt->execute([
            ':name' => $name,
            ':description' => $description,
            ':time' => $time,
            ':document_url' => $target_file,
            ':visibility' => $visibility,
            ':id_user' => $id_user,
            ':file_name' => $new_file_name
        ])) {
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