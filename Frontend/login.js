const container = document.getElementById('container')
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
});

loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});

// Suponiendo que este es el ID del usuario después de iniciar sesión
const userId = '12345'; // Este valor debería ser dinámico, obtenido del servidor

// Guardar el ID en localStorage al iniciar sesión
function loginUser() {
    // Aquí iría la lógica para validar las credenciales
    // Si las credenciales son válidas:
    localStorage.setItem('userId', userId);
    alert('Inicio de sesión exitoso. ID guardado: ' + userId);
}

// Agregar un evento al botón de inicio de sesión
loginBtn.addEventListener('click', () => {
    // Llamar a la función para iniciar sesión
    loginUser();
    container.classList.remove("active");
});