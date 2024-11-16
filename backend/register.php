<?php 
include("connection.php");

if (isset($_POST['register'])) {
    // Verificar que los campos no estén vacíos
    if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['ap_p']) && !empty($_POST['password'])) {
        $name = trim($_POST['name']);
        $ap_p = trim($_POST['ap_p']);
        $ap_m = trim($_POST['ap_m']);
        $email = trim($_POST['email']);
        $password = trim($_POST['password']); // Asegúrate de que el campo 'password' esté definido en tu formulario

        // Preparar la consulta SQL
        $consulta = "INSERT INTO `user` (id_user, type, name, ap_p, ap_m, password, email)
                     VALUES (NULL, '0', '$name', '$ap_p', '$ap_m', '$password', '$email')";

        // Ejecutar la consulta
        if (mysqli_query($conexion, $consulta)) {
            // Redirigir al usuario tras un registro exitoso
            header("Location: ../frontend/index-teacher.html");
            exit(); // Finalizar ejecución tras la redirección
        } else {
            echo "Error al registrar: " . mysqli_error($conexion);
        }
    } else {
        echo "Por favor, completa todos los campos requeridos.";
    }
}
?>
