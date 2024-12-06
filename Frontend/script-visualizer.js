document.addEventListener("DOMContentLoaded", function () {
    const btnNavContainer = document.querySelector(".btn-nav-container"); // Contenedor de botones
    const tableHead = document.querySelector(".content-table thead tr"); // Cabeceras de la tabla
    const tableBody = document.querySelector("#myTable"); // Cuerpo de la tabla
    const selectAllCheckbox = document.getElementById("select-all"); // Checkbox para seleccionar todos

    const botonesConfig = [
        { id: "btn-bloques", texto: "Bloques" },
        { id: "btn-alumnos", texto: "Alumnos" },
    ];

    function generarBotones() {
        btnNavContainer.innerHTML = ""; // Limpiar botones previos
        botonesConfig.forEach((boton) => {
            const btnElement = document.createElement("button");
            btnElement.className = "btn-nav"; // Clase para estilo
            btnElement.id = boton.id;
            btnElement.textContent = boton.texto;

            btnElement.addEventListener("click", () => {
                actualizarTabla(boton.id.split("-")[1]); // Extraer tipo (e.g., bloques, alumnos)
            });

            btnNavContainer.appendChild(btnElement);
        });
    }

    function actualizarTabla(tipo) {
        const id_class = localStorage.getItem("classId");
        if (!id_class) {
            console.error("No se encontró ningún ID de clase en localStorage.");
            return;
        }

        fetch(`../../backend/php/get_relations.php?id_class=${id_class}&type=${tipo}`)
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
        // Definir cabeceras y contenido por tipo
        let cabeceras, filas;
        if (tipo === 'bloques') {
            cabeceras = ["Seleccionar", "Nombre", "Fecha", "Acción"];
            filas = data.map(fila => `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.firstContent || "N/A"}</td>
                    <td>${fila.secondContent || "Sin fecha"}</td>
                    <td><button>Detalles</button></td>
                </tr>
            `);
        } else if (tipo === 'alumnos') {
            cabeceras = ["Seleccionar", "Nombre", "Fecha", "Acción"];
            filas = data.map(fila => `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.firstContent || "N/A"}</td>
                    <td>${fila.secondContent || "Sin fecha"}</td>
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
    actualizarTabla("bloques"); // Mostrar contenido inicial
});
