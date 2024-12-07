<?php
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar que los campos no estén vacíos
    if (!empty($_POST['name']) && !empty($_POST['contraseña'])) {
        $name = trim($_POST['name']);
        $password = trim($_POST['contraseña']);

        // Consulta para verificar al usuario
        $consulta = "SELECT * FROM `user` WHERE `name` = :name AND `password` = :password";
        $stmt = $pdo->prepare($consulta);

        // Ejecutar la consulta con los parámetros
        $stmt->execute(['name' => $name, 'password' => $password]);

        if ($stmt->rowCount() > 0) {
            // Usuario encontrado
            session_start();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION['id_user'] = $usuario['id_user']; // Guardar el ID del usuario en la sesión
            $_SESSION['name'] = $usuario['name'];

            if ($usuario['type'] == 1) {
                // Redirigir al área protegida para tipo 1
                header("Location: ../../frontend/index-teacher.html");
            } elseif ($usuario['type'] == 0) {
                // Redirigir al área protegida para tipo 0
                header("Location: ../../frontend/index-student.html");
            } else {
                echo "<script>alert('Tipo de usuario desconocido.');</script>";
            }
            exit();
        } else {
            echo "<script>alert('Usuario o contraseña incorrectos o no autorizado.');</script>";
        }
    } else {
        echo "<script>alert('Por favor, completa todos los campos.');</script>";
    }
}
?>