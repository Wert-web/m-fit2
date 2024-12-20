document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("myTable");
    const searchBar = document.getElementById("search-bar");
    const btnBloques = document.getElementById("btn-bloques");
    const btnClases = document.getElementById("btn-alumnos");
    const btnCrear = document.getElementById("btn-modify"); // Botón para añadir relación
    const btnDelete = document.getElementById("btn-delete");
    const selectAllCheckbox = document.getElementById("select-all");
    const modal = document.getElementById('modal-crear');
    const closeModal = document.getElementById('close-modal');
    const formContainer = document.getElementById('form-container');
    let currentView = 'clases'; // Vista actual (clases, bloques, usuarios)
    let id_class = localStorage.getItem('classId'); // ID de la clase seleccionada
    const toggleButton = document.getElementById("toggleButton"); // ID correcto del botón
    const itemList = document.getElementById("itemlist"); // ID correcto del elemento ul
    const btnRegresar = document.getElementById("btn-regresar");
    const btnPerfil = document.getElementById("btn-perfil");
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    if (!id_class) {
        alert("No se ha seleccionado ninguna clase.");
        return;
    }

    // Función para eliminar elementos seleccionados
    function deleteItems(ids) {
        console.log("Enviando al backend:", { ids, currentView }); // Añadido para depuración

        fetch('../backend/php/delete_class_items.php', {
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

    // Evento para el botón de eliminar
    if (btnDelete) {
        btnDelete.addEventListener("click", function() {
            const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");
            const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => {
                const row = checkbox.closest('tr');
                return row ? row.dataset.id : null;
            }).filter(id => id !== null); // Eliminar valores nulos
            

            console.log("IDs para eliminar:", idsToDelete); // Depuración
            console.log("boton presionado");

            if (idsToDelete.length > 0) {
                if (confirm("¿Estás seguro de que deseas eliminar los elementos seleccionados?")) {
                    deleteItems(idsToDelete);
                }
            } else {
                alert("Por favor, selecciona al menos un elemento para eliminar.");
            }
        });
    } else {
        console.error("Botón de eliminar no encontrado");
    }

    // Asegurarse de que el botón y el elemento se seleccionan correctamente
    if (toggleButton && itemList) {
        toggleButton.addEventListener("click", function () {
            if (itemList.style.display === "none") {
                itemList.style.display = "block";
            } else {
                itemList.style.display = "none";
            }
            console.log("Botón de toggle presionado"); // Depuración
        });
    } else {
        if (!toggleButton) console.error("Botón de toggle no encontrado");
        if (!itemList) console.error("itemList no encontrado");
    }

    // Función para construir la tabla
    function buildTable(data) {
        tableBody.innerHTML = ""; // Limpiar tabla
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.dataset.id = item.id_class_block || item.id_class_user; // Asegurarse de agregar el dataset.id
            row.innerHTML = `
                <td><input type="checkbox" class="row-checkbox" data-id="${item.id_class_block || item.id_class_user}"></td>
                <td>${item.name || "N/A"}</td>
                <td>${item.description || "Sin descripción"}</td>
                <td>${item.date || "Sin fecha"}</td>
                <td><button class="btn-entrar" data-id="${item.id_class_block || item.id_class_user}" data-type="${currentView}">Entrar</button></td>
            `;
            tableBody.appendChild(row);
        });
    
        // Añadir evento de clic a los botones generados dinámicamente
        const botonesEntrar = document.querySelectorAll(".btn-entrar");
        botonesEntrar.forEach(boton => {
            boton.addEventListener("click", handleEnterClick);
        });
    
        bindRowCheckboxEvents();
        resetCheckboxes();
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

    // Función para manejar clic en botones de entrada
    function handleEnterClick(event) {
        const button = event.target;
        const type = button.getAttribute("data-type");
        const id = button.getAttribute("data-id");

        if (type && id) {
            localStorage.setItem(`${type}Id`, id);
            console.log(`ID de ${type} guardado en localStorage:`, id);

            // Redirigir siempre a visualizer-class.html
            window.location.href = 'visualizer-class.html';
        }
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

    /** Evento de búsqueda
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
            const rowText = row.innerText.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? "" : "none";
        });
    });
    */

    // Función para vincular eventos de checkboxes de fila
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

    // Función para reiniciar los checkboxes
    function resetCheckboxes() {
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        const rowCheckboxes = document.querySelectorAll(".row-checkbox");
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }    

    // Función para mostrar el formulario según la vista actual
    function renderForm(view) {
        const forms = {
            bloques: `
                <form class="register-form" id="form-bloques" method="POST">
                    <!-- Tu formulario de creación de bloques aquí -->
                </form>
            `
        };
        formContainer.innerHTML = forms[view] || `<p>Formulario no disponible.</p>`;
    }

    // Botón Añadir Relación abre el modal y muestra el formulario de bloques
    btnCrear.addEventListener('click', function () {
        renderForm('bloques');
        modal.style.display = 'block';
    });

    // Cerrar el modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Cargar vista inicial
    fetchAndBuildTable('class_user');

    // Función para redirigir a una página específica
    function redirectTo(url) {
        window.location.href = url;
    }

    // Botón de Regresar
    if (btnRegresar) {
        btnRegresar.addEventListener("click", function () {
            redirectTo("index-teacher.html"); // Cambia "pagina-regresar.html" a la URL de la página a la que quieres regresar
        });
    } else {
        console.error("Botón de Regresar no encontrado");
    }

    // Botón de Perfil
    if (btnPerfil) {
        btnPerfil.addEventListener("click", function () {
            redirectTo("profile.html"); // Cambia "pagina-perfil.html" a la URL de la página de perfil
        });
    } else {
        console.error("Botón de Perfil no encontrado");
    }

    // Botón de Cerrar Sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            // Lógica para cerrar sesión, por ejemplo, hacer una solicitud al backend para destruir la sesión
            fetch('../backend/php/logout.php', { // Cambia la URL a tu script de cierre de sesión
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Sesión cerrada exitosamente.");
                    // Redirigir al usuario a la página de inicio de sesión u otra página adecuada
                    redirectTo("login-index.php"); // Cambia "pagina-login.html" a la URL de la página de inicio de sesión
                } else {
                    alert("Error al cerrar la sesión: " + data.error);
                }
            })
            .catch(error => {
                console.error("Error al cerrar la sesión:", error);
                alert("Ocurrió un error al cerrar la sesión.");
            });
        });
    } else {
        console.error("Botón de Cerrar Sesión no encontrado");
    }
});
