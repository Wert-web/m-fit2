document.addEventListener("DOMContentLoaded", function () {
    const btnNavContainer = document.querySelector(".btn-nav-container"); // Contenedor de botones
    const tableHead = document.querySelector(".content-table thead tr"); // Cabeceras de la tabla
    const tableBody = document.querySelector("#myTable"); // Cuerpo de la tabla
    const selectAllCheckbox = document.getElementById("select-all"); // Checkbox para seleccionar todos
    const toggleButton = document.getElementById("toggleButton");

    const botonesConfig = [
        { id: "btn-bloques", texto: "Bloques" },
        { id: "btn-alumnos", texto: "Alumnos" },
        { id: "btn-asignaciones", texto: "Asignaciones" }, // Añadido para asignaciones
    ];

    function generarBotones() {
        btnNavContainer.innerHTML = ""; // Limpiar botones previos
        botonesConfig.forEach((boton) => {
            const btnElement = document.createElement("button");
            btnElement.className = "btn-nav"; // Clase para estilo
            btnElement.id = boton.id;
            btnElement.textContent = boton.texto;

            btnElement.addEventListener("click", () => {
                const tipo = boton.id.split("-")[1]; // Extraer tipo (e.g., bloques, alumnos, asignaciones)
                const id = tipo === 'asignaciones' ? localStorage.getItem("blockId") : localStorage.getItem("classId");
                if (!id) {
                    console.error(`No se encontró ningún ID de ${tipo === 'asignaciones' ? 'block' : 'class'} en localStorage.`);
                    return;
                }
                actualizarTabla(tipo, id);
            });

            btnNavContainer.appendChild(btnElement);
        });
    }

    function actualizarTabla(tipo, id) {
        fetch(`../../backend/php/get_relations.php?id_${tipo === 'asignaciones' ? 'block' : 'class'}=${id}&type=${tipo}`)
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
            console.log(`${tipo} obtenidas:`, data);
            buildTable(data, tipo);
        })
        .catch(error => console.error(`Error al obtener los ${tipo}:`, error));
    }

    function buildTable(data, tipo) {
        let cabeceras, filas;
        if (tipo === 'bloques') {
            filas = data.map(fila => `
                <tr data-id="${fila.id}">
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.firstContent || "N/A"}</td>
                    <td>${fila.secondContent || "Sin fecha"}</td>
                    <td>${fila.visibility === 1 ? "Sí" : "No"}</td>
                    <td><button>Detalles</button></td>
                </tr>
            `);
        }
         else if (tipo === 'alumnos') {
            cabeceras = ["Seleccionar", "Nombre", "Fecha", "Acción"];
            filas = data.map(fila => `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.firstContent || "N/A"}</td>
                    <td>${fila.secondContent || "Sin fecha"}</td>
                    <td><button>Detalles</button></td>
                </tr>
            `);
        } else if (tipo === 'asignaciones') {
            cabeceras = ["Seleccionar", "Nombre de Asignación", "Tiempo", "Archivo", "Visible", "Acción"];
            filas = data.map(fila => `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.firstContent || "N/A"}</td>
                    <td>${fila.secondContent || "Sin tiempo"}</td>
                    <td>${fila.thirdContent || "Sin archivo"}</td>
                    <td>${fila.fourthContent === 1 ? "Sí" : "No"}</td>
                    <td><button>Detalles</button></td>
                </tr>
            `);
        }

        // Actualizar cabeceras
        tableHead.innerHTML = cabeceras.map(cabecera => `<th>${cabecera}</th>`).join("");

        // Actualizar filas
        tableBody.innerHTML = filas.join("");

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

    // Inicialización
    generarBotones(); // Crear los botones dinámicamente
    actualizarTabla("bloques", localStorage.getItem("classId")); // Mostrar contenido inicial para bloques


});

document.addEventListener("DOMContentLoaded", function () {
    const btnDelete = document.getElementById("btn-delete");

    // Manejar evento del botón de eliminar
    btnDelete.addEventListener("click", function () {
        const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");
        const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

        console.log("IDs para eliminar:", idsToDelete); // Depuración

        if (idsToDelete.length > 0) {
            if (confirm("¿Estás seguro de que deseas eliminar los elementos seleccionados?")) {
                const currentView = getCurrentViewFromLocalStorage();
                if (!currentView) {
                    alert("No se pudo determinar la vista actual.");
                    return;
                }
                deleteItems(idsToDelete, currentView);
            }
        } else {
            alert("Por favor, selecciona al menos un elemento para eliminar.");
        }
    });

    // Obtener la vista actual desde el localStorage
    function getCurrentViewFromLocalStorage() {
        // Puedes personalizar esto según cómo manejes las vistas
        if (localStorage.getItem("blockId")) return "bloques";
        if (localStorage.getItem("classId")) return "clases";
        if (localStorage.getItem("asigId")) return "asignacion";
        return null;
    }

    // Enviar los datos al backend para eliminar
    function deleteItems(ids, currentView) {
        fetch('../backend/php/delete_items.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids, currentView })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Elementos eliminados exitosamente.");
                    // Actualizar la tabla para reflejar los cambios
                    ids.forEach(id => {
                        const row = document.querySelector(`tr[data-id="${id}"]`);
                        if (row) row.remove();
                    });
                } else {
                    alert("Error al eliminar los elementos: " + data.error);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Ocurrió un error al eliminar los elementos.");
            });
    }
});
