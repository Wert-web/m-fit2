<?php
$servername = "localhost"; // Cambia esto según tu configuración
$username = "root"; // Cambia esto según tu configuración
$password = ""; // Cambia esto según tu configuración
$dbname = "m_fit_2"; // Cambia esto según tu configuración

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT name_class, description, date, visibility FROM class";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Generar las filas de la tabla HTML
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td><input type='checkbox'></td>";
        echo "<td>" . htmlspecialchars($row["name_class"]) . "</td>";
        echo "<td>" . htmlspecialchars($row["description"]) . "</td>";
        echo "<td>" . htmlspecialchars($row["date"]) . "</td>";
        echo "<td>" . htmlspecialchars($row["visibility"]) . "</td>";
        echo "<td><button class='action-button'>Entrar</button></td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='6'>0 resultados</td></tr>";
}

$conn->close();
?>