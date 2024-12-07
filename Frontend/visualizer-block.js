document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const itemList = document.getElementById("itemlist");
    const btnNavContainer = document.querySelector(".btn-nav-container");
    const myTableHeader = document.getElementById("myTable-header");
    const myTable = document.getElementById("myTable");
    const modalCrear = document.getElementById("modal-crear");
    const closeModal = document.getElementById("close-modal");
    const formContainer = document.getElementById("form-container");

    const forms = {
        addTeacher: `
            <form id="add-teacher-form" method="POST">
                <h3>Añadir Maestro:</h3>
                <label>Nombre:</label>
                <input type="text" name="name" required>
                <button type="submit">Enviar</button>
            </form>
        `,
        modifyRelation: `
            <form id="modify-relation-form" method="POST">
                <h3>Añadir Relación:</h3>
                <label>Bloque:</label>
                <select id="block_id" name="block_id" required>
                    <option value="" disabled selected>Elige una opción</option>
                </select>
                <label>Asignación:</label>
                <select id="asig_id" name="asig_id" required>
                    <option value="" disabled selected>Elige una opción</option>
                </select>
                <button type="submit">Enviar</button>
            </form>
        `
    };

    toggleButton.addEventListener("click", function () {
        if (itemList.style.display === "none") {
            itemList.style.display = "block";
        } else {
            itemList.style.display = "none";
        }
    });

    document.getElementById("btn-add-teacher").addEventListener("click", function () {
        renderForm("addTeacher");
        modalCrear.style.display = "block";
    });

    document.getElementById("btn-modify").addEventListener("click", function () {
        renderForm("modifyRelation");
        modalCrear.style.display = "block";
        fetchBlocksAndAssignments();
    });

    document.getElementById("btn-regresar").addEventListener("click", function () {
        window.history.back();
    });

    document.getElementById("btn-cerrar-sesion").addEventListener("click", function () {
        fetch('../backend/php/logout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "pagina-login.html";
            } else {
                alert("Error al cerrar sesión");
            }
        })
        .catch(error => console.error("Error al cerrar sesión:", error));
    });

    closeModal.addEventListener("click", function () {
        modalCrear.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modalCrear) {
            modalCrear.style.display = "none";
        }
    });

    function renderForm(view) {
        formContainer.innerHTML = forms[view] || `<p>Formulario no disponible.</p>`;
        
        if (view === "modifyRelation") {
            const form = document.getElementById("modify-relation-form");
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                const blockId = document.getElementById("block_id").value;
                const asigId = document.getElementById("asig_id").value;

                fetch('../backend/php/add_relation.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ block_id: blockId, asig_id: asigId })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Relación añadida correctamente.");
                        modalCrear.style.display = "none";
                        fetchBlocksAndAssignments();
                    } else {
                        alert("Error al añadir la relación: " + data.message);
                    }
                })
                .catch(error => console.error("Error al añadir la relación:", error));
            });
        }
    }

    function fetchBlocksAndAssignments() {
        Promise.all([
            fetch('../backend/php/get_blocks.php').then(response => response.json()),
            fetch('../backend/php/get_assignments.php').then(response => response.json())
        ])
        .then(results => {
            const [blocksData, assignmentsData] = results;
            if (blocksData.success && assignmentsData.success) {
                const blockSelect = document.getElementById("block_id");
                blockSelect.innerHTML = '<option value="" disabled selected>Elige una opción</option>';
                blocksData.blocks.forEach(block => {
                    const option = document.createElement('option');
                    option.value = block.id_block;
                    option.textContent = block.name;
                    blockSelect.appendChild(option);
                });

                const asigSelect = document.getElementById("asig_id");
                asigSelect.innerHTML = '<option value="" disabled selected>Elige una opción</option>';
                assignmentsData.assignments.forEach(asig => {
                    const option = document.createElement('option');
                    option.value = asig.id_asig;
                    option.textContent = asig.name;
                    asigSelect.appendChild(option);
                });
            } else {
                console.error("Error al obtener los bloques y asignaciones");
            }
        })
        .catch(error => console.error("Error al obtener los bloques y asignaciones:", error));
    }

    function fetchAndRenderTable() {
        fetch('../backend/php/get_block_relations.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderTable(data.relations);
            } else {
                console.error("Error al obtener las relaciones de bloques:", data.message);
            }
        })
        .catch(error => console.error("Error al obtener las relaciones de bloques:", error));
    }        

    function renderTable(relations) {
        myTableHeader.innerHTML = `
            <tr>
                <th>Bloque</th>
                <th>Asignación</th>
                <th>Acción</th>
            </tr>
        `;

        myTable.innerHTML = "";
        relations.forEach(relation => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${relation.block_name}</td>
                <td>${relation.asig_name}</td>
                <td><button class="delete-button" data-id="${relation.id}">Eliminar</button></td>
            `;
            myTable.appendChild(row);
        });

        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                if (confirm("¿Estás seguro de que quieres eliminar esta relación?")) {
                    fetch('../backend/php/delete_block_relation.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: id })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert("Relación eliminada correctamente.");
                            fetchAndRenderTable();
                        } else {
                            alert("Error al eliminar la relación: " + data.message);
                        }
                    })
                    .catch(error => console.error("Error al eliminar la relación:", error));
                }
            });
        });
    }

    // Inicializar la carga de la tabla
    fetchAndRenderTable();
});
