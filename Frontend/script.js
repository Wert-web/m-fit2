const searchBar = document.getElementById('search-bar');
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("myTable");
    const btnBloques = document.getElementById("btn-bloques");
    const btnClases = document.getElementById("btn-clases");
    const btnAsignacion = document.getElementById("btn-asignacion");
    const selectAllCheckbox = document.getElementById("select-all");
    const itemList = document.getElementById('itemlist');
    const btnCrear = document.getElementById('btn-crear'); 
    const toggleButton = document.getElementById("toggleButton");

    toggleButton.addEventListener("click", function () {
        if (itemList.style.display === "none") {
            itemList.style.display = "block";
        } else {
            itemList.style.display = "none";
        }
    });

    if (!tableBody) {
        console.error("El elemento con id 'myTable' no existe.");
        return;
    }

    function handleEnterClick(event) {
        const button = event.target;
        const type = button.getAttribute("data-type");
        const id = button.getAttribute("data-id");

        if (type && id) {
            localStorage.setItem(`${type}Id`, id);
            console.log(`ID de ${type} guardado en localStorage:`, id);

            // Redirigir a la nueva página
            if (type === 'class') {
                window.location.href = 'visualizer-class.html'; // Reemplaza con la URL de la página de la clase
            } else if (type === 'block') {
                window.location.href = 'block_page.html'; // Reemplaza con la URL de la página del bloque
            }
        }
    }

    function buildTable(data) {
        let rows = "";
        for (let i = 0; i < data.length; i++) {
            rows += `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${data[i].firstContent || "N/A"}</td>
                    <td>${data[i].secondContent || "Sin descripción"}</td>
                    <td>${data[i].teirdContent || "Sin fecha"}</td>
                    <td><button class="btn-entrar" data-type="${data[i].type}" data-id="${data[i].id}">Entrar</button></td>
                </tr>`;
        }
        tableBody.innerHTML = rows;

        // Añadir evento de clic a los botones generados dinámicamente
        const botonesEntrar = document.querySelectorAll(".btn-entrar");
        botonesEntrar.forEach(boton => {
            boton.addEventListener("click", handleEnterClick);
        });

        bindRowCheckboxEvents();
        resetCheckboxes();
    }

    function fetchAndBuildTable(type) {
        fetch(`../backend/php/get_data.php?type=${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            console.log(`${type} obtenidas:`, data);
            buildTable(data);
        })
        .catch(error => console.error(`Error al obtener los ${type}:`, error));
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

    function resetCheckboxes() {
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        const rowCheckboxes = document.querySelectorAll(".row-checkbox");
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    btnBloques?.addEventListener("click", () => fetchAndBuildTable('bloques'));
    btnClases?.addEventListener("click", () => fetchAndBuildTable('clases'));
    btnAsignacion?.addEventListener("click", () => fetchAndBuildTable('asignaciones'));

    fetchAndBuildTable('clases');


    toggleButton.addEventListener("click", function () {
        if (itemList.style.display === "none") {
            itemList.style.display = "block";
        } else {
            itemList.style.display = "none";
        }
    });

    if (!tableBody) {
        console.error("El elemento con id 'myTable' no existe.");
        return;
    }

    function fetchAndBuildTable(type) {
        fetch(`../backend/php/get_data.php?type=${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            console.log(`${type} obtenidas:`, data);
            buildTable(data);
        })
        .catch(error => console.error(`Error al obtener los ${type}:`, error));
    }

    function buildTable(data) {
        let rows = "";
        for (let i = 0; i < data.length; i++) {
            rows += `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${data[i].firstContent || "N/A"}</td>
                    <td>${data[i].secondContent || "Sin descripción"}</td>
                    <td>${data[i].teirdContent || "Sin fecha"}</td>
                    <td><button>${data[i].fiveContent || "Entrar"}</button></td>
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

    function resetCheckboxes() {
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        const rowCheckboxes = document.querySelectorAll(".row-checkbox");
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    btnBloques?.addEventListener("click", () => fetchAndBuildTable('bloques'));
    btnClases?.addEventListener("click", () => fetchAndBuildTable('clases'));
    btnAsignacion?.addEventListener("click", () => fetchAndBuildTable('asignaciones'));

    fetchAndBuildTable('clases');

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
                <textarea name="description" placeholder="Añadir una descripción" required></textarea>
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
                <label>Nombre del Bloque:</label>
                <input type="text" name="name" placeholder="Añadir un nombre" required />
                <label>Descripcion:</label>
                <textarea name="description" placeholder="Añadir una descripción" required></textarea>
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
                <select id="block_id" name="block_id" required>
                    <option value="" disabled selected>Elige una opción</option>
                </select>
                <label for="tiempo">Tiempo en minutos:</label>
                <input type="number" id="tiempo" name="time" min="1" placeholder="0" required>        
                <div>
                    <label>Visibilidad: </label>
                    <input type="checkbox" name="visibility"/>
                </div>
                <label>Cargar la practica ( .txt):</label>
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


    function llenarSelectClases(selectId) {
        fetch('../backend/php/get_class.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            if (!Array.isArray(data)) {
                throw new Error('La respuesta no es un array válido');
            }
            console.log('Clases obtenidas:', data);
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="" disabled selected>Elige una opción</option>';
            data.forEach(clase => {
                const option = document.createElement('option');
                option.value = clase.id_class;
                option.textContent = clase.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener las clases:', error));
    }

    function llenarSelectBloques(selectId) {
        fetch('../backend/php/get_blocks.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            if (!Array.isArray(data)) {
                throw new Error('La respuesta no es un array válido');
            }
            console.log('Bloques obtenidos:', data);
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="" disabled selected>Elige una opción</option>';
            data.forEach(block => {
                const option = document.createElement('option');
                option.value = block.id_block;
                option.textContent = block.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los bloques:', error));
    }
    
// Función para mostrar el formulario según la vista actual
function renderForm(view) {
     formContainer.innerHTML = forms[view] || `<p>Formulario no disponible.</p>`;
    if (view === 'bloques') { llenarSelectClases('class_id');

     } else if (view === 'asignacion') { llenarSelectBloques('block_id');

     } } btnCrear?.addEventListener('click', function () { renderForm(currentView);
        modal.style.display = 'block';
     });

btnCrear?.addEventListener('click', function () {
    renderForm(currentView);
    modal.style.display = 'block';
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

document.addEventListener("DOMContentLoaded", function () {
    const botonesEntrar = document.querySelectorAll(".btn-entrar");

    botonesEntrar.forEach(boton => {
        boton.addEventListener("click", function () {
            const type = boton.getAttribute("data-type");
            const id = boton.getAttribute("data-id");
            if (type && id) {
                localStorage.setItem(`${type}Id`, id);
                console.log(`ID de ${type} guardado en localStorage:`, id);
            }
        });
    });
});
