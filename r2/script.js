// Mostrar el formulario al hacer clic en "Crear"
document.getElementById('create-button').addEventListener('click', function() {
    const form = document.getElementById('class-form');
    form.style.display = 'block'; // Muestra el formulario
});

// Manejar el envío del formulario
document.getElementById('class-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    // Aquí puedes agregar la lógica para enviar los datos al servidor o procesarlos
    alert('Formulario enviado'); // Mensaje de ejemplo
    this.reset(); // Reiniciar el formulario
    this.style.display = 'none'; // Ocultar el formulario después de enviar
});