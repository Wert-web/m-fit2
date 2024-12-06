<?php
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    if (!empty($_POST['name']) && !empty($_POST['password'])) {
        $name = trim($_POST['name']);
        $password = trim($_POST['password']);

        $consulta = "INSERT INTO user (type, name, password) VALUES (1, :name, :password)";
        $stmt = $pdo->prepare($consulta);

        if ($stmt->execute([':name' => $name, ':password' => $password])) {
            // Ajustar la redirección según la estructura de tus directorios
            header("Location: ../../frontend/index-teacher.html");
            exit();
        } else {
            echo "Error al registrar: " . $stmt->errorInfo()[2];
        }
    } else {
        echo "Por favor, completa todos los campos requeridos.";
    }
}
?>