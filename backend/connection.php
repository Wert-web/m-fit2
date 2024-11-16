<?php
$host = "localhost"; // Cambia según tu configuración
$user = "root";      // Usuario de tu base de datos
$password = "";      // Contraseña de tu base de datos
$dbname = "school_management"; // Nombre de la base de datos

$conexion = mysqli_connect($host, $user, $password, $dbname);

if (!$conexion) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
}
?>
