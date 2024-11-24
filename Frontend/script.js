document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM
    const tableBody = document.getElementById("myTable");
    const btnBloques = document.getElementById("btn-bloques");
    const btnClases = document.getElementById("btn-clases");
    const btnAsignacion = document.getElementById("btn-asignacion");
    const selectAllCheckbox = document.getElementById("select-all");

    // Datos dinámicos para cada categoría
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
        ],
        asignacion: [
            { firstContent: "Asignación 1", secondContent: "Proyecto Final", teirdContent: "2024-02-01", fiveContent: "Ver" },
            { firstContent: "Asignación 2", secondContent: "Ensayo", teirdContent: "2024-02-10", fiveContent: "Ver" },
            { firstContent: "Asignación 3", secondContent: "Examen", teirdContent: "2024-03-05", fiveContent: "Ver" },
        ]
    };

    // Función para construir la tabla
    function buildTable(data) {
        let rows = ""; // Limpiar contenido previo
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
        tableBody.innerHTML = rows; // Renderizar las filas en la tabla
        bindRowCheckboxEvents(); // Reenlazar los eventos a los checkboxes
    }

    // Función para manejar los eventos de los checkboxes
    function bindRowCheckboxEvents() {
        const rowCheckboxes = document.querySelectorAll(".row-checkbox");

        // Al cambiar el checkbox principal
        selectAllCheckbox.addEventListener("change", function () {
            const isChecked = selectAllCheckbox.checked;
            rowCheckboxes.forEach((checkbox) => {
                checkbox.checked = isChecked; // Marca/desmarca todos los checkboxes
            });
        });

        // Al cambiar un checkbox individual
        rowCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                // Si alguno no está seleccionado, desmarcar el checkbox principal
                if (!checkbox.checked) {
                    selectAllCheckbox.checked = false;
                } else {
                    // Si todos están seleccionados, marcar el checkbox principal
                    const allChecked = Array.from(rowCheckboxes).every((cb) => cb.checked);
                    selectAllCheckbox.checked = allChecked;
                }
            });
        });
    }

    // Eventos para los botones
    btnBloques.addEventListener("click", () => buildTable(data.bloques));
    btnClases.addEventListener("click", () => buildTable(data.clases));
    btnAsignacion.addEventListener("click", () => buildTable(data.asignacion));

    // Mostrar tabla inicial (Clases por defecto)
    buildTable(data.clases);
});
