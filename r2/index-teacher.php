<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_back" />
    <link rel="stylesheet" href="teacher.css">
    <title>Control Panel</title>
</head>
<body>

<header class="display-header">
    <h2>Control panel</h2>
</header>

<div class="index-container">
    <div class="main-container">
        <div class="navbar-teacher">
            <nav>
                <ul>
                    <ol><a href="block.html">Bloques</a></ol>
                    <ol><a href="formularios-tmp.html">Asignaciones</a></ol>
                    <ol><a href="#">Relaciones</a></ol>
                    <ol><a href="perfil.html">Perfil</a></ol>
                    <ol><a href="#">Agregar Maestros</a></ol>
                    <ol><button>Cerrar sesión</button></ol>
                </ul>
            </nav>
        </div>
    <div class="double-content" >
        <div>
                    <!-- Formulario para crear clases -->
        <form class="register-form" id="class-form">
            <h3>Crear Clase:</h3>
            <label>Nombre de la Clase:</label>
            <input type="text" placeholder="Añadir un nombre" required />
            <label>Descripción:</label>
            <textarea placeholder="Añadir una descripción" required></textarea>
        <div>
            <label>Visibilidad:</label>
            <input type="checkbox"/>
        </div>
                <button type="submit">Enviar</button> <!-- Botón Enviar -->
            </form>
        </div>
        <div class="table-container">
            <div>
                <nav class="option-nav">
                    <input type="checkbox">
                    <button>Eliminar</button>
                    <button>Modificar</button>
                    <button id="create-button">Crear</button> <!-- Botón Crear -->
                    <button><span>Visibilidad</span></button>
                    <input type="text" placeholder="Buscar">
                </nav>
            </div>

            <!-- Tabla de contenido -->
            <table class="content-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Clases</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Oculto</th>
                        <th>Cantidad de alumnos</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php include 'data.php'; ?>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</div>

<!-- Incluir el archivo JavaScript -->
<script src="script.js"></script>

</body>
</html>