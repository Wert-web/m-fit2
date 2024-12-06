<?php
// Configuración de la base de datos
$host = 'localhost';  // Cambiar si no es localhost
$dbname = 'my_database';  // Nombre de la base de datos
$username = 'root';  // Cambiar si tienes un usuario diferente
$password = 'root';  // Cambiar si tienes contraseña

try {
    // Conexión usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configurar el modo de error de PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos";
} catch (PDOException $e) {
    // Manejo de errores
    die("Error al conectar a la base de datos: " . $e->getMessage());
}
?>