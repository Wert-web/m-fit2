document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM
    const btnNavContainer = document.querySelector(".btn-nav-container"); // Contenedor de botones
    const tableHead = document.querySelector(".content-table thead tr"); // Cabeceras de la tabla
    const tableBody = document.querySelector("#myTable"); // Cuerpo de la tabla
    const selectAllCheckbox = document.getElementById("select-all"); // Checkbox para seleccionar todos

    // Configuración dinámica
    const botonesConfig = [
        { id: "btn-bloques", texto: "Bloques" },
        { id: "btn-alumnos", texto: "Alumnos" },
    ];

    const tablaContenido = {
        bloques: {
            cabeceras: ["Seleccionar", "Nombre", "Fecha", "Acción"],
            filas: [
                { firstContent: "Bloque A", secondContent: "2024-01-02" , teirdContent: "Detalles" },
                { firstContent: "Bloque B", secondContent: "2024-01-05", teirdContent: "Detalles" },
                { firstContent: "Bloque C", secondContent: "2024-01-20", teirdContent: "Detalles" },
            ],
        },
        alumnos: {
            cabeceras: ["Seleccionar", "Nombre", "Fecha", "Acción"],
            filas: [
                { firstContent: "Jose lopez Matinez", secondContent: "2024-01-10", teirdContent: "Detalles" },
                { firstContent: "Jose Perez Talamantes", secondContent: "2024-01-12", teirdContent: "Detalles" },
                { firstContent: "Margaret Sofia Nopales Ahumada ", secondContent: "2024-01-15", teirdContent: "Detalles" },
            ],
        },
    };

    // Función para generar los botones dinámicamente
    function generarBotones() {
        btnNavContainer.innerHTML = ""; // Limpiar botones previos
        botonesConfig.forEach((boton) => {
            const btnElement = document.createElement("button");
            btnElement.className = "btn-nav"; // Clase para estilo
            btnElement.id = boton.id;
            btnElement.textContent = boton.texto;

            // Añadir evento de clic para actualizar la tabla
            btnElement.addEventListener("click", () => {
                actualizarTabla(boton.id.split("-")[1]); // Extraer tipo (e.g., bloques, clases, asignacion)
            });

            btnNavContainer.appendChild(btnElement);
        });
    }

    // Función para actualizar la tabla según el tipo seleccionado
    function actualizarTabla(tipo) {
        const contenido = tablaContenido[tipo];
        if (!contenido) return;

        // Actualizar cabeceras
        tableHead.innerHTML = "";
        contenido.cabeceras.forEach((cabecera) => {
            const th = document.createElement("th");
            th.textContent = cabecera;
            tableHead.appendChild(th);
        });

        // Actualizar filas
        tableBody.innerHTML = "";
        contenido.filas.forEach((fila) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><input type="checkbox" class="row-checkbox"></td>
                <td>${fila.firstContent || "N/A"}</td>
                <td>${fila.secondContent || "Sin descripción"}</td>
                <td><button>${fila.teirdContent || "Acción"}</button></td>
            `;
            tableBody.appendChild(tr);
        });

        // Configurar eventos para los checkboxes
        bindRowCheckboxEvents();
        resetCheckboxes();
    }

    // Función para manejar los checkboxes
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

    // Inicialización
    generarBotones(); // Crear los botones dinámicamente
    actualizarTabla("bloques"); // Mostrar contenido inicial
});
