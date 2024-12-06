document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("myTable");
    const btnBloques = document.getElementById("btn-bloques");
    const btnClases = document.getElementById("btn-clases");
    const btnAsignacion = document.getElementById("btn-asignacion");
    const selectAllCheckbox = document.getElementById("select-all");
    const itemList = document.getElementById('itemlist');
    const btnCrear = document.getElementById('btn-crear'); // Botón para abrir el modal
    const toggleButton = document.getElementById("toggleButton");
    
        // Agregar evento al botón
    toggleButton.addEventListener("click", function () {
        // Alternar el estilo de visibilidad
        if (itemList.style.display === "none") {
             itemList.style.display = "block"; // Mostrar el menú
        } else {
            itemList.style.display = "none"; // Ocultar el menú
        }
        });
    

    if (!tableBody) {
        console.error("El elemento con id 'myTable' no existe.");
        return;
    }

    const data = {
        clases: [
            { firstContent: "Matemáticas", secondContent: "Álgebra básica", teirdContent: "2024-01-10", fiveContent: "Detalles" },
            { firstContent: "Historia", secondContent: "Historia Mundial", teirdContent: "2024-01-12", fiveContent: "Detalles" },
            { firstContent: "Inglés", secondContent: "Nivel Intermedio", teirdContent: "2024-01-15", fiveContent: "Detalles" },
        ],
        bloques: [
            { firstContent: "Bloque A", secondContent: "Primaria", teirdContent: "2023-12-10", fiveContent: "Detalles" },
            { firstContent: "Bloque B", secondContent: "Secundaria", teirdContent: "2024-01-05", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
            { firstContent: "Bloque C", secondContent: "Preparatoria", teirdContent: "2024-01-20", fiveContent: "Detalles" },
        ],
        asignacion: [
            { firstContent: "Asignación 1", secondContent: "Proyecto Final", teirdContent: "2024-02-01", fiveContent: "Ver" },
            { firstContent: "Asignación 2", secondContent: "Ensayo", teirdContent: "2024-02-10", fiveContent: "Ver" },
            { firstContent: "Asignación 3", secondContent: "Examen", teirdContent: "2024-03-05", fiveContent: "Ver" },
        ]
    };

    function buildTable(data) {
        let rows = "";
        for (let i = 0; i < data.length; i++) {
            rows += `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${data[i].firstContent || "N/A"}</td>
                    <td>${data[i].secondContent || "Sin descripción"}</td>
                    <td>${data[i].teirdContent || "Sin fecha"}</td>
                    <td><button>${data[i].fiveContent || "Acción"}</button></td>
                </tr>`;
        }
        tableBody.innerHTML = rows;
        bindRowCheckboxEvents();
        resetCheckboxes();
    }

    function bindRowCheckboxEvents() {
        const rowCheckboxes = document.querySelectorAll(".row-checkbox");

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener("change", function () {
                const isChecked = selectAllCheckbox.checked;
                rowCheckboxes.forEach((checkbox) => {
                    checkbox.checked = isChecked;
                });
            });
        }

        rowCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                if (!checkbox.checked) {
                    selectAllCheckbox.checked = false;
                } else {
                    const allChecked = Array.from(rowCheckboxes).every((cb) => cb.checked);
                    selectAllCheckbox.checked = allChecked;
                }
            });
        });
    }

    // Función para desmarcar todos los checkboxes
    function resetCheckboxes() {
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        const rowCheckboxes = document.querySelectorAll(".row-checkbox");
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    btnBloques?.addEventListener("click", () => buildTable(data.bloques));
    btnClases?.addEventListener("click", () => buildTable(data.clases));
    btnAsignacion?.addEventListener("click", () => buildTable(data.asignacion));

    buildTable(data.clases);

    //Modal Code

    const modal = document.getElementById('modal-crear');
    const closeModal = document.getElementById('close-modal');
    const formContainer = document.getElementById('form-container');

    // Variable para rastrear la vista actual
    let currentView = 'clases'; // Valores posibles: 'clases', 'bloques', 'asignacion'

    // Formulario para cada vista

    const forms = {
        clases: `
        <form class="register-form" id="form-clases" method="POST">
                <h3>Crear Clase:</h3>
                <label>Nombre de la Clase:</label>
                <input type="text" name="name" placeholder="Añadir un nombre" required />
                <label>Descripcion:</label>
                <textarea name="description" placeholder="Añadir un descripcion" required></textarea>
                <div>
                    <label>Visibilidad: </label>
                    <input type="checkbox" name="visibility"/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        `,
        bloques: `
            <form class="register-form" id="form-bloques" method="POST">
                <h3>Crear Bloque:</h3>
                <label>Nombre del bloque:</label>
                <input type="text" name="name" placeholder="Añadir un nombre" required />
                <label>Clases:</label>
                <select id="destino" name="class_id" required>
                    <option value="" disabled selected>Elige una opción</option>
                    <option value="1">Opción 1</option>
                    <option value="2">Opción 2</option>
                    <option value="3">Opción 3</option>
                </select>
                <label>Descripcion:</label>
                <textarea name="description" placeholder="Añadir un descripcion" required></textarea>
                <div>
                    <label>Visibilidad: </label>
                    <input type="checkbox" name="visibility"/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        `,
        asignacion: `
            <form class="register-form" id="form-asignacion" method="POST" enctype="multipart/form-data">
                <h3>Crear Asignacion:</h3>
                <label>Nombre de la Asignacion:</label>
                <input type="text" name="name" placeholder="Añadir un nombre" required />
                <label>Bloques:</label>
                <select id="destino" name="block_id" required>
                    <option value="" disabled selected>Elige una opción</option>
                    <option value="1">Opción 1</option>
                    <option value="2">Opción 2</option>
                    <option value="3">Opción 3</option>
                </select>
                <label for="tiempo">Tiempo en minutos:</label>
                <input type="number" id="tiempo" name="time" min="1" placeholder="0" required>        
                <div>
                    <label>Visibilidad: </label>
                    <input type="checkbox" name="visibility"/>
                </div>
                <label>Cargar la pratica ( .txt):</label>
                <input type="file" id="archivo" name="archivo" accept=".txt" required>
                <button type="submit">Enviar</button>
            </form>
        `
    };    

    // Función para mostrar el formulario según la vista actual
    function renderForm(view) {
        formContainer.innerHTML = forms[view] || `<p>Formulario no disponible.</p>`;
    }

    // Botón Crear abre el modal y muestra el formulario actual
    btnCrear?.addEventListener('click', function () {
        renderForm(currentView);
        modal.style.display = 'block';
    });

    // Cerrar el modal
    closeModal?.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    btnBloques?.addEventListener("click", function () {
        currentView = 'bloques';
    });

    btnClases?.addEventListener("click", function () {
        currentView = 'clases';
    });

    btnAsignacion?.addEventListener("click", function () {
        currentView = 'asignacion';
    });

    // Inicializa con la vista predeterminada
    renderForm(currentView);

//AJAX CODE
    document.addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        let endpoint = '';

        if (form.id === 'form-clases') {
            endpoint = '../backend/php/create_class.php';
        } else if (form.id === 'form-bloques') {
            endpoint = '../backend/php/create_block.php';
        } else if (form.id === 'form-asignacion') {
            endpoint = '../backend/php/create_asignation.php';
        }

        fetch(endpoint, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            form.reset();
            modal.style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
    });

    // Función para filtrar la tabla según la búsqueda
    searchBar?.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const rowText = row.innerText.toLowerCase();
            if (rowText.includes(searchTerm)) {
                row.style.display = ""; // Mostrar la fila
            } else {
                row.style.display = "none"; // Ocultar la fila
            }
        });
    });

});
