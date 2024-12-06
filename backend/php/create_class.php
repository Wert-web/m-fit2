<?php
include("connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);
    $visibility = isset($_POST['visibility']) ? 1 : 0;
    $id_user = $_SESSION['id_user']; // Asumiendo que el usuario está registrado en la sesión

    $consulta = "INSERT INTO class (id_user, name, description, visibility, date) VALUES (:id_user, :name, :description, :visibility, NOW())";
    $stmt = $pdo->prepare($consulta);

    if ($stmt->execute([':id_user' => $id_user, ':name' => $name, ':description' => $description, ':visibility' => $visibility])) {
        echo "Clase creada correctamente.";
    } else {
        echo "Error al crear la clase: " . $stmt->errorInfo()[2];
    }
}
?>