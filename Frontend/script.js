document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".content-table tbody");
    const btnBloques = document.getElementById("btn-bloques");
    const btnClases = document.getElementById("btn-clases");
    const btnAsignacion = document.getElementById("btn-asignacion");

    // Obtener el ID del usuario desde localStorage
    const userId = localStorage.getItem("userId") || 123; // Reemplazar 123 con un ID por defecto o dinámico
    localStorage.setItem("userId", userId);

    // Función para cargar datos desde la API (simulado o real)
    function loadTableData(type) {
        // Ajustar la URL a tu API real
        fetch(`http://localhost:3000/api/${type}?userId=${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al comunicarse con la API");
                }
                return response.json();
            })
            .then((data) => {
                renderTable(data);
            })
            .catch((error) =>
                console.error("Error al cargar datos desde la API:", error)
            );
    }

    // Función para renderizar los datos en la tabla
    function renderTable(data) {
        tableBody.innerHTML = ""; // Limpiar el contenido de la tabla

        // Iterar sobre los datos recibidos y construir las filas
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="table-check"><input type="checkbox"></td>
                <td>${item.nombre || "N/A"}</td>
                <td><p>${item.descripcion || "Sin descripción"}</p></td>
                <td>${item.fecha || "Sin fecha"}</td>
                <td>${item.cantidad_alumnos || "0"}</td>
                <td class="table-btn"><button class="btn-nav" data-id="${item.id}">Entrar</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Agregar eventos a los botones "Entrar"
        const btnEntrar = document.querySelectorAll(".btn-nav");
        btnEntrar.forEach((button) => {
            button.addEventListener("click", (event) => {
                const itemId = event.target.dataset.id;
                console.log(`Navegando al detalle del elemento con ID: ${itemId}`);
                // Redirigir o manejar el clic del botón aquí
                // Ejemplo: window.location.href = `/detalle/${itemId}`;
            });
        });
    }

    // Eventos para los botones de navegación
    btnBloques.addEventListener("click", () => loadTableData("bloques"));
    btnClases.addEventListener("click", () => loadTableData("clases"));
    btnAsignacion.addEventListener("click", () => loadTableData("asignaciones"));

    // Cargar datos iniciales (por defecto: "clases")
    loadTableData("clases");
});
