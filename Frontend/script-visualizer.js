document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("myTable");
    const searchBar = document.getElementById("search-bar");
    const btnBloques = document.getElementById("btn-bloques");
    const btnClases = document.getElementById("btn-alumnos");
    const btnCrear = document.getElementById("btn-crear");
    const modal = document.getElementById('modal-crear');
    const closeModal = document.getElementById('close-modal');
    const formContainer = document.getElementById('form-container');
    let currentView = 'clases'; // Vista actual (clases, bloques, usuarios)
    let id_class = localStorage.getItem('classId'); // ID de la clase seleccionada

    if (!id_class) {
        alert("No se ha seleccionado ninguna clase.");
        return;
    }

    // Función para construir la tabla
    function buildTable(data) {
        tableBody.innerHTML = ""; // Limpiar tabla
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" class="row-checkbox" data-id="${item.id_class_block || item.id_class_user}"></td>
                <td>${item.name || "N/A"}</td>
                <td>${item.description || "Sin descripción"}</td>
                <td>${item.date || "Sin fecha"}</td>
                <td><button class="btn-entrar" data-id="${item.id_class_block || item.id_class_user}" data-type="${currentView}">Entrar</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Función para obtener datos desde el backend
    function fetchAndBuildTable(type) {
        fetch(`../backend/php/get_relations.php?id_class=${id_class}&type=${type}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(`Error: ${data.error}`);
                    return;
                }
                buildTable(data);
            })
            .catch((error) => console.error("Error al obtener datos:", error));
    }

    // Eventos para botones de navegación
    btnBloques.addEventListener("click", () => {
        currentView = 'bloques';
        fetchAndBuildTable('class_block');
    });

    btnClases.addEventListener("click", () => {
        currentView = 'usuarios';
        fetchAndBuildTable('class_user');
    });

    // Evento de búsqueda
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
            const rowText = row.innerText.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? "" : "none";
        });
    });

    // Función para cerrar el modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Abrir modal para crear
    btnCrear.addEventListener("click", () => {
        formContainer.innerHTML = `
            <form id="form-${currentView}">
                <h3>Crear ${currentView}:</h3>
                <label>Nombre:</label>
                <input type="text" name="name" required>
                <label>Descripción:</label>
                <textarea name="description" required></textarea>
                <button type="submit">Guardar</button>
            </form>`;
        modal.style.display = "block";
    });

    // Cargar vista inicial
    fetchAndBuildTable('class_user');
});
