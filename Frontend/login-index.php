<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mecanografit</title>
    <link rel="stylesheet" href="login.css">
</head>

<body>
    <div class="container" id="container">
        <div class="form-container sing-up">
            <form action="../backend/php/register.php" method="POST">
                <h1>Crear tu cuenta</h1>
                <span>Usa tu correo para registrarte</span>
                <input type="text" name="name" placeholder="Nombre" required>
                <input type="password" name="password" placeholder="Contraseña" required>
                <button type="submit" name="register">Listo</button>
            </form>
        </div>

        <div class="form-container sing-in">
            <form action="../backend/php/login.php" method="POST">
                <h1>Iniciar sesión</h1>
                <span>O usa tu contraseña para acceder</span>
                <input type="text" name="name" placeholder="Nombre" required>
                <input type="password" name="contraseña" placeholder="Contraseña" required>
                <a href="restore_password">Olvidaste tu contraseña?</a>
                <button type="submit">Listo</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Bienvenido!</h1>
                    <p>Por favor registre sus datos personales para utilizar todas las funciones del sitio</p>
                    <button class="hidden" id="login">Iniciar sesión</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Bienvenido de vuelta!</h1>
                    <p>Por favor ingrese sus datos personales para utilizar todas las funciones del sitio</p>
                    <button class="hidden" id="register">Crear cuenta</button>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="login.js"></script>

</html>