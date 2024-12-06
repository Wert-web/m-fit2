document.addEventListener("DOMContentLoaded", function () {
    const btnNavContainer = document.querySelector(".btn-nav-container");
    const tableHead = document.querySelector(".content-table thead tr");
    const tableBody = document.querySelector("#myTable");
    const selectAllCheckbox = document.getElementById("select-all");
    const toggleButton = document.getElementById("toggleButton");
    const itemList = document.getElementById("itemlist");

    // Asegúrate de que el toggleButton exista antes de agregar el evento
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            if (itemList.style.display === "none") {
                itemList.style.display = "block"; // Mostrar el menú
            } else {
                itemList.style.display = "none"; // Ocultar el menú
            }
        });
    } else {
        console.error("toggleButton no encontrado.");
    }

    function getCurrentViewFromLocalStorage() {
        if (localStorage.getItem("blockId")) return "bloques";
        if (localStorage.getItem("classId")) return "clases";
        return null;
    }

    const currentView = getCurrentViewFromLocalStorage();

    const botonesConfig = {
        clases: [
            { id: "btn-bloques", texto: "Bloques" },
            { id: "btn-alumnos", texto: "Alumnos" }
        ],
        bloques: [
            { id: "btn-asignaciones", texto: "Asignaciones" }
        ]
    };

    function generarBotones(view) {
        btnNavContainer.innerHTML = ""; // Limpiar botones previos
        const botones = botonesConfig[view] || []; // Obtener botones específicos de la vista

        botones.forEach(boton => {
            const btnElement = document.createElement("button");
            btnElement.className = "btn-nav";
            btnElement.id = boton.id;
            btnElement.textContent = boton.texto;

            btnElement.addEventListener("click", () => {
                const tipo = boton.id.split("-")[1];
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
        fetch(`../backend/php/get_relations.php?id_${tipo === 'asignaciones' ? 'block' : 'class'}=${id}&type=${tipo}`)
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
                console.error("El formato de los datos recibidos no es un arreglo.");
                data = []; 
            }
            console.log(`${tipo} obtenidas:`, data);
            buildTable(data, tipo);
        })
        .catch(error => console.error(`Error al obtener los ${tipo}:`, error));
    }

    function buildTable(data, tipo) {
        let cabeceras, filas;

        if (!data || !Array.isArray(data)) {
            console.error("Los datos no son un arreglo o están indefinidos.");
            tableBody.innerHTML = "<tr><td colspan='5'>No se encontraron datos.</td></tr>";
            return;
        }

        if (tipo === 'bloques') {
            cabeceras = ["Seleccionar", "Nombre", "Fecha", "Visible", "Acción"];
            filas = data.map(fila => `
                <tr data-id="${fila.id}">
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.firstContent || "N/A"}</td>
                    <td>${fila.secondContent || "Sin fecha"}</td>
                    <td>${fila.visibility === 1 ? "Sí" : "No"}</td>
                    <td><button>Detalles</button></td>
                </tr>
            `);
        } else if (tipo === 'alumnos') {
            cabeceras = ["Seleccionar", "Nombre", "Fecha", "Acción"];
            filas = data.map(fila => `
                <tr>
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${fila.name || "N/A"}</td>
                    <td>${fila.date || "Sin fecha"}</td>
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

        tableHead.innerHTML = cabeceras.map(cabecera => `<th>${cabecera}</th>`).join("");
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
    if (currentView) {
        generarBotones(currentView);
        if (currentView === 'clases') {
            actualizarTabla("bloques", localStorage.getItem("classId"));
        } else if (currentView === 'bloques') {
            actualizarTabla("asignaciones", localStorage.getItem("blockId"));
        }
    }

    // Navegación de los botones adicionales
    const btnRegresar = document.getElementById("btn-regresar");
    const btnPerfil = document.getElementById("btn-perfil");
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    if (btnRegresar) {
        btnRegresar.addEventListener("click", function () {
            localStorage.removeItem("classId");
            localStorage.removeItem("blockId");
            window.location.href = 'index-teacher.html'; // Reemplaza con la URL deseada
        });
    }

    if (btnPerfil) {
        btnPerfil.addEventListener("click", function () {
            window.location.href = 'profile.html'; // Reemplaza con la URL de perfil
        });
    }

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = 'login-index.php'; // Reemplaza con la URL de login
        });
    }
});
