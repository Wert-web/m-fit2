<?php
include("connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    if (!empty($_POST['name']) && !empty($_POST['password'])) {
        $name = trim($_POST['name']);
        $password = trim($_POST['password']);

        $consulta = "INSERT INTO user (type, name, password) VALUES (0, :name, :password)";
        $stmt = $pdo->prepare($consulta);

        if ($stmt->execute([':name' => $name, ':password' => $password])) {
            // Obtener el ID del usuario recién registrado
            $id_user = $pdo->lastInsertId();

            // Iniciar sesión automáticamente
            $_SESSION['id_user'] = $id_user;
            $_SESSION['name'] = $name;

            // Redirigir al área protegida para estudiantes
            header("Location: ../../frontend/index-student.html");
            exit();
        } else {
            echo "Error al registrar: " . $stmt->errorInfo()[2];
        }
    } else {
        echo "Por favor, completa todos los campos requeridos.";
    }
}
?>